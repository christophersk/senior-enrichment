import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../reducers/user';

function Navbar ({user, logoutUser }) {

  return (
    <div>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <NavLink to="/" className="navbar-brand" href="#">MHIAJ</NavLink>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li>
                { user ? <NavLink exact to="/" activeClassName="active-test" className="nav-link">Home</NavLink> : null }
              </li>
              <li>
                { user ? <NavLink exact to="/students" activeClassName="active-test" className="nav-link">Students</NavLink> : null }
              </li>
                { user ? <li><a onClick={logoutUser} className="nav-link">Logout</a></li> : null }
                { user ? null : <li><NavLink to="/" className="nav-link">Login</NavLink></li> }
                { user ? null : <li><NavLink to="/signup" className="nav-link">Sign Up</NavLink></li> }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

const mapState = (state, ownProps) => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  logoutUser: () => dispatch(logout())
})

export default connect(mapState, mapDispatch)(Navbar);
