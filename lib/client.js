var feathers = require('feathers/client');
var hooks = require('feathers-hooks');
var errors = require('feathers-errors');
var authentication = require('feathers-authentication-client');
var rest = require('feathers-rest/client');
var socketio = require('feathers-socketio/client');
var primus = require('feathers-primus/client');

Object.assign(feathers, {
  socketio: socketio,
  primus: primus,
  rest: rest,
  hooks: hooks,
  authentication: authentication,
  errors: errors
});

module.exports = feathers;
