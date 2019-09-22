import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { addTodo, updateTodo } from '../../actions/todo';

const TodoForm = ({ addTodo, updateTodo, todo }) => {
  let todoData = {
    description: '',
    responsible: '',
    priority: 'Low',
    completed: false
  };
  if(todo !== null) {
    todoData = todo;
  }
  const [formData, setFormData] = useState(todoData);
  const { description, responsible, priority, completed } = formData;
  const onChange = e => {
    let value = e.target.value;
    if(e.target.type === 'checkbox') {
      value = (value === 'false') ? true : false;
    }
    setFormData({ ...formData, [e.target.name]: value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if(todo !== null) {
      updateTodo(todo._id, formData);
    } else {
      addTodo(formData);
    }
  };
  
  return (
    <div className='todo-form'>
      <form className='form my-1' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Description'
            name='description'
            value={description}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Responsible'
            name='responsible'
            value={responsible}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='priority'>
            Priority
          </label>
          <select
            placeholder='Priority'
            name='priority'
            id='priority'
            value={priority}
            onChange={e => onChange(e)}>
              {['Low', 'Medium', 'High'].map(val => <option key={val} value={val}>{val}</option>)}
          </select>
        </div>
        <div className='form-group'>
          <input
            type='checkbox'
            name='completed'
            id='completed'
            onChange={e => onChange(e)}
            value={completed}
            checked={completed}
            />
            <label htmlFor='completed'>
              Completed
            </label>
        </div>
        <input type='submit' className='btn btn-primary my-1' value='Submit' />
        <Link className='btn' to='/todos'>Cancel</Link>
      </form>
    </div>
  );
};

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired
};

export default connect(
  null,
  { addTodo, updateTodo }
)(TodoForm);