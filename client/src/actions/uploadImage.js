import { UPLOAD_IMAGE, UPLOAD_IMAGE_LOADING, GET_UPLOAD_IMAGES } from './types';
import axios from 'axios';
import { backendUrl } from '../utils/Constant';

export const uploadImage = (image) => async (dispatch) => {
  dispatch({
    type: UPLOAD_IMAGE_LOADING
  });
  const formData = new FormData();
  formData.append('file', image);
  const res = await axios.post(`${backendUrl}/api/ag-psd/upload-image`, formData);
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
  try{
    const res = await axios.get(`${backendUrl}/api/ag-psd/all-upload-image`);
    dispatch({
      type: GET_UPLOAD_IMAGES,
      payload: res.data
    });
  }catch(err){
    console.log(err)
  }
}
