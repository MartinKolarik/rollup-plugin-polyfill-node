import nodeCrypto, {randomFill, randomFillSync} from 'crypto';

var largeSyncBuffer = Buffer.alloc(70000);
var largeAsyncBuffer = Buffer.alloc(70000);

if (nodeCrypto.randomFill !== randomFill) {
  done(new Error('default randomFill should match the named randomFill export'));
} else if (nodeCrypto.randomFillSync !== randomFillSync) {
  done(new Error('default randomFillSync should match the named randomFillSync export'));
} else if (randomFillSync(largeSyncBuffer) !== largeSyncBuffer) {
  done(new Error('crypto.randomFillSync should fill buffers larger than the Web Crypto per-call limit'));
} else {
  randomFill(largeAsyncBuffer, function(err, filledBuffer) {
    if (err) {
      done(err);
    } else if (filledBuffer !== largeAsyncBuffer) {
      done(new Error('crypto.randomFill should fill buffers larger than the Web Crypto per-call limit'));
    } else {
      done();
    }
  });
}
