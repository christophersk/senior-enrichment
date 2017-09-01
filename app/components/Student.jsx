import React from 'react';
import { connect } from 'react-redux';
import { deleteStudent } from '../reducers/students';
import { NavLink } from 'react-router-dom';

function Student ({student, campus, handleDelete}) {
  return (
    <div>
      <div className="col-xs-2">
        {student.id}
      </div>
      <div className="col-xs-5">
        <NavLink to={`/students/${student.id}`} >
          {student.name}
        </NavLink>
      </div>
      <div className="col-xs-5">
        {campus && campus.name}
        <button onClick={() => handleDelete(student)} className="glyphicon glyphicon-remove pull-right"></button>
      </div>
    </div>
  );
}

const mapState = (state, ownProps) => ({});

const mapDispatch = dispatch => ({
  handleDelete: (student) => dispatch(deleteStudent(student))
})

export default connect(mapState, mapDispatch)(Student);
