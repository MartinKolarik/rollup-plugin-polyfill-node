import nodeCrypto, {
  constants,
  createHash,
  createHmac,
  createSign,
  createVerify,
  getHashes,
  pbkdf2Sync,
  publicEncrypt,
  randomFillSync
} from 'crypto';

var hash = createHash('sha256').update('polyfill').digest('hex');
var hmac = createHmac('sha256', 'secret').update('polyfill').digest('hex');
var buffer = Buffer.alloc(8);

if (hash !== '71aa4a0c9092eddbfdd4dd14c43b385712217648ef45e50881186c419e15c8e3') {
  done(new Error('crypto.createHash should produce the expected digest'));
} else if (nodeCrypto.createHash !== createHash) {
  done(new Error('default createHash should match the named createHash export'));
} else if (hmac !== '78f86cb1744ad907fb5556839b113b6b644f932b31f09121527aaec0951f383c') {
  done(new Error('crypto.createHmac should produce the expected digest'));
} else if (nodeCrypto.createHmac !== createHmac) {
  done(new Error('default createHmac should match the named createHmac export'));
} else if (pbkdf2Sync('secret', 'salt', 1, 16, 'sha256').length !== 16) {
  done(new Error('crypto.pbkdf2Sync should return the requested key length'));
} else if (nodeCrypto.pbkdf2Sync !== pbkdf2Sync) {
  done(new Error('default pbkdf2Sync should match the named pbkdf2Sync export'));
} else if (randomFillSync(buffer) !== buffer) {
  done(new Error('crypto.randomFillSync should return the provided buffer'));
} else if (nodeCrypto.randomFillSync !== randomFillSync) {
  done(new Error('default randomFillSync should match the named randomFillSync export'));
} else if (typeof createSign !== 'function') {
  done(new Error('crypto.createSign should be a function'));
} else if (nodeCrypto.createSign !== createSign) {
  done(new Error('default createSign should match the named createSign export'));
} else if (typeof createVerify !== 'function') {
  done(new Error('crypto.createVerify should be a function'));
} else if (nodeCrypto.createVerify !== createVerify) {
  done(new Error('default createVerify should match the named createVerify export'));
} else if (typeof publicEncrypt !== 'function') {
  done(new Error('crypto.publicEncrypt should be a function'));
} else if (nodeCrypto.publicEncrypt !== publicEncrypt) {
  done(new Error('default publicEncrypt should match the named publicEncrypt export'));
} else if (!getHashes().includes('RSA-SHA256')) {
  done(new Error('crypto.getHashes should include browserify-sign algorithms'));
} else if (nodeCrypto.getHashes !== getHashes) {
  done(new Error('default getHashes should match the named getHashes export'));
} else if (constants.RSA_PKCS1_PADDING !== 1) {
  done(new Error('crypto.constants should include RSA constants'));
} else if (nodeCrypto.constants !== constants) {
  done(new Error('default constants should match the named constants export'));
} else {
  done();
}
