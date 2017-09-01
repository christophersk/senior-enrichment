import React from 'react';
import { connect } from 'react-redux';
import { deleteStudent } from '../reducers/students';
import { NavLink } from 'react-router-dom';

function StudentExpanded ({student, campus, handleDelete}) {
  return (
    <div>
      <div className="col-xs-10">
        <h3>Student Expanded View</h3>
      </div>
      <div className="col-xs-2">
        <button onClick={() => handleDelete(student)} className="btn btn-danger pull-right header-button">
          <span className="glyphicon glyphicon-remove"></span></button>
        <NavLink to={`/students/edit/${student && student.id}`} className="btn btn-info pull-right header-button">Edit</NavLink>
      </div>
      <div className="col-xs-12">
        <hr />
      </div>
      <div className="col-xs-4">
        <h4>Name</h4>
        {student && student.name}
      </div>
      <div className="col-xs-4">
        <h4>Email</h4>
        {student && student.email}
      </div>
      <div className="col-xs-4">
        <h4>Campus</h4>
        <NavLink to={`/campuses/${campus && campus.id}`}>
          {campus && campus.name}
        </NavLink>

      </div>
    </div>
  );
}

const mapState = (state, ownProps) => {
  const student = state.students.find(eachStudent => +eachStudent.id === +ownProps.match.params.studentId);
  const campus = state.campuses.find(eachCampus => +eachCampus.id === (student && +student.campusId));
  return {
    student,
    campus
  }
};

const mapDispatch = dispatch => ({
  handleDelete: (student) => dispatch(deleteStudent(student))
})

export default connect(mapState, mapDispatch)(StudentExpanded);
