import React from 'react';
import { connect } from 'react-redux';
import { updateCampus } from '../reducers/campuses';
import { updateStudent } from '../reducers/students';

class EditCampus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.campus && this.props.campus.name,
      image: this.props.campus && this.props.campus.image,
      studentId: 0
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleEditCampusSubmit = this.handleEditCampusSubmit.bind(this);
    this.handleAddStudentSubmit = this.handleAddStudentSubmit.bind(this);
  }

  // ComponentWillReceiveProps is used to re-set state upon page refresh
  // Ternery is used to prevent errors due to campus object being undefined
  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.campus && nextProps.campus.name,
      image: nextProps.campus && nextProps.campus.image
    })
  }

  handleNameChange(e) {
    e.preventDefault();
    this.setState({
      name: e.target.value
    })
  }

  handleImageChange(e) {
    e.preventDefault();
    this.setState({
      image: e.target.value
    })
  }

  handleSelectChange(e) {
    e.preventDefault();
    this.setState({
      studentId: e.target.value
    })
  }

  handleEditCampusSubmit(e) {
    e.preventDefault();
    const campusId = +this.props.match.params.campusId;
    const { name, image } = this.state;
    this.props.updateCampus(campusId, { name, image })
  }

  handleAddStudentSubmit(e) {
    e.preventDefault();
    const campusId = +this.props.match.params.campusId;
    const studentId = +this.state.studentId;
    if (studentId !== 0) {
      this.props.addStudentToCampus(campusId, studentId)
    }
  }

  render() {
    const { name, image } = this.state;
    const students = this.props.students;
    return (
      <div className="row">
        <div className="col-xs-12">
          <h3>Edit {this.props.campus && this.props.campus.name}</h3>
        </div>
        <div className="col-xs-12">
          <hr />
        </div>
        <div className="col-xs-12">
          <form className="form-horizontal" onSubmit={this.handleEditCampusSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="col-xs-3 col-sm-2 control-label">Name</label>
              <div className="col-xs-9 col-sm-10">
              <input onChange={this.handleNameChange} value={name} name="name" className="form-control" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="image" className="col-xs-3 col-sm-2 control-label">Image (URL)</label>
              <div className="col-xs-9 col-sm-10">
                <input onChange={this.handleImageChange} value={image} name="image" className="form-control" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="submit" className="col-xs-8 col-sm-10 control-label" />
              <div className="col-xs-4 col-sm-2">
                <input type="submit" name="submit" value="Edit Campus" className="btn btn-info pull-right" />
              </div>
            </div>
          </form>
          <hr />
        </div>
        <div className="col-xs-12">
          <form className="form-horizontal" onSubmit={this.handleAddStudentSubmit}>
            <div className="form-group">
              <label htmlFor="addStudent" className="col-xs-3 col-sm-2 control-label">Add Student</label>
              <div className="col-xs-9 col-sm-10">
                <select onChange={this.handleSelectChange} value={this.state.studentId} name="addStudent" className="form-control">
                  <option value={0}>---</option>
                  {
                    students.map(student => <option key={student.id} value={student.id}>{student.name}</option>)
                  }
                </select>
              </div>
            </div>
            <div className="form-group">
            <label htmlFor="submit" className="col-xs-8 col-sm-10 control-label" />
            <div className="col-xs-4 col-sm-2">
              <input type="submit" name="submit" value="Add Student" className="btn btn-info pull-right" />
            </div>
          </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapState = (state, ownProps) => {
  const campus = state.campuses.find(eachCampus => +eachCampus.id === +ownProps.match.params.campusId);
  const students = state.students.filter(eachStudent => +eachStudent.campusId !== +ownProps.match.params.campusId);
  return {
    campus,
    students
  }
}

const mapDispatch = dispatch => ({
  updateCampus: (campusId, campusInfo) => dispatch(updateCampus(campusId, campusInfo)),
  addStudentToCampus: (campusId, studentId) => dispatch(updateStudent(studentId, { campusId }, 'campus'))
})

export default connect(mapState, mapDispatch)(EditCampus)
