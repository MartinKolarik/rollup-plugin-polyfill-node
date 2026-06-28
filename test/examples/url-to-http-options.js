import {URL, urlToHttpOptions} from 'url';

const options = urlToHttpOptions(new URL('https://user:pass@[2001:db8::1]:8443/path/name?query=1#hash'));
const extra = Symbol('extra');
const extendedUrl = new URL('https://example.com/path');
extendedUrl.custom = 'value';
extendedUrl[extra] = 'symbol value';
const extendedOptions = urlToHttpOptions(extendedUrl);

let primitiveRejected = false;
try {
  urlToHttpOptions('https://example.com/');
} catch (err) {
  primitiveRejected = err instanceof TypeError;
}

if (
  options.protocol !== 'https:' ||
  options.hostname !== '2001:db8::1' ||
  options.port !== 8443 ||
  options.path !== '/path/name?query=1' ||
  options.auth !== 'user:pass' ||
  options.href !== 'https://user:pass@[2001:db8::1]:8443/path/name?query=1#hash' ||
  Object.getPrototypeOf(options) !== null ||
  extendedOptions.custom !== 'value' ||
  extendedOptions[extra] !== 'symbol value' ||
  !primitiveRejected
) {
  done(new Error('invalid options'));
} else {
  done();
}
