(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["feathers"] = factory();
	else
		root["feathers"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@feathersjs/authentication-client/lib/hooks/index.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@feathersjs/authentication-client/lib/hooks/index.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var populateHeader = __webpack_require__(/*! ./populate-header */ "./node_modules/@feathersjs/authentication-client/lib/hooks/populate-header.js");
var populateAccessToken = __webpack_require__(/*! ./populate-access-token */ "./node_modules/@feathersjs/authentication-client/lib/hooks/populate-access-token.js");
var populateEntity = __webpack_require__(/*! ./populate-entity */ "./node_modules/@feathersjs/authentication-client/lib/hooks/populate-entity.js");

var hooks = {
  populateHeader: populateHeader,
  populateAccessToken: populateAccessToken,
  populateEntity: populateEntity
};

module.exports = hooks;

/***/ }),

/***/ "./node_modules/@feathersjs/authentication-client/lib/hooks/populate-access-token.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@feathersjs/authentication-client/lib/hooks/populate-access-token.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function populateAccessToken() {
  return function (hook) {
    var app = hook.app;

    if (hook.type !== 'before') {
      return Promise.reject(new Error('The \'populateAccessToken\' hook should only be used as a \'before\' hook.'));
    }

    Object.assign(hook.params, { accessToken: app.get('accessToken') });

    return Promise.resolve(hook);
  };
};

/***/ }),

/***/ "./node_modules/@feathersjs/authentication-client/lib/hooks/populate-entity.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@feathersjs/authentication-client/lib/hooks/populate-entity.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function populateEntity() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!options.service) {
    throw new Error('You need to pass \'options.service\' to the populateEntity() hook.');
  }

  if (!options.field) {
    throw new Error('You need to pass \'options.field\' to the populateEntity() hook.');
  }

  if (!options.entity) {
    throw new Error('You need to pass \'options.entity\' to the populateEntity() hook.');
  }

  return function (hook) {
    var app = hook.app;

    if (hook.type !== 'after') {
      return Promise.reject(new Error('The \'populateEntity\' hook should only be used as an \'after\' hook.'));
    }

    return app.passport.verifyJWT(hook.result.accessToken).then(function (payload) {
      var id = payload[options.field];

      if (!id) {
        return Promise.reject(new Error('Access token payload is missing the \'' + options.field + '\' field.'));
      }

      return app.service(options.service).get(id);
    }).then(function (entity) {
      hook.result[options.entity] = entity;
      app.set(options.entity, entity);

      return Promise.resolve(hook);
    });
  };
};

/***/ }),

/***/ "./node_modules/@feathersjs/authentication-client/lib/hooks/populate-header.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@feathersjs/authentication-client/lib/hooks/populate-header.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function populateHeader() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!options.header) {
    throw new Error('You need to pass \'options.header\' to the populateHeader() hook.');
  }

  return function (hook) {
    if (hook.type !== 'before') {
      return Promise.reject(new Error('The \'populateHeader\' hook should only be used as a \'before\' hook.'));
    }

    if (hook.params.accessToken) {
      var _Object$assign;

      hook.params.headers = Object.assign({}, (_Object$assign = {}, _Object$assign[options.header] = options.prefix ? options.prefix + ' ' + hook.params.accessToken : hook.params.accessToken, _Object$assign), hook.params.headers);
    }

    return Promise.resolve(hook);
  };
};

/***/ }),

/***/ "./node_modules/@feathersjs/authentication-client/lib/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@feathersjs/authentication-client/lib/index.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hooks = __webpack_require__(/*! ./hooks/index */ "./node_modules/@feathersjs/authentication-client/lib/hooks/index.js");
var Passport = __webpack_require__(/*! ./passport */ "./node_modules/@feathersjs/authentication-client/lib/passport.js");

var defaults = {
  header: 'Authorization',
  cookie: 'feathers-jwt',
  storageKey: 'feathers-jwt',
  jwtStrategy: 'jwt',
  path: '/authentication',
  entity: 'user',
  service: 'users',
  timeout: 5000
};

function init() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var options = Object.assign({}, defaults, config);

  return function () {
    var app = this;

    app.passport = new Passport(app, options);
    app.authenticate = app.passport.authenticate.bind(app.passport);
    app.logout = app.passport.logout.bind(app.passport);

    // Set up hook that adds token and user to params so that
    // it they can be accessed by client side hooks and services
    app.mixins.push(function (service) {
      // if (typeof service.hooks !== 'function') {
      if (app.version < '3.0.0') {
        throw new Error('This version of @feathersjs/authentication-client only works with @feathersjs/feathers v3.0.0 or later.');
      }

      service.hooks({
        before: hooks.populateAccessToken(options)
      });
    });

    // Set up hook that adds authorization header for REST provider
    if (app.rest) {
      app.mixins.push(function (service) {
        service.hooks({
          before: hooks.populateHeader(options)
        });
      });
    }
  };
}

module.exports = init;

module.exports.default = init;
module.exports.defaults = defaults;

/***/ }),

/***/ "./node_modules/@feathersjs/authentication-client/lib/passport.js":
/*!************************************************************************!*\
  !*** ./node_modules/@feathersjs/authentication-client/lib/passport.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var errors = __webpack_require__(/*! @feathersjs/errors */ "./node_modules/@feathersjs/errors/lib/index.js");
var decode = __webpack_require__(/*! jwt-decode */ "./node_modules/jwt-decode/lib/index.js");
var Debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");

var _require = __webpack_require__(/*! ./utils */ "./node_modules/@feathersjs/authentication-client/lib/utils.js"),
    Storage = _require.Storage,
    payloadIsValid = _require.payloadIsValid,
    getCookie = _require.getCookie,
    clearCookie = _require.clearCookie;

var debug = Debug('@feathersjs/authentication-client');

module.exports = function () {
  function Passport(app, options) {
    _classCallCheck(this, Passport);

    if (app.passport) {
      throw new Error('You have already registered authentication on this client app instance. You only need to do it once.');
    }

    Object.assign(this, {
      options: options,
      app: app,
      payloadIsValid: payloadIsValid,
      getCookie: getCookie,
      clearCookie: clearCookie,
      storage: app.get('storage') || this.getStorage(options.storage)
    });

    this.setJWT = this.setJWT.bind(this);

    app.set('storage', this.storage);
    this.getJWT().then(this.setJWT);

    this.setupSocketListeners();
  }

  Passport.prototype.setupSocketListeners = function setupSocketListeners() {
    var _this = this;

    var app = this.app;
    var socket = app.io || app.primus;
    var emit = app.io ? 'emit' : 'send';
    var reconnected = app.io ? 'reconnect' : 'reconnected';

    if (!socket) {
      return;
    }

    socket.on(reconnected, function () {
      debug('Socket reconnected');

      // If socket was already authenticated then re-authenticate
      // it with the server automatically.
      if (socket.authenticated) {
        var data = {
          strategy: _this.options.jwtStrategy,
          accessToken: app.get('accessToken')
        };
        _this.authenticateSocket(data, socket, emit).then(_this.setJWT).catch(function (error) {
          debug('Error re-authenticating after socket reconnect', error);
          socket.authenticated = false;
          app.emit('reauthentication-error', error);
        });
      }
    });

    var socketUpgradeHandler = function socketUpgradeHandler() {
      socket.io.engine.on('upgrade', function () {
        debug('Socket upgrading');

        // If socket was already authenticated then re-authenticate
        // it with the server automatically.
        if (socket.authenticated) {
          var data = {
            strategy: _this.options.jwtStrategy,
            accessToken: app.get('accessToken')
          };

          _this.authenticateSocket(data, socket, emit).then(_this.setJWT).catch(function (error) {
            debug('Error re-authenticating after socket upgrade', error);
            socket.authenticated = false;
            app.emit('reauthentication-error', error);
          });
        }
      });
    };

    if (socket.io && socket.io.engine) {
      socketUpgradeHandler();
    } else {
      socket.on('connect', socketUpgradeHandler);
    }
  };

  Passport.prototype.connected = function connected() {
    var _this2 = this;

    var app = this.app;

    if (app.rest) {
      return Promise.resolve();
    }

    var socket = app.io || app.primus;

    if (!socket) {
      return Promise.reject(new Error('It looks like your client connection has not been configured.'));
    }

    if (app.io && socket.connected || app.primus && socket.readyState === 3) {
      debug('Socket already connected');
      return Promise.resolve(socket);
    }

    return new Promise(function (resolve, reject) {
      var connected = app.primus ? 'open' : 'connect';
      var disconnect = app.io ? 'disconnect' : 'end';
      var timeout = setTimeout(function () {
        debug('Socket connection timed out');
        reject(new Error('Socket connection timed out'));
      }, _this2.options.timeout);

      debug('Waiting for socket connection');

      var handleDisconnect = function handleDisconnect() {
        debug('Socket disconnected before it could connect');
        socket.authenticated = false;
      };

      // If disconnect happens before `connect` the promise will be rejected.
      socket.once(disconnect, handleDisconnect);
      socket.once(connected, function () {
        debug('Socket connected');
        debug('Removing ' + disconnect + ' listener');
        socket.removeListener(disconnect, handleDisconnect);
        clearTimeout(timeout);
        resolve(socket);
      });
    });
  };

  Passport.prototype.authenticate = function authenticate() {
    var _this3 = this;

    var credentials = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var app = this.app;
    var getCredentials = Promise.resolve(credentials);

    // If no strategy was given let's try to authenticate with a stored JWT
    if (!credentials.strategy) {
      if (credentials.accessToken) {
        credentials.strategy = this.options.jwtStrategy;
      } else {
        getCredentials = this.getJWT().then(function (accessToken) {
          if (!accessToken) {
            return Promise.reject(new errors.NotAuthenticated('Could not find stored JWT and no authentication strategy was given'));
          }
          return { strategy: _this3.options.jwtStrategy, accessToken: accessToken };
        });
      }
    }

    return getCredentials.then(function (credentials) {
      return _this3.connected(app).then(function (socket) {
        if (app.rest) {
          return app.service(_this3.options.path).create(credentials).then(_this3.setJWT);
        }

        var emit = app.io ? 'emit' : 'send';
        return _this3.authenticateSocket(credentials, socket, emit).then(_this3.setJWT);
      });
    }).then(function (payload) {
      app.emit('authenticated', payload);
      return payload;
    });
  };

  // Returns a promise that authenticates a socket


  Passport.prototype.authenticateSocket = function authenticateSocket(credentials, socket, emit) {
    var _this4 = this;

    return new Promise(function (resolve, reject) {
      var timeout = setTimeout(function () {
        debug('authenticateSocket timed out');
        reject(new Error('Authentication timed out'));
      }, _this4.options.timeout);

      debug('Attempting to authenticate socket');
      socket[emit]('authenticate', credentials, function (error, data) {
        if (error) {
          return reject(error);
        }

        clearTimeout(timeout);
        socket.authenticated = true;
        debug('Socket authenticated!');

        resolve(data);
      });
    });
  };

  Passport.prototype.logoutSocket = function logoutSocket(socket, emit) {
    var _this5 = this;

    return new Promise(function (resolve, reject) {
      var timeout = setTimeout(function () {
        debug('logoutSocket timed out');
        reject(new Error('Logout timed out'));
      }, _this5.options.timeout);

      socket[emit]('logout', function (error) {
        clearTimeout(timeout);
        socket.authenticated = false;

        if (error) {
          return reject(error);
        }

        resolve();
      });
    });
  };

  Passport.prototype.logout = function logout() {
    var _this6 = this;

    var app = this.app;

    app.set('accessToken', null);
    this.clearCookie(this.options.cookie);

    // remove the accessToken from localStorage
    return Promise.resolve(app.get('storage').removeItem(this.options.storageKey)).then(function () {
      // If using sockets de-authenticate the socket
      if (app.io || app.primus) {
        var method = app.io ? 'emit' : 'send';
        var socket = app.io ? app.io : app.primus;

        return _this6.logoutSocket(socket, method);
      }
    }).then(function (result) {
      app.emit('logout', result);

      return result;
    });
  };

  Passport.prototype.setJWT = function setJWT(data) {
    var accessToken = data && data.accessToken ? data.accessToken : data;

    if (accessToken) {
      this.app.set('accessToken', accessToken);
      this.app.get('storage').setItem(this.options.storageKey, accessToken);
    }

    return Promise.resolve(data);
  };

  Passport.prototype.getJWT = function getJWT() {
    var _this7 = this;

    var app = this.app;
    return new Promise(function (resolve, reject) {
      var accessToken = app.get('accessToken');

      if (accessToken) {
        return resolve(accessToken);
      }

      return Promise.resolve(_this7.storage.getItem(_this7.options.storageKey)).then(function (jwt) {
        var token = jwt || _this7.getCookie(_this7.options.cookie);

        if (token && token !== 'null' && !_this7.payloadIsValid(decode(token))) {
          token = undefined;
        }

        return resolve(token);
      }).catch(reject);
    });
  };

  // Pass a jwt token, get back a payload if it's valid.


  Passport.prototype.verifyJWT = function verifyJWT(token) {
    if (typeof token !== 'string') {
      return Promise.reject(new Error('Token provided to verifyJWT is missing or not a string'));
    }

    try {
      var payload = decode(token);

      if (this.payloadIsValid(payload)) {
        return Promise.resolve(payload);
      }

      return Promise.reject(new Error('Invalid token: expired'));
    } catch (error) {
      return Promise.reject(new Error('Cannot decode malformed token.'));
    }
  };

  // Returns a storage implementation


  Passport.prototype.getStorage = function getStorage(storage) {
    if (storage) {
      return storage;
    }

    return new Storage();
  };

  return Passport;
}();

