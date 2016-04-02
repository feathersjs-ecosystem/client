import feathers from 'feathers';
import rest from 'feathers-rest';
import bodyParser from 'body-parser';
import memory from 'feathers-memory';

Object.defineProperty(Error.prototype, 'toJSON', {
  value: function () {
    var alt = {};

    Object.getOwnPropertyNames(this).forEach(function (key) {
      alt[key] = this[key];
    }, this);

    return alt;
  },
  configurable: true
});

module.exports = function(configurer) {
  // Create an in-memory CRUD service for our Todos
  var todoService = memory().extend({
    get: function(id, params) {
      if(params.query.error) {
        return Promise.reject(new Error('Something went wrong'));
      }

      return this._super(id, params).then(data =>
        Object.assign({ query: params.query }, data)
      );
    }
  });

  var app = feathers()
    // Set up REST and SocketIO APIs
    .configure(rest());

  if(typeof configurer === 'function') {
    configurer.call(app);
  }

  // Parse HTTP bodies
  app.use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    // Host the current directory (for index.html)
    .use(feathers.static(__dirname))
    // Host our Todos service on the /todos path
    .use('/todos', todoService);

  app.service('todos').create({ text: 'some todo', complete: false }, {}, function() {});

  return app;
};
