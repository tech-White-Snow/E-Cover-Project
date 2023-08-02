import { SET_BACKGROUND } from '../actions/types';

const initialState = {
  url : null
};

function selectBackground(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_BACKGROUND :
        return {...state, url : payload.url, index : payload.index, width: payload.width, height: payload.height};
    default : 
        return state;
  }
}

export default selectBackground;
