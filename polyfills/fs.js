import getFs from '\0polyfill-node.__fs/browserify-fs';

export var F_OK = 0;
export var R_OK = 4;
export var W_OK = 2;
export var X_OK = 1;

export var constants = {
  F_OK: F_OK,
  R_OK: R_OK,
  W_OK: W_OK,
  X_OK: X_OK,
  COPYFILE_EXCL: 1,
  COPYFILE_FICLONE: 2,
  COPYFILE_FICLONE_FORCE: 4,
  O_RDONLY: 0,
  O_WRONLY: 1,
  O_RDWR: 2,
  O_APPEND: 8,
  O_CREAT: 256,
  O_TRUNC: 512,
  O_EXCL: 1024,
  S_IFMT: 61440,
  S_IFREG: 32768,
  S_IFDIR: 16384,
  S_IFCHR: 8192,
  S_IFIFO: 4096,
  S_IFLNK: 40960,
  S_IRUSR: 256,
  S_IWUSR: 128,
  UV_FS_COPYFILE_EXCL: 1,
  UV_FS_COPYFILE_FICLONE: 2,
  UV_FS_COPYFILE_FICLONE_FORCE: 4,
  UV_FS_O_FILEMAP: 536870912,
  UV_FS_SYMLINK_DIR: 1,
  UV_FS_SYMLINK_JUNCTION: 2,
  UV_DIRENT_UNKNOWN: 0,
  UV_DIRENT_FILE: 1,
  UV_DIRENT_DIR: 2,
  UV_DIRENT_LINK: 3,
  UV_DIRENT_FIFO: 4,
  UV_DIRENT_SOCKET: 5,
  UV_DIRENT_CHAR: 6,
  UV_DIRENT_BLOCK: 7
};

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

function promisify(method) {
  return function() {
    var args = Array.prototype.slice.call(arguments);

    return new Promise(function(resolve, reject) {
      args.push(function(err, value) {
        if (err) {
          reject(err);
        } else {
          resolve(value);
        }
      });

      callFs(method, args);
    });
  };
}