/***/ }),

/***/ "./node_modules/@feathersjs/authentication-client/lib/utils.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@feathersjs/authentication-client/lib/utils.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.Storage = function () {
  function Storage() {
    _classCallCheck(this, Storage);

    this.store = {};
  }

  Storage.prototype.getItem = function getItem(key) {
    return this.store[key];
  };

  Storage.prototype.setItem = function setItem(key, value) {
    return this.store[key] = value;
  };

  Storage.prototype.removeItem = function removeItem(key) {
    delete this.store[key];
    return this;
  };

  return Storage;
}();

exports.payloadIsValid = function payloadIsValid(payload) {
  return payload && (!payload.exp || payload.exp * 1000 > new Date().getTime());
};

exports.getCookie = function getCookie(name) {
  if (typeof document !== 'undefined') {
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');

    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  }

  return null;
};

exports.clearCookie = function clearCookie(name) {
  if (typeof document !== 'undefined') {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  return null;
};

/***/ }),

/***/ "./node_modules/@feathersjs/commons/lib/arguments.js":
/*!***********************************************************!*\
  !*** ./node_modules/@feathersjs/commons/lib/arguments.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var paramCounts = {
  find: 1,
  get: 2,
  create: 2,
  update: 3,
  patch: 3,
  remove: 2
};

function isObjectOrArray(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null;
}

exports.validateArguments = function validateArguments(method, args) {
  // Check if the last argument is a callback which are no longer supported
  if (typeof args[args.length - 1] === 'function') {
    throw new Error('Callbacks are no longer supported. Use Promises or async/await instead.');
  }

  var methodParamCount = paramCounts[method];

  // Check the number of arguments and throw an error if too many are provided
  if (methodParamCount && args.length > methodParamCount) {
    throw new Error('Too many arguments for \'' + method + '\' method');
  }

  // `params` is always the last argument
  var params = args[methodParamCount - 1];

  // Check if `params` is an object (can be undefined though)
  if (params !== undefined && !isObjectOrArray(params)) {
    throw new Error('Params for \'' + method + '\' method must be an object');
  }

  // Validate other arguments for each method
  switch (method) {
    case 'create':
      if (!isObjectOrArray(args[0])) {
        throw new Error('A data object must be provided to the \'create\' method');
      }
      break;
    case 'get':
    case 'remove':
    case 'update':
    case 'patch':
      if (args[0] === undefined) {
        throw new Error('An id must be provided to the \'' + method + '\' method');
      }

      if ((method === 'update' || method === 'patch') && !isObjectOrArray(args[1])) {
        throw new Error('A data object must be provided to the \'' + method + '\' method');
      }
  }

  return true;
};

/***/ }),

/***/ "./node_modules/@feathersjs/commons/lib/commons.js":
/*!*********************************************************!*\
  !*** ./node_modules/@feathersjs/commons/lib/commons.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/@feathersjs/commons/lib/utils.js");
var hooks = __webpack_require__(/*! ./hooks */ "./node_modules/@feathersjs/commons/lib/hooks.js");
var args = __webpack_require__(/*! ./arguments */ "./node_modules/@feathersjs/commons/lib/arguments.js");
var filterQuery = __webpack_require__(/*! ./filter-query */ "./node_modules/@feathersjs/commons/lib/filter-query.js");

module.exports = Object.assign({}, utils, args, { hooks: hooks, filterQuery: filterQuery });

/***/ }),

/***/ "./node_modules/@feathersjs/commons/lib/filter-query.js":
/*!**************************************************************!*\
  !*** ./node_modules/@feathersjs/commons/lib/filter-query.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _require = __webpack_require__(/*! ./utils */ "./node_modules/@feathersjs/commons/lib/utils.js"),
    _ = _require._;

// Officially supported query parameters ($populate is kind of special)


var PROPERTIES = ['$sort', '$limit', '$skip', '$select', '$populate'];

function parse(number) {
  if (typeof number !== 'undefined') {
    return Math.abs(parseInt(number, 10));
  }
}

// Returns the pagination limit and will take into account the
// default and max pagination settings
function getLimit(limit, paginate) {
  if (paginate && paginate.default) {
    var lower = typeof limit === 'number' ? limit : paginate.default;
    var upper = typeof paginate.max === 'number' ? paginate.max : Number.MAX_VALUE;

    return Math.min(lower, upper);
  }

  return limit;
}

// Makes sure that $sort order is always converted to an actual number
function convertSort(sort) {
  if ((typeof sort === 'undefined' ? 'undefined' : _typeof(sort)) !== 'object' || Array.isArray(sort)) {
    return sort;
  }

  var result = {};

  Object.keys(sort).forEach(function (key) {
    result[key] = _typeof(sort[key]) === 'object' ? sort[key] : parseInt(sort[key], 10);
  });

  return result;
}

// Converts Feathers special query parameters and pagination settings
// and returns them separately a `filters` and the rest of the query
// as `query`
module.exports = function (query, paginate) {
  var filters = {
    $sort: convertSort(query.$sort),
    $limit: getLimit(parse(query.$limit), paginate),
    $skip: parse(query.$skip),
    $select: query.$select,
    $populate: query.$populate
  };

  return { filters: filters, query: _.omit.apply(_, [query].concat(PROPERTIES)) };
};

/***/ }),

/***/ "./node_modules/@feathersjs/commons/lib/hooks.js":
/*!*******************************************************!*\
  !*** ./node_modules/@feathersjs/commons/lib/hooks.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _require$_ = __webpack_require__(/*! ./utils */ "./node_modules/@feathersjs/commons/lib/utils.js")._,
    each = _require$_.each,
    pick = _require$_.pick;

function convertGetOrRemove(args) {
  var id = args[0],
      _args$ = args[1],
      params = _args$ === undefined ? {} : _args$;


  return { id: id, params: params };
}

function convertUpdateOrPatch(args) {
  var id = args[0],
      data = args[1],
      _args$2 = args[2],
      params = _args$2 === undefined ? {} : _args$2;


  return { id: id, data: data, params: params };
}

// To skip further hooks
var SKIP = exports.SKIP = typeof Symbol !== 'undefined' ? Symbol('__feathersSkipHooks') : '__feathersSkipHooks';

// Converters from service method arguments to hook object properties
exports.converters = {
  find: function find(args) {
    var _args$3 = args[0],
        params = _args$3 === undefined ? {} : _args$3;


    return { params: params };
  },
  create: function create(args) {
    var data = args[0],
        _args$4 = args[1],
        params = _args$4 === undefined ? {} : _args$4;


    return { data: data, params: params };
  },

  get: convertGetOrRemove,
  remove: convertGetOrRemove,
  update: convertUpdateOrPatch,
  patch: convertUpdateOrPatch
};

