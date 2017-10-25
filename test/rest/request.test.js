const request = require('request');
const baseTests = require('feathers-commons/lib/test/client');
const app = require('../fixture');
const feathers = require('../../lib/client');

describe('node-request REST connector', function () {
  const rest = feathers.rest('http://localhost:6777');
  const client = feathers()
    .configure(rest.request(request));

  before(function (done) {
    this.server = app().listen(6777, done);
  });

  after(function (done) {
    this.server.close(done);
  });

  baseTests(client, 'todos');
});
