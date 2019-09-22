import sinon from 'sinon';
import { expect } from 'chai';

import Todo from '../../models/Todo';

const todoData = { description: 'Test One Description', responsible: 'Test One' };

describe('Todo Model', () => {
  describe('Get all todos', () => {
    it('should return all todos', (done) => {
      const TodoMock = sinon.mock(Todo);
      const expectedResult = { status: true, todo: [] };
      TodoMock.expects('find').yields(null, expectedResult);
      Todo.find((err, result) => {
        TodoMock.verify();
        TodoMock.restore();
        expect(result.status).to.be.true;
        done();
      });
    });

    it('should return error', (done) => {
      const TodoMock = sinon.mock(Todo);
      const expectedResult = { status: false, error: 'Something went wrong' };
      TodoMock.expects('find').yields(expectedResult, null);
      Todo.find((err, result) => {
        TodoMock.verify();
        TodoMock.restore();
        expect(err.status).to.not.be.true;
        done();
      });
    });
  });

  describe('Post a new todo', () => {
    it('should create new post', (done) => {
      const TodoMock = sinon.mock(new Todo(todoData));
      const todo = TodoMock.object;
      const expectedResult = todo;
      TodoMock.expects('save').yields(null, expectedResult);
      todo.save((err, result) => {
        TodoMock.verify();
        TodoMock.restore();
        expect(result.completed).to.equal(false);
        expect(result.description).to.equal('Test One Description');
        expect(result.priority).to.equal('Low');
        done();
      });
    });
    it('should return error, if post not saved', (done) => {
      const TodoMock = sinon.mock(new Todo());
      const todo = TodoMock.object;
      const expectedResult = { status: false };
      TodoMock.expects('save').yields(expectedResult, null);
      todo.save((err, result) => {
        TodoMock.verify();
        TodoMock.restore();
        expect(err.status).to.not.be.true;
        done();
      });
    });
  });

  describe('Update a todo by id', () => {
    it('should updated a todo by id', (done) => {
      const TodoMock = sinon.mock(new Todo({ todoData, completed: true }));
      const todo = TodoMock.object;
      const expectedResult = { status: true };
      TodoMock.expects('save').yields(null, expectedResult);
      todo.save((err, result) => {
        TodoMock.verify();
        TodoMock.restore();
        expect(result.status).to.be.true;
        done();
      });
    });
    it('should return error if update action is failed', (done) => {
      var TodoMock = sinon.mock(new Todo({ todoData, completed: true }));
      var todo = TodoMock.object;
      var expectedResult = { status: false };
      TodoMock.expects('save').yields(expectedResult, null);
      todo.save((err, result) => {
        TodoMock.verify();
        TodoMock.restore();
        expect(err.status).to.not.be.true;
        done();
      });
    });
  });

  describe('Delete a todo by id', () => {
    it('should delete a todo by id', (done) => {
      const TodoMock = sinon.mock(Todo);
      const expectedResult = { status: true };
      TodoMock.expects('remove').withArgs({ _id: 12345 }).yields(null, expectedResult);
      Todo.remove({ _id: 12345 }, (err, result) => {
        TodoMock.verify();
        TodoMock.restore();
        expect(result.status).to.be.true;
        done();
      });
    });

    it('should return error if delete action is failed', (done) => {
      const TodoMock = sinon.mock(Todo);
      const expectedResult = { status: false };
      TodoMock.expects('remove').withArgs({ _id: 12345 }).yields(expectedResult, null);
      Todo.remove({ _id: 12345 }, (err, result) => {
        TodoMock.verify();
        TodoMock.restore();
        expect(err.status).to.not.be.true;
        done();
      });
    });
  });
})