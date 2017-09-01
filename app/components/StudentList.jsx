import { connect } from 'react-redux';
import React from 'react';
import Student from './Student';
import { NavLink } from 'react-router-dom';

function StudentList (props) {
  return (
    <div className="row">
      <div className="col-xs-10">
        <h3>Students</h3>
      </div>
      <div className="col-xs-2">
        <NavLink to="/students/add" className="btn btn-info pull-right header-button">Add Student</NavLink>
      </div>
      <div className="col-xs-12">
        <hr />
      </div>
      <div className="col-xs-2">
        <h4>#</h4>
      </div>
      <div className="col-xs-5">
        <h4>Student</h4>
      </div>
      <div className="col-xs-5">
        <h4>Campus</h4>
      </div>

      { props.students.sort((a,b) => a.id - b.id).map(student => {
        const campus = props.campuses.find(eachCampus => +eachCampus.id === +student.campusId)
        return (
        <Student key={student.id} student={student} campus={campus} />
         ) }
      ) }
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  students: state.students,
  campuses: state.campuses
})

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
