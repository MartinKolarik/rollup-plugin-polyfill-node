import randomBytes from '\0polyfill-node.__crypto/randombytes';
import * as randomFillModule from '\0polyfill-node.__crypto/randomfill';
import createHash from '\0polyfill-node.__crypto/create-hash';
import createHmac from '\0polyfill-node.__crypto/create-hmac';
import * as pbkdf2Module from '\0polyfill-node.__crypto/pbkdf2';
import * as cipher from '\0polyfill-node.__crypto/browserify-cipher';
import * as dh from '\0polyfill-node.__crypto/diffie-hellman';
import * as sign from '\0polyfill-node.__crypto/browserify-sign';
import * as signAlgos from '\0polyfill-node.__crypto/browserify-sign-algos';
import createECDH from '\0polyfill-node.__crypto/create-ecdh';
import * as publicEncryptModule from '\0polyfill-node.__crypto/public-encrypt';

var MAX_RANDOM_FILL_BYTES = 65536;
var MAX_UINT32 = 4294967295;
var globalObject = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
var hashes = ['sha1', 'sha224', 'sha256', 'sha384', 'sha512', 'md5', 'rmd160'];

export var rng = randomBytes;
export var pseudoRandomBytes = randomBytes;
export var prng = randomBytes;
export {randomBytes};

export var Hash = createHash;
export {createHash};

export var Hmac = createHmac;
export {createHmac};

export function getHashes() {
  return hashes.concat(Object.keys(signAlgos.default));
}

export var pbkdf2 = pbkdf2Module.pbkdf2;
export var pbkdf2Sync = pbkdf2Module.pbkdf2Sync;

export var Cipher = cipher.Cipher;
export var createCipher = cipher.createCipher;
export var Cipheriv = cipher.Cipheriv;
export var createCipheriv = cipher.createCipheriv;
export var Decipher = cipher.Decipher;
export var createDecipher = cipher.createDecipher;
export var Decipheriv = cipher.Decipheriv;
export var createDecipheriv = cipher.createDecipheriv;
export var getCiphers = cipher.getCiphers;
export var listCiphers = cipher.listCiphers;

export var DiffieHellmanGroup = dh.DiffieHellmanGroup;
export var createDiffieHellmanGroup = dh.createDiffieHellmanGroup;
export var getDiffieHellman = dh.getDiffieHellman;
export var createDiffieHellman = dh.createDiffieHellman;
export var DiffieHellman = dh.DiffieHellman;

export function createSign(algorithm) {
  return sign.default.createSign(algorithm);
}

export function Sign(algorithm) {
  return new sign.default.Sign(algorithm);
}

export function createVerify(algorithm) {
  return sign.default.createVerify(algorithm);
}

export function Verify(algorithm) {
  return new sign.default.Verify(algorithm);
}

export {createECDH};

export function publicEncrypt(publicKey, msg, reverse) {
  return publicEncryptModule.default.publicEncrypt(publicKey, msg, reverse);
}

export function privateEncrypt(privateKey, msg) {
  return publicEncryptModule.default.privateEncrypt(privateKey, msg);
}

export function publicDecrypt(publicKey, msg) {
  return publicEncryptModule.default.publicDecrypt(publicKey, msg);
}

export function privateDecrypt(privateKey, msg) {
  return publicEncryptModule.default.privateDecrypt(privateKey, msg);
}

function assertRandomFillBuffer(buf) {
  if (!(buf instanceof globalObject.Uint8Array)) {
    throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
  }
}

function assertRandomFillOffset(offset, length) {
  if (typeof offset !== 'number' || isNaN(offset)) {
    throw new TypeError('offset must be a number');
  }
  if (offset > MAX_UINT32 || offset < 0) {
    throw new TypeError('offset must be a uint32');
  }
  if (offset > length) {
    throw new RangeError('offset out of range');
  }
}

function assertRandomFillSize(size, offset, length) {
  if (typeof size !== 'number' || isNaN(size)) {
    throw new TypeError('size must be a number');
  }
  if (size > MAX_UINT32 || size < 0) {
    throw new TypeError('size must be a uint32');
  }
  if (size + offset > length) {
    throw new RangeError('buffer too small');
  }
}

