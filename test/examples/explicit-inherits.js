const inherits = require('inherits');

function Base() {}
function Sub() {
  Base.call(this);
}

inherits(Sub, Base);

if (Sub.explicitInheritsPackage !== true) {
  throw new Error('explicit inherits package was not used');
}