// Create a hook object for a method with arguments `args`
// `data` is additional data that will be added
exports.createHookObject = function createHookObject(method, args) {
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var hook = exports.converters[method](args);

  Object.defineProperty(hook, 'toJSON', {
    value: function value() {
      return pick(this, 'type', 'method', 'path', 'params', 'id', 'data', 'result', 'error');
    }
  });

  return Object.assign(hook, data, {
    method: method,
    // A dynamic getter that returns the path of the service
    get path() {
      var app = data.app,
          service = data.service;


      if (!service || !app || !app.services) {
        return null;
      }

      return Object.keys(app.services).find(function (path) {
        return app.services[path] === service;
      });
    }
  });
};

// Fallback used by `makeArguments` which usually won't be used
exports.defaultMakeArguments = function defaultMakeArguments(hook) {
  var result = [];

  if (typeof hook.id !== 'undefined') {
    result.push(hook.id);
  }

  if (hook.data) {
    result.push(hook.data);
  }

  result.push(hook.params || {});

  return result;
};

// Turns a hook object back into a list of arguments
// to call a service method with
exports.makeArguments = function makeArguments(hook) {
  switch (hook.method) {
    case 'find':
      return [hook.params];
    case 'get':
    case 'remove':
      return [hook.id, hook.params];
    case 'update':
    case 'patch':
      return [hook.id, hook.data, hook.params];
    case 'create':
      return [hook.data, hook.params];
  }

  return exports.defaultMakeArguments(hook);
};

// Converts different hook registration formats into the
// same internal format
exports.convertHookData = function convertHookData(obj) {
  var hook = {};

  if (Array.isArray(obj)) {
    hook = { all: obj };
  } else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
    hook = { all: [obj] };
  } else {
    each(obj, function (value, key) {
      hook[key] = !Array.isArray(value) ? [value] : value;
    });
  }

  return hook;
};

// Duck-checks a given object to be a hook object
// A valid hook object has `type` and `method`
exports.isHookObject = function isHookObject(hookObject) {
  return (typeof hookObject === 'undefined' ? 'undefined' : _typeof(hookObject)) === 'object' && typeof hookObject.method === 'string' && typeof hookObject.type === 'string';
};

// Returns all service and application hooks combined
// for a given method and type `appLast` sets if the hooks
// from `app` should be added last (or first by default)
exports.getHooks = function getHooks(app, service, type, method) {
  var appLast = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  var appHooks = app.__hooks[type][method] || [];
  var serviceHooks = service.__hooks[type][method] || [];

  if (appLast) {
    // Run hooks in the order of service -> app -> finally
    return serviceHooks.concat(appHooks);
  }

  return appHooks.concat(serviceHooks);
};

exports.processHooks = function processHooks(hooks, initialHookObject) {
  var _this = this;

  var hookObject = initialHookObject;
  var updateCurrentHook = function updateCurrentHook(current) {
    // Either use the returned hook object or the current
    // hook object from the chain if the hook returned undefined
    if (current) {
      if (current === SKIP) {
        return SKIP;
      }

      if (!exports.isHookObject(current)) {
        throw new Error(hookObject.type + ' hook for \'' + hookObject.method + '\' method returned invalid hook object');
      }

      hookObject = current;
    }

    return hookObject;
  };
  // First step of the hook chain with the initial hook object
  var promise = Promise.resolve(hookObject);

  // Go through all hooks and chain them into our promise
  hooks.forEach(function (fn) {
    var hook = fn.bind(_this);

    if (hook.length === 2) {
      // function(hook, next)
      promise = promise.then(function (hookObject) {
        return hookObject === SKIP ? SKIP : new Promise(function (resolve, reject) {
          hook(hookObject, function (error, result) {
            return error ? reject(error) : resolve(result);
          });
        });
      });
    } else {
      // function(hook)
      promise = promise.then(function (hookObject) {
        return hookObject === SKIP ? SKIP : hook(hookObject);
      });
    }

    // Use the returned hook object or the old one
    promise = promise.then(updateCurrentHook);
  });

  return promise.then(function () {
    return hookObject;
  }).catch(function (error) {
    // Add the hook information to any errors
    error.hook = hookObject;
    throw error;
  });
};

// Add `.hooks` functionality to an object
exports.enableHooks = function enableHooks(obj, methods, types) {
  if (typeof obj.hooks === 'function') {
    return obj;
  }

  var __hooks = {};

  types.forEach(function (type) {
    // Initialize properties where hook functions are stored
    __hooks[type] = {};
  });

  // Add non-enumerable `__hooks` property to the object
  Object.defineProperty(obj, '__hooks', {
    value: __hooks
  });

  return Object.assign(obj, {
    hooks: function hooks(allHooks) {
      var _this2 = this;

      each(allHooks, function (obj, type) {
        if (!_this2.__hooks[type]) {
          throw new Error('\'' + type + '\' is not a valid hook type');
        }

        var hooks = exports.convertHookData(obj);

        each(hooks, function (value, method) {
          if (method !== 'all' && methods.indexOf(method) === -1) {
            throw new Error('\'' + method + '\' is not a valid hook method');
          }
        });

        methods.forEach(function (method) {
          var myHooks = _this2.__hooks[type][method] || (_this2.__hooks[type][method] = []);

          if (hooks.all) {
            myHooks.push.apply(myHooks, hooks.all);
          }

          if (hooks[method]) {
            myHooks.push.apply(myHooks, hooks[method]);
          }
        });
      });

      return this;
    }
  });
};

/***/ }),

