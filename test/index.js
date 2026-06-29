const vm = require('vm');
const path = require('path');
const rollup = require('rollup');
const nodePolyfills = require('..');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve').nodeResolve;
const os = require('os');
const constants = require('constants');
const { URL, URLSearchParams } = require('url');
const assert = require('assert');
const nodeCrypto = require('crypto');
const debug = require('debug')('builtins:test');
const files = [
  'events.js',
  'crypto.js',
  'url-parse.js',
  'url-file-url-to-path.js',
  'url-format.js',
  'url-to-http-options.js',
  'stream.js',
  'assert.js',
  'constants.js',
  'os.js',
  'path.js',
  'process-to-string-tag.js',
  'util-strip-vt-control-characters.js',
  'util-types-format-with-options.js',
  'util-text-encoder.js',
  'string-decoder.js',
  'string-decoder-default.js',
  'zlib.js',
  'domain.js',
  'crypto.js'
];

describe('rollup-plugin-node-polyfills', function() {

  this.timeout(5000);

  it('does not warn about stream polyfill circular dependencies', function () {
    const warnings = [];

    return rollup.rollup({
      input: 'test/examples/stream.js',
      onwarn(warning) {
        warnings.push(warning);
      },
      plugins: [
        nodePolyfills({
          include: null
        })
      ]
    })
    .then(bundle => bundle.generate({format: 'cjs'}))
    .then(() => {
      assert.deepStrictEqual(
        warnings.filter(warning => warning.code === 'CIRCULAR_DEPENDENCY').map(warning => warning.message),
        []
      );
    });
  });

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
          URL: URL,
          URLSearchParams: URLSearchParams,
          crypto: nodeCrypto.webcrypto,
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

  it('supports browserify-fs named imports', function(done) {
    rollup.rollup({
      input: 'test/examples/fs-readfile-named.js',
      plugins: [
        nodePolyfills({
          include: null
        })
      ],
      treeshake: true
    })
    .then(bundle => bundle.generate({format: 'esm'}))
    .then(generated => {
      const code = generated.output[0].code;
      if (!code.includes('readFile')) {
        done(new Error('Expected generated code to include readFile'));
        return;
      }
      done();
    })
    .catch(done)
  });

  it('does not initialize browserify-fs for unused fs imports', function(done) {
    rollup.rollup({
      input: 'test/examples/fs-import.js',
      plugins: [
        nodePolyfills({
          include: null
        })
      ]
    })
    .then(bundle => bundle.generate({format: 'cjs'}))
    .then(generated => {
      const script = new vm.Script(generated.output[0].code);
      script.runInContext(vm.createContext({}));
      done();
    })
    .catch(done)
  });

  it('throws a clear error when fs is called without IndexedDB', function(done) {
    rollup.rollup({
      input: 'test/examples/fs-call-non-browser.js',
      plugins: [
        nodePolyfills({
          include: null
        })
      ]
    })
    .then(bundle => bundle.generate({format: 'cjs'}))
    .then(generated => {
      const script = new vm.Script(generated.output[0].code);
      assert.throws(
        () => script.runInContext(vm.createContext({})),
        /fs polyfill requires an IndexedDB-compatible browser runtime/
      );
      done();
    })
    .catch(done)
  });

  it('crypto option bundles broader crypto APIs', function(done) {
    rollup.rollup({
      input: 'test/examples/crypto-browserify.js',
      plugins: [
        nodePolyfills({
          include: null,
          crypto: true
        })
      ]
    })
    .then(bundle => bundle.generate({format: 'cjs'}))
    .then(generated => {
      const script = new vm.Script(generated.output[0].code);
      const context = vm.createContext({
        done: done,
        setTimeout: setTimeout,
        clearTimeout: clearTimeout,
        console: console,
        crypto: nodeCrypto.webcrypto
      });
      context.self = context;
      script.runInContext(context);
    })
    .catch(done);
  });

  it('tree-shakes named crypto randomBytes imports', function(done) {
    rollup.rollup({
      input: 'test/examples/crypto-randombytes-named.js',
      plugins: [
        nodePolyfills({
          include: null
        })
      ],
      onwarn() {}
    })
    .then(bundle => bundle.generate({format: 'esm'}))
    .then(generated => {
      const bytes = Buffer.byteLength(generated.output[0].code, 'utf8');
      if (bytes > 300000) {
        done(new Error(`named randomBytes bundle should stay below 300000 bytes, got ${bytes}`));
        return;
      }
      done();
    }, done);
  });

  it('chunks large crypto randomFill requests', function(done) {
    rollup.rollup({
      input: 'test/examples/crypto-randomfill-large.js',
      plugins: [
        nodePolyfills({
          include: null
        })
      ]
    })
    .then(bundle => bundle.generate({format: 'cjs'}))
    .then(generated => {
      const script = new vm.Script(generated.output[0].code);
      const context = vm.createContext({
        done: done,
        setTimeout: setTimeout,
        clearTimeout: clearTimeout,
        console: console,
        crypto: nodeCrypto.webcrypto
      });
      context.self = context;
      script.runInContext(context);
    })
    .catch(done);
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
