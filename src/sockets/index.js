import { Service } from './base';

function base(socket) {
  if(!socket) {
    throw new Error('No socket provided');
  }

  return function() {
    this.Service = Service;
    this.connection = socket;
  };
}

function socketio(socket) {
  if(typeof window !== 'undefined' && window.io && typeof socket === 'string'){
    socket = window.io(socket);
  }

  return base(socket);
}

export default {
  socketio,
  primus: base
};