/***/ "./node_modules/@feathersjs/commons/lib/utils.js":
/*!*******************************************************!*\
  !*** ./node_modules/@feathersjs/commons/lib/utils.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Removes all leading and trailing slashes from a path
exports.stripSlashes = function stripSlashes(name) {
  return name.replace(/^(\/*)|(\/*)$/g, '');
};

// A set of lodash-y utility functions that use ES6
var _ = exports._ = {
  each: function each(obj, callback) {
    if (obj && typeof obj.forEach === 'function') {
      obj.forEach(callback);
    } else if (_.isObject(obj)) {
      Object.keys(obj).forEach(function (key) {
        return callback(obj[key], key);
      });
    }
  },
  some: function some(value, callback) {
    return Object.keys(value).map(function (key) {
      return [value[key], key];
    }).some(function (_ref) {
      var val = _ref[0],
          key = _ref[1];
      return callback(val, key);
    });
  },
  every: function every(value, callback) {
    return Object.keys(value).map(function (key) {
      return [value[key], key];
    }).every(function (_ref2) {
      var val = _ref2[0],
          key = _ref2[1];
      return callback(val, key);
    });
  },
  keys: function keys(obj) {
    return Object.keys(obj);
  },
  values: function values(obj) {
    return _.keys(obj).map(function (key) {
      return obj[key];
    });
  },
  isMatch: function isMatch(obj, item) {
    return _.keys(item).every(function (key) {
      return obj[key] === item[key];
    });
  },
  isEmpty: function isEmpty(obj) {
    return _.keys(obj).length === 0;
  },
  isObject: function isObject(item) {
    return (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && !Array.isArray(item) && item !== null;
  },
  extend: function extend() {
    return Object.assign.apply(Object, arguments);
  },
  omit: function omit(obj) {
    var result = _.extend({}, obj);

    for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      keys[_key - 1] = arguments[_key];
    }

    keys.forEach(function (key) {
      return delete result[key];
    });
    return result;
  },
  pick: function pick(source) {
    var result = {};

    for (var _len2 = arguments.length, keys = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      keys[_key2 - 1] = arguments[_key2];
    }

    keys.forEach(function (key) {
      if (source[key] !== undefined) {
        result[key] = source[key];
      }
    });
    return result;
  },


  // Recursively merge the source object into the target object
  merge: function merge(target, source) {
    if (_.isObject(target) && _.isObject(source)) {
      Object.keys(source).forEach(function (key) {
        if (_.isObject(source[key])) {
          if (!target[key]) {
            var _Object$assign;

            Object.assign(target, (_Object$assign = {}, _Object$assign[key] = {}, _Object$assign));
          }

          _.merge(target[key], source[key]);
        } else {
          var _Object$assign2;

          Object.assign(target, (_Object$assign2 = {}, _Object$assign2[key] = source[key], _Object$assign2));
        }
      });
    }
    return target;
  }
};

// Return a function that filters a result object or array
// and picks only the fields passed as `params.query.$select`
// and additional `otherFields`
exports.select = function select(params) {
  var fields = params && params.query && params.query.$select;

  for (var _len3 = arguments.length, otherFields = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    otherFields[_key3 - 1] = arguments[_key3];
  }

  if (Array.isArray(fields) && otherFields.length) {
    fields.push.apply(fields, otherFields);
  }

  var convert = function convert(result) {
    if (!Array.isArray(fields)) {
      return result;
    }

    return _.pick.apply(_, [result].concat(fields));
  };

  return function (result) {
    if (Array.isArray(result)) {
      return result.map(convert);
    }

    return convert(result);
  };
};

// An in-memory sorting function according to the
// $sort special query parameter
exports.sorter = function sorter($sort) {
  return function (first, second) {
    var comparator = 0;
    _.each($sort, function (modifier, key) {
      modifier = parseInt(modifier, 10);

      if (first[key] < second[key]) {
        comparator -= 1 * modifier;
      }

      if (first[key] > second[key]) {
        comparator += 1 * modifier;
      }
    });
    return comparator;
  };
};

// Duck-checks if an object looks like a promise
exports.isPromise = function isPromise(result) {
  return _.isObject(result) && typeof result.then === 'function';
};

exports.makeUrl = function makeUrl(path) {
  var app = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var get = typeof app.get === 'function' ? app.get.bind(app) : function () {};
  var env = get('env') || "development";
  var host = get('host') || process.env.HOST_NAME || 'localhost';
  var protocol = env === 'development' || env === 'test' || env === undefined ? 'http' : 'https';
  var PORT = get('port') || process.env.PORT || 3030;
  var port = env === 'development' || env === 'test' || env === undefined ? ':' + PORT : '';

  path = path || '';

  return protocol + '://' + host + port + '/' + exports.stripSlashes(path);
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/@feathersjs/errors/lib/index.js":
/*!******************************************************!*\
  !*** ./node_modules/@feathersjs/errors/lib/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")('@feathersjs/errors');

function FeathersError(msg, name, code, className, data) {
  msg = msg || 'Error';

  var errors = void 0;
  var message = void 0;
  var newData = void 0;

  if (msg instanceof Error) {
    message = msg.message || 'Error';

    // NOTE (EK): This is typically to handle validation errors
    if (msg.errors) {
      errors = msg.errors;
    }
  } else if ((typeof msg === 'undefined' ? 'undefined' : _typeof(msg)) === 'object') {
    // Support plain old objects
    message = msg.message || 'Error';
    data = msg;
  } else {
    // message is just a string
    message = msg;
  }

  if (data) {
    // NOTE(EK): To make sure that we are not messing
    // with immutable data, just make a copy.
    // https://github.com/feathersjs/errors/issues/19
    newData = JSON.parse(JSON.stringify(data));

    if (newData.errors) {
      errors = newData.errors;
      delete newData.errors;
    } else if (data.errors) {
      // The errors property from data could be
      // stripped away while cloning resulting newData not to have it
      // For example: when cloning arrays this property
      errors = JSON.parse(JSON.stringify(data.errors));
    }
  }

  // NOTE (EK): Babel doesn't support this so
  // we have to pass in the class name manually.
  // this.name = this.constructor.name;
  this.type = 'FeathersError';
  this.name = name;
  this.message = message;
  this.code = code;
  this.className = className;
  this.data = newData;
  this.errors = errors || {};

  debug(this.name + '(' + this.code + '): ' + this.message);
  debug(this.errors);

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, FeathersError);
  } else {
    this.stack = new Error().stack;
  }
}

function inheritsFrom(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child;
}

inheritsFrom(FeathersError, Error);

// NOTE (EK): A little hack to get around `message` not
// being included in the default toJSON call.
Object.defineProperty(FeathersError.prototype, 'toJSON', {
  value: function value() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      className: this.className,
      data: this.data,
      errors: this.errors
    };
  }
});

// 400 - Bad Request
function BadRequest(message, data) {
  FeathersError.call(this, message, 'BadRequest', 400, 'bad-request', data);
}

inheritsFrom(BadRequest, FeathersError);

// 401 - Not Authenticated
function NotAuthenticated(message, data) {
  FeathersError.call(this, message, 'NotAuthenticated', 401, 'not-authenticated', data);
}

inheritsFrom(NotAuthenticated, FeathersError);

// 402 - Payment Error
function PaymentError(message, data) {
  FeathersError.call(this, message, 'PaymentError', 402, 'payment-error', data);
}

inheritsFrom(PaymentError, FeathersError);

// 403 - Forbidden
function Forbidden(message, data) {
  FeathersError.call(this, message, 'Forbidden', 403, 'forbidden', data);
}

inheritsFrom(Forbidden, FeathersError);

// 404 - Not Found
function NotFound(message, data) {
  FeathersError.call(this, message, 'NotFound', 404, 'not-found', data);
}

inheritsFrom(NotFound, FeathersError);

// 405 - Method Not Allowed
function MethodNotAllowed(message, data) {
  FeathersError.call(this, message, 'MethodNotAllowed', 405, 'method-not-allowed', data);
}

inheritsFrom(MethodNotAllowed, FeathersError);

// 406 - Not Acceptable
function NotAcceptable(message, data) {
  FeathersError.call(this, message, 'NotAcceptable', 406, 'not-acceptable', data);
}

inheritsFrom(NotAcceptable, FeathersError);

// 408 - Timeout
function Timeout(message, data) {
  FeathersError.call(this, message, 'Timeout', 408, 'timeout', data);
}

inheritsFrom(Timeout, FeathersError);

// 409 - Conflict
function Conflict(message, data) {
  FeathersError.call(this, message, 'Conflict', 409, 'conflict', data);
}

inheritsFrom(Conflict, FeathersError);

// 411 - Length Required
function LengthRequired(message, data) {
  FeathersError.call(this, message, 'LengthRequired', 411, 'length-required', data);
}

inheritsFrom(LengthRequired, FeathersError);

// 422 Unprocessable
function Unprocessable(message, data) {
  FeathersError.call(this, message, 'Unprocessable', 422, 'unprocessable', data);
}

inheritsFrom(Unprocessable, FeathersError);

// 429 Too Many Requests
function TooManyRequests(message, data) {
  FeathersError.call(this, message, 'TooManyRequests', 429, 'too-many-requests', data);
}

inheritsFrom(TooManyRequests, FeathersError);

// 500 - General Error
function GeneralError(message, data) {
  FeathersError.call(this, message, 'GeneralError', 500, 'general-error', data);
}

inheritsFrom(GeneralError, FeathersError);

// 501 - Not Implemented
function NotImplemented(message, data) {
  FeathersError.call(this, message, 'NotImplemented', 501, 'not-implemented', data);
}

inheritsFrom(NotImplemented, FeathersError);

// 502 - Bad Gateway
function BadGateway(message, data) {
  FeathersError.call(this, message, 'BadGateway', 502, 'bad-gateway', data);
}

inheritsFrom(BadGateway, FeathersError);

// 503 - Unavailable
function Unavailable(message, data) {
  FeathersError.call(this, message, 'Unavailable', 503, 'unavailable', data);
}

inheritsFrom(Unavailable, FeathersError);

var errors = {
  FeathersError: FeathersError,
  BadRequest: BadRequest,
  NotAuthenticated: NotAuthenticated,
  PaymentError: PaymentError,
  Forbidden: Forbidden,
  NotFound: NotFound,
  MethodNotAllowed: MethodNotAllowed,
  NotAcceptable: NotAcceptable,
  Timeout: Timeout,
  Conflict: Conflict,
  LengthRequired: LengthRequired,
  Unprocessable: Unprocessable,
  TooManyRequests: TooManyRequests,
  GeneralError: GeneralError,
  NotImplemented: NotImplemented,
  BadGateway: BadGateway,
  Unavailable: Unavailable,
  400: BadRequest,
  401: NotAuthenticated,
  402: PaymentError,
  403: Forbidden,
  404: NotFound,
  405: MethodNotAllowed,
  406: NotAcceptable,
  408: Timeout,
  409: Conflict,
  411: LengthRequired,
  422: Unprocessable,
  429: TooManyRequests,
  500: GeneralError,
  501: NotImplemented,
  502: BadGateway,
  503: Unavailable
};

function convert(error) {
  if (!error) {
    return error;
  }

  var FeathersError = errors[error.name];
  var result = FeathersError ? new FeathersError(error.message, error.data) : new Error(error.message || error);

  if ((typeof error === 'undefined' ? 'undefined' : _typeof(error)) === 'object') {
    Object.assign(result, error);
  }

  return result;
}

module.exports = Object.assign({ convert: convert }, errors);

/***/ }),

/***/ "./node_modules/@feathersjs/feathers/lib/application.js":
/*!**************************************************************!*\
  !*** ./node_modules/@feathersjs/feathers/lib/application.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")('feathers:application');

var _require = __webpack_require__(/*! @feathersjs/commons */ "./node_modules/@feathersjs/commons/lib/commons.js"),
    stripSlashes = _require.stripSlashes;

var Uberproto = __webpack_require__(/*! uberproto */ "./node_modules/uberproto/lib/proto.js");
var events = __webpack_require__(/*! ./events */ "./node_modules/@feathersjs/feathers/lib/events.js");
var hooks = __webpack_require__(/*! ./hooks */ "./node_modules/@feathersjs/feathers/lib/hooks.js");
var version = __webpack_require__(/*! ./version */ "./node_modules/@feathersjs/feathers/lib/version.js");

var Proto = Uberproto.extend({
  create: null
});

var application = {
  init: function init() {
    Object.assign(this, {
      version: version,
      methods: ['find', 'get', 'create', 'update', 'patch', 'remove'],
      mixins: [],
      services: {},
      providers: [],
      _setup: false,
      settings: {}
    });

    this.configure(hooks());
    this.configure(events());
  },
  get: function get(name) {
    return this.settings[name];
  },
  set: function set(name, value) {
    this.settings[name] = value;
    return this;
  },
  disable: function disable(name) {
    this.settings[name] = false;
    return this;
  },
  disabled: function disabled(name) {
    return !this.settings[name];
  },
  enable: function enable(name) {
    this.settings[name] = true;
    return this;
  },
  enabled: function enabled(name) {
    return !!this.settings[name];
  },
  configure: function configure(fn) {
    fn.call(this, this);

    return this;
  },
  service: function service(path, _service) {
    if (typeof _service !== 'undefined') {
      throw new Error('Registering a new service with `app.service(path, service)` is no longer supported. Use `app.use(path, service)` instead.');
    }

    var location = stripSlashes(path);
    var current = this.services[location];

    if (typeof current === 'undefined' && typeof this.defaultService === 'function') {
      return this.use('/' + location, this.defaultService(location)).service(location);
    }

    return current;
  },
  use: function use(path, service) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (typeof path !== 'string' || stripSlashes(path) === '') {
      throw new Error('\'' + path + '\' is not a valid service path.');
    }

    var location = stripSlashes(path);
    var isSubApp = typeof service.service === 'function' && service.services;
    var isService = this.methods.concat('setup').some(function (name) {
      return service && typeof service[name] === 'function';
    });

    if (isSubApp) {
      var subApp = service;

      Object.keys(subApp.services).forEach(function (subPath) {
        return _this.use(location + '/' + subPath, subApp.service(subPath));
      });

      return this;
    }

    if (!isService) {
      throw new Error('Invalid service object passed for path `' + location + '`');
    }

    // If the service is already Uberproto'd use it directly
    var protoService = Proto.isPrototypeOf(service) ? service : Proto.extend(service);

    debug('Registering new service at `' + location + '`');

    // Add all the mixins
    this.mixins.forEach(function (fn) {
      return fn.call(_this, protoService, location, options);
    });

    if (typeof protoService._setup === 'function') {
      protoService._setup(this, location);
    }

    // Run the provider functions to register the service
    this.providers.forEach(function (provider) {
      return provider.call(_this, protoService, location, options);
    });

    // If we ran setup already, set this service up explicitly
    if (this._isSetup && typeof protoService.setup === 'function') {
      debug('Setting up service for `' + location + '`');
      protoService.setup(this, location);
    }

    this.services[location] = protoService;

    return this;
  },
  setup: function setup() {
    var _this2 = this;

    // Setup each service (pass the app so that they can look up other services etc.)
    Object.keys(this.services).forEach(function (path) {
      var service = _this2.services[path];

      debug('Setting up service for `' + path + '`');

      if (typeof service.setup === 'function') {
        service.setup(_this2, path);
      }
    });

    this._isSetup = true;

    return this;
  }
};

