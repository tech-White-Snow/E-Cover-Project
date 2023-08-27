import { SET_EDITEDIMAGE, GET_EDITEDIMAGE, SET_CURRENTSTATE } from '../actions/types';

const initialState = {
  edited: false,
  img: null,
  currentDesignState: null
};

function editedImage(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_EDITEDIMAGE :
      return { 
        ...state,
        edited: false,
        img: payload
      }
    case SET_CURRENTSTATE :
      console.log(payload);
      return { 
        ...state,
        currentDesignState: payload
      }
    case GET_EDITEDIMAGE :
      return { 
        ...state,
        edited: true
      }  
    default : 
        return state;
  }
}

export default editedImage;
