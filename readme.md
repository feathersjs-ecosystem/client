# feathers-client

[![Build Status](https://travis-ci.org/feathersjs/feathers-client.png?branch=master)](https://travis-ci.org/feathersjs/feathers-client)

> A client for Feathers services supporting many different transport libraries.

## About

While Feathers and its modules can be used on the client with an NPM compatible module loader like [Browserify](http://browserify.org/), [Webpack](https://webpack.github.io/) or [StealJS](http://stealjs.com), `feathers-client` consolidates a standard set of client plugins into a single distributable that can be used standalone in the browser or with other module loaders (like [RequireJS](http://requirejs.org/)) that don't support NPM. The following modules are included:

- *feathers* as `feathers` (or the default module export)
- *feathers-hooks* as `feathers.hooks`
- *feathers-rest* as `feathers.rest`
- *feathers-socketio* as `feathers.socketio`
- *feathers-primus* as `feathers.primus`

In the browser a client that connects to the local server via websockets can be initialized like this:

```html
<script type="text/javascript" src="socket.io/socket.io.js"></script>
<script type="text/javascript" src="node_modules/feathers-client/dist/feathers.js"></script>
<script type="text/javascript">
  var socket = io();
  var app = feathers()
    .configure(feathers.hooks())
    .configure(feathers.socketio(socket));
  var todoService = app.service('todos');
  
  todoService.on('created', function(todo) {
    console.log('Someone created a todo', todo);
  });
  
  todoService.create({
    description: 'Todo from client'
  });
</script>
```

For the full documentation see [the Feathers documentation](http://docs.feathersjs.com/clients/feathers.html).

## Changelog

__1.0.0__

- Migration to a consolidation module for universal Feathers and its plugins

__0.5.0__

- Adding React Native fetch plugin

__0.4.0__

- updating dependencies

__0.3.0__

- Migrating to ES6 and use with Promises ([#7](https://github.com/feathersjs/feathers-client/issues/7))

__0.2.0__

- Make client use feathers-commons

__0.1.0__

- Initial release

## Author

- [David Luecke](https://github.com/daffl)

## License

Copyright (c) 2015 David Luecke

Licensed under the [MIT license](LICENSE).
