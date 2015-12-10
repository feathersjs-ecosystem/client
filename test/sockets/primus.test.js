import feathers from 'feathers';

import baseTests from '../base';
import app from '../fixture';
import { Service } from '../../src/sockets/base';

describe('Primus connector', function() {
  var service = new Service('todos', {});
  var socket;

  before(function(done) {
    this.server = app(function() {
      this.configure(feathers.primus({
        transformer: 'websockets'
      }, function(primus) {
        service.connection = socket = new primus.Socket('http://localhost:12012');
      }));
    }).listen(12012, done);
  });

  after(function(done) {
    socket.socket.close();
    this.server.close(done);
  });

  baseTests(service);
});
