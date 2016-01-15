(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.feathers = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],2:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],3:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],4:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":2,"./encode":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getArguments;

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var noop = exports.noop = function noop() {};
var getCallback = function getCallback(args) {
  var last = args[args.length - 1];
  return typeof last === 'function' ? last : noop;
};
var getParams = function getParams(args, position) {
  return _typeof(args[position]) === 'object' ? args[position] : {};
};

var updateOrPatch = function updateOrPatch(name) {
  return function (args) {
    var id = args[0];
    var data = args[1];
    var callback = getCallback(args);
    var params = getParams(args, 2);

    if (typeof id === 'function') {
      throw new Error('First parameter for \'' + name + '\' can not be a function');
    }

    if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
      throw new Error('No data provided for \'' + name + '\'');
    }

    if (args.length > 4) {
      throw new Error('Too many arguments for \'' + name + '\' service method');
    }

    return [id, data, params, callback];
  };
};

var getOrRemove = function getOrRemove(name) {
  return function (args) {
    var id = args[0];
    var params = getParams(args, 1);
    var callback = getCallback(args);

    if (args.length > 3) {
      throw new Error('Too many arguments for \'' + name + '\' service method');
    }

    if (typeof id === 'function') {
      throw new Error('First parameter for \'' + name + '\' can not be a function');
    }

    return [id, params, callback];
  };
};

var converters = exports.converters = {
  find: function find(args) {
    var callback = getCallback(args);
    var params = getParams(args, 0);

    if (args.length > 2) {
      throw new Error('Too many arguments for \'find\' service method');
    }

    return [params, callback];
  },
  create: function create(args) {
    var data = args[0];
    var params = getParams(args, 1);
    var callback = getCallback(args);

    if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
      throw new Error('First parameter for \'create\' must be an object');
    }

    if (args.length > 3) {
      throw new Error('Too many arguments for \'create\' service method');
    }

    return [data, params, callback];
  },

  update: updateOrPatch('update'),

  patch: updateOrPatch('patch'),

  get: getOrRemove('get'),

  remove: getOrRemove('remove')
};

function getArguments(method, args) {
  return converters[method](args);
}
},{}],6:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Client = undefined;

var _utils = require('./utils');

var _rest = require('./rest');

var _rest2 = _interopRequireDefault(_rest);

var _sockets = require('./sockets');

var _sockets2 = _interopRequireDefault(_sockets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = exports.Client = function () {
  function Client(base) {
    _classCallCheck(this, Client);

    this.base = base;
    this.services = {};
  }

  _createClass(Client, [{
    key: 'configure',
    value: function configure(cb) {
      cb.call(this);
      return this;
    }
  }, {
    key: 'service',
    value: function service(name) {
      name = (0, _utils.stripSlashes)(name);
      if (!this.services[name]) {
        this.services[name] = new this.Service(name, this);
      }
      return this.services[name];
    }
  }]);

  return Client;
}();

function client() {
  var base = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];

  return new Client(base);
}

_extends(client, _rest2.default, _sockets2.default);

exports.default = module.exports = client;

},{"./rest":9,"./sockets":14,"./utils":15}],7:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Base = undefined;

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function callbackify(promise, callback) {
  if (typeof callback === 'function') {
    promise.then(function (data) {
      return callback(null, data);
    }, callback);
  }
  return promise;
}

