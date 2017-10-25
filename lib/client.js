const feathers = require('feathers/client');
const hooks = require('feathers-hooks');
const errors = require('feathers-errors');
const authentication = require('feathers-authentication-client');
const rest = require('feathers-rest/client');
const socketio = require('feathers-socketio/client');
const primus = require('feathers-primus/client');

Object.assign(feathers, {
  socketio,
  primus,
  rest,
  hooks,
  authentication,
  errors
});

module.exports = feathers;
