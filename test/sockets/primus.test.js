import primus from 'feathers-primus';

import baseTests from '../base';
import app from '../fixture';
import feathers from '../../src/client';

describe('Primus connector', function() {
  const client = feathers();

  let socket;

  before(function(done) {
    this.server = app(function() {
      this.configure(primus({
        transformer: 'websockets'
      }, function(primus) {
        socket = new primus.Socket('http://localhost:12012');
        client.configure(feathers.primus(socket));
      }));
    }).listen(12012, done);
  });

  after(function() {
    socket.socket.close();
    this.server.close();
  });

  baseTests(client);
});
