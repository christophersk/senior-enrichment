import { combineReducers } from 'redux';
import campuses from './campuses';
import students from './students';
import user from './user';

export default combineReducers({ campuses, students, user });
