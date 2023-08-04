import { MOCKUP_LOADING, SET_MOCKUPS } from './types';
import axios from 'axios';

export const selectMockUp = (nr) => async (dispatch) => {
  dispatch({
    type: MOCKUP_LOADING
  })
  const options = {
    method: 'GET',
    url: `https://api.mediamodifier.com/mockup/nr/${nr}`,
    headers: {Accept: 'application/json', api_key: '3b9a8454-342b-4f2d-810f-26098524e34d'}
  };
  const {data} = await axios.request(options);
  dispatch({
    type: SET_MOCKUPS,
    payload: data
  })
};
