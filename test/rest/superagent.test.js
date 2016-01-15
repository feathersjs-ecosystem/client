import superagent from 'superagent';

import app from '../fixture';
import baseTests from '../base';
import feathers from '../../src/client';

describe('Superagent REST connector', function() {
  const rest = feathers.rest('http://localhost:8889');
  const client = feathers()
    .configure(rest.superagent(superagent));

  before(function(done) {
    this.server = app().listen(8889, done);
  });

  after(function(done) {
    this.server.close(done);
  });

  baseTests(client);
});
