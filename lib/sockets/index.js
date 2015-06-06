var init = require('./base');

function socketio(socket) {
  if(!socket && typeof window !== 'undefined' && typeof window.io === 'function') {
    socket = window.io();
  }
  return init(socket);
}

socketio.Service = init.Service;

module.exports = {
  socketio: socketio,
  primus: init
};
