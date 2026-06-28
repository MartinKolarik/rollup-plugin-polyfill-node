const vm = require('vm');
const rollup = require('rollup');
const nodePolyfills = require('..');
const os = require('os');
const constants = require('constants');
const debug = require('debug')('builtins:test');
const files = [
  'events.js',
  'crypto.js',
  'url-parse.js',
  'url-file-url-to-path.js',
  'url-format.js',
  'stream.js',
  'assert.js',
  'constants.js',
  'os.js',
  'path.js',
  'util-strip-vt-control-characters.js',
  'util-types-format-with-options.js',
  'string-decoder.js',
  'zlib.js',
  'domain.js',
  'crypto.js'
];

describe('rollup-plugin-node-polyfills', function() {
  
  this.timeout(5000);

  files.forEach((file) => {
    it('works with ' + file, function (done) {
      rollup.rollup({
        input: 'test/examples/' + file,
        plugins: [
          nodePolyfills({
            include: null
          })
        ]
      })
      .then(bundle => bundle.generate({format: 'cjs'}))
      .then(generated => {
        const code = generated.output[0].code;
        debug(code);
        const script = new vm.Script(code);
        const context = vm.createContext({
          done: done,
          setTimeout: setTimeout,
          clearTimeout: clearTimeout,
          console: console,
          _constants: constants,
          _osEndianness: os.endianness()
        });
        context.self = context;
        script.runInContext(context);
      })
      .catch(done)
    });
  })

  it('tree-shakes individual util.types methods from named imports', function(done) {
    rollup.rollup({
      input: 'entry',
      plugins: [
        {
          name: 'entry',
          resolveId(id) {
            return id === 'entry' ? id : null;
          },
          load(id) {
            if (id === 'entry') {
              return "import {types} from 'node:util'; console.log(types.isDate(new Date()));";
            }
          }
        },
        nodePolyfills({
          include: null
        })
      ],
      treeshake: true
    })
    .then(bundle => bundle.generate({format: 'esm'}))
    .then(generated => {
      const code = generated.output[0].code;
      if (!code.includes('isDate')) {
        done(new Error('Expected generated code to include the used util.types method'));
        return;
      }
      if (code.includes('isMap')) {
        done(new Error('Expected generated code to omit unused util.types methods'));
        return;
      }
      done();
    })
    .catch(done)
  });

  it('crypto option works (though is broken)', function(done) {
    rollup.rollup({
      input: 'test/examples/crypto-broken.js',
      plugins: [
        nodePolyfills({
          include: null,
          crypto: true
        })
      ]
    }).then(function() {
      done(new Error ('should not get here'))
    }, function (err) {
      if (err.message === `"diffieHellman" is not exported by "\u0000polyfill-node.crypto.js", imported by "test/examples/crypto-broken.js".`) {
        done();
        return;
      }
      done(err)
    });
  });
})