function chunkedRandomFillSync(buf, offset, size) {
  assertRandomFillBuffer(buf);
  assertRandomFillOffset(offset, buf.length);
  assertRandomFillSize(size, offset, buf.length);

  var crypto = globalObject.crypto || globalObject.msCrypto;
  if (!crypto || !crypto.getRandomValues) {
    return randomFillModule.randomFillSync(buf, offset, size);
  }

  for (var generated = 0; generated < size; generated += MAX_RANDOM_FILL_BYTES) {
    crypto.getRandomValues(buf.subarray(offset + generated, offset + generated + Math.min(size - generated, MAX_RANDOM_FILL_BYTES)));
  }
  return buf;
}

export function randomFill(buf, offset, size, cb) {
  if (typeof offset === 'function') {
    cb = offset;
    offset = 0;
    size = buf.length;
  } else if (typeof size === 'function') {
    cb = size;
    size = buf.length - offset;
  } else if (typeof cb !== 'function') {
    throw new TypeError('"cb" argument must be a function');
  }

  try {
    chunkedRandomFillSync(buf, offset, size);
  } catch (err) {
    cb(err);
    return;
  }

  setTimeout(function() {
    cb(null, buf);
  }, 0);
}

export function randomFillSync(buf, offset, size) {
  if (typeof offset === 'undefined') {
    offset = 0;
  }
  if (typeof size === 'undefined') {
    size = buf.length - offset;
  }
  return chunkedRandomFillSync(buf, offset, size);
}

export function createCredentials() {
  throw new Error([
    'sorry, createCredentials is not implemented yet',
    'we accept pull requests',
    'https://github.com/crypto-browserify/crypto-browserify'
  ].join('\n'));
}

export var constants = {
  'DH_CHECK_P_NOT_SAFE_PRIME': 2,
  'DH_CHECK_P_NOT_PRIME': 1,
  'DH_UNABLE_TO_CHECK_GENERATOR': 4,
  'DH_NOT_SUITABLE_GENERATOR': 8,
  'NPN_ENABLED': 1,
  'ALPN_ENABLED': 1,
  'RSA_PKCS1_PADDING': 1,
  'RSA_SSLV23_PADDING': 2,
  'RSA_NO_PADDING': 3,
  'RSA_PKCS1_OAEP_PADDING': 4,
  'RSA_X931_PADDING': 5,
  'RSA_PKCS1_PSS_PADDING': 6,
  'POINT_CONVERSION_COMPRESSED': 2,
  'POINT_CONVERSION_UNCOMPRESSED': 4,
  'POINT_CONVERSION_HYBRID': 6
};

export default {
  randomBytes: randomBytes,
  rng: rng,
  pseudoRandomBytes: pseudoRandomBytes,
  prng: prng,
  createHash: createHash,
  Hash: Hash,
  createHmac: createHmac,
  Hmac: Hmac,
  getHashes: getHashes,
  pbkdf2: pbkdf2,
  pbkdf2Sync: pbkdf2Sync,
  Cipher: Cipher,
  createCipher: createCipher,
  Cipheriv: Cipheriv,
  createCipheriv: createCipheriv,
  Decipher: Decipher,
  createDecipher: createDecipher,
  Decipheriv: Decipheriv,
  createDecipheriv: createDecipheriv,
  getCiphers: getCiphers,
  listCiphers: listCiphers,
  DiffieHellmanGroup: DiffieHellmanGroup,
  createDiffieHellmanGroup: createDiffieHellmanGroup,
  getDiffieHellman: getDiffieHellman,
  createDiffieHellman: createDiffieHellman,
  DiffieHellman: DiffieHellman,
  createSign: createSign,
  Sign: Sign,
  createVerify: createVerify,
  Verify: Verify,
  createECDH: createECDH,
  publicEncrypt: publicEncrypt,
  privateEncrypt: privateEncrypt,
  publicDecrypt: publicDecrypt,
  privateDecrypt: privateDecrypt,
  randomFill: randomFill,
  randomFillSync: randomFillSync,
  createCredentials: createCredentials,
  constants: constants
};
