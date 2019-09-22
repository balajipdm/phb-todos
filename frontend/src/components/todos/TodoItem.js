import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteTodo } from '../../actions/todo';

const TodoItem = ({
  deleteTodo,
  todo: { _id, description, responsible, priority, completed, date }
}) => {
  const status = completed ? 'Completed' : 'Pending';
  return (
    <div className={'todo bg-white p-1 my-1 clearfix status-'+status}>
      <div className='pull-left'>
        <strong className='t-description'>{description}</strong> 
        <span className='ml-1'><strong>Responsible: </strong> {responsible}</span>
        <span className='ml-1'><strong>Priority:</strong> {priority}</span>
        <span className='ml-1'><strong>Status:</strong> <span className='t-status'>{status}</span></span>
        <span className='ml-1 todo-date'>
          <strong>Last Modified:</strong> <Moment format='DD/MM/YYYY HH:SS'>{date}</Moment>
        </span>
      </div>
      <div className='pull-right'>
        <Link to={`/todos/update/${_id}`} className='btn btn-primary'>
          <i className='fas fa-edit' />
        </Link>
        <button
          onClick={() => {
            if(window.confirm('Are you sure ? You want to Delete ?')) {
              deleteTodo(_id)
            }
          }}
          type='button'
          className='btn btn-danger'
          >
          <i className='fas fa-times' />
        </button>
      </div>
    </div>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteTodo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteTodo }
)(TodoItem);
