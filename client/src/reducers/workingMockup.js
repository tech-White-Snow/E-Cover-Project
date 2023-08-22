import { LOADING_MOCKUP, SELECT_MOCKUP } from '../actions/types';

const selectedMockup = JSON.parse(localStorage.getItem('selectedMockup'));

const initialState = {
  loading: false,
  ...selectedMockup,
};

function workingMockup(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOADING_MOCKUP :
        return {...state, loading: true}
    case SELECT_MOCKUP :
        return {
          loading: false,
          ...payload
        };
    default : 
        return state;
  }
}

export default workingMockup;
