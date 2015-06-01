var assert = require('assert');
var request = require('request');
var feathers = require('../lib/client');
var app = require('./resources/fixture');

describe('app functionality tests', function() {
  before(function(done) {
    this.server = app().listen(7575, done);
  });

  after(function(done) {
    this.server.close(done);
  });

  it('initializes and connects to a service', function(done) {
    var app = feathers('http://localhost:7575')
      .configure(feathers.request(request));

    app.service('todos').get(0, { some: 'test' }, function(error, todo) {
      assert.deepEqual(todo, {
        query: { some: 'test' },
        text: 'some todo',
        complete: false,
        id: 0
      });
      done();
    });
  });
});
