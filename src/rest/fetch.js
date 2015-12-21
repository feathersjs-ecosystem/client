import { Base } from './base';

export class Service extends Base {
  request(options) {
    var fetchOptions = {
      method: options.method,
      headers: {
        'Accept': 'application/json'
      }
    };

    return new Promise((resolve, reject) => {
      if (options.body) {
        fetchOptions.body = JSON.stringify(options.body);
        fetchOptions.headers['Content-Type'] = 'application/json';
      }
      this.connection(options.url, fetchOptions)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          resolve(result);
        }).catch((e) => {
        reject(e);
      });
    });
  }
}

export default function (fetch) {
  if (!fetch) {
    throw new Error('fetch needs to be provided');
  }

  return function () {
    this.Service = Service;
    this.connection = fetch;
  };
}
