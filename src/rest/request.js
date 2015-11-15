import { Base } from './base';

export class Service extends Base {
  request(options) {
    return new Promise((resolve, reject) => {
      this.connection(Object.assign({
        json: true
      }, options), function(error, res, data) {
        if(!error && res.statusCode >= 400) {
          return reject(new Error(data));
        }

        resolve(data);
      });
    });
  }
}

export default function(request) {
  if(!request) {
    throw new Error('request instance needs to be provided');
  }

  return function() {
    this.Service = Service;
    this.connection = request;
  };
}
