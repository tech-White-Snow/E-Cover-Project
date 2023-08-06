import { GET_UPLOAD_IMAGES, UPLOAD_IMAGE, UPLOAD_IMAGE_LOADING } from '../actions/types';

const initialState = {
  url: null,
  loading: true,
  urls: []
};

function selectMockUp(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPLOAD_IMAGE_LOADING :
        return {...state, loading: true}
    case UPLOAD_IMAGE :
        return {...state, url: payload, loading: false};
    case GET_UPLOAD_IMAGES :
        return {...state, urls: payload, loading: false};
    default : 
        return state;
  }
}

export default selectMockUp;