module.exports = application;

/***/ }),

/***/ "./node_modules/@feathersjs/feathers/lib/events.js":
/*!*********************************************************!*\
  !*** ./node_modules/@feathersjs/feathers/lib/events.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(/*! events */ "./node_modules/node-libs-browser/node_modules/events/events.js"),
    EventEmitter = _require.EventEmitter;

var Proto = __webpack_require__(/*! uberproto */ "./node_modules/uberproto/lib/proto.js");

// Returns a hook that emits service events. Should always be
// used as the very last hook in the chain
var eventHook = exports.eventHook = function eventHook() {
  return function (hook) {
    var app = hook.app,
        service = hook.service;

    var eventName = app.eventMappings[hook.method];
    var isHookEvent = service._hookEvents && service._hookEvents.indexOf(eventName) !== -1;

    // If this event is not being sent yet and we are not in an error hook
    if (eventName && isHookEvent && hook.type !== 'error') {
      var results = Array.isArray(hook.result) ? hook.result : [hook.result];

      results.forEach(function (element) {
        return service.emit(eventName, element, hook);
      });
    }
  };
};

// Mixin that turns a service into a Node event emitter
var eventMixin = exports.eventMixin = function eventMixin(service) {
  if (service._serviceEvents) {
    return;
  }

  var app = this;
  // Indicates if the service is already an event emitter
  var isEmitter = typeof service.on === 'function' && typeof service.emit === 'function';

  // If not, mix it in (the service is always an Uberproto object that has a .mixin)
  if (typeof service.mixin === 'function' && !isEmitter) {
    service.mixin(EventEmitter.prototype);
  }

  // Define non-enumerable properties of
  Object.defineProperties(service, {
    // A list of all events that this service sends
    _serviceEvents: {
      value: Array.isArray(service.events) ? service.events.slice() : []
    },

    // A list of events that should be handled through the event hooks
    _hookEvents: {
      value: []
    }
  });

  // `app.eventMappings` has the mapping from method name to event name
  Object.keys(app.eventMappings).forEach(function (method) {
    var event = app.eventMappings[method];
    var alreadyEmits = service._serviceEvents.indexOf(event) !== -1;

    // Add events for known methods to _serviceEvents and _hookEvents
    // if the service indicated it does not send it itself yet
    if (typeof service[method] === 'function' && !alreadyEmits) {
      service._serviceEvents.push(event);
      service._hookEvents.push(event);
    }
  });
};

module.exports = function () {
  return function (app) {
    // Mappings from service method to event name
    Object.assign(app, {
      eventMappings: {
        create: 'created',
        update: 'updated',
        remove: 'removed',
        patch: 'patched'
      }
    });

    // Register the event hook
    // `finally` hooks always run last after `error` and `after` hooks
    app.hooks({ finally: eventHook() });

    // Make the app an event emitter
    Proto.mixin(EventEmitter.prototype, app);

    app.mixins.push(eventMixin);
  };
};

/***/ }),

/***/ "./node_modules/@feathersjs/feathers/lib/hooks.js":
/*!********************************************************!*\
  !*** ./node_modules/@feathersjs/feathers/lib/hooks.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(/*! @feathersjs/commons */ "./node_modules/@feathersjs/commons/lib/commons.js"),
    hooks = _require.hooks,
    validateArguments = _require.validateArguments,
    isPromise = _require.isPromise,
    _ = _require._;

var createHookObject = hooks.createHookObject,
    getHooks = hooks.getHooks,
    processHooks = hooks.processHooks,
    enableHooks = hooks.enableHooks,
    makeArguments = hooks.makeArguments;

// A service mixin that adds `service.hooks()` method and functionality

var hookMixin = exports.hookMixin = function hookMixin(service) {
  if (typeof service.hooks === 'function') {
    return;
  }

  var app = this;
  var methods = app.methods;
  var mixin = {};

  // Add .hooks method and properties to the service
  enableHooks(service, methods, app.hookTypes);

  // Assemble the mixin object that contains all "hooked" service methods
  methods.forEach(function (method) {
    if (typeof service[method] !== 'function') {
      return;
    }

    mixin[method] = function () {
      var service = this;
      var args = Array.from(arguments);
      // If the last argument is `true` we want to return
      // the actual hook object instead of the result
      var returnHook = args[args.length - 1] === true ? args.pop() : false;

      // A reference to the original method
      var _super = service._super.bind(service);
      // Create the hook object that gets passed through
      var hookObject = createHookObject(method, args, {
        type: 'before', // initial hook object type
        service: service,
        app: app
      });
      // A hook that validates the arguments and will always be the very first
      var validateHook = function validateHook(context) {
        validateArguments(method, args);

        return context;
      };
      // The `before` hook chain (including the validation hook)
      var beforeHooks = [validateHook].concat(getHooks(app, service, 'before', method));

      // Process all before hooks
      return processHooks.call(service, beforeHooks, hookObject)
      // Use the hook object to call the original method
      .then(function (hookObject) {
        // If `hookObject.result` is set, skip the original method
        if (typeof hookObject.result !== 'undefined') {
          return hookObject;
        }

        // Otherwise, call it with arguments created from the hook object
        var promise = _super.apply(undefined, makeArguments(hookObject));

        if (!isPromise(promise)) {
          throw new Error('Service method \'' + hookObject.method + '\' for \'' + hookObject.path + '\' service must return a promise');
        }

        return promise.then(function (result) {
          hookObject.result = result;

          return hookObject;
        });
      })
      // Make a (shallow) copy of hookObject from `before` hooks and update type
      .then(function (hookObject) {
        return Object.assign({}, hookObject, { type: 'after' });
      })
      // Run through all `after` hooks
      .then(function (hookObject) {
        // Combine all app and service `after` and `finally` hooks and process
        var afterHooks = getHooks(app, service, 'after', method, true);
        var finallyHooks = getHooks(app, service, 'finally', method, true);
        var hookChain = afterHooks.concat(finallyHooks);

        return processHooks.call(service, hookChain, hookObject);
      }).then(function (hookObject) {
        return (
          // Finally, return the result
          // Or the hook object if the `returnHook` flag is set
          returnHook ? hookObject : hookObject.result
        );
      })
      // Handle errors
      .catch(function (error) {
        // Combine all app and service `error` and `finally` hooks and process
        var errorHooks = getHooks(app, service, 'error', method, true);
        var finallyHooks = getHooks(app, service, 'finally', method, true);
        var hookChain = errorHooks.concat(finallyHooks);

        // A shallow copy of the hook object
        var errorHookObject = _.omit(Object.assign({}, error.hook, hookObject, {
          type: 'error',
          original: error.hook,
          error: error
        }), 'result');

        return processHooks.call(service, hookChain, errorHookObject).catch(function (error) {
          errorHookObject.error = error;

          return errorHookObject;
        }).then(function (hook) {
          if (returnHook) {
            // Either resolve or reject with the hook object
            return typeof hook.result !== 'undefined' ? hook : Promise.reject(hook);
          }

          // Otherwise return either the result if set (to swallow errors)
          // Or reject with the hook error
          return typeof hook.result !== 'undefined' ? hook.result : Promise.reject(hook.error);
        });
      });
    };
  });

  service.mixin(mixin);
};

module.exports = function () {
  return function (app) {
    // We store a reference of all supported hook types on the app
    // in case someone needs it
    Object.assign(app, {
      hookTypes: ['before', 'after', 'error', 'finally']
    });

    // Add functionality for hooks to be registered as app.hooks
    enableHooks(app, app.methods, app.hookTypes);

    app.mixins.push(hookMixin);
  };
};

/***/ }),

/***/ "./node_modules/@feathersjs/feathers/lib/index.js":
/*!********************************************************!*\
  !*** ./node_modules/@feathersjs/feathers/lib/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(/*! @feathersjs/commons */ "./node_modules/@feathersjs/commons/lib/commons.js"),
    hooks = _require.hooks;

var Proto = __webpack_require__(/*! uberproto */ "./node_modules/uberproto/lib/proto.js");
var Application = __webpack_require__(/*! ./application */ "./node_modules/@feathersjs/feathers/lib/application.js");
var version = __webpack_require__(/*! ./version */ "./node_modules/@feathersjs/feathers/lib/version.js");

function createApplication() {
  var app = {};

  // Mix in the base application
  Proto.mixin(Application, app);

  app.init();

  return app;
}

createApplication.version = version;
createApplication.SKIP = hooks.SKIP;

module.exports = createApplication;

// For better ES module (TypeScript) compatibility
module.exports.default = createApplication;

/***/ }),

/***/ "./node_modules/@feathersjs/feathers/lib/version.js":
/*!**********************************************************!*\
  !*** ./node_modules/@feathersjs/feathers/lib/version.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = '3.1.5';

/***/ }),

/***/ "./node_modules/@feathersjs/primus-client/lib/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/@feathersjs/primus-client/lib/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Service = __webpack_require__(/*! @feathersjs/transport-commons/client */ "./node_modules/@feathersjs/transport-commons/client.js");

function primusClient(connection, options) {
  if (!connection) {
    throw new Error('Primus connection needs to be provided');
  }

  var defaultService = function defaultService(name) {
    return new Service(Object.assign({}, options, {
      name: name,
      connection: connection,
      method: 'send'
    }));
  };

  var initialize = function initialize() {
    if (typeof this.defaultService === 'function') {
      throw new Error('Only one default client provider can be configured');
    }

    this.primus = connection;
    this.defaultService = defaultService;
  };

  initialize.Service = Service;
  initialize.service = defaultService;

  return initialize;
}

module.exports = primusClient;
module.exports.default = primusClient;

/***/ }),

/***/ "./node_modules/@feathersjs/rest-client/lib/angular-http-client.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@feathersjs/rest-client/lib/angular-http-client.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Base = __webpack_require__(/*! ./base */ "./node_modules/@feathersjs/rest-client/lib/base.js");

