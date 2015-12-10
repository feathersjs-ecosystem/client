import jsdom from 'jsdom';

import app from '../fixture';
import baseTests from '../base';
import { Service } from '../../src/rest/jquery';

describe('jQuery REST connector', function() {
  var service = new Service('todos', {
    base: 'http://localhost:7676'
  });

  before(function(done) {
    this.server = app().listen(7676, function() {
      jsdom.env({
        html: '<html><body></body></html>',
        scripts: [
          'http://code.jquery.com/jquery-2.1.4.js'
        ],
        done: function (err, window) {
          window.jQuery.support.cors = true;
          service.connection = window.jQuery;
          done();
        }
      });
    });
  });

  after(function(done) {
    this.server.close(done);
  });

  baseTests(service);
});
