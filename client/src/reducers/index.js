import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import selectBackground from './selectBackground';
import selectMockUp from './selectMockUp';
import render_start from './render';
import uploadImage from './uploadImage';


export default combineReducers({
  alert,
  auth,
  profile,
  selectBackground,
  selectMockUp,
  render_start,
  uploadImage
});
