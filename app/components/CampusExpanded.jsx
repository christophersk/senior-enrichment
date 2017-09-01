import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteCampus } from '../reducers/campuses';

function CampusExpanded ({campus, students, deleteCampus}) {

  return (
    <div>
      <div className="col-xs-10">
        <h3>{ campus && campus.name }</h3>
      </div>
      <div className="col-xs-2">
        <button onClick={() => { deleteCampus(campus && campus.id) }} className="btn btn-danger pull-right header-button">
          <span className="glyphicon glyphicon-remove"></span>
        </button>
        <NavLink to={`/campuses/edit/${campus && campus.id}`} className="btn btn-info pull-right header-button">Edit</NavLink>
      </div>
      <div className="col-xs-12">
        <hr />
      </div>
      <div className="col-xs-12">
        <h4>Students</h4>
        { students.sort((a,b) => a.id - b.id).map(student => {
            return (
              <div key={student.id}>
                <NavLink to={`/students/${student.id}`} >
                  {student.name}
                </NavLink>
              </div>
        )})}
      </div>
    </div>
  );
}

const mapState = (state, ownProps) => {
  const campus = state.campuses.find(eachCampus => eachCampus.id === +ownProps.match.params.campusId);
  const students = state.students.filter(eachStudent => eachStudent.campusId === +ownProps.match.params.campusId);

  return {
    campus,
    students
  }
}

const mapDispatch = dispatch => ({
  deleteCampus: (campusId) => {
    dispatch(deleteCampus(campusId));
  }
})

export default connect(mapState, mapDispatch)(CampusExpanded);
