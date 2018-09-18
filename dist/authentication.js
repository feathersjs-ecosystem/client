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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/authentication.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@feathersjs/authentication-client/lib/hooks/index.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@feathersjs/authentication-client/lib/hooks/index.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/***/ (function(module, exports) {

module.exports = function populateAccessToken() {
  return function (hook) {
    var app = hook.app;

    if (hook.type !== 'before') {
      return Promise.reject(new Error("The 'populateAccessToken' hook should only be used as a 'before' hook."));
    }

    Object.assign(hook.params, {
      accessToken: app.get('accessToken')
    });
    return Promise.resolve(hook);
  };
};

/***/ }),

/***/ "./node_modules/@feathersjs/authentication-client/lib/hooks/populate-entity.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@feathersjs/authentication-client/lib/hooks/populate-entity.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function populateEntity() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!options.service) {
    throw new Error("You need to pass 'options.service' to the populateEntity() hook.");
  }

  if (!options.field) {
    throw new Error("You need to pass 'options.field' to the populateEntity() hook.");
  }

  if (!options.entity) {
    throw new Error("You need to pass 'options.entity' to the populateEntity() hook.");
  }

  return function (hook) {
    var app = hook.app;

    if (hook.type !== 'after') {
      return Promise.reject(new Error("The 'populateEntity' hook should only be used as an 'after' hook."));
    }

    return app.passport.verifyJWT(hook.result.accessToken).then(function (payload) {
      var id = payload[options.field];

      if (!id) {
        return Promise.reject(new Error("Access token payload is missing the '".concat(options.field, "' field.")));
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
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = function populateHeader() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!options.header) {
    throw new Error("You need to pass 'options.header' to the populateHeader() hook.");
  }

  return function (hook) {
    if (hook.type !== 'before') {
      return Promise.reject(new Error("The 'populateHeader' hook should only be used as a 'before' hook."));
    }

    if (hook.params.accessToken) {
      hook.params.headers = Object.assign({}, _defineProperty({}, options.header, options.prefix ? "".concat(options.prefix, " ").concat(hook.params.accessToken) : hook.params.accessToken), hook.params.headers);
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
    app.logout = app.passport.logout.bind(app.passport); // Set up hook that adds token and user to params so that
    // it they can be accessed by client side hooks and services

    app.mixins.push(function (service) {
      // if (typeof service.hooks !== 'function') {
      if (app.version < '3.0.0') {
        throw new Error("This version of @feathersjs/authentication-client only works with @feathersjs/feathers v3.0.0 or later.");
      }

      service.hooks({
        before: hooks.populateAccessToken(options)
      });
    }); // Set up hook that adds authorization header for REST provider

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var errors = __webpack_require__(/*! @feathersjs/errors */ "./node_modules/@feathersjs/errors/lib/index.js");

var decode = __webpack_require__(/*! jwt-decode */ "./node_modules/jwt-decode/lib/index.js");

var Debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");

var _require = __webpack_require__(/*! ./utils */ "./node_modules/@feathersjs/authentication-client/lib/utils.js"),
    Storage = _require.Storage,
    payloadIsValid = _require.payloadIsValid,
    getCookie = _require.getCookie,
    clearCookie = _require.clearCookie;

var debug = Debug('@feathersjs/authentication-client');

module.exports =
/*#__PURE__*/
function () {
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

  _createClass(Passport, [{
    key: "setupSocketListeners",
    value: function setupSocketListeners() {
      var _this = this;

      var app = this.app;
      var socket = app.io || app.primus;
      var emit = app.io ? 'emit' : 'send';
      var reconnected = app.io ? 'reconnect' : 'reconnected';

      if (!socket) {
        return;
      }

      socket.on(reconnected, function () {
        debug('Socket reconnected'); // If socket was already authenticated then re-authenticate
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
          debug('Socket upgrading'); // If socket was already authenticated then re-authenticate
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
    }
  }, {
    key: "connected",
    value: function connected() {
      var _this2 = this;

      var app = this.app;

      if (app.rest) {
        return Promise.resolve();
      }

      var socket = app.io || app.primus;

      if (!socket) {
        return Promise.reject(new Error("It looks like your client connection has not been configured."));
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
        }; // If disconnect happens before `connect` the promise will be rejected.


        socket.once(disconnect, handleDisconnect);
        socket.once(connected, function () {
          debug('Socket connected');
          debug("Removing ".concat(disconnect, " listener"));
          socket.removeListener(disconnect, handleDisconnect);
          clearTimeout(timeout);
          resolve(socket);
        });
      });
    }
  }, {
    key: "authenticate",
    value: function authenticate() {
      var _this3 = this;

      var credentials = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var app = this.app;
      var getCredentials = Promise.resolve(credentials); // If no strategy was given let's try to authenticate with a stored JWT

      if (!credentials.strategy) {
        if (credentials.accessToken) {
          credentials.strategy = this.options.jwtStrategy;
        } else {
          getCredentials = this.getJWT().then(function (accessToken) {
            if (!accessToken) {
              return Promise.reject(new errors.NotAuthenticated("Could not find stored JWT and no authentication strategy was given"));
            }

            return {
              strategy: _this3.options.jwtStrategy,
              accessToken: accessToken
            };
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
    } // Returns a promise that authenticates a socket

  }, {
    key: "authenticateSocket",
    value: function authenticateSocket(credentials, socket, emit) {
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
    }
  }, {
    key: "logoutSocket",
    value: function logoutSocket(socket, emit) {
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
    }
  }, {
    key: "logout",
    value: function logout() {
      var _this6 = this;

      var app = this.app;
      app.set('accessToken', null);
      this.clearCookie(this.options.cookie); // remove the accessToken from localStorage

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
    }
  }, {
    key: "setJWT",
    value: function setJWT(data) {
      var accessToken = data && data.accessToken ? data.accessToken : data;

      if (accessToken) {
        this.app.set('accessToken', accessToken);
        this.app.get('storage').setItem(this.options.storageKey, accessToken);
      }

      return Promise.resolve(data);
    }
  }, {
    key: "getJWT",
    value: function getJWT() {
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
    } // Pass a jwt token, get back a payload if it's valid.

  }, {
    key: "verifyJWT",
    value: function verifyJWT(token) {
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
    } // Returns a storage implementation

  }, {
    key: "getStorage",
    value: function getStorage(storage) {
      if (storage) {
        return storage;
      }

      return new Storage();
    }
  }]);

  return Passport;
}();

/***/ }),

/***/ "./node_modules/@feathersjs/authentication-client/lib/utils.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@feathersjs/authentication-client/lib/utils.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

exports.Storage =
/*#__PURE__*/
function () {
  function Storage() {
    _classCallCheck(this, Storage);

    this.store = {};
  }

  _createClass(Storage, [{
    key: "getItem",
    value: function getItem(key) {
      return this.store[key];
    }
  }, {
    key: "setItem",
    value: function setItem(key, value) {
      return this.store[key] = value;
    }
  }, {
    key: "removeItem",
    value: function removeItem(key) {
      delete this.store[key];
      return this;
    }
  }]);

  return Storage;
}();

exports.payloadIsValid = function payloadIsValid(payload) {
  return payload && (!payload.exp || payload.exp * 1000 > new Date().getTime());
};

exports.getCookie = function getCookie(name) {
  if (typeof document !== 'undefined') {
    var value = "; ".concat(document.cookie);
    var parts = value.split("; ".concat(name, "="));

    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  }

  return null;
};

exports.clearCookie = function clearCookie(name) {
  if (typeof document !== 'undefined') {
    document.cookie = "".concat(name, "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;");
  }

  return null;
};

/***/ }),

/***/ "./node_modules/@feathersjs/errors/lib/index.js":
/*!******************************************************!*\
  !*** ./node_modules/@feathersjs/errors/lib/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")('@feathersjs/errors');

function FeathersError(msg, name, code, className, data) {
  msg = msg || 'Error';
  var errors;
  var message;
  var newData;

  if (msg instanceof Error) {
    message = msg.message || 'Error'; // NOTE (EK): This is typically to handle validation errors

    if (msg.errors) {
      errors = msg.errors;
    }
  } else if (_typeof(msg) === 'object') {
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
  } // NOTE (EK): Babel doesn't support this so
  // we have to pass in the class name manually.
  // this.name = this.constructor.name;


  this.type = 'FeathersError';
  this.name = name;
  this.message = message;
  this.code = code;
  this.className = className;
  this.data = newData;
  this.errors = errors || {};
  debug("".concat(this.name, "(").concat(this.code, "): ").concat(this.message));
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

inheritsFrom(FeathersError, Error); // NOTE (EK): A little hack to get around `message` not
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
}); // 400 - Bad Request

function BadRequest(message, data) {
  FeathersError.call(this, message, 'BadRequest', 400, 'bad-request', data);
}

inheritsFrom(BadRequest, FeathersError); // 401 - Not Authenticated

function NotAuthenticated(message, data) {
  FeathersError.call(this, message, 'NotAuthenticated', 401, 'not-authenticated', data);
}

inheritsFrom(NotAuthenticated, FeathersError); // 402 - Payment Error

function PaymentError(message, data) {
  FeathersError.call(this, message, 'PaymentError', 402, 'payment-error', data);
}

inheritsFrom(PaymentError, FeathersError); // 403 - Forbidden

function Forbidden(message, data) {
  FeathersError.call(this, message, 'Forbidden', 403, 'forbidden', data);
}

inheritsFrom(Forbidden, FeathersError); // 404 - Not Found

function NotFound(message, data) {
  FeathersError.call(this, message, 'NotFound', 404, 'not-found', data);
}

inheritsFrom(NotFound, FeathersError); // 405 - Method Not Allowed

function MethodNotAllowed(message, data) {
  FeathersError.call(this, message, 'MethodNotAllowed', 405, 'method-not-allowed', data);
}

inheritsFrom(MethodNotAllowed, FeathersError); // 406 - Not Acceptable

function NotAcceptable(message, data) {
  FeathersError.call(this, message, 'NotAcceptable', 406, 'not-acceptable', data);
}

inheritsFrom(NotAcceptable, FeathersError); // 408 - Timeout

function Timeout(message, data) {
  FeathersError.call(this, message, 'Timeout', 408, 'timeout', data);
}

inheritsFrom(Timeout, FeathersError); // 409 - Conflict

function Conflict(message, data) {
  FeathersError.call(this, message, 'Conflict', 409, 'conflict', data);
}

inheritsFrom(Conflict, FeathersError); // 411 - Length Required

function LengthRequired(message, data) {
  FeathersError.call(this, message, 'LengthRequired', 411, 'length-required', data);
}

inheritsFrom(LengthRequired, FeathersError); // 422 Unprocessable

function Unprocessable(message, data) {
  FeathersError.call(this, message, 'Unprocessable', 422, 'unprocessable', data);
}

inheritsFrom(Unprocessable, FeathersError); // 429 Too Many Requests

function TooManyRequests(message, data) {
  FeathersError.call(this, message, 'TooManyRequests', 429, 'too-many-requests', data);
}

inheritsFrom(TooManyRequests, FeathersError); // 500 - General Error

function GeneralError(message, data) {
  FeathersError.call(this, message, 'GeneralError', 500, 'general-error', data);
}

inheritsFrom(GeneralError, FeathersError); // 501 - Not Implemented

function NotImplemented(message, data) {
  FeathersError.call(this, message, 'NotImplemented', 501, 'not-implemented', data);
}

inheritsFrom(NotImplemented, FeathersError); // 502 - Bad Gateway

function BadGateway(message, data) {
  FeathersError.call(this, message, 'BadGateway', 502, 'bad-gateway', data);
}

inheritsFrom(BadGateway, FeathersError); // 503 - Unavailable

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

  if (_typeof(error) === 'object') {
    Object.assign(result, error);
  }

  return result;
}

module.exports = Object.assign({
  convert: convert
}, errors);

/***/ }),

/***/ "./node_modules/debug/src/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/debug/src/browser.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
/**
 * Colors.
 */

exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */
// eslint-disable-next-line complexity

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
    return true;
  } // Internet Explorer and Edge do not support colors.


  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  } // Is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */


function formatArgs(args) {
  args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

  if (!this.useColors) {
    return;
  }

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into

  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function (match) {
    if (match === '%%') {
      return;
    }

    index++;

    if (match === '%c') {
      // We only are interested in the *last* %c
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
  var _console;

  // This hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return (typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object' && console.log && (_console = console).log.apply(_console, arguments);
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */


function save(namespaces) {
  try {
    if (namespaces) {
      exports.storage.setItem('debug', namespaces);
    } else {
      exports.storage.removeItem('debug');
    }
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
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
    r = exports.storage.getItem('debug');
  } catch (error) {} // Swallow
  // XXX (@Qix-) should we be logging these?
  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}
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
    // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
    // The Browser also has localStorage in the global context.
    return localStorage;
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}

module.exports = __webpack_require__(/*! ./common */ "./node_modules/debug/src/common.js")(exports);
var formatters = module.exports.formatters;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (error) {
    return '[UnexpectedJSONParseError]: ' + error.message;
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/debug/src/common.js":
/*!******************************************!*\
  !*** ./node_modules/debug/src/common.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */
function setup(env) {
  createDebug.debug = createDebug;
  createDebug.default = createDebug;
  createDebug.coerce = coerce;
  createDebug.disable = disable;
  createDebug.enable = enable;
  createDebug.enabled = enabled;
  createDebug.humanize = __webpack_require__(/*! ms */ "./node_modules/ms/index.js");
  Object.keys(env).forEach(function (key) {
    createDebug[key] = env[key];
  });
  /**
  * Active `debug` instances.
  */

  createDebug.instances = [];
  /**
  * The currently active debug mode names, and names to skip.
  */

  createDebug.names = [];
  createDebug.skips = [];
  /**
  * Map of special "%n" handling functions, for the debug "format" argument.
  *
  * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
  */

  createDebug.formatters = {};
  /**
  * Selects a color for a debug namespace
  * @param {String} namespace The namespace string for the for the debug instance to be colored
  * @return {Number|String} An ANSI color code for the given namespace
  * @api private
  */

  function selectColor(namespace) {
    var hash = 0;

    for (var i = 0; i < namespace.length; i++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  }

  createDebug.selectColor = selectColor;
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
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // Disabled?
      if (!debug.enabled) {
        return;
      }

      var self = debug; // Set `diff` timestamp

      var curr = Number(new Date());
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;
      args[0] = createDebug.coerce(args[0]);

      if (typeof args[0] !== 'string') {
        // Anything else let's inspect with %O
        args.unshift('%O');
      } // Apply any `formatters` transformations


      var index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
        // If we encounter an escaped % then don't increase the array index
        if (match === '%%') {
          return match;
        }

        index++;
        var formatter = createDebug.formatters[format];

        if (typeof formatter === 'function') {
          var val = args[index];
          match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

          args.splice(index, 1);
          index--;
        }

        return match;
      }); // Apply env-specific formatting (colors, etc.)

      createDebug.formatArgs.call(self, args);
      var logFn = self.log || createDebug.log;
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.enabled = createDebug.enabled(namespace);
    debug.useColors = createDebug.useColors();
    debug.color = selectColor(namespace);
    debug.destroy = destroy;
    debug.extend = extend; // Debug.formatArgs = formatArgs;
    // debug.rawLog = rawLog;
    // env-specific initialization logic for debug instances

    if (typeof createDebug.init === 'function') {
      createDebug.init(debug);
    }

    createDebug.instances.push(debug);
    return debug;
  }

  function destroy() {
    var index = createDebug.instances.indexOf(this);

    if (index !== -1) {
      createDebug.instances.splice(index, 1);
      return true;
    }

    return false;
  }

  function extend(namespace, delimiter) {
    return createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
  }
  /**
  * Enables a debug mode by namespaces. This can include modes
  * separated by a colon and wildcards.
  *
  * @param {String} namespaces
  * @api public
  */


  function enable(namespaces) {
    createDebug.save(namespaces);
    createDebug.names = [];
    createDebug.skips = [];
    var i;
    var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    var len = split.length;

    for (i = 0; i < len; i++) {
      if (!split[i]) {
        // ignore empty strings
        continue;
      }

      namespaces = split[i].replace(/\*/g, '.*?');

      if (namespaces[0] === '-') {
        createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        createDebug.names.push(new RegExp('^' + namespaces + '$'));
      }
    }

    for (i = 0; i < createDebug.instances.length; i++) {
      var instance = createDebug.instances[i];
      instance.enabled = createDebug.enabled(instance.namespace);
    }
  }
  /**
  * Disable debug output.
  *
  * @api public
  */


  function disable() {
    createDebug.enable('');
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

    var i;
    var len;

    for (i = 0, len = createDebug.skips.length; i < len; i++) {
      if (createDebug.skips[i].test(name)) {
        return false;
      }
    }

    for (i = 0, len = createDebug.names.length; i < len; i++) {
      if (createDebug.names[i].test(name)) {
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
    if (val instanceof Error) {
      return val.stack || val.message;
    }

    return val;
  }

  createDebug.enable(createDebug.load());
  return createDebug;
}

module.exports = setup;

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
var w = d * 7;
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
  var match = /^((?:\d+)?\-?\d?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
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
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
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
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
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
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
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

/***/ "./src/authentication.js":
/*!*******************************!*\
  !*** ./src/authentication.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! @feathersjs/authentication-client */ "./node_modules/@feathersjs/authentication-client/lib/index.js");

/***/ })

/******/ });
});
//# sourceMappingURL=authentication.js.map