import leveljs from 'level-js';
import levelup from 'levelup';
import levelFilesystem from 'level-filesystem';

let fs;

export default function getFs() {
  if (!fs) {
    const db = levelup('level-filesystem', { db: leveljs });
    fs = levelFilesystem(db);
  }

  return fs;
}
