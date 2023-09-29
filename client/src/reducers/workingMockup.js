import { LOADING_MOCKUP, SELECT_MOCKUP, RENDERED } from '../actions/types';

//const selectedMockup = JSON.parse(localStorage.getItem('selectedMockup'));

const initialState = {
  loading: false,
  rendered: false
};

function workingMockup(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOADING_MOCKUP :
        return {...state, loading: true}
    case LOADING_MOCKUP :
        return {...state, rendered: true}
    case SELECT_MOCKUP :
        return {
          loading: false,
          rendered: false,
          ...payload
        };
    default : 
        return state;
  }
}

export default workingMockup;
