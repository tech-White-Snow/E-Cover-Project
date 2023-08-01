import { SET_MOCKUPS } from './types';

export const selectMockUp = (url, index) => (dispatch) => {
  console.log(index)
  dispatch({
    type: SET_MOCKUPS,
    payload: {url, index}
  })
};