export function access(path, mode, cb) {
  if (typeof mode === 'function') {
    cb = mode;
    mode = F_OK;
  } else if (typeof mode === 'undefined') {
    mode = F_OK;
  }

  if (typeof cb !== 'function') {
    throw new TypeError('fs.access callback must be a function');
  }

  if (mode !== F_OK) {
    var err = new Error('fs.access only supports F_OK with the browserify-fs polyfill');
    return cb(err);
  }

  return callFs('stat', [path, function(err) {
    cb(err);
  }]);
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

export var accessSync;
export var appendFileSync;
export var chmodSync;
export var chownSync;
export var closeSync;
export var copyFile;
export var copyFileSync;
export var cp;
export var cpSync;
export var existsSync;
export var fchmodSync;
export var fchownSync;
export var fdatasync;
export var fdatasyncSync;
export var fstatSync;
export var fsyncSync;
export var ftruncateSync;
export var futimesSync;
export var glob;
export var globSync;
export var lchmodSync;
export var lchownSync;
export var linkSync;
export var lstatSync;
export var lutimes;
export var lutimesSync;
export var mkdirSync;
export var mkdtemp;
export var mkdtempSync;
export var openAsBlob;
export var openSync;
export var opendir;
export var opendirSync;
export var readFileSync;
export var readSync;
export var readdirSync;
export var readlinkSync;
export var readv;
export var readvSync;
export var realpathSync;
export var renameSync;
export var rm;
export var rmSync;
export var rmdirSync;
export var statSync;
export var statfs;
export var statfsSync;
export var symlinkSync;
export var truncateSync;
export var unlinkSync;
export var utimesSync;
export var writeFileSync;
export var writeSync;
export var writev;
export var writevSync;

export var Dir;
export var Dirent;
export var FileReadStream;
export var FileWriteStream;
export var ReadStream;
export var Stats;
export var WriteStream;
export var _toUnixTimestamp;

export var promises = {
  access: function(path, mode) {
    return new Promise(function(resolve, reject) {
      access(path, mode, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },
  appendFile: promisify('appendFile'),
  chmod: promisify('chmod'),
  chown: promisify('chown'),
  constants: constants,
  lchmod: promisify('lchmod'),
  lchown: promisify('lchown'),
  link: promisify('link'),
  lstat: promisify('lstat'),
  mkdir: promisify('mkdir'),
  readFile: promisify('readFile'),
  readdir: promisify('readdir'),
  readlink: promisify('readlink'),
  realpath: promisify('realpath'),
  rename: promisify('rename'),
  rmdir: promisify('rmdir'),
  stat: promisify('stat'),
  symlink: promisify('symlink'),
  truncate: promisify('truncate'),
  unlink: promisify('unlink'),
  utimes: promisify('utimes'),
  writeFile: promisify('writeFile'),
  copyFile: copyFile,
  cp: cp,
  glob: glob,
  lutimes: lutimes,
  mkdtemp: mkdtemp,
  open: undefined,
  opendir: opendir,
  rm: rm,
  statfs: statfs,
  watch: undefined
};

export default {
  F_OK: F_OK,
  R_OK: R_OK,
  W_OK: W_OK,
  X_OK: X_OK,
  access: access,
  accessSync: accessSync,
  appendFile: appendFile,
  appendFileSync: appendFileSync,
  chmod: chmod,
  chmodSync: chmodSync,
  chown: chown,
  chownSync: chownSync,
  close: close,
  closeSync: closeSync,
  constants: constants,
  copyFile: copyFile,
  copyFileSync: copyFileSync,
  cp: cp,
  cpSync: cpSync,
  createReadStream: createReadStream,
  createWriteStream: createWriteStream,
  Dir: Dir,
  Dirent: Dirent,
  exists: exists,
  existsSync: existsSync,
  fchmod: fchmod,
  fchmodSync: fchmodSync,
  fchown: fchown,
  fchownSync: fchownSync,
  fdatasync: fdatasync,
  fdatasyncSync: fdatasyncSync,
  FileReadStream: FileReadStream,
  FileWriteStream: FileWriteStream,
  fstat: fstat,
  fstatSync: fstatSync,
  fsync: fsync,
  fsyncSync: fsyncSync,
  ftruncate: ftruncate,
  ftruncateSync: ftruncateSync,
  futimes: futimes,
  futimesSync: futimesSync,
  glob: glob,
  globSync: globSync,
  lchmod: lchmod,
  lchmodSync: lchmodSync,
  lchown: lchown,
  lchownSync: lchownSync,
  link: link,
  linkSync: linkSync,
  lstat: lstat,
  lstatSync: lstatSync,
  lutimes: lutimes,
  lutimesSync: lutimesSync,
  mkdir: mkdir,
  mkdirSync: mkdirSync,
  mkdtemp: mkdtemp,
  mkdtempSync: mkdtempSync,
  notify: notify,
  open: open,
  openAsBlob: openAsBlob,
  openSync: openSync,
  opendir: opendir,
  opendirSync: opendirSync,
  promises: promises,
  read: read,
  ReadStream: ReadStream,
  readFile: readFile,
  readFileSync: readFileSync,
  readdir: readdir,
  readdirSync: readdirSync,
  readlink: readlink,
  readlinkSync: readlinkSync,
  readSync: readSync,
  readv: readv,
  readvSync: readvSync,
  realpath: realpath,
  realpathSync: realpathSync,
  rename: rename,
  renameSync: renameSync,
  rm: rm,
  rmSync: rmSync,
  rmdir: rmdir,
  rmdirSync: rmdirSync,
  stat: stat,
  Stats: Stats,
  statfs: statfs,
  statfsSync: statfsSync,
  statSync: statSync,
  symlink: symlink,
  symlinkSync: symlinkSync,
  truncate: truncate,
  truncateSync: truncateSync,
  unlink: unlink,
  unlinkSync: unlinkSync,
  unwatchFile: unwatchFile,
  utimes: utimes,
  utimesSync: utimesSync,
  watch: watch,
  watchFile: watchFile,
  write: write,
  WriteStream: WriteStream,
  writeFile: writeFile,
  writeFileSync: writeFileSync,
  writeSync: writeSync,
  writev: writev,
  writevSync: writevSync,
  _toUnixTimestamp: _toUnixTimestamp
};
