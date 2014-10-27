var feathers = require('feathers');
var bodyParser = require('body-parser');
// An in-memory service implementation
var memory = require('feathers-memory');
// Create an in-memory CRUD service for our Todos
var todoService = memory();

var app = feathers()
  // Set up REST and SocketIO APIs
  .configure(feathers.rest())
  .configure(feathers.socketio())
  // Parse HTTP bodies
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  // Host the current directory (for index.html)
  .use(feathers.static(__dirname))
  // Host our Todos service on the /todos path
  .use('/todos', todoService);

module.exports = app;
