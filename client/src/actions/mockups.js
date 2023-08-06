import { MOCKUP_LOADING, SET_MOCKUPS } from './types';
import axios from 'axios';

export const selectMockUp = (nr) => async (dispatch) => {
  dispatch({
    type: MOCKUP_LOADING
  })
  const options = {
    method: 'GET',
    url: `https://api.mediamodifier.com/mockup/nr/${nr}`,
    headers: {Accept: 'application/json', api_key: '7279b6bf-f931-4b94-a7bd-05deb552e3cb'}
  };
  const {data} = await axios.request(options);
  dispatch({
    type: SET_MOCKUPS,
    payload: data
  })
};
