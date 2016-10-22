const socketio = require('feathers-socketio');
const createApp = require('./fixture');
const app = createApp(function() {
  this.configure(socketio());
});

module.exports = app;