var AngularHttpService = function (_Base) {
  _inherits(AngularHttpService, _Base);

  function AngularHttpService() {
    _classCallCheck(this, AngularHttpService);

    return _possibleConstructorReturn(this, _Base.apply(this, arguments));
  }

  AngularHttpService.prototype.request = function request(options) {
    var httpClient = this.connection;
    var HttpHeaders = this.options.HttpHeaders;

    if (!httpClient || !HttpHeaders) {
      throw new Error('Please pass angular\'s \'httpClient\' (instance) and and object with \'HttpHeaders\' (class) to feathers-rest');
    }

    var url = options.url;
    var requestOptions = {
      // method: options.method,
      body: options.body,
      headers: new HttpHeaders(Object.assign({ Accept: 'application/json' }, this.options.headers, options.headers))
    };

    return new Promise(function (resolve, reject) {
      httpClient.request(options.method, url, requestOptions).subscribe(resolve, reject);
    }).catch(function (error) {
      var e = error.error;

      if (e) {
        throw typeof e === 'string' ? JSON.parse(e) : e;
      }

      throw error;
    });
  };

  return AngularHttpService;
}(Base);

module.exports = AngularHttpService;

/***/ }),

/***/ "./node_modules/@feathersjs/rest-client/lib/angular.js":
/*!*************************************************************!*\
  !*** ./node_modules/@feathersjs/rest-client/lib/angular.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Base = __webpack_require__(/*! ./base */ "./node_modules/@feathersjs/rest-client/lib/base.js");

var AngularService = function (_Base) {
  _inherits(AngularService, _Base);

  function AngularService() {
    _classCallCheck(this, AngularService);

    return _possibleConstructorReturn(this, _Base.apply(this, arguments));
  }

  AngularService.prototype.request = function request(options) {
    var http = this.connection;
    var Headers = this.options.Headers;

    if (!http || !Headers) {
      throw new Error('Please pass angular\'s \'http\' (instance) and and object with \'Headers\' (class) to feathers-rest');
    }

    var url = options.url;
    var requestOptions = {
      method: options.method,
      body: options.body,
      headers: new Headers(Object.assign({ Accept: 'application/json' }, this.options.headers, options.headers))
    };

    return new Promise(function (resolve, reject) {
      http.request(url, requestOptions).subscribe(resolve, reject);
    }).then(function (res) {
      return res.json();
    }).catch(function (error) {
      var response = error.response || error;

      throw response instanceof Error ? response : response.json() || response;
    });
  };

  return AngularService;
}(Base);

module.exports = AngularService;

/***/ }),

/***/ "./node_modules/@feathersjs/rest-client/lib/axios.js":
/*!***********************************************************!*\
  !*** ./node_modules/@feathersjs/rest-client/lib/axios.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Base = __webpack_require__(/*! ./base */ "./node_modules/@feathersjs/rest-client/lib/base.js");

var AxiosService = function (_Base) {
  _inherits(AxiosService, _Base);

  function AxiosService() {
    _classCallCheck(this, AxiosService);

    return _possibleConstructorReturn(this, _Base.apply(this, arguments));
  }

  AxiosService.prototype.request = function request(options) {
    var config = {
      url: options.url,
      method: options.method,
      data: options.body,
      headers: Object.assign({
        Accept: 'application/json'
      }, this.options.headers, options.headers)
    };

    return this.connection.request(config).then(function (res) {
      return res.data;
    }).catch(function (error) {
      var response = error.response || error;

      throw response instanceof Error ? response : response.data || response;
    });
  };

  return AxiosService;
}(Base);

module.exports = AxiosService;

/***/ }),

/***/ "./node_modules/@feathersjs/rest-client/lib/base.js":
/*!**********************************************************!*\
  !*** ./node_modules/@feathersjs/rest-client/lib/base.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var query = __webpack_require__(/*! qs */ "./node_modules/qs/lib/index.js");

var _require = __webpack_require__(/*! @feathersjs/errors */ "./node_modules/@feathersjs/errors/lib/index.js"),
    Unavailable = _require.Unavailable;

var _require2 = __webpack_require__(/*! @feathersjs/commons */ "./node_modules/@feathersjs/commons/lib/commons.js"),
    _ = _require2._;

var _require3 = __webpack_require__(/*! @feathersjs/commons */ "./node_modules/@feathersjs/commons/lib/commons.js"),
    stripSlashes = _require3.stripSlashes;

var _require4 = __webpack_require__(/*! @feathersjs/errors */ "./node_modules/@feathersjs/errors/lib/index.js"),
    convert = _require4.convert;

function toError(error) {
  if (error.code === 'ECONNREFUSED') {
    throw new Unavailable(error.message, _.pick(error, 'address', 'port', 'config'));
  }

  throw convert(error);
}

var Base = function () {
  function Base(settings) {
    _classCallCheck(this, Base);

    this.name = stripSlashes(settings.name);
    this.options = settings.options;
    this.connection = settings.connection;
    this.base = settings.base + '/' + this.name;
  }

  Base.prototype.makeUrl = function makeUrl(params, id) {
    params = params || {};
    var url = this.base;

    if (typeof id !== 'undefined' && id !== null) {
      url += '/' + id;
    }

    if (Object.keys(params).length !== 0) {
      var queryString = query.stringify(params);

      url += '?' + queryString;
    }

    return url;
  };

  Base.prototype.find = function find() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return this.request({
      url: this.makeUrl(params.query),
      method: 'GET',
      headers: Object.assign({}, params.headers)
    }).catch(toError);
  };

  Base.prototype.get = function get(id) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (typeof id === 'undefined') {
      return Promise.reject(new Error('id for \'get\' can not be undefined'));
    }

    return this.request({
      url: this.makeUrl(params.query, id),
      method: 'GET',
      headers: Object.assign({}, params.headers)
    }).catch(toError);
  };

  Base.prototype.create = function create(body) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return this.request({
      url: this.makeUrl(params.query),
      body: body,
      method: 'POST',
      headers: Object.assign({ 'Content-Type': 'application/json' }, params.headers)
    }).catch(toError);
  };

  Base.prototype.update = function update(id, body) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (typeof id === 'undefined') {
      return Promise.reject(new Error('id for \'update\' can not be undefined, only \'null\' when updating multiple entries'));
    }

    return this.request({
      url: this.makeUrl(params.query, id),
      body: body,
      method: 'PUT',
      headers: Object.assign({ 'Content-Type': 'application/json' }, params.headers)
    }).catch(toError);
  };

  Base.prototype.patch = function patch(id, body) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (typeof id === 'undefined') {
      return Promise.reject(new Error('id for \'patch\' can not be undefined, only \'null\' when updating multiple entries'));
    }

    return this.request({
      url: this.makeUrl(params.query, id),
      body: body,
      method: 'PATCH',
      headers: Object.assign({ 'Content-Type': 'application/json' }, params.headers)
    }).catch(toError);
  };

  Base.prototype.remove = function remove(id) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (typeof id === 'undefined') {
      return Promise.reject(new Error('id for \'remove\' can not be undefined, only \'null\' when removing multiple entries'));
    }

    return this.request({
      url: this.makeUrl(params.query, id),
      method: 'DELETE',
      headers: Object.assign({}, params.headers)
    }).catch(toError);
  };

  return Base;
}();

module.exports = Base;

/***/ }),

/***/ "./node_modules/@feathersjs/rest-client/lib/fetch.js":
/*!***********************************************************!*\
  !*** ./node_modules/@feathersjs/rest-client/lib/fetch.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Base = __webpack_require__(/*! ./base */ "./node_modules/@feathersjs/rest-client/lib/base.js");

var FetchService = function (_Base) {
  _inherits(FetchService, _Base);

  function FetchService() {
    _classCallCheck(this, FetchService);

    return _possibleConstructorReturn(this, _Base.apply(this, arguments));
  }

  FetchService.prototype.request = function request(options) {
    var fetchOptions = Object.assign({}, options);

    fetchOptions.headers = Object.assign({
      Accept: 'application/json'
    }, this.options.headers, fetchOptions.headers);

    if (options.body) {
      fetchOptions.body = JSON.stringify(options.body);
    }

    var fetch = this.connection;

    return fetch(options.url, fetchOptions).then(this.checkStatus).then(function (response) {
      if (response.status === 204) {
        return null;
      }

      return response.json();
    });
  };

  FetchService.prototype.checkStatus = function checkStatus(response) {
    if (response.ok) {
      return response;
    }

    return response.json().then(function (error) {
      error.response = response;
      throw error;
    });
  };

  return FetchService;
}(Base);

module.exports = FetchService;

/***/ }),

/***/ "./node_modules/@feathersjs/rest-client/lib/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/@feathersjs/rest-client/lib/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var jQuery = __webpack_require__(/*! ./jquery */ "./node_modules/@feathersjs/rest-client/lib/jquery.js");
var Superagent = __webpack_require__(/*! ./superagent */ "./node_modules/@feathersjs/rest-client/lib/superagent.js");
var Request = __webpack_require__(/*! ./request */ "./node_modules/@feathersjs/rest-client/lib/request.js");
var Fetch = __webpack_require__(/*! ./fetch */ "./node_modules/@feathersjs/rest-client/lib/fetch.js");
var Axios = __webpack_require__(/*! ./axios */ "./node_modules/@feathersjs/rest-client/lib/axios.js");
var Angular = __webpack_require__(/*! ./angular */ "./node_modules/@feathersjs/rest-client/lib/angular.js");
var Base = __webpack_require__(/*! ./base */ "./node_modules/@feathersjs/rest-client/lib/base.js");
var AngularHttpClient = __webpack_require__(/*! ./angular-http-client */ "./node_modules/@feathersjs/rest-client/lib/angular-http-client.js");

var transports = {
  jquery: jQuery,
  superagent: Superagent,
  request: Request,
  fetch: Fetch,
  axios: Axios,
  angular: Angular,
  angularHttpClient: AngularHttpClient
};

function restClient() {
  var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var result = { Base: Base };

  Object.keys(transports).forEach(function (key) {
    var Service = transports[key];

    result[key] = function (connection) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!connection) {
        throw new Error(key + ' has to be provided to feathers-rest');
      }

      var defaultService = function defaultService(name) {
        return new Service({ base: base, name: name, connection: connection, options: options });
      };

      var initialize = function initialize() {
        if (typeof this.defaultService === 'function') {
          throw new Error('Only one default client provider can be configured');
        }

        this.rest = connection;
        this.defaultService = defaultService;
      };

      initialize.Service = Service;
      initialize.service = defaultService;

      return initialize;
    };
  });

  return result;
}

module.exports = restClient;
module.exports.default = restClient;

/***/ }),

/***/ "./node_modules/@feathersjs/rest-client/lib/jquery.js":
/*!************************************************************!*\
  !*** ./node_modules/@feathersjs/rest-client/lib/jquery.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Base = __webpack_require__(/*! ./base */ "./node_modules/@feathersjs/rest-client/lib/base.js");

