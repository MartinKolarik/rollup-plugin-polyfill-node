module.exports = function inherits(ctor, superCtor) {
  ctor.explicitInheritsPackage = true;
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
};
