import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createUser } from '../reducers/user';

function SignUp ({signUp}) {

  function handleSubmit(e) {
    e.preventDefault();
    signUp(e.target.username.value, e.target.password.value);
  }

  return (
    <div className="row">
      <div className="col-xs-12">
        <h3>Sign Up!</h3>
        <p><em>Don't worry, your password will be stored as a randomly salted hash!</em></p>
      </div>
      <div className="col-xs-12">
        <hr />
      </div>
      <div className="col-xs-12">
        <form onSubmit={handleSubmit} className="form-horizontal">
        <div className="form-group">
          <label htmlFor="username" className="col-xs-3 col-sm-2 control-label">Username</label>
          <div className="col-xs-9 col-sm-10">
            <input name="username" className="form-control" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password" className="col-xs-3 col-sm-2 control-label">Password</label>
          <div className="col-xs-9 col-sm-10">
            <input type="password" name="password" className="form-control" />
          </div>
        </div>
        <div className="form-group">
          <div className="col-xs-12">
            <input type="submit" value="Sign Up" className="btn btn-info pull-right" />
          </div>
        </div>
        </form>
      </div>
    </div>
  );
}

const mapState = (state, ownProps) => ({

})

const mapDispatch = dispatch => ({
  signUp: (username, password) => dispatch(createUser(username, password))
})

export default connect(mapState, mapDispatch)(SignUp);
