import superagent from 'superagent';

import app from '../fixture';
import baseTests from '../base';
import { Service } from '../../src/rest/superagent';

describe('Superagent REST connector', function() {
  let service = new Service('todos',  {
    base: 'http://localhost:8889',
    connection: superagent
  });

  before(function(done) {
    this.server = app().listen(8889, done);
  });

  after(function(done) {
    this.server.close(done);
  });

  baseTests(service);
});
