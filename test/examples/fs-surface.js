import fs, {
  access,
  constants,
  existsSync,
  promises,
  readFileSync,
  W_OK,
  writeFileSync
} from 'fs';

if (typeof access !== 'function') {
  throw new Error('Expected access to be a function');
}

if (typeof readFileSync !== 'undefined') {
  throw new Error('Expected unsupported readFileSync to be undefined');
}

if (typeof writeFileSync !== 'undefined') {
  throw new Error('Expected unsupported writeFileSync to be undefined');
}

if (typeof existsSync !== 'undefined' || typeof fs.existsSync !== 'undefined') {
  throw new Error('Expected unsupported existsSync to be undefined');
}

if (constants.F_OK !== 0 || fs.constants.F_OK !== 0) {
  throw new Error('Expected fs constants to be exported');
}

if (typeof promises.readFile !== 'function' || typeof fs.promises.readFile !== 'function') {
  throw new Error('Expected promises API to be exported');
}

let accessError;
access('/test.txt', W_OK, function(err) {
  accessError = err;
});

if (!accessError || !/only supports F_OK/.test(accessError.message)) {
  throw new Error('Expected unsupported fs.access modes to fail clearly');
}

try {
  access('/test.txt');
  throw new Error('Expected access without a callback to fail');
} catch (err) {
  if (!/callback must be a function/.test(err.message)) {
    throw err;
  }
}

if (typeof fs.promises.watch !== 'undefined') {
  throw new Error('Expected unsupported promises.watch to be undefined');
}

if (typeof fs.promises.copyFile !== 'undefined') {
  throw new Error('Expected unsupported promises.copyFile to be undefined');
}
