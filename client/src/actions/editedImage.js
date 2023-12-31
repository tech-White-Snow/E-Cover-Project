import { SET_EDITEDIMAGE, GET_EDITEDIMAGE, SET_CURRENTSTATE, TOGGLE_PLUGCOVER } from './types';

export const setEditedImage = (image) => async (dispatch) => {
  dispatch({
    type: SET_EDITEDIMAGE,
    payload: image
  });
};

export const setCurrentState = (state) => async (dispatch) => {
  // const curState = {...state};
  // if(curState.selectionsIds){
  //   curState.selectionsIds = [];
  // }
  console.log(state);
  dispatch({
    type: SET_CURRENTSTATE,
    payload: state
  });
};

export const getEditedImage = () => async (dispatch) => {
  dispatch({
    type: GET_EDITEDIMAGE
  });
};

export const togglePlugCover = () => (dispatch) => {
  dispatch({
    type: TOGGLE_PLUGCOVER
  });
}