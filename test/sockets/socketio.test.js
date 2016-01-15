import socketio from 'feathers-socketio';
import io from 'socket.io-client';

import app from '../fixture';
import baseTests from '../base';
import feathers from '../../src/client';

describe('Socket.io connector', function() {
  const socket = io('http://localhost:9988');
  const client = feathers()
    .configure(feathers.socketio(socket));

  before(function(done) {
    this.server = app(function() {
      this.configure(socketio());
    }).listen(9988, done);
  });

  after(function(done) {
    socket.once('disconnect', () => {
      this.server.close();
      done();
    });
    socket.disconnect();
  });

  baseTests(client);
});
