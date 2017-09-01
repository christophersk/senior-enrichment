import React from 'react';
import { connect } from 'react-redux';
import { updateStudent } from '../reducers/students';

/*
This edit component suffers from a strange bug (form info not auto-filling),
which is resolved by both setting state on mount (with ternery check for existence of props)
and by calling componentWillReceiveProps (to re-enter information on page refresh). This code is
not needlessly repetitive! Both Charles and Nick have looked at it.
*/

class EditStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.student && this.props.student.name,
      email: this.props.student && this.props.student.email,
      campusId: this.props.campus && this.props.campus.id
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCampusChange = this.handleCampusChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log('constructor');
  }

  // ComponentWillReceiveProps is used to re-set state upon page refresh
  // Ternery is used to prevent errors due to campus object being undefined
  componentWillReceiveProps(nextProps) {
    console.log('running will receive props', nextProps)
    this.setState({
      name: nextProps.student && nextProps.student.name,
      email: nextProps.student && nextProps.student.email,
      campusId: nextProps.campus && nextProps.campus.id
    }, () => {
      console.log('set state has just finished running... state is now: ', this.state)
    })
  }

  handleNameChange(e) {
    e.preventDefault();
    this.setState({
      name: e.target.value
    })
  }

  handleEmailChange(e) {
    e.preventDefault();
    this.setState({
      email: e.target.value
    })
  }

  handleCampusChange(e) {
    e.preventDefault();
    this.setState({
      campusId: +e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, email, campusId } = this.state;
    const studentId = this.props.student.id;
    this.props.updateStudent(studentId, {name, email, campusId});
  }

  render() {
    const { name, email, campusId } = this.state;
    console.log('render')
    console.log('student is', this.props.student)
    return (
      <div className="row">
        <div className="col-xs-12">
          <h3>Edit {this.props.student && this.props.student.name}</h3>
        </div>
        <div className="col-xs-12">
          <hr />
        </div>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="col-xs-3 col-sm-2 control-label">Name</label>
            <div className="col-xs-9 col-sm-10">
              <input onChange={this.handleNameChange} value={name} name="name" className="form-control" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="col-xs-3 col-sm-2 control-label">Email</label>
            <div className="col-xs-9 col-sm-10">
              <input onChange={this.handleEmailChange} value={email} name="email" className="form-control" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="select-campus" className="col-xs-3 col-sm-2 control-label">Select Campus</label>
            <div className="col-xs-9 col-sm-10">
              <select onChange={this.handleCampusChange} value={campusId} name="select-campus" className="form-control">
                { this.props.campuses.map(eachCampus => <option key={eachCampus.id} value={eachCampus.id}>{eachCampus.name}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-12">
              <input type="submit" className="btn btn-info pull-right" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapState = (state, ownProps) => {
  console.log('are we running mapstate?')
  const student = state.students.find(eachStudent => eachStudent.id === +ownProps.match.params.studentId);
  const campus = state.campuses.find(eachCampus => eachCampus.id === (student && student.campusId))
  return {
    student,
    campus,
    campuses: state.campuses
  }
}

const mapDispatch = dispatch => ({
  updateStudent: (studentId, studentInfo) => {
    dispatch(updateStudent(studentId, studentInfo))
  }
})

export default connect(mapState, mapDispatch)(EditStudent);
