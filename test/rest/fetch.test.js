import fetch from 'node-fetch';
import baseTests from 'feathers-commons/lib/test/client';

import app from '../fixture';
import feathers from '../../src/client';

describe('fetch REST connector', function() {
  const rest = feathers.rest('http://localhost:8889');
  const client = feathers()
    .configure(rest.fetch(fetch));

  before(function(done) {
    this.server = app().listen(8889, done);
  });

  after(function(done) {
    this.server.close(done);
  });

  baseTests(client, 'todos');
});
