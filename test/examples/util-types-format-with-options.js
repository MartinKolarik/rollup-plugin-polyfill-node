import util, {types, formatWithOptions} from 'node:util';

if (!types.isNativeError(new Error('native'))) {
  throw new Error('Expected util.types.isNativeError to detect Error instances');
}

if (types.isNativeError({message: 'plain'})) {
  throw new Error('Expected util.types.isNativeError to reject plain objects');
}

var checks = [
  ['isArgumentsObject', (function() { return arguments; }()), true],
  ['isArgumentsObject', [], false],
  ['isArrayBuffer', new ArrayBuffer(8), true],
  ['isArrayBuffer', tag('ArrayBuffer'), false],
  ['isArrayBuffer', new Uint8Array(8), false],
  ['isAnyArrayBuffer', new ArrayBuffer(8), true],
  ['isArrayBufferView', new Uint8Array(8), true],
  ['isArrayBufferView', new ArrayBuffer(8), false],
  ['isAsyncFunction', async function() {}, true],
  ['isAsyncFunction', function() {}, false],
  ['isBooleanObject', new Boolean(false), true],
  ['isBooleanObject', false, false],
  ['isBoxedPrimitive', new Number(1), true],
  ['isBoxedPrimitive', 1, false],
  ['isCryptoKey', tag('CryptoKey'), false],
  ['isDataView', new DataView(new ArrayBuffer(8)), true],
  ['isDate', new Date(), true],
  ['isDate', tag('Date'), false],
  ['isFloat16Array', new Float32Array(1), false],
  ['isFloat32Array', new Float32Array(1), true],
  ['isFloat32Array', tag('Float32Array'), false],
  ['isFloat64Array', new Float64Array(1), true],
  ['isGeneratorFunction', function* () {}, true],
  ['isGeneratorObject', (function* () {})(), true],
  ['isInt8Array', new Int8Array(1), true],
  ['isInt16Array', new Int16Array(1), true],
  ['isInt32Array', new Int32Array(1), true],
  ['isMap', new Map(), true],
  ['isMap', tag('Map'), false],
  ['isMapIterator', new Map().keys(), true],
  ['isNumberObject', new Number(1), true],
  ['isPromise', Promise.resolve(), true],
  ['isPromise', tag('Promise'), false],
  ['isRegExp', /x/, true],
  ['isRegExp', tag('RegExp'), false],
  ['isSet', new Set(), true],
  ['isSet', tag('Set'), false],
  ['isSetIterator', new Set().keys(), true],
  ['isStringObject', new String('x'), true],
  ['isTypedArray', new Uint8Array(1), true],
  ['isTypedArray', new DataView(new ArrayBuffer(8)), false],
  ['isUint8Array', new Uint8Array(1), true],
  ['isUint8ClampedArray', new Uint8ClampedArray(1), true],
  ['isUint16Array', new Uint16Array(1), true],
  ['isUint32Array', new Uint32Array(1), true],
  ['isWeakMap', new WeakMap(), true],
  ['isWeakSet', new WeakSet(), true]
];

function tag(name) {
  var value = {};
  if (typeof Symbol === 'function' && Symbol.toStringTag) {
    value[Symbol.toStringTag] = name;
  }
  return value;
}

if (typeof BigInt === 'function') {
  checks.push(['isBigIntObject', Object(BigInt(1)), true]);
}

if (typeof BigInt64Array === 'function') {
  checks.push(['isBigInt64Array', new BigInt64Array(1), true]);
}

if (typeof BigUint64Array === 'function') {
  checks.push(['isBigUint64Array', new BigUint64Array(1), true]);
}

if (typeof SharedArrayBuffer === 'function') {
  checks.push(['isSharedArrayBuffer', new SharedArrayBuffer(8), true]);
  checks.push(['isAnyArrayBuffer', new SharedArrayBuffer(8), true]);
}

if (typeof Symbol === 'function') {
  checks.push(['isSymbolObject', Object(Symbol('x')), true]);
}

['isExternal', 'isKeyObject', 'isModuleNamespaceObject', 'isProxy'].forEach(function(method) {
  if (method in types) {
    throw new Error('Expected util.types.' + method + ' to be omitted');
  }
});

for (var i = 0; i < checks.length; i++) {
  var check = checks[i];
  if (types[check[0]](check[1]) !== check[2]) {
    throw new Error('Expected util.types.' + check[0] + ' to return ' + check[2]);
  }
}

if (formatWithOptions({depth: 0}, {nested: {value: true}}) !== '{ nested: [Object] }') {
  throw new Error('Expected formatWithOptions to pass options to inspect');
}

if (util.types !== types) {
  throw new Error('Expected default util export to expose types');
}

if (util.formatWithOptions !== formatWithOptions) {
  throw new Error('Expected default util export to expose formatWithOptions');
}

done();
