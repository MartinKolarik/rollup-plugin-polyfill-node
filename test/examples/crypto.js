import nodeCrypto, {prng, pseudoRandomBytes, randomBytes, rng} from 'crypto';

if (typeof nodeCrypto.randomBytes !== 'function') {
  done(new Error('crypto.randomBytes should be a function'));
} else if (nodeCrypto.randomBytes(16).length !== 16) {
  done(new Error('crypto.randomBytes should return the requested number of bytes'));
} else if (nodeCrypto.randomBytes !== randomBytes) {
  done(new Error('default randomBytes should match the named randomBytes export'));
} else if (nodeCrypto.rng !== rng) {
  done(new Error('default rng should match the named rng export'));
} else if (nodeCrypto.pseudoRandomBytes !== pseudoRandomBytes) {
  done(new Error('default pseudoRandomBytes should match the named pseudoRandomBytes export'));
} else if (nodeCrypto.prng !== prng) {
  done(new Error('default prng should match the named prng export'));
} else if (randomBytes(8).length !== 8) {
  done(new Error('named randomBytes should return the requested number of bytes'));
} else if (rng(8).length !== 8) {
  done(new Error('named rng should return the requested number of bytes'));
} else if (pseudoRandomBytes(8).length !== 8) {
  done(new Error('named pseudoRandomBytes should return the requested number of bytes'));
} else if (prng(8).length !== 8) {
  done(new Error('named prng should return the requested number of bytes'));
} else {
  done();
}
