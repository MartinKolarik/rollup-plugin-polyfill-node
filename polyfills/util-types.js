function isObject(value) {
  return typeof value === 'object' && value !== null;
}

function isFunction(value) {
  return typeof value === 'function';
}

function objectToString(value) {
  return Object.prototype.toString.call(value);
}

function isObjectWithTag(value, tag) {
  return (isObject(value) || isFunction(value)) && objectToString(value) === '[object ' + tag + ']';
}

function isObjectWithBrand(value, brandCheck) {
  if (!isObject(value)) {
    return false;
  }
  try {
    brandCheck(value);
    return true;
  } catch (e) {
    return false;
  }
}

function hasArrayBufferBrand(value) {
  if (typeof ArrayBuffer === 'undefined') {
    return false;
  }
  var byteLength = Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, 'byteLength').get;
  return isObjectWithBrand(value, function(value) {
    byteLength.call(value);
  });
}

function hasSharedArrayBufferBrand(value) {
  if (typeof SharedArrayBuffer === 'undefined') {
    return false;
  }
  var byteLength = Object.getOwnPropertyDescriptor(SharedArrayBuffer.prototype, 'byteLength').get;
  return isObjectWithBrand(value, function(value) {
    byteLength.call(value);
  });
}

function isTypedArray(value) {
  return typeof ArrayBuffer !== 'undefined' &&
    typeof ArrayBuffer.isView === 'function' &&
    ArrayBuffer.isView(value) &&
    !isObjectWithTag(value, 'DataView');
}

export function isAnyArrayBuffer(value) {
  return isArrayBuffer(value) || isSharedArrayBuffer(value);
}

export function isArgumentsObject(value) {
  return isObjectWithTag(value, 'Arguments');
}

export function isArrayBuffer(value) {
  return hasArrayBufferBrand(value);
}

export function isArrayBufferView(value) {
  return typeof ArrayBuffer !== 'undefined' &&
    typeof ArrayBuffer.isView === 'function' &&
    ArrayBuffer.isView(value);
}

export function isAsyncFunction(value) {
  return isFunction(value) &&
    value.constructor &&
    value.constructor.name === 'AsyncFunction';
}

export function isBigInt64Array(value) {
  return isTypedArray(value) && isObjectWithTag(value, 'BigInt64Array');
}

export function isBigIntObject(value) {
  return typeof BigInt === 'function' && isObjectWithBrand(value, function(value) {
    BigInt.prototype.valueOf.call(value);
  });
}

export function isBigUint64Array(value) {
  return isTypedArray(value) && isObjectWithTag(value, 'BigUint64Array');
}

export function isBooleanObject(value) {
  return isObjectWithBrand(value, function(value) {
    Boolean.prototype.valueOf.call(value);
  });
}

export function isBoxedPrimitive(value) {
  return isBooleanObject(value) ||
    isStringObject(value) ||
    isNumberObject(value) ||
    isBigIntObject(value) ||
    isSymbolObject(value);
}

export function isCryptoKey(value) {
  if (typeof CryptoKey === 'undefined' || !isObject(value)) {
    return false;
  }
  var type = Object.getOwnPropertyDescriptor(CryptoKey.prototype, 'type').get;
  return isObjectWithBrand(value, function(value) {
    type.call(value);
  });
}

export function isDataView(value) {
  return isArrayBufferView(value) && isObjectWithTag(value, 'DataView');
}

export function isDate(value) {
  return isObjectWithBrand(value, function(value) {
    Date.prototype.getTime.call(value);
  });
}

export function isFloat16Array(value) {
  return isTypedArray(value) && isObjectWithTag(value, 'Float16Array');
}

export function isFloat32Array(value) {
  return isTypedArray(value) && isObjectWithTag(value, 'Float32Array');
}

export function isFloat64Array(value) {
  return isTypedArray(value) && isObjectWithTag(value, 'Float64Array');
}

export function isGeneratorFunction(value) {
  return isFunction(value) &&
    value.constructor &&
    value.constructor.name === 'GeneratorFunction';
}

export function isGeneratorObject(value) {
  return isObjectWithTag(value, 'Generator');
}

export function isInt8Array(value) {
  return isTypedArray(value) && isObjectWithTag(value, 'Int8Array');
}

export function isInt16Array(value) {
  return isTypedArray(value) && isObjectWithTag(value, 'Int16Array');
}

export function isInt32Array(value) {
  return isTypedArray(value) && isObjectWithTag(value, 'Int32Array');
}

export function isMap(value) {
  return isObjectWithBrand(value, function(value) {
    Map.prototype.has.call(value, value);
  });
}

export function isMapIterator(value) {
  return isObjectWithTag(value, 'Map Iterator');
}

export function isNativeError(value) {
  return isObject(value) &&
    (objectToString(value) === '[object Error]' || value instanceof Error);
}

export function isNumberObject(value) {
  return isObjectWithBrand(value, function(value) {
    Number.prototype.valueOf.call(value);
  });
}

export function isPromise(value) {
  if (!isObject(value) || typeof Promise === 'undefined') {
    return false;
  }
  try {
    Promise.prototype.then.call(value, function() {}, function() {});
    return true;
  } catch (e) {
    return false;
  }
}

export function isRegExp(value) {
  if (!isObject(value)) {
    return false;
  }
  var source = Object.getOwnPropertyDescriptor(RegExp.prototype, 'source').get;
  return isObjectWithBrand(value, function(value) {
    source.call(value);
  });
}

export function isSet(value) {
  return isObjectWithBrand(value, function(value) {
    Set.prototype.has.call(value, value);
  });
}

export function isSetIterator(value) {
  return isObjectWithTag(value, 'Set Iterator');
}

export function isSharedArrayBuffer(value) {
  return hasSharedArrayBufferBrand(value);
}

export function isStringObject(value) {
  return isObjectWithBrand(value, function(value) {
    String.prototype.valueOf.call(value);
  });
}

export function isSymbolObject(value) {
  return typeof Symbol === 'function' && isObjectWithBrand(value, function(value) {
    Symbol.prototype.valueOf.call(value);
  });
}

export { isTypedArray };

export function isUint8Array(value) {
  return isTypedArray(value) && isObjectWithTag(value, 'Uint8Array');
}

export function isUint8ClampedArray(value) {
  return isTypedArray(value) && isObjectWithTag(value, 'Uint8ClampedArray');
}

export function isUint16Array(value) {
  return isTypedArray(value) && isObjectWithTag(value, 'Uint16Array');
}

export function isUint32Array(value) {
  return isTypedArray(value) && isObjectWithTag(value, 'Uint32Array');
}

export function isWeakMap(value) {
  return isObjectWithBrand(value, function(value) {
    WeakMap.prototype.has.call(value, value);
  });
}

export function isWeakSet(value) {
  return isObjectWithBrand(value, function(value) {
    WeakSet.prototype.has.call(value, value);
  });
}
