import axios from 'axios';
import history from '../history';
import { removeStudentsByCampusId } from './students';

// ACTION TYPES

const SET_CAMPUSES = 'SET_CAMPUSES';
const ADD_CAMPUS = 'ADD_CAMPUS';
const REMOVE_CAMPUS = 'REMOVE_CAMPUS';
const REPLACE_CAMPUS = 'REPLACE_CAMPUS';
const UNSET_CAMPUSES = 'UNSET_CAMPUSES';

// ACTION CREATORS

export const setCampuses = campuses => ({
  type: SET_CAMPUSES,
  campuses
})

export const addCampus = campus => ({
  type: ADD_CAMPUS,
  campus
})

export const removeCampus = campusId => ({
  type: REMOVE_CAMPUS,
  campusId
})

export const replaceCampus = campus => ({
  type: REPLACE_CAMPUS,
  campus
})

export const unsetCampuses = () => ({
  type: UNSET_CAMPUSES
})

/*
  For the action creators you're not using in other files, no need to export them
*/

// REDUCER

export default function (campuses = [], action) {
  switch (action.type) {
    case SET_CAMPUSES:
      return action.campuses;
    case ADD_CAMPUS:
      return campuses.concat(action.campus);
    case REMOVE_CAMPUS:
      return campuses.filter(campus => campus.id !== action.campusId);
    case REPLACE_CAMPUS:
      return campuses.filter(campus => campus.id !== action.campus.id).concat(action.campus);
    case UNSET_CAMPUSES:
      return [];
    default:
      return campuses;
  }
}

// THUNK CREATORS

export const fetchCampuses = () => dispatch => {
  axios.get('/api/campuses')
    .then(res => res.data)
    .then(campuses => dispatch(setCampuses(campuses)))
    .catch(alert);
}

export const createCampus = (newCampus) => dispatch => {
  axios.post('/api/campuses', newCampus)
    .then(res => res.data)
    .then(campus => dispatch(addCampus(campus)))
    .then(() => history.push('/'))
    .catch(alert)
}

export const deleteCampus = (campusId) => dispatch => {
  axios.delete(`/api/campuses/${campusId}`)
    .then((res) => {
      if (res.status === 200) {
        dispatch(removeCampus(campusId));
        dispatch(removeStudentsByCampusId(campusId));
      } else {
        alert('Sorry, this campus could not be deleted at this time.');
      }
    })
    .then(() => history.push('/'))
    .catch(alert)
}

export const updateCampus = (campusId, campusInfo) => dispatch => {
  axios.put(`/api/campuses/${campusId}`, campusInfo)
    .then(res => res.data)
    .then(campus => dispatch(replaceCampus(campus)))
    .then(() => history.push('/'))
    .catch(alert)
}
