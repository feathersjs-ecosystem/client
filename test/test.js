var assert = require('assert');
var io = require('socket.io-client');

var app = require('./server');
var service = require('../lib');

describe('Feathers websocket client', function() {
  var server, socket;

  beforeEach(function(done) {
    server = app.listen(7889);
    server.on('listening', function() {
      socket = io('http://localhost:7889');
      socket.on('connect', function() {
        done();
      });
    });
  });

  afterEach(function(done) {
    socket.disconnect();
    server.close(done);
  });

  it('create, created', function(done) {
    var todos = service('/todos', socket);

    todos.on('created', function(todo) {
      assert.equal(todo.text, 'This is a Todo', 'Got Todo text');
      done();
    });

    todos.create({
      text: 'This is a Todo'
    }, function(error, todo) {
      assert.ok(!error);
      assert.ok(typeof todo.id !== 'undefined', 'Todo got id');
    });
  });
});
