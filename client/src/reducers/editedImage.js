import { SET_EDITEDIMAGE, GET_EDITEDIMAGE } from '../actions/types';

const initialState = {
  edited: false,
  img: null
};

function editedImage(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_EDITEDIMAGE :
        return { 
          edited: false,
          img: payload
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
