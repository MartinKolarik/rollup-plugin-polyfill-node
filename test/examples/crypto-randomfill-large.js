import nodeCrypto, {randomFill, randomFillSync} from 'crypto';

var largeSyncBuffer = Buffer.alloc(70000);
var largeAsyncBuffer = Buffer.alloc(70000);
var syncParent = Buffer.alloc(70010);
var syncSlice = syncParent.subarray(5, 70005);
var asyncParent = Buffer.alloc(70010);
var asyncSlice = asyncParent.subarray(5, 70005);

function hasNonZeroByte(buf) {
  for (var i = 0; i < buf.length; i++) {
    if (buf[i] !== 0) {
      return true;
    }
  }
  return false;
}

if (nodeCrypto.randomFill !== randomFill) {
  done(new Error('default randomFill should match the named randomFill export'));
} else if (nodeCrypto.randomFillSync !== randomFillSync) {
  done(new Error('default randomFillSync should match the named randomFillSync export'));
} else if (randomFillSync(largeSyncBuffer) !== largeSyncBuffer) {
  done(new Error('crypto.randomFillSync should fill buffers larger than the Web Crypto per-call limit'));
} else if (!hasNonZeroByte(largeSyncBuffer)) {
  done(new Error('crypto.randomFillSync should mutate the provided buffer'));
} else if (randomFillSync(syncSlice) !== syncSlice) {
  done(new Error('crypto.randomFillSync should return the provided sliced buffer'));
} else if (!hasNonZeroByte(syncSlice)) {
  done(new Error('crypto.randomFillSync should mutate sliced buffers'));
} else if (hasNonZeroByte(syncParent.subarray(0, 5)) || hasNonZeroByte(syncParent.subarray(70005))) {
  done(new Error('crypto.randomFillSync should not write outside sliced buffers'));
} else {
  randomFill(largeAsyncBuffer, function(err, filledBuffer) {
    if (err) {
      done(err);
    } else if (filledBuffer !== largeAsyncBuffer) {
      done(new Error('crypto.randomFill should fill buffers larger than the Web Crypto per-call limit'));
    } else if (!hasNonZeroByte(largeAsyncBuffer)) {
      done(new Error('crypto.randomFill should mutate the provided buffer'));
    } else {
      randomFill(asyncSlice, function(sliceErr, filledSlice) {
        if (sliceErr) {
          done(sliceErr);
        } else if (filledSlice !== asyncSlice) {
          done(new Error('crypto.randomFill should return the provided sliced buffer'));
        } else if (!hasNonZeroByte(asyncSlice)) {
          done(new Error('crypto.randomFill should mutate sliced buffers'));
        } else if (hasNonZeroByte(asyncParent.subarray(0, 5)) || hasNonZeroByte(asyncParent.subarray(70005))) {
          done(new Error('crypto.randomFill should not write outside sliced buffers'));
        } else {
          done();
        }
      });
    }
  });
}
