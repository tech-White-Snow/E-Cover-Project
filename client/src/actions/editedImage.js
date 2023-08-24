import { SET_EDITEDIMAGE, GET_EDITEDIMAGE } from './types';

export const setEditedImage = (image) => async (dispatch) => {
  dispatch({
    type: SET_EDITEDIMAGE,
    payload: image
  });
};

export const getEditedImage = () => async (dispatch) => {
  dispatch({
    type: GET_EDITEDIMAGE
  });
};