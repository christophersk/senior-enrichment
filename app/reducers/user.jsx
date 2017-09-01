import axios from 'axios';
import history from '../history';
import { fetchCampuses, unsetCampuses } from './campuses';
import { fetchStudents, unsetStudents } from './students';

// ACTION TYPES
const SET_USER = 'SET_USER';
const UNSET_USER = 'UNSET_USER';

// ACTION CREATORS
export const setUser = userId => ({
  type: SET_USER,
  userId
})

export const unsetUser = () => ({
  type: UNSET_USER
})

// REDUCER

export default function (user = null, action) {
  switch (action.type) {
    case SET_USER:
      return action.userId;
    case UNSET_USER:
      return null;
    default:
      return user;
  }
}

// THUNK CREATORS

export const login = (username, password) => dispatch => {
  axios.post('/api/users/login', { username, password })
    .then(res => {
      if (res.status === 404) {
        alert('User not found. Check your username and password!');
      } else {
        return res.data;
      }
    })
    .then(userId => {
      dispatch(setUser(userId));
      dispatch(fetchCampuses());
      dispatch(fetchStudents());
    })
    .catch(err => {
      console.error(err);
      alert('Incorrect username or password :/');
    });
}

export const logout = () => dispatch => {
  axios.delete('/api/users/logout')
    .then(res => {
      if (res.status === 200) {
        dispatch(unsetCampuses());
        dispatch(unsetStudents());
        dispatch(unsetUser());
        history.push('/');
      }
    })
    .catch(alert);
}

export const createUser = (username, password) => dispatch => {
  axios.post('/api/users/signup', { username, password })
    .then(res => res.data)
    .then(userId => {
      dispatch(setUser(userId));
      dispatch(fetchCampuses());
      dispatch(fetchStudents());
      history.push('/');
    })
    .catch(alert);
}

export const fetchUser = () => dispatch => {
  axios.get('/api/users/')
    .then(res => {
      const userId = res.data;
      if (res.data !== null) {
        dispatch(setUser(userId));
        dispatch(fetchCampuses());
        dispatch(fetchStudents());
      }
    })
    .catch(alert)
}
