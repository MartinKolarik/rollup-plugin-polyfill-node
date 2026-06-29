import getFs from '\0polyfill-node.__fs/browserify-fs';

function hasIndexedDBRuntime() {
  var targets = [];

  if (typeof globalThis !== 'undefined') targets.push(globalThis);
  if (typeof self !== 'undefined') targets.push(self);
  if (typeof window !== 'undefined') targets.push(window);

  for (var i = 0; i < targets.length; i++) {
    var target = targets[i];
    if (
      target
      && (
        target.indexedDB
        || target.webkitIndexedDB
        || target.mozIndexedDB
        || target.shimIndexedDB
      )
    ) {
      return true;
    }
  }

  return false;
}

function getAvailableFs() {
  if (!hasIndexedDBRuntime()) {
    throw new Error('The fs polyfill requires an IndexedDB-compatible browser runtime');
  }

  return getFs();
}

function callFs(method, args) {
  return getAvailableFs()[method].apply(null, args);
}

export function appendFile() { return callFs('appendFile', arguments); }
export function chmod() { return callFs('chmod', arguments); }
export function chown() { return callFs('chown', arguments); }
export function close() { return callFs('close', arguments); }
export function createReadStream() { return callFs('createReadStream', arguments); }
export function createWriteStream() { return callFs('createWriteStream', arguments); }
export function exists() { return callFs('exists', arguments); }
export function fchmod() { return callFs('fchmod', arguments); }
export function fchown() { return callFs('fchown', arguments); }
export function fstat() { return callFs('fstat', arguments); }
export function fsync() { return callFs('fsync', arguments); }
export function ftruncate() { return callFs('ftruncate', arguments); }
export function futimes() { return callFs('futimes', arguments); }
export function lchmod() { return callFs('lchmod', arguments); }
export function lchown() { return callFs('lchown', arguments); }
export function link() { return callFs('link', arguments); }
export function lstat() { return callFs('lstat', arguments); }
export function mkdir() { return callFs('mkdir', arguments); }
export function notify() { return callFs('notify', arguments); }
export function open() { return callFs('open', arguments); }
export function read() { return callFs('read', arguments); }
export function readFile() { return callFs('readFile', arguments); }
export function readdir() { return callFs('readdir', arguments); }
export function readlink() { return callFs('readlink', arguments); }
export function realpath() { return callFs('realpath', arguments); }
export function rename() { return callFs('rename', arguments); }
export function rmdir() { return callFs('rmdir', arguments); }
export function stat() { return callFs('stat', arguments); }
export function symlink() { return callFs('symlink', arguments); }
export function truncate() { return callFs('truncate', arguments); }
export function unlink() { return callFs('unlink', arguments); }
export function unwatchFile() { return callFs('unwatchFile', arguments); }
export function utimes() { return callFs('utimes', arguments); }
export function watch() { return callFs('watch', arguments); }
export function watchFile() { return callFs('watchFile', arguments); }
export function write() { return callFs('write', arguments); }
export function writeFile() { return callFs('writeFile', arguments); }

export default {
  appendFile: appendFile,
  chmod: chmod,
  chown: chown,
  close: close,
  createReadStream: createReadStream,
  createWriteStream: createWriteStream,
  exists: exists,
  fchmod: fchmod,
  fchown: fchown,
  fstat: fstat,
  fsync: fsync,
  ftruncate: ftruncate,
  futimes: futimes,
  lchmod: lchmod,
  lchown: lchown,
  link: link,
  lstat: lstat,
  mkdir: mkdir,
  notify: notify,
  open: open,
  read: read,
  readFile: readFile,
  readdir: readdir,
  readlink: readlink,
  realpath: realpath,
  rename: rename,
  rmdir: rmdir,
  stat: stat,
  symlink: symlink,
  truncate: truncate,
  unlink: unlink,
  unwatchFile: unwatchFile,
  utimes: utimes,
  watch: watch,
  watchFile: watchFile,
  write: write,
  writeFile: writeFile
};
