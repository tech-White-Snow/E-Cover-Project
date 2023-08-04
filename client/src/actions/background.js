import { BG_LOADING, SET_BACKGROUND } from './types';
import axios from 'axios';

export const selectBackground = (url, index) => async (dispatch) => {
  dispatch({
    type: BG_LOADING
  });
  console.log(url);
  const data = {
    imageSource: url
  }
  const res = await axios.post('/api/ag-psd/bg-info', data);
  const width = res.data.width;
  const height = res.data.height;
  dispatch({
    type: SET_BACKGROUND,
    payload: {url, index, width, height}
  });
};
