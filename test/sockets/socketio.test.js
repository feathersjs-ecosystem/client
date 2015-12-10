import feathers from 'feathers';
import io from 'socket.io-client';

import app from '../fixture';
import baseTests from '../base';
import { Service } from '../../src/sockets/base';

describe('Socket.io connector', function() {
  let socket = io('http://localhost:9988');
  let service = new Service('todos',  {
    connection: socket
  });

  before(function(done) {
    this.server = app(function() {
      this.configure(feathers.socketio());
    }).listen(9988, done);
  });

  after(function(done) {
    socket.disconnect();
    this.server.close(done);
  });

  baseTests(service);
});
