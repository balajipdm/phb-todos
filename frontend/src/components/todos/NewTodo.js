import React, { Fragment } from 'react';

import TodoForm from './TodoForm';

const NewTodo = () => {
  return (
    <Fragment>
      <h1 className='large text-primary'>New Todo</h1>
      <TodoForm todo={null} />
    </Fragment>
  );
};

export default NewTodo;