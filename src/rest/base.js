import query from 'querystring';
import { stripSlashes, normalize, makeEmitting } from '../utils';

function callbackify(promise, callback) {
  if(typeof callback === 'function') {
    promise.then(data => callback(null, data), callback);
  }
  return promise;
}

export class Base {
  constructor(name, options) {
    this.name = stripSlashes(name);
    this.options = Object.assign({}, options);
    this.connection = options.connection;
    
    if(options.base) {
      this.base = `${options.base}/${this.name}`;
      delete this.options.base;
    } else {
      this.base = this.name;
    }
    
    normalize(this);
    makeEmitting(this);
  }

  makeUrl(params, id) {
    let url = this.base;

    if (typeof id !== 'undefined') {
      url += `/${id}`;
    }

    if(Object.keys(params).length !== 0) {
      const queryString = query.stringify(params);

      url += `?${queryString}`;
    }

    return url;
  }

  find(params, callback) {
    return callbackify(this.request({
      url: this.makeUrl(params),
      method: 'GET'
    }), callback);
  }

  get(id, params, callback) {
    return callbackify(this.request({
      url: this.makeUrl(params, id),
      method: 'GET'
    }), callback);
  }

  create(body, params, callback) {
    return callbackify(this.request({
      url: this.makeUrl(params),
      body,
      method: 'POST'
    }), callback);
  }

  update(id, body, params, callback) {
    return callbackify(this.request({
      url: this.makeUrl(params, id),
      body,
      method: 'PUT'
    }), callback);
  }

  patch(id, body, params, callback) {
    return callbackify(this.request({
      url: this.makeUrl(params, id),
      body,
      method: 'PATCH'
    }), callback);
  }

  remove(id, params, callback) {
    return callbackify(this.request({
      url: this.makeUrl(params, id),
      method: 'DELETE'
    }), callback);
  }
}
