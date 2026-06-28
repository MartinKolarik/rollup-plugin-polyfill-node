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
    // bundleDependency('browserify-fs'),
    // bundleDependency('crypto-browserify'),
  ])
  patchProcessToStringTag();

  // quick and dirty find-replace
  // const cryptoPolyfillLoc = path.join(__dirname, '../polyfills/crypto-browserify.js');
  // let cryptoPolyfill = fs.readFileSync(cryptoPolyfillLoc, 'utf8');
  // cryptoPolyfill = cryptoPolyfill.replace(`import buffer$1 from 'buffer';`, `import * as buffer$1 from 'buffer';`);
  // console.log(cryptoPolyfill);
  // fs.writeFileSync(cryptoPolyfillLoc, cryptoPolyfill`, 'utf8'`)
}

async function bundleDependency(depName) {
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
    file: path.join('polyfills', depName + '.js')
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
