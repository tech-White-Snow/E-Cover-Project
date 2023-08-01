import { SET_MOCKUPS } from '../actions/types';

const initialState = {
  url : null
};

function selectMockUp(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_MOCKUPS :
        return {...state, url : payload.url, index : payload.index};
    default : 
        return state;
  }
}

export default selectMockUp;
