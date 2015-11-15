import { stripSlashes } from './utils';
import rest from './rest';
import sockets from './sockets';

export class Client {
  constructor(base) {
    this.base = base;
    this.services = {};
  }

  configure(cb) {
    cb.call(this);
    return this;
  }

  service(name) {
    name = stripSlashes(name);
    if (!this.services[name]) {
      this.services[name] = new this.Service(name, this);
    }
    return this.services[name];
  }
}

function client(base = '/') {
  return new Client(base);
}

Object.assign(client, rest, sockets);

export default module.exports = client;
