import promises, {
  copyFile,
  readFile,
  watch,
  writeFile
} from 'fs/promises';
import {
  readFile as nodeReadFile
} from 'node:fs/promises';

if (typeof promises.readFile !== 'function') {
  throw new Error('Expected fs/promises default export to expose readFile');
}

if (typeof readFile !== 'function') {
  throw new Error('Expected fs/promises named readFile to be a function');
}

if (typeof nodeReadFile !== 'function') {
  throw new Error('Expected node:fs/promises readFile to be a function');
}

if (typeof writeFile !== 'function') {
  throw new Error('Expected fs/promises writeFile to be a function');
}

if (typeof copyFile !== 'undefined' || typeof promises.copyFile !== 'undefined') {
  throw new Error('Expected unsupported fs/promises named copyFile to be undefined');
}

if (typeof watch !== 'undefined' || typeof promises.watch !== 'undefined') {
  throw new Error('Expected unsupported fs/promises watch to be undefined');
}
