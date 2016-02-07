import assert from 'assert';
import baseTests from '../base';

const feathers = window.feathers;
const socket = window.io('http://localhost:7979');

describe('Universal Feathers client browser tests', function() {
  const app = feathers()
    .configure(feathers.socketio(socket))
    .configure(feathers.hooks())
    .use('/myservice', {
      get(id) {
        return Promise.resolve({
          id, description: `You have to do ${id}!`
        });
      },
      
      create(data) {
        return Promise.resolve(data);
      }
    });
    
  app.service('myservice').before({
    create(hook) {
      hook.data.hook = true;
    }
  }).after({
    get(hook) {
      hook.result.ran = true;
    }
  });
  
  baseTests(app);
  
  describe('Client side hooks and services', () => {
    it('initialized myservice and works with hooks', done => {
      app.service('myservice').get('dishes').then(todo => {
        assert.deepEqual(todo, {
          id: 'dishes',
          description: 'You have to do dishes!',
          ran: true
        });
        done();
      }).catch(done);
    });
    
    it('create and event with hook', done => {
      const myservice = app.service('myservice');
      
      myservice.once('created', data => {
        assert.deepEqual(data, {
          description: 'Test todo',
          hook: true
        });
        done();
      });
      
      myservice.create({ description: 'Test todo' });
    });
  });
});
