import util, {TextEncoder} from 'node:util';

const encoder = new TextEncoder();

function expectTypeError(fn, message) {
  try {
    fn();
  } catch (err) {
    if (err instanceof TypeError) {
      return;
    }

    throw new Error(message + ': expected TypeError, got ' + err);
  }

  throw new Error(message + ': expected TypeError');
}

expectTypeError(function () {
  TextEncoder();
}, 'Expected TextEncoder to require new');

if (encoder.encoding !== 'utf-8') {
  throw new Error('Expected TextEncoder encoding to be utf-8');
}

const encodingDescriptor = Object.getOwnPropertyDescriptor(TextEncoder.prototype, 'encoding');

if (!encodingDescriptor.enumerable || !encodingDescriptor.configurable) {
  throw new Error('Expected TextEncoder#encoding descriptor to match Node');
}

expectTypeError(function () {
  encodingDescriptor.get.call({});
}, 'Expected TextEncoder#encoding to validate this');

const encoded = encoder.encode('hello \u2713');
const expected = [104, 101, 108, 108, 111, 32, 226, 156, 147];

if (!(encoded instanceof Uint8Array)) {
  throw new Error('Expected TextEncoder#encode to return a Uint8Array');
}

if (encoded.length !== expected.length || expected.some((value, index) => encoded[index] !== value)) {
  throw new Error('Expected TextEncoder#encode to encode UTF-8 bytes');
}

expectTypeError(function () {
  TextEncoder.prototype.encode.call({});
}, 'Expected TextEncoder#encode to validate this');

expectTypeError(function () {
  encoder.encode(Symbol('value'));
}, 'Expected TextEncoder#encode to reject symbols');

const destination = new Uint8Array(7);
const result = encoder.encodeInto('hello \u2713', destination);

if (result.read !== 6 || result.written !== 6) {
  throw new Error('Expected TextEncoder#encodeInto to report partial UTF-8 progress');
}

if (destination.slice(0, 6).some((value, index) => value !== expected[index])) {
  throw new Error('Expected TextEncoder#encodeInto to write UTF-8 bytes');
}

expectTypeError(function () {
  TextEncoder.prototype.encodeInto.call({}, 'abc', new Uint8Array(3));
}, 'Expected TextEncoder#encodeInto to validate this');

expectTypeError(function () {
  encoder.encodeInto('abc');
}, 'Expected TextEncoder#encodeInto to reject missing destination');

expectTypeError(function () {
  encoder.encodeInto('abc', [0, 0, 0]);
}, 'Expected TextEncoder#encodeInto to reject array destination');

if (util.TextEncoder !== TextEncoder) {
  throw new Error('Expected default util export to expose TextEncoder');
}

done();
