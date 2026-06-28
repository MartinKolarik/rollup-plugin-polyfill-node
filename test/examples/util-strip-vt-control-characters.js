import {stripVTControlCharacters} from 'node:util';

if (stripVTControlCharacters('\u001B[31mred\u001B[0m') !== 'red') {
  throw new Error('Expected VT control characters to be stripped');
}

try {
  stripVTControlCharacters(1);
  throw new Error('Expected non-string input to throw');
} catch (err) {
  if (
    err.code !== 'ERR_INVALID_ARG_TYPE'
    || err.message !== 'The "str" argument must be of type string. Received type number (1)'
  ) {
    throw err;
  }
}

try {
  stripVTControlCharacters(new String('red'));
  throw new Error('Expected String object input to throw');
} catch (err) {
  if (
    err.code !== 'ERR_INVALID_ARG_TYPE'
    || err.message !== 'The "str" argument must be of type string. Received an instance of String'
  ) {
    throw err;
  }
}

done();
