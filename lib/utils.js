exports.stripSlashes = function (name) {
  return name.replace(/^\/|\/$/g, '');
};

exports.extend = function() {
  var first = arguments[0];
  var current;

  for(var i = 1; i < arguments.length; i++) {
    current = arguments[i];
    Object.keys(current).forEach(function(key) {
      first[key] = current[key];
    });
  }
  return first;
};

exports.methods = [ 'find', 'get', 'create', 'update', 'patch', 'remove' ];