import fs, { readFile } from 'fs';

if (typeof fs.readFile !== 'function') {
  throw new Error('Expected fs.readFile to be a function');
}

if (typeof readFile !== 'function') {
  throw new Error('Expected readFile to be a function');
}
