import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';
import { getTodo } from '../../actions/todo';

import TodoForm from './TodoForm';

const UpdateTodo = ({ getTodo, todo: { todo, loading }, match }) => {
  useEffect(() => {
    getTodo(match.params.id);
  }, [getTodo, match.params.id]);
  return loading || todo === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Update Todo</h1>
      <TodoForm todo={todo} />
    </Fragment>
  );
};

UpdateTodo.propTypes = {
  getTodo: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  todo: state.todo
});

export default connect(
  mapStateToProps,
  { getTodo }
)(UpdateTodo);