var Base = exports.Base = function () {
  function Base(name, options) {
    _classCallCheck(this, Base);

    this.name = (0, _utils.stripSlashes)(name);
    this.options = _extends({}, options);
    this.connection = options.connection;

    if (options.base) {
      this.base = options.base + '/' + this.name;
      delete this.options.base;
    } else {
      this.base = this.name;
    }

    (0, _utils.normalize)(this);
    (0, _utils.makeEmitting)(this);
  }

  _createClass(Base, [{
    key: 'makeUrl',
    value: function makeUrl(params, id) {
      var url = this.base;

      if (typeof id !== 'undefined') {
        url += '/' + id;
      }

      if (Object.keys(params).length !== 0) {
        var queryString = _querystring2.default.stringify(params);

        url += '?' + queryString;
      }

      return url;
    }
  }, {
    key: 'find',
    value: function find(params, callback) {
      return callbackify(this.request({
        url: this.makeUrl(params),
        method: 'GET'
      }), callback);
    }
  }, {
    key: 'get',
    value: function get(id, params, callback) {
      return callbackify(this.request({
        url: this.makeUrl(params, id),
        method: 'GET'
      }), callback);
    }
  }, {
    key: 'create',
    value: function create(body, params, callback) {
      return callbackify(this.request({
        url: this.makeUrl(params),
        body: body,
        method: 'POST'
      }), callback);
    }
  }, {
    key: 'update',
    value: function update(id, body, params, callback) {
      return callbackify(this.request({
        url: this.makeUrl(params, id),
        body: body,
        method: 'PUT'
      }), callback);
    }
  }, {
    key: 'patch',
    value: function patch(id, body, params, callback) {
      return callbackify(this.request({
        url: this.makeUrl(params, id),
        body: body,
        method: 'PATCH'
      }), callback);
    }
  }, {
    key: 'remove',
    value: function remove(id, params, callback) {
      return callbackify(this.request({
        url: this.makeUrl(params, id),
        method: 'DELETE'
      }), callback);
    }
  }]);

  return Base;
}();

},{"../utils":15,"querystring":4}],8:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Service = undefined;

exports.default = function (fetch) {
  if (!fetch) {
    throw new Error('fetch needs to be provided');
  }

  return function () {
    this.Service = Service;
    this.connection = fetch;
  };
};

var _base = require('./base');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Service = exports.Service = function (_Base) {
  _inherits(Service, _Base);

  function Service() {
    _classCallCheck(this, Service);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Service).apply(this, arguments));
  }

  _createClass(Service, [{
    key: 'request',
    value: function request(options) {
      var _this2 = this;

      var fetchOptions = {
        method: options.method,
        headers: {
          'Accept': 'application/json'
        }
      };

      return new Promise(function (resolve, reject) {
        if (options.body) {
          fetchOptions.body = JSON.stringify(options.body);
          fetchOptions.headers['Content-Type'] = 'application/json';
        }
        _this2.connection(options.url, fetchOptions).then(function (response) {
          return response.json();
        }).then(function (result) {
          resolve(result);
        }).catch(function (e) {
          reject(e);
        });
      });
    }
  }]);

  return Service;
}(_base.Base);

},{"./base":7}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jquery = require('./jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _request = require('./request');

var _request2 = _interopRequireDefault(_request);

var _superagent = require('./superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _fetch = require('./fetch');

var _fetch2 = _interopRequireDefault(_fetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { jquery: _jquery2.default, request: _request2.default, superagent: _superagent2.default, fetch: _fetch2.default };

},{"./fetch":8,"./jquery":10,"./request":11,"./superagent":12}],10:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Service = undefined;

exports.default = function (jQuery) {
  if (!jQuery && typeof window !== 'undefined') {
    jQuery = window.jQuery;
  }

  if (typeof jQuery !== 'function') {
    throw new Error('jQuery instance needs to be provided');
  }

  return function () {
    this.Service = Service;
    this.connection = jQuery;
  };
};

var _base = require('./base');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Service = exports.Service = function (_Base) {
  _inherits(Service, _Base);

  function Service() {
    _classCallCheck(this, Service);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Service).apply(this, arguments));
  }

  _createClass(Service, [{
    key: 'request',
    value: function request(options) {
      var _this2 = this;

      var opts = _extends({
        dataType: options.type || 'json'
      }, options);

      if (options.body) {
        opts.data = JSON.stringify(options.body);
        opts.contentType = 'application/json';
      }

      delete opts.type;
      delete opts.body;

      return new Promise(function (resolve, reject) {
        return _this2.connection.ajax(opts).then(resolve, function (xhr) {
          var error = new Error(xhr.responseText);
          error.xhr = xhr;
          reject(error);
        });
      });
    }
  }]);

  return Service;
}(_base.Base);

},{"./base":7}],11:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Service = undefined;

exports.default = function (request) {
  if (!request) {
    throw new Error('request instance needs to be provided');
  }

  return function () {
    this.Service = Service;
    this.connection = request;
  };
};

var _base = require('./base');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Service = exports.Service = function (_Base) {
  _inherits(Service, _Base);

  function Service() {
    _classCallCheck(this, Service);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Service).apply(this, arguments));
  }

  _createClass(Service, [{
    key: 'request',
    value: function request(options) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.connection(_extends({
          json: true
        }, options), function (error, res, data) {
          if (!error && res.statusCode >= 400) {
            return reject(new Error(data));
          }

          resolve(data);
        });
      });
    }
  }]);

  return Service;
}(_base.Base);

},{"./base":7}],12:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Service = undefined;

