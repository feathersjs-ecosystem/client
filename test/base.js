import assert from 'assert';

module.exports = function(app) {
  describe('Service base tests', function() {
    it('.find', function(done) {
      app.service('todos').find().then(todos => assert.deepEqual(todos, [
        {
          text: 'some todo',
          complete: false,
          id: 0
        }
      ])).then(() => done(), done);
    });

    it('.get and params passing', function(done) {
      let query = {
        some: 'thing',
        other: ['one', 'two']
      };

      app.service('todos').get(0, { query }).then(todo => assert.deepEqual(todo, {
        id: 0,
        text: 'some todo',
        complete: false,
        query: query
      })).then(() => done(), done);
    });

    it('.create and created event', function(done) {
      app.service('todos').once('created', function(data) {
        assert.equal(data.text, 'created todo');
        assert.ok(data.complete);
        done();
      });

      app.service('todos').create({ text: 'created todo', complete: true });
    });

    it('.update and updated event', function(done) {
      app.service('todos').once('updated', function(data) {
        assert.equal(data.text, 'updated todo');
        assert.ok(data.complete);
        done();
      });

      app.service('todos').create({ text: 'todo to update', complete: false })
        .then(todo => app.service('todos').update(todo.id, {
          text: 'updated todo',
          complete: true
        }));
    });

    it('.patch and patched event', function(done) {
      app.service('todos').once('patched', function(data) {
        assert.equal(data.text, 'todo to patch');
        assert.ok(data.complete);
        done();
      });

      app.service('todos').create({ text: 'todo to patch', complete: false })
        .then(todo => app.service('todos').patch(todo.id, { complete: true }));
    });

    it('.remove and removed event', function(done) {
      app.service('todos').once('removed', function(data) {
        assert.equal(data.text, 'todo to remove');
        assert.equal(data.complete, false);
        done();
      });

      app.service('todos').create({ text: 'todo to remove', complete: false })
        .then(todo => app.service('todos').remove(todo.id));
    });

    it('.get with error', function(done) {
      let query = { error: true };
      app.service('todos').get(0, { query }).then(done, error => {
        assert.ok(error && error.message);
        done();
      });
    });
  });
};
