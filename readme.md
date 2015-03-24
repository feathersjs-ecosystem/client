# Feathers Websocket Client

[![Build Status](https://travis-ci.org/feathersjs/feathers-passport.png?branch=master)](https://travis-ci.org/feathersjs/feathers-websocket-client)

A Feathers service client for NodeJS and the browser that can use SocketIO or Primus sockets.

## Use

### In the browser

Download the distributable or install via Bower

> bower install feathers-websocket-client

You can include it via a script tag like

  <script src="bower_components/feathers-websocket-client/dist/client.js" type="text/javascript"></script>
  
Or a module loader like RequireJS. Also remember to load the SocketIO or Primus client libraries. Then:

```js
var socket = io();

var todos = Feathers.Websocket.client('/todos', socket);

todos.on('created', function(todo) {
 console.log('Someone created a Todo', todo);
});

todos.create({
 text: 'A new Todo'
}, function(error, todo) {
});
```

### With NodeJS

```js
var io = require('socket.io-client');
var socket = io('http://host.com');

var service = require('feathers-websocket-service');
var todos = service('/todos', socket);

todos.on('created', function(todo) {
  console.log('Someone created a Todo', todo);
});

todos.create({
  text: 'A new Todo'
}, function(error, todo) {
});
```
