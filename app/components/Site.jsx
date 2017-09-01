import React from 'react';
import Navbar from './Navbar';
import { Route, Switch } from 'react-router-dom';
import { Router } from 'react-router';
import { connect } from 'react-redux';
import {fetchCampuses} from '../reducers/campuses';
import {fetchStudents} from '../reducers/students';
import CampusList from './CampusList';
import StudentList from './StudentList';
import CampusExpanded from './CampusExpanded';
import StudentExpanded from './StudentExpanded';
import AddStudent from './AddStudent';
import AddCampus from './AddCampus';
import EditStudent from './EditStudent';
import EditCampus from './EditCampus';
import history from '../history';

class Site extends React.Component {

  componentDidMount () {
    this.props.fetchInitialData();
  }

  render () {
    return (
      <div>
        <Router history={history}>
          <div>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={CampusList} />
                <Route exact path="/campuses/add" component={AddCampus} />
                <Route exact path="/campuses/edit/:campusId" component={EditCampus} />
                <Route path="/campuses/:campusId" component={CampusExpanded} />
                <Route exact path="/students" component={StudentList} />
                <Route exact path="/students/add" component={AddStudent} />
                <Route exact path="/students/edit/:studentId" component={EditStudent} />
                <Route exact path="/students/:studentId" component={StudentExpanded} />
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch) => ({
  fetchInitialData: () => {
    dispatch(fetchCampuses());
    dispatch(fetchStudents());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Site);
