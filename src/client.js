import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';
import primus from 'feathers-primus/client';
import rest from 'feathers-rest/client';
import authentication from 'feathers-authentication/client';
import hooks from 'feathers-hooks';

Object.assign(feathers, { socketio, primus, rest, hooks, authentication });

export default feathers;
