import {
  GET_TODOS,
  TODO_ERROR,
  DELETE_TODO,
  ADD_TODO,
  GET_TODO,
  UPDATE_TODO,
  RESET_TODOS
} from '../actions/types';

const initialState = {
  todos: [],
  todo: null,
  loading: true,
  error: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TODOS:
      return {
        ...state,
        todos: payload,
        loading: false
      };
    case GET_TODO:
      return {
        ...state,
        todo: payload,
        loading: false
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [payload, ...state.todos],
        todo: null,
        loading: false
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo._id !== payload),
        loading: false
      };
    case TODO_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo._id === payload.id ? { ...todo, ...payload } : todo
        ),
        todo: null,
        loading: false
      };
    case RESET_TODOS:
      return {
        ...state,
        todos: [],
        todo: null,
        loading: false
      };
    default:
      return state;
  }
};