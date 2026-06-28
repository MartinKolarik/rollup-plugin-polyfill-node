import {deflateSync, inflateSync, inflateRawSync} from 'zlib';


var input = new Buffer('hello hello hello');

var deflated = deflateSync(input);

var reinflated = inflateSync(deflated);

if (reinflated.toString() !== 'hello hello hello') {
  done(new Error('expected \'hello hello hello\' but got \'' + reinflated.toString() +'\''));
} else {
  next();
}
function next() {
  var expected = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
  var deflated = Buffer.from('eJxLTCQVAADjXBLz', 'base64');
  var reinflated = inflateSync(deflated).toString();
  if (reinflated.toString() !== expected) {
    done(new Error(`expected '${expected}' but got '${reinflated}'`));
  } else {
    checkInflateRawErrorCode();
  }
}
function checkInflateRawErrorCode() {
  try {
    inflateRawSync(Buffer.from(''));
  } catch (err) {
    if (err instanceof TypeError) {
      done(new Error(`expected zlib error but got TypeError: ${err.message}`));
      return;
    }
    if (err.code !== 'Z_BUF_ERROR' || err.errno !== -5) {
      done(new Error(`expected Z_BUF_ERROR (-5) but got ${err.code} (${err.errno})`));
      return;
    }
    done();
    return;
  }
  done(new Error('expected inflateRawSync to throw'));
}