var jQueryService = function (_Base) {
  _inherits(jQueryService, _Base);

  function jQueryService() {
    _classCallCheck(this, jQueryService);

    return _possibleConstructorReturn(this, _Base.apply(this, arguments));
  }

  jQueryService.prototype.request = function request(options) {
    var _this2 = this;

    var opts = Object.assign({
      dataType: options.type || 'json'
    }, {
      headers: this.options.headers || {}
    }, options);

    if (options.body) {
      opts.data = JSON.stringify(options.body);
      opts.contentType = 'application/json';
    }

    delete opts.type;
    delete opts.body;

    return new Promise(function (resolve, reject) {
      _this2.connection.ajax(opts).then(resolve, function (xhr) {
        var error = xhr.responseText;

        try {
          error = JSON.parse(error);
        } catch (e) {
          error = new Error(xhr.responseText);
        }

        error.xhr = error.response = xhr;

        reject(error);
      });
    });
  };

  return jQueryService;
}(Base);

module.exports = jQueryService;

/***/ }),

/***/ "./node_modules/@feathersjs/rest-client/lib/request.js":
/*!*************************************************************!*\
  !*** ./node_modules/@feathersjs/rest-client/lib/request.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Base = __webpack_require__(/*! ./base */ "./node_modules/@feathersjs/rest-client/lib/base.js");

var RequestService = function (_Base) {
  _inherits(RequestService, _Base);

  function RequestService() {
    _classCallCheck(this, RequestService);

    return _possibleConstructorReturn(this, _Base.apply(this, arguments));
  }

  RequestService.prototype.request = function request(options) {
    var _this2 = this;

    return new Promise(function (resolve, reject) {
      _this2.connection(Object.assign({
        json: true
      }, options), function (error, res, data) {
        if (error) {
          return reject(error);
        }

        if (!error && res.statusCode >= 400) {
          if (typeof data === 'string') {
            return reject(new Error(data));
          }

          data.response = res;

          return reject(Object.assign(new Error(data.message), data));
        }

        resolve(data);
      });
    });
  };

  return RequestService;
}(Base);

module.exports = RequestService;

/***/ }),

/***/ "./node_modules/@feathersjs/rest-client/lib/superagent.js":
/*!****************************************************************!*\
  !*** ./node_modules/@feathersjs/rest-client/lib/superagent.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Base = __webpack_require__(/*! ./base */ "./node_modules/@feathersjs/rest-client/lib/base.js");

var SuperagentService = function (_Base) {
  _inherits(SuperagentService, _Base);

  function SuperagentService() {
    _classCallCheck(this, SuperagentService);

    return _possibleConstructorReturn(this, _Base.apply(this, arguments));
  }

  SuperagentService.prototype.request = function request(options) {
    var superagent = this.connection(options.method, options.url).set(this.options.headers || {}).set('Accept', 'application/json').set(options.headers || {}).type(options.type || 'json');

    return new Promise(function (resolve, reject) {
      superagent.set(options.headers);

      if (options.body) {
        superagent.send(options.body);
      }

      superagent.end(function (error, res) {
        if (error) {
          try {
            var response = error.response;
            error = JSON.parse(error.response.text);
            error.response = response;
          } catch (e) {}

          return reject(error);
        }

        resolve(res && res.body);
      });
    });
  };

  return SuperagentService;
}(Base);

module.exports = SuperagentService;

/***/ }),

/***/ "./node_modules/@feathersjs/socketio-client/lib/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/@feathersjs/socketio-client/lib/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Service = __webpack_require__(/*! @feathersjs/transport-commons/client */ "./node_modules/@feathersjs/transport-commons/client.js");

function socketioClient(connection, options) {
  if (!connection) {
    throw new Error('Socket.io connection needs to be provided');
  }

  var defaultService = function defaultService(name) {
    var _this = this;

    var events = Object.keys(this.eventMappings || {}).map(function (method) {
      return _this.eventMappings[method];
    });

    var settings = Object.assign({}, options, {
      events: events,
      name: name,
      connection: connection,
      method: 'emit'
    });

    return new Service(settings);
  };

  var initialize = function initialize() {
    if (typeof this.defaultService === 'function') {
      throw new Error('Only one default client provider can be configured');
    }

    this.io = connection;
    this.defaultService = defaultService;
  };

  initialize.Service = Service;
  initialize.service = defaultService;

  return initialize;
}

module.exports = socketioClient;
module.exports.default = socketioClient;

/***/ }),

/***/ "./node_modules/@feathersjs/transport-commons/client.js":
/*!**************************************************************!*\
  !*** ./node_modules/@feathersjs/transport-commons/client.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(/*! ./lib/client */ "./node_modules/@feathersjs/transport-commons/lib/client.js");

/***/ }),

/***/ "./node_modules/@feathersjs/transport-commons/lib/client.js":
/*!******************************************************************!*\
  !*** ./node_modules/@feathersjs/transport-commons/lib/client.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(/*! @feathersjs/errors */ "./node_modules/@feathersjs/errors/lib/index.js"),
    convert = _require.convert,
    Timeout = _require.Timeout;

var debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")('@feathersjs/transport-commons/client');

var namespacedEmitterMethods = ['addListener', 'emit', 'listenerCount', 'listeners', 'on', 'once', 'prependListener', 'prependOnceListener', 'removeAllListeners', 'removeListener'];
var otherEmitterMethods = ['eventNames', 'getMaxListeners', 'setMaxListeners'];

var addEmitterMethods = function addEmitterMethods(service) {
  otherEmitterMethods.forEach(function (method) {
    service[method] = function () {
      var _connection;

      if (typeof this.connection[method] !== 'function') {
        throw new Error('Can not call \'' + method + '\' on the client service connection');
      }

      return (_connection = this.connection)[method].apply(_connection, arguments);
    };
  });

  // Methods that should add the namespace (service path)
  namespacedEmitterMethods.forEach(function (method) {
    service[method] = function (name) {
      var _connection2;

      if (typeof this.connection[method] !== 'function') {
        throw new Error('Can not call \'' + method + '\' on the client service connection');
      }

      var eventName = this.path + ' ' + name;

      debug('Calling emitter method ' + method + ' with ' + ('namespaced event \'' + eventName + '\''));

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var result = (_connection2 = this.connection)[method].apply(_connection2, [eventName].concat(args));

      return result === this.connection ? this : result;
    };
  });
};

module.exports = function () {
  function Service(options) {
    _classCallCheck(this, Service);

    this.events = options.events;
    this.path = options.name;
    this.connection = options.connection;
    this.method = options.method;
    this.timeout = options.timeout || 5000;

    addEmitterMethods(this);
  }

  Service.prototype.send = function send(method) {
    var _this = this;

    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    return new Promise(function (resolve, reject) {
      var _connection3;

      var timeoutId = setTimeout(function () {
        return reject(new Timeout('Timeout of ' + _this.timeout + 'ms exceeded calling ' + method + ' on ' + _this.path, {
          timeout: _this.timeout,
          method: method,
          path: _this.path
        }));
      }, _this.timeout);

      args.unshift(method, _this.path);
      args.push(function (error, data) {
        error = convert(error);
        clearTimeout(timeoutId);

        return error ? reject(error) : resolve(data);
      });

      debug('Sending socket.' + _this.method, args);

      (_connection3 = _this.connection)[_this.method].apply(_connection3, args);
    });
  };

  Service.prototype.find = function find() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return this.send('find', params.query || {});
  };

  Service.prototype.get = function get(id) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return this.send('get', id, params.query || {});
  };

  Service.prototype.create = function create(data) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return this.send('create', data, params.query || {});
  };

  Service.prototype.update = function update(id, data) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return this.send('update', id, data, params.query || {});
  };

  Service.prototype.patch = function patch(id, data) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return this.send('patch', id, data, params.query || {});
  };

  Service.prototype.remove = function remove(id) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return this.send('remove', id, params.query || {});
  };

  // `off` is actually not part of the Node event emitter spec
  // but we are adding it since everybody is expecting it because
  // of the emitter-component Socket.io is using


  Service.prototype.off = function off(name) {
    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }

    if (typeof this.connection.off === 'function') {
      var _connection4;

      return (_connection4 = this.connection).off.apply(_connection4, [this.path + ' ' + name].concat(args));
    } else if (args.length === 0) {
      return this.removeAllListeners(name);
    }

    return this.removeListener.apply(this, [name].concat(args));
  };

  return Service;
}();

/***/ }),

/***/ "./node_modules/debug/src/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/debug/src/browser.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(/*! ./debug */ "./node_modules/debug/src/debug.js");
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
  '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
  '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
  '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
  '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
  '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
  '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
  '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
  '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
  '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
  '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/debug/src/debug.js":
/*!*****************************************!*\
  !*** ./node_modules/debug/src/debug.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(/*! ms */ "./node_modules/ms/index.js");

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy () {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  if (name[name.length - 1] === '*') {
    return true;
  }
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),

/***/ "./node_modules/jwt-decode/lib/atob.js":
/*!*********************************************!*\
  !*** ./node_modules/jwt-decode/lib/atob.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * The code was extracted from:
 * https://github.com/davidchambers/Base64.js
 */

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function InvalidCharacterError(message) {
  this.message = message;
}

InvalidCharacterError.prototype = new Error();
InvalidCharacterError.prototype.name = 'InvalidCharacterError';

function polyfill (input) {
  var str = String(input).replace(/=+$/, '');
  if (str.length % 4 == 1) {
    throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
  }
  for (
    // initialize result and counters
    var bc = 0, bs, buffer, idx = 0, output = '';
    // get next character
    buffer = str.charAt(idx++);
    // character found in table? initialize bit storage and add its ascii value;
    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
      // and if not first of each 4 characters,
      // convert the first 8 bits to one ascii character
      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
  ) {
    // try to find character in table (0-63, not found => -1)
    buffer = chars.indexOf(buffer);
  }
  return output;
}


module.exports = typeof window !== 'undefined' && window.atob && window.atob.bind(window) || polyfill;


/***/ }),

