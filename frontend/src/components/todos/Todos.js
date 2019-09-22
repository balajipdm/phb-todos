import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';
import TodoItem from './TodoItem';
import { getTodos } from '../../actions/todo';

const Todos = ({ getTodos, todo: { todos, loading } }) => {
  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Todos</h1>
      <div className='pull-right mb-1'>
        <Link className='btn btn-primary' to='/todos/new'>New Todo</Link>
      </div>
      <div className='todos'>
        {todos.map(todo => (
          <TodoItem key={todo._id} todo={todo} />
        ))}
      </div>
    </Fragment>
  );
};

Todos.propTypes = {
  getTodos: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  todo: state.todo
});

export default connect(
  mapStateToProps,
  { getTodos }
)(Todos);
