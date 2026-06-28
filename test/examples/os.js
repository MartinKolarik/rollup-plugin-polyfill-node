import {endianness, homedir} from 'os';
var ourE = endianness();
var homeDir = homedir();
if (endianness() === _osEndianness && typeof homeDir === 'string') {
  done();
} else {
  done(new Error(`wrong os polyfill result, expected endianness ${_osEndianness} and string homedir but got ${ourE} and ${typeof homeDir}`));
}
