import { SET_BACKGROUND } from './types';

export const selectBackground = (url, index) => (dispatch) => {
  console.log(index)
  dispatch({
    type: SET_BACKGROUND,
    payload: {url, index}
  })
};
