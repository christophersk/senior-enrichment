import axios from 'axios';
import history from '../history';

// ACTION TYPES

const SET_STUDENTS = 'SET_STUDENTS';
const REMOVE_STUDENT = 'REMOVE_STUDENT'
const ADD_STUDENT = 'ADD_STUDENT';
const EDIT_STUDENT = 'EDIT_STUDENT';
const REMOVE_STUDENTS_BY_CAMPUSID = 'REMOVE_STUDENTS_BY_CAMPUSID';

// ACTION CREATORS

export const setStudents = students => ({
  type: SET_STUDENTS,
  students
})

export const removeStudent = studentId => ({
  type: REMOVE_STUDENT,
  studentId
})

export const addStudent = student => ({
  type: ADD_STUDENT,
  student
})

export const editStudent = student => ({
  type: EDIT_STUDENT,
  student
})

export const removeStudentsByCampusId = campusId => ({
  type: REMOVE_STUDENTS_BY_CAMPUSID,
  campusId
})

// REDUCER

export default function (students = [], action) {
  switch (action.type) {
    case SET_STUDENTS:
      return action.students;
    case REMOVE_STUDENT:
      return students.filter(eachStudent => eachStudent.id !== action.studentId)
    case ADD_STUDENT:
      return students.concat(action.student);
    case EDIT_STUDENT:
      return students.filter(eachStudent => eachStudent.id !== action.student.id).concat(action.student);
    case REMOVE_STUDENTS_BY_CAMPUSID:
      return students.filter(eachStudent => eachStudent.campusId !== action.campusId);
    default:
      return students;
  }
}

// THUNK CREATORS

export const fetchStudents = () => dispatch => {
  axios.get('/api/students')
    .then(res => res.data)
    .then(students => dispatch(setStudents(students)))
    .catch(alert);
}

export const deleteStudent = (student) => dispatch => {
  axios.delete(`/api/students/${student.id}`)
    .then(res => {
      if (res.status === 200) {
        dispatch(removeStudent(student.id));
      } else {
        alert('Student could not be deleted at this time');
      }
    })
    .then(() => history.push('/students'))
    .catch(alert);
}

export const createStudent = (newStudent) => dispatch => {
  console.log('create student fired');
  axios.post('/api/students', newStudent)
    .then(res => res.data)
    .then(student => {
      dispatch(addStudent(student))
    })
    .then(() => history.push('/students'))
    .catch(alert);
}

export const updateStudent = (studentId, studentInfo, redirect) => dispatch => {
  axios.put(`/api/students/${studentId}`, studentInfo)
    .then(res => res.data)
    .then(student => {
      console.log('updated student is', student)
      dispatch(editStudent(student));
      return student;
    })
    .then(student => {
      if (redirect === 'campus') {
        history.push(`/campuses/${student.campusId}`)
      } else {
        history.push(`/students/${student.id}`)
      }
    })
    .catch(alert);
}
