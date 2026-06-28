const rollup = require('rollup');
const fs = require('fs');
const path = require('path');
const nodeResolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const addDefaultExportStatement = require('./rollup-plugin-export-default');

async function main() {
  await Promise.all([
    bundleDependency('process-es6'),
    bundleDependency('buffer-es6'),
    bundleDependency('browserify-fs', '__fs/browserify-fs.js'),
    bundleDependency('randombytes', '__crypto/randombytes.js'),
    bundleDependency('randomfill', '__crypto/randomfill.js'),
    bundleDependency('create-hash', '__crypto/create-hash.js'),
    bundleDependency('create-hmac', '__crypto/create-hmac.js'),
    bundleDependency('pbkdf2', '__crypto/pbkdf2.js'),
    bundleDependency('browserify-cipher', '__crypto/browserify-cipher.js'),
    bundleDependency('diffie-hellman', '__crypto/diffie-hellman.js'),
    bundleDependency('browserify-sign', '__crypto/browserify-sign.js'),
    bundleDependency('browserify-sign/algos', '__crypto/browserify-sign-algos.js'),
    bundleDependency('create-ecdh', '__crypto/create-ecdh.js'),
    bundleDependency('public-encrypt', '__crypto/public-encrypt.js'),
  ])
  patchProcessToStringTag();

  // quick and dirty find-replace
  // const cryptoPolyfillLoc = path.join(__dirname, '../polyfills/crypto-browserify.js');
  // let cryptoPolyfill = fs.readFileSync(cryptoPolyfillLoc, 'utf8');
  // cryptoPolyfill = cryptoPolyfill.replace(`import buffer$1 from 'buffer';`, `import * as buffer$1 from 'buffer';`);
  // console.log(cryptoPolyfill);
  // fs.writeFileSync(cryptoPolyfillLoc, cryptoPolyfill`, 'utf8'`)
}

async function bundleDependency(depName, outFile = depName + '.js') {
  const bundle = await rollup.rollup({
    input: depName,
    plugins: [
      commonjs(),
      nodeResolve({
        browser: true,
        preferBuiltins: true
      }),
      addDefaultExportStatement(),
      json(),
    ],
    external: [
      'crypto',
      'vm',
      'events',
      'path',
      'stream',
      'util',
      'buffer'
    ]
  });

  await bundle.write({
    format: 'esm',
    file: path.join('polyfills', outFile)
  });
}

function patchProcessToStringTag() {
  const processPolyfillLoc = path.join(__dirname, '../polyfills/process-es6.js');
  let processPolyfill = fs.readFileSync(processPolyfillLoc, 'utf8');
  const marker = 'export { addListener';
  const defaultExportMatch = processPolyfill.match(/,\s*([A-Za-z_$][\w$]*)\s+as\s+default,/);
  if (!defaultExportMatch) {
    throw new Error('Unable to find process-es6 default export binding');
  }
  const defaultExportName = defaultExportMatch[1];
  const patch = `if (typeof Symbol === 'function' && Symbol.toStringTag) {
  Object.defineProperty(${defaultExportName}, Symbol.toStringTag, {
    value: 'process',
    enumerable: false,
    writable: true,
    configurable: false
  });
}

`;
  if (!processPolyfill.includes(patch)) {
    if (!processPolyfill.includes(marker)) {
      throw new Error('Unable to patch process-es6 Symbol.toStringTag');
    }
    processPolyfill = processPolyfill.replace(marker, patch + marker);
    fs.writeFileSync(processPolyfillLoc, processPolyfill, 'utf8');
  }
}

main();
