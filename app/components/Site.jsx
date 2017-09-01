import React from 'react';
import Navbar from './Navbar';
import { Route, Switch } from 'react-router-dom';
import { Router } from 'react-router';
import { connect } from 'react-redux';
import { fetchUser } from '../reducers/user';
import CampusList from './CampusList';
import StudentList from './StudentList';
import CampusExpanded from './CampusExpanded';
import StudentExpanded from './StudentExpanded';
import AddStudent from './AddStudent';
import AddCampus from './AddCampus';
import EditStudent from './EditStudent';
import EditCampus from './EditCampus';
import Login from './Login';
import SignUp from './SignUp';
import history from '../history';

class Site extends React.Component {

  componentDidMount () {
    this.props.fetchInitialData();
  }

  render () {
    const user = this.props.user;
    console.log('user is', user);
    return (
      <div>
        <Router history={history}>
          <div>
            <Navbar />
            <div className="container">
              { user ?
                <Switch>
                  <Route exact path="/" component={CampusList} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/campuses/add" component={AddCampus} />
                  <Route exact path="/campuses/edit/:campusId" component={EditCampus} />
                  <Route path="/campuses/:campusId" component={CampusExpanded} />
                  <Route exact path="/students" component={StudentList} />
                  <Route exact path="/students/add" component={AddStudent} />
                  <Route exact path="/students/edit/:studentId" component={EditStudent} />
                  <Route exact path="/students/:studentId" component={StudentExpanded} />
                </Switch>
                :
                <Switch>
                  <Route exact path="/signup" component={SignUp} />
                  <Route path="/" component={Login} />
                </Switch>
            }
            </div>
          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  fetchInitialData: () => {
    // dispatch(fetchCampuses());
    // dispatch(fetchStudents());
    dispatch(fetchUser());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Site);
