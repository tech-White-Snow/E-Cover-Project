import { SET_BACKGROUND } from './types';
import axios from 'axios';

export const selectBackground = (url, index) => async (dispatch) => {
  console.log(index);
  const data = {
    imageSource: `D:\\work\\project\\second_project\\ecoverproject\\perfectdesign\\client\\public\\testdata\\images\\image${index+1}.jpg`
  }
  const res = await axios.post('/api/ag-psd/bg-info', data);
  const width = res.data.width;
  const height = res.data.height;
  dispatch({
    type: SET_BACKGROUND,
    payload: {url, index, width, height}
  })
};
