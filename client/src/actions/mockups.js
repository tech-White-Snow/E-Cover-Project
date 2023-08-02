import { SET_MOCKUPS } from './types';
import axios from 'axios';

export const selectMockUp = (url, index) => async (dispatch) => {

  // const data = {
  //   dataSource: `D:\\work\\project\\second_project\\ecoverproject\\perfectdesign\\testdata\\psdSources\\test${index+1}.psd`
  // }  
  // // const dataSource = `D:\\work\\project\\second_project\\ecoverproject\\perfectdesign\\testdata\\psdSources\\test${index+1}.psd`;
  // const res = await axios.post('/api/ag-psd/mock-up-info', data);
  // const width = res.data.width;
  // const height = res.data.height;
  // console.log(width, height);
  
  console.log(index)
  dispatch({
    type: SET_MOCKUPS,
    // payload: {url, index, width, height}
    payload: {url, index}
  })
};
