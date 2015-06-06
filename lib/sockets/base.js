var utils = require('../utils');
var Proto = require('uberproto');
var send = function(method) {
  return function(name, callback) {
    this.connection[method](this.path + ' ' + name, callback);
  };
};
var Service = Proto.extend({
  _create: Proto.create,

  init: function(name, options) {
    this.path = utils.stripSlashes(name);
    this.connection = options.connection;
  }
});

['on', 'once', 'off'].forEach(function(name) {
  Service[name] = send(name);
});

utils.methods.forEach(function(name) {
  Service[name] = function() {
    var args = Array.prototype.slice.call(arguments, 0);
    var method = this.connection.io ? 'emit' : 'send';

    args.unshift(this.path + '::' + name);
    this.connection[method].apply(this.connection, args);
  };
});

module.exports = function(socket) {
  if(!socket) {
    throw new Error('No socket provided');
  }

  return function() {
    this.Service = Service;
    this.connection = socket;
  };
};

module.exports.Service = Service;
