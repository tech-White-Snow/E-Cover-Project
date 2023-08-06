import { UPLOAD_IMAGE, UPLOAD_IMAGE_LOADING, GET_UPLOAD_IMAGES } from './types';
import axios from 'axios';

export const uploadImage = (image) => async (dispatch) => {
  dispatch({
    type: UPLOAD_IMAGE_LOADING
  });
  const formData = new FormData();
  formData.append('file', image);
  const res = await axios.post('/api/ag-psd/upload-image', formData);
  console.log(res.data.url);
  dispatch({
    type: UPLOAD_IMAGE,
    payload: res.data.url
  });
};

export const getUploadImages = () => async (dispatch) => {
  dispatch({
    type: UPLOAD_IMAGE_LOADING
  });
  const res = await axios.get('/api/ag-psd/all-upload-image');
  console.log(res.data);
  dispatch({
    type: GET_UPLOAD_IMAGES,
    payload: res.data
  });
}
