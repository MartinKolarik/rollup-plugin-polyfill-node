import fs, {
  access,
  constants,
  existsSync,
  promises,
  readFileSync,
  writeFileSync
} from 'fs';

if (typeof access !== 'function') {
  throw new Error('Expected access to be a function');
}

if (typeof readFileSync !== 'function') {
  throw new Error('Expected readFileSync to be a function');
}

if (typeof writeFileSync !== 'function') {
  throw new Error('Expected writeFileSync to be a function');
}

if (typeof existsSync !== 'function') {
  throw new Error('Expected existsSync to be a function');
}

if (constants.F_OK !== 0 || fs.constants.F_OK !== 0) {
  throw new Error('Expected fs constants to be exported');
}

if (typeof promises.readFile !== 'function' || typeof fs.promises.readFile !== 'function') {
  throw new Error('Expected promises API to be exported');
}