exports.default = function (superagent) {
  if (!superagent) {
    throw new Error('Superagent needs to be provided');
  }

  return function () {
    this.Service = Service;
    this.connection = superagent;
  };
};

var _base = require('./base');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Service = exports.Service = function (_Base) {
  _inherits(Service, _Base);

  function Service() {
    _classCallCheck(this, Service);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Service).apply(this, arguments));
  }

  _createClass(Service, [{
    key: 'request',
    value: function request(options) {
      var superagent = this.connection(options.method, options.url).type(options.type || 'json');

      return new Promise(function (resolve, reject) {
        if (options.body) {
          superagent.send(options.body);
        }

        superagent.end(function (error, res) {
          if (error) {
            return reject(error);
          }

          resolve(res && res.body);
        });
      });
    }
  }]);

  return Service;
}(_base.Base);

},{"./base":7}],13:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Service = undefined;

var _utils = require('../utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Service = exports.Service = function () {
  function Service(name, app) {
    _classCallCheck(this, Service);

    this.events = _utils.events;
    this.path = (0, _utils.stripSlashes)(name);
    this.connection = app.connection;
    this.method = this.connection && this.connection.io ? 'emit' : 'send';

    (0, _utils.normalize)(this);
  }

  _createClass(Service, [{
    key: 'emit',
    value: function emit() {
      var _connection;

      (_connection = this.connection)[this.method].apply(_connection, arguments);
    }
  }]);

  return Service;
}();

var emitterMethods = ['on', 'once', 'off'];

emitterMethods.forEach(function (method) {
  Service.prototype[method] = function (name, callback) {
    this.connection[method](this.path + ' ' + name, callback);
  };
});

_utils.methods.forEach(function (method) {
  Service.prototype[method] = function () {
    var _this = this;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var callback = null;
    if (typeof args[args.length - 1] === 'function') {
      callback = args.pop();
    }

    return new Promise(function (resolve, reject) {
      var _connection2;

      args.unshift(_this.path + '::' + method);
      args.push(function (error, data) {
        if (callback) {
          callback(error, data);
        }

        return error ? reject(error) : resolve(data);
      });

      (_connection2 = _this.connection)[_this.method].apply(_connection2, args);
    });
  };
});

},{"../utils":15}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

function base(socket) {
  if (!socket) {
    throw new Error('No socket provided');
  }

  return function () {
    this.Service = _base.Service;
    this.connection = socket;
  };
}

function socketio(socket) {
  if (typeof window !== 'undefined' && window.io && typeof socket === 'string') {
    socket = window.io(socket);
  }

  return base(socket);
}

exports.default = {
  socketio: socketio,
  primus: base
};

},{"./base":13}],15:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.events = exports.eventMappings = exports.methods = undefined;
exports.stripSlashes = stripSlashes;
exports.makeEmitting = makeEmitting;
exports.normalize = normalize;

var _events = require('events');

var _arguments = require('feathers-commons/lib/arguments');

var _arguments2 = _interopRequireDefault(_arguments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stripSlashes(name) {
  return name.replace(/^\/|\/$/g, '');
}

var methods = exports.methods = ['find', 'get', 'create', 'update', 'patch', 'remove'];

var eventMappings = exports.eventMappings = {
  create: 'created',
  update: 'updated',
  patch: 'patched',
  remove: 'removed'
};

var events = exports.events = Object.keys(eventMappings).map(function (method) {
  return eventMappings[method];
});

function makeEmitting(target) {
  _extends(target, _events.EventEmitter.prototype);
  Object.keys(eventMappings).forEach(function (method) {
    var old = target[method];
    var eventName = eventMappings[method];

    if (typeof old === 'function') {
      target[method] = function () {
        var _this = this;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var result = old.apply(this, args);
        return result.then(function (data) {
          _this.emit(eventName, data);
          return data;
        });
      };
    }
  });
}

function normalize(target) {
  methods.forEach(function (method) {
    var old = target[method];
    if (typeof old === 'function') {
      target[method] = function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return old.apply(this, (0, _arguments2.default)(method, args));
      };
    }
  });
}

},{"events":1,"feathers-commons/lib/arguments":5}]},{},[6])(6)
});