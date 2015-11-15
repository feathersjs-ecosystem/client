import assert from 'assert';
import request from 'request';

import feathers from '../src/client';
import app from './fixture';

describe('app functionality tests', function() {
  before(function(done) {
    this.server = app().listen(7575, done);
  });

  after(function(done) {
    this.server.close(done);
  });

  it('initializes and connects to a service', function(done) {
    let app = feathers('http://localhost:7575')
      .configure(feathers.request(request));

    let service = app.service('todos');

    service.get(0, { some: 'test' }).then(todo => {
      assert.deepEqual(todo, {
        query: { some: 'test' },
        text: 'some todo',
        complete: false,
        id: 0
      });
    }).then(done);
  });
});
