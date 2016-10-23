const feathers = require('feathers');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const bodyParser = require('body-parser');
const memory = require('feathers-memory');
const path = require('path');

// eslint-disable-next-line no-extend-native
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

module.exports = function (configurer) {
  // Create an in-memory CRUD service for our Todos
  var todoService = memory().extend({
    get: function (id, params) {
      if (params.query.error) {
        return Promise.reject(new Error('Something went wrong'));
      }

      return this._super(id, params).then(data =>
        Object.assign({ query: params.query }, data)
      );
    }
  });

  var app = feathers()
    .configure(hooks())
    // Set up REST and SocketIO APIs
    .configure(rest());

  if (typeof configurer === 'function') {
    configurer.call(app);
  }

  // Parse HTTP bodies
  app.use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    // Host the current directory (for index.html)
    .use(feathers.static(path.join(__dirname, '..')))
    // Host our Todos service on the /todos path
    .use('/todos', todoService);

  const testTodo = {
    text: 'some todo',
    complete: false
  };
  const service = app.service('todos');

  service.create(testTodo);
  service.after({
    remove (hook) {
      if (hook.id === null) {
        service._uId = 0;
        return service.create(testTodo)
          .then(() => hook);
      }
    }
  });

  return app;
};
