import { MOCKUP_LOADING, SET_MOCKUPS } from '../actions/types';

const initialState = {
  data: null,
  loading: false,
  set_mockup: false,
};

function selectMockUp(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case MOCKUP_LOADING :
        return {...state, loading: true}
    case SET_MOCKUPS :
        return {...state, set_mockup : payload, loading: false};
    default : 
        return state;
  }
}

export default selectMockUp;
