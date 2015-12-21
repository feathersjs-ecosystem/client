import fetch from 'node-fetch';

import app from '../fixture';
import baseTests from '../base';
import { Service } from '../../src/rest/fetch';

describe('fetch REST connector', function() {
  let service = new Service('todos',  {
    base: 'http://localhost:8889',
    connection: fetch
  });

  before(function(done) {
    this.server = app().listen(8889, done);
  });

  after(function(done) {
    this.server.close(done);
  });

  baseTests(service);
});
