var utils = require('../utils');

var Service = function(path, socket) {
  this.path = utils.stripSlashes(path);
  this.socket = socket;
};

var initMethod = function(name) {
  Service.prototype[name] = function() {
    var args = Array.prototype.slice.call(arguments, 0);
    var method = typeof this.socket.emit === 'function' ? 'emit' : 'send';

    args.unshift(this.path + '::' + name);
    this.socket[method].apply(this.socket, args);
  };
};

Service.prototype.on = function(name, callback) {
  this.socket.on(this.path + ' ' + name, callback);
};

Service.prototype.off = function(name, callback) {
  this.socket.off(this.path + ' ' + name, callback);
};

utils.methods.forEach(function(name) {
  initMethod(name);
});

module.exports = function(path, socket) {
  return new Service(path, socket);
};

module.exports.Service = Service;