import React from 'react';
import { connect } from 'react-redux';
import { createStudent } from '../reducers/students';

class AddStudent extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      name: '',
      campusId: null
    }
  }

  render () {
    return (
      <div className="row">
        <div className="col-xs-12">
          <h3>Add Student</h3>
        </div>
        <div className="col-xs-12">
          <hr />
        </div>
        <form className="form-horizontal" onSubmit={this.props.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="col-xs-3 col-sm-2 control-label">Student Name</label>
            <div className="col-xs-9 col-sm-10">
              <input name="name" className="form-control"/>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="campus" className="col-xs-3 col-sm-2 control-label">Student Campus</label>
            <div className="col-xs-9 col-sm-10">
              <select name="campus" className="form-control">
                { this.props.campuses.map(campus => <option key={campus.id} value={campus.id}>{campus.name}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-12">
              <input type="submit" value="submit" className="btn btn-info pull-right" />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapState = (state, ownProps) => ({
  campuses: state.campuses
})

const mapDispatch = dispatch => ({
  handleSubmit: (e) => {
    e.preventDefault();
    dispatch(createStudent({name: e.target.name.value, campusId: e.target.campus.value}))
  }

})

export default connect(mapState, mapDispatch)(AddStudent);
