import { SET_EDITEDIMAGE, GET_EDITEDIMAGE, SET_CURRENTSTATE, TOGGLE_PLUGCOVER } from '../actions/types';

const initialState = {
  edited: false,
  img: null,
  currentDesignState: null,
  plugGetCovers: false,
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
      return { 
        ...state,
        currentDesignState: payload
      }
    case GET_EDITEDIMAGE :
      return { 
        ...state,
        edited: true
      }  
    case TOGGLE_PLUGCOVER:
      return{
        ...state,
        plugGetCovers: !state.plugGetCovers
      }
    default : 
        return state;
  }
}

export default editedImage;
