import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import selectBackground from './selectBackground';
import selectMockUp from './selectMockUp';


export default combineReducers({
  alert,
  auth,
  profile,
  post,
  selectBackground,
  selectMockUp
});
