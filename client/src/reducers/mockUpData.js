import { SET_MOCKUPDATA } from '../actions/types';

const initialState = [
  JSON.parse(localStorage.getItem("persist:ecover")).mockUpData
];

function mockUpData(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_MOCKUPDATA :
        return payload 
    default : 
        return state;
  }
}

export default mockUpData;
