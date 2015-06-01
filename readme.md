# feathers-client

[![Build Status](https://travis-ci.org/feathersjs/feathers-client.png?branch=master)](https://travis-ci.org/feathersjs/feathers-client)

> Feathers service clients for SocketIO, Primus, jQuery and node-request with batching support

## Usage


```js
// Load with your dependency loader of choice.
// Will be available as global `feathers` variable otherwise
var feathers = require('feathers-client');
var app = feathers('http://todos.feathersjs.com')
  .configure(feathers.socketio(io));

var todoService = app.service('todos');

todoService.on('created', function(todo) {
  console.log('Todo created', todo);
});

todoService.create({
  text: 'A todo',
  complete: false
}, function(error, todo) {
  console.log('Success');
});

todoService.find(function(error, todos) {
  console.log('Todos on the server', todos);
});
```

## REST

Connecting to a Feathers service via the REST API is possible using jQuery, Request or Superagent.

__Important__: REST client services emit `created`, `updated`, `patched` and `removed` events but only _locally for their own instance_. Real-time events from other clients can only be received by using a websocket service.

### jQuery

### Request

### Superagent

## Websockets

Websocket real-time connections can be established via Socket.io or Primus.

### Socket.io

### Primus

## Authentication

## Changelog

__0.1.0__

- Initial release

## Author

- [David Luecke](https://github.com/daffl)

## License

Copyright (c) 2015 David Luecke

Licensed under the [MIT license](LICENSE).
