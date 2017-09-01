import React from 'react';
import { connect } from 'react-redux';
import { createCampus } from '../reducers/campuses';

class AddCampus extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      name: '',
      campusId: null
    }
  }

  render () {
    console.log('AddCampus mounted');
    return (
      <div className="row">
        <div className="col-xs-12">
          <h3>Add Campus</h3>
        </div>
        <div className="col-xs-12">
          <hr />
        </div>
        <form className="form-horizontal" onSubmit={this.props.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="col-xs-3 col-sm-2 control-label">Campus Name</label>
            <div className="col-xs-9 col-sm-10">
              <input name="name" className="form-control" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="image" className="col-xs-3 col-sm-2 control-label">Image (URL)</label>
            <div className="col-xs-9 col-sm-10">
              <input name="image" className="form-control" />
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

const mapState = (state, ownProps) => ({})

const mapDispatch = dispatch => ({
  handleSubmit: (e) => {
    e.preventDefault();
    dispatch(createCampus({name: e.target.name.value, image: e.target.image.value}))
  }

})

export default connect(mapState, mapDispatch)(AddCampus);
