import { MOCKUP_LOADING, SET_MOCKUPS, SELECT_MOCKUP, LOADING_MOCKUP } from './types';
import axios from 'axios';

export const selectMockUp = (data) => async (dispatch) => {
  dispatch({
    type: MOCKUP_LOADING
  })
  // const options = {
  //   method: 'GET',
  //   url: `https://api.mediamodifier.com/mockup/nr/${nr}`,
  //   headers: {Accept: 'application/json', api_key: '7279b6bf-f931-4b94-a7bd-05deb552e3cb'}
  // };
  // const {data} = await axios.request(options);
  dispatch({
    type: SET_MOCKUPS,
    //payload: data
    payload:  true
  })
};

export const selectingMockup = (data) => (dispatch) =>{
  dispatch({
    type: MOCKUP_LOADING
  })
  dispatch({
    type: SELECT_MOCKUP,
    payload: data
  })
}