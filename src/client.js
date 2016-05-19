import feathers from 'feathers/client';
import rest from 'feathers-rest/client';
import socketio from 'feathers-socketio/client';
import primus from 'feathers-primus/client';
import hooks from 'feathers-hooks';
import authentication from 'feathers-authentication/client';

Object.assign(feathers, { socketio, primus, rest, hooks, authentication });

export default feathers;
