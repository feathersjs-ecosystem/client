import { Base } from './base';

export class Service extends Base {
  request(options) {
    var superagent = this.connection(options.method, options.url)
      .type(options.type || 'json');

    return new Promise((resolve, reject) => {
      if(options.body) {
        superagent.send(options.body);
      }

      superagent.end(function(error, res) {
        if(error) {
          return reject(error);
        }

        resolve(res && res.body);
      });
    });
  }
}

export default function(superagent) {
  if(!superagent) {
    throw new Error('Superagent needs to be provided');
  }

  return function() {
    this.Service = Service;
    this.connection = superagent;
  };
}