/***/ "./node_modules/jwt-decode/lib/base64_url_decode.js":
/*!**********************************************************!*\
  !*** ./node_modules/jwt-decode/lib/base64_url_decode.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var atob = __webpack_require__(/*! ./atob */ "./node_modules/jwt-decode/lib/atob.js");

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).replace(/(.)/g, function (m, p) {
    var code = p.charCodeAt(0).toString(16).toUpperCase();
    if (code.length < 2) {
      code = '0' + code;
    }
    return '%' + code;
  }));
}

module.exports = function(str) {
  var output = str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw "Illegal base64url string!";
  }

  try{
    return b64DecodeUnicode(output);
  } catch (err) {
    return atob(output);
  }
};


/***/ }),

/***/ "./node_modules/jwt-decode/lib/index.js":
/*!**********************************************!*\
  !*** ./node_modules/jwt-decode/lib/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var base64_url_decode = __webpack_require__(/*! ./base64_url_decode */ "./node_modules/jwt-decode/lib/base64_url_decode.js");

function InvalidTokenError(message) {
  this.message = message;
}

InvalidTokenError.prototype = new Error();
InvalidTokenError.prototype.name = 'InvalidTokenError';

module.exports = function (token,options) {
  if (typeof token !== 'string') {
    throw new InvalidTokenError('Invalid token specified');
  }

  options = options || {};
  var pos = options.header === true ? 0 : 1;
  try {
    return JSON.parse(base64_url_decode(token.split('.')[pos]));
  } catch (e) {
    throw new InvalidTokenError('Invalid token specified: ' + e.message);
  }
};

module.exports.InvalidTokenError = InvalidTokenError;


/***/ }),

/***/ "./node_modules/ms/index.js":
/*!**********************************!*\
  !*** ./node_modules/ms/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),

/***/ "./node_modules/node-libs-browser/node_modules/events/events.js":
/*!**********************************************************************!*\
  !*** ./node_modules/node-libs-browser/node_modules/events/events.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
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
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
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
  } else if (listeners) {
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

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
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


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/qs/lib/formats.js":
/*!****************************************!*\
  !*** ./node_modules/qs/lib/formats.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};


/***/ }),

/***/ "./node_modules/qs/lib/index.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(/*! ./stringify */ "./node_modules/qs/lib/stringify.js");
var parse = __webpack_require__(/*! ./parse */ "./node_modules/qs/lib/parse.js");
var formats = __webpack_require__(/*! ./formats */ "./node_modules/qs/lib/formats.js");

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),

/***/ "./node_modules/qs/lib/parse.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/parse.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/qs/lib/utils.js");

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    parameterLimit: 1000,
    plainObjects: false,
    strictNullHandling: false
};

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);

    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder);
            val = options.decoder(part.slice(pos + 1), defaults.decoder);
        }
        if (has.call(obj, key)) {
            obj[key] = [].concat(obj[key]).concat(val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options) {
    var leaf = val;

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]') {
            obj = [];
            obj = obj.concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys
        // that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

module.exports = function (str, opts) {
    var options = opts ? utils.assign({}, opts) : {};

    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    options.ignoreQueryPrefix = options.ignoreQueryPrefix === true;
    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
    options.parseArrays = options.parseArrays !== false;
    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};


/***/ }),

/***/ "./node_modules/qs/lib/stringify.js":
/*!******************************************!*\
  !*** ./node_modules/qs/lib/stringify.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/qs/lib/utils.js");
var formats = __webpack_require__(/*! ./formats */ "./node_modules/qs/lib/formats.js");

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
        return prefix;
    }
};

var toISO = Date.prototype.toISOString;

var defaults = {
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            values = values.concat(stringify(
                obj[key],
                generateArrayPrefix(prefix, key),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        } else {
            values = values.concat(stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        }
    }

    return values;
};

module.exports = function (object, opts) {
    var obj = object;
    var options = opts ? utils.assign({}, opts) : {};

    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
    var encoder = typeof options.encoder === 'function' ? options.encoder : defaults.encoder;
    var sort = typeof options.sort === 'function' ? options.sort : null;
    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
    var encodeValuesOnly = typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaults.encodeValuesOnly;
    if (typeof options.format === 'undefined') {
        options.format = formats['default'];
    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
        throw new TypeError('Unknown format option provided.');
    }
    var formatter = formats.formatters[options.format];
    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (Array.isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (sort) {
        objKeys.sort(sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        keys = keys.concat(stringify(
            obj[key],
            key,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encode ? encoder : null,
            filter,
            sort,
            allowDots,
            serializeDate,
            formatter,
            encodeValuesOnly
        ));
    }

    var joined = keys.join(delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    return joined.length > 0 ? prefix + joined : '';
};


/***/ }),

/***/ "./node_modules/qs/lib/utils.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/utils.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    var obj;

    while (queue.length) {
        var item = queue.pop();
        obj = item.obj[item.prop];

        if (Array.isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }

    return obj;
};

exports.arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

exports.merge = function merge(target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        } else if (typeof target === 'object') {
            if (options.plainObjects || options.allowPrototypes || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (Array.isArray(target) && !Array.isArray(source)) {
        mergeTarget = exports.arrayToObject(target, options);
    }

    if (Array.isArray(target) && Array.isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                if (target[i] && typeof target[i] === 'object') {
                    target[i] = exports.merge(target[i], item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = exports.merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

exports.assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

exports.decode = function (str) {
    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};

exports.encode = function encode(str) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

exports.compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    return compactQueue(queue);
};

exports.isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

exports.isBuffer = function isBuffer(obj) {
    if (obj === null || typeof obj === 'undefined') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};


/***/ }),

/***/ "./node_modules/uberproto/lib/proto.js":
/*!*********************************************!*\
  !*** ./node_modules/uberproto/lib/proto.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
/**
 * A base object for ECMAScript 5 style prototypal inheritance.
 *
 * @see https://github.com/rauschma/proto-js/
 * @see http://ejohn.org/blog/simple-javascript-inheritance/
 * @see http://uxebu.com/blog/2011/02/23/object-based-inheritance-for-ecmascript-5/
 */
(function (root, factory) {
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}(this, function () {

	function makeSuper(_super, old, name, fn) {
		return function () {
			var tmp = this._super;

			// Add a new ._super() method that is the same method
			// but either pointing to the prototype method
			// or to the overwritten method
			this._super = (typeof old === 'function') ? old : _super[name];

			// The method only need to be bound temporarily, so we
			// remove it when we're done executing
			var ret = fn.apply(this, arguments);
			this._super = tmp;

			return ret;
		};
	}

	function legacyMixin(prop, obj) {
		var self = obj || this;
		var fnTest = /\b_super\b/;
		var _super = Object.getPrototypeOf(self) || self.prototype;
		var _old;

		// Copy the properties over
		for (var name in prop) {
			// store the old function which would be overwritten
			_old = self[name];

			// Check if we're overwriting an existing function
			if(
					((
						typeof prop[name] === 'function' &&
						typeof _super[name] === 'function'
					) || (
						typeof _old === 'function' &&
						typeof prop[name] === 'function'
					)) && fnTest.test(prop[name])
			) {
				self[name] = makeSuper(_super, _old, name, prop[name]);
			} else {
				self[name] = prop[name];
			}
		}

		return self;
	}

	function es5Mixin(prop, obj) {
		var self = obj || this;
		var fnTest = /\b_super\b/;
		var _super = Object.getPrototypeOf(self) || self.prototype;
		var descriptors = {};
		var proto = prop;
		var processProperty = function(name) {
			if(!descriptors[name]) {
				descriptors[name] = Object.getOwnPropertyDescriptor(proto, name);
			}
		};

		// Collect all property descriptors
		do {
			Object.getOwnPropertyNames(proto).forEach(processProperty);
    } while((proto = Object.getPrototypeOf(proto)) && Object.getPrototypeOf(proto));
		
		Object.keys(descriptors).forEach(function(name) {
			var descriptor = descriptors[name];

			if(typeof descriptor.value === 'function' && fnTest.test(descriptor.value)) {
				descriptor.value = makeSuper(_super, self[name], name, descriptor.value);
			}

			Object.defineProperty(self, name, descriptor);
		});

		return self;
	}

	return {
		/**
		 * Create a new object using Object.create. The arguments will be
		 * passed to the new instances init method or to a method name set in
		 * __init.
		 */
		create: function () {
			var instance = Object.create(this);
			var init = typeof instance.__init === 'string' ? instance.__init : 'init';

			if (typeof instance[init] === 'function') {
				instance[init].apply(instance, arguments);
			}
			return instance;
		},
		/**
		 * Mixin a given set of properties
		 * @param prop The properties to mix in
		 * @param obj [optional] The object to add the mixin
		 */
		mixin: typeof Object.defineProperty === 'function' ? es5Mixin : legacyMixin,
		/**
		 * Extend the current or a given object with the given property
		 * and return the extended object.
		 * @param prop The properties to extend with
		 * @param obj [optional] The object to extend from
		 * @returns The extended object
		 */
		extend: function (prop, obj) {
			return this.mixin(prop, Object.create(obj || this));
		},
		/**
		 * Return a callback function with this set to the current or a given context object.
		 * @param name Name of the method to proxy
		 * @param args... [optional] Arguments to use for partial application
		 */
		proxy: function (name) {
			var fn = this[name];
			var args = Array.prototype.slice.call(arguments, 1);

			args.unshift(this);
			return fn.bind.apply(fn, args);
		}
	};

}));


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var feathers = __webpack_require__(/*! @feathersjs/feathers */ "./node_modules/@feathersjs/feathers/lib/index.js");
var errors = __webpack_require__(/*! @feathersjs/errors */ "./node_modules/@feathersjs/errors/lib/index.js");
var authentication = __webpack_require__(/*! @feathersjs/authentication-client */ "./node_modules/@feathersjs/authentication-client/lib/index.js");
var rest = __webpack_require__(/*! @feathersjs/rest-client */ "./node_modules/@feathersjs/rest-client/lib/index.js");
var socketio = __webpack_require__(/*! @feathersjs/socketio-client */ "./node_modules/@feathersjs/socketio-client/lib/index.js");
var primus = __webpack_require__(/*! @feathersjs/primus-client */ "./node_modules/@feathersjs/primus-client/lib/index.js");

Object.assign(feathers, {
  errors: errors,
  authentication: authentication,
  socketio: socketio,
  primus: primus,
  rest: rest
});

module.exports = feathers;

/***/ })

/******/ });
});
//# sourceMappingURL=feathers.js.map