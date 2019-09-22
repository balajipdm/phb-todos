import todo from '../api/todo';
import history from '../history';

import { setAlert } from './alert';

import {
  GET_TODOS,
  TODO_ERROR,
  DELETE_TODO,
  ADD_TODO,
  GET_TODO,
  UPDATE_TODO
} from './types';

// Get todos
export const getTodos = () => async dispatch => {
  try {
    const res = await todo.get('todos');
    dispatch({
      type: GET_TODOS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add todo
export const addTodo = formData => async dispatch => {
  try {
    const res = await todo.post('todos', formData);
    dispatch({
      type: ADD_TODO,
      payload: res.data
    });
    dispatch(setAlert('Todo Created', 'success'));
    history.push('../todos');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get todo
export const getTodo = id => async dispatch => {
  try {
    const res = await todo.get(`todos/${id}`);
    dispatch({
      type: GET_TODO,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update todo
export const updateTodo = (id, formData) => async dispatch => {
  try {
    const res = await todo.put(`todos/${id}`, formData);
    dispatch({
      type: UPDATE_TODO,
      payload: res.data
    });
    dispatch(setAlert('Todo Updated', 'success'));
    history.push('../../todos');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete todo
export const deleteTodo = id => async dispatch => {
  try {
    await todo.delete(`todos/${id}`);
    dispatch({
      type: DELETE_TODO,
      payload: id
    });
    dispatch(setAlert('Todo Removed', 'success'));
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};