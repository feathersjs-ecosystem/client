import { Base } from './base';

export class Service extends Base {
  request(options) {
    let opts = Object.assign({
      dataType: options.type || 'json'
    }, options);

    if(options.body) {
      opts.data = JSON.stringify(options.body);
      opts.contentType = 'application/json';
    }

    delete opts.type;
    delete opts.body;

    return new Promise((resolve, reject) =>
      this.connection.ajax(opts).then(resolve, xhr => {
        let error = new Error(xhr.responseText);
        error.xhr = xhr;
        reject(error);
      }));
  }
}

export default function(jQuery) {
  if(!jQuery && typeof window !== 'undefined') {
    jQuery = window.jQuery;
  }

  if(typeof jQuery !== 'function') {
    throw new Error('jQuery instance needs to be provided');
  }

  return function() {
    this.Service = Service;
    this.connection = jQuery;
  };
}
