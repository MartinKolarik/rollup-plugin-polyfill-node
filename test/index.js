const vm = require('vm');
const path = require('path');
const rollup = require('rollup');
const nodePolyfills = require('..');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve').nodeResolve;
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

  it('does not replace an explicit inherits package dependency', function(done) {
    rollup.rollup({
      input: 'test/examples/explicit-inherits.js',
      plugins: [
        commonjs(),
        nodePolyfills(),
        {
          name: 'explicit-inherits-fixture',
          resolveId(importee) {
            if (importee === 'inherits') {
              return path.resolve('test/fixtures/inherits/index.js');
            }
            return null;
          }
        },
        resolve({
          preferBuiltins: true,
          browser: true,
        }),
      ]
    })
    .then(bundle => bundle.generate({format: 'iife', name: 'app'}))
    .then(generated => {
      const code = generated.output[0].code;
      debug(code);
      const script = new vm.Script(code);
      script.runInContext(vm.createContext({}));
      done();
    })
    .catch(done)
  });
})
