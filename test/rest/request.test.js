import request from 'request';

import app from '../fixture';
import baseTests from '../base';
import { Service } from '../../src/rest/request';

describe('node-request REST connector', function() {
  let service = new Service('todos', {
    base: 'http://localhost:6777',
    connection: request
  });

  before(function(done) {
    this.server = app().listen(6777, done);
  });

  after(function(done) {
    this.server.close(done);
  });

  baseTests(service);
});
