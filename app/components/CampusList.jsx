import React from 'react';
import Campus from './campus';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

function CampusList (props) {

  return (
    <div className="row">
      <div className="col-xs-10">
        <h3>Campuses</h3>
      </div>
      <div className="col-xs-2">
        <NavLink to="/campuses/add" className="btn btn-info pull-right header-button" >Add Campus</NavLink>
      </div>
      <div className="col-xs-12">
        <hr />
      </div>
      { props.campuses.sort((a,b) => a.id - b.id).map(campus => <Campus key={campus.id} campus={campus} /> ) }
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  campuses: state.campuses
})

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CampusList);

