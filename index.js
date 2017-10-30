var feathers = require('@feathersjs/feathers');
var errors = require('@feathersjs/errors');
var authentication = require('@feathersjs/authentication-client');
var rest = require('@feathersjs/rest-client');
var socketio = require('@feathersjs/socketio-client');
var primus = require('@feathersjs/primus-client');

Object.assign(feathers, {
  errors,
  authentication,
  socketio,
  primus,
  rest
});

module.exports = feathers;
