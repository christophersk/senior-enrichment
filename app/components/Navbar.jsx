import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar () {

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
                <NavLink to="/" activeClassName="active" className="nav-link">Home</NavLink>
              </li>
              <li>
                <NavLink to="/students" activeClassName="active" className="nav-link">Students</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
