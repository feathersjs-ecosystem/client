import socketio from 'feathers-socketio';
import assert from 'assert';
import testee from 'testee';
import app from '../fixture';

describe('Universal Feathers client browser test', function() {
  before(function(done) {
    this.server = app(function() {
      this.configure(socketio());
    }).listen(7979, done);
  });

  after(function() {
    this.server.close();
  });

  it('runs the browser tests', done => {
    testee.test(['test/browser/index.html'], ['firefox'], {})
      .then(function(data) {
        assert.ok(data[0].passed > 0);
        done();
      }).catch(done);
  });
});
