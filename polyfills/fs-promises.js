import { promises } from '\0polyfill-node.fs';

export var access = promises.access;
export var appendFile = promises.appendFile;
export var chmod = promises.chmod;
export var chown = promises.chown;
export var constants = promises.constants;
export var lchmod = promises.lchmod;
export var lchown = promises.lchown;
export var link = promises.link;
export var lstat = promises.lstat;
export var mkdir = promises.mkdir;
export var readFile = promises.readFile;
export var readdir = promises.readdir;
export var readlink = promises.readlink;
export var realpath = promises.realpath;
export var rename = promises.rename;
export var rmdir = promises.rmdir;
export var stat = promises.stat;
export var symlink = promises.symlink;
export var truncate = promises.truncate;
export var unlink = promises.unlink;
export var utimes = promises.utimes;
export var writeFile = promises.writeFile;

export var copyFile;
export var cp;
export var glob;
export var lutimes;
export var mkdtemp;
export var open;
export var opendir;
export var rm;
export var statfs;
export var watch;

export default promises;
