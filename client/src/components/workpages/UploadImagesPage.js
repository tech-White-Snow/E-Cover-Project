import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../actions/uploadImage";
import UploadImageCard from "./subtools/UploadImageCard";
import Spinner from "../layout/Spinner";
import Resizer from 'react-image-file-resizer';

const UploadImagesPage = ({setBgImageSelected, setUploadImagesSelected, setBackgroundSelected}) => {
    const dispatch = useDispatch();
    const [warningMaxSize, setMaxSize] = useState(false);
    const selectImage = async (e) => {
        setMaxSize(false);
        const file = e.target.files[0];
        
        if (file.type.startsWith('image/')) {
            const img = new Image();
            img.onload = () => {
              if (img.height > 700) {
                Resizer.imageFileResizer(
                  file,
                  img.width * 700 / img.height,
                  700,
                  'JPEG',
                  100,
                  0,
                  (resizedFile) => {
                    // Handle the resized file
                    dispatch(uploadImage(resizedFile));
                  },
                  'file'
                );
              } else {
                dispatch(uploadImage(file));
              }
            };
  
            img.onerror = () => {
                setMaxSize(true);
            };
            img.src = URL.createObjectURL(file);
        } else {
            setMaxSize(true);
        }        
    };
    // const selectUploadedImage = () => {

    // }
    const {urls} = useSelector(state => state.uploadImage);
    const {loading} = useSelector(state => state.uploadImage);
       
    return (
        <div className="upload-page">
            <div className="upload-page-header">
                <label htmlFor="choose-file" className="upload-page-header-select">Select Image to Upload</label>
                <input type="file" style={{display: 'none'}} id="choose-file" onChange={selectImage} />
                <div className="upload-page-header-drag">
                    or Drag & Drop file here to Upload
                </div>
            </div>
            {warningMaxSize ? <p style={{color: 'red'}}>Please choose a valid image file.</p> : ''}
            <div className="upload-page-body">
                {loading === true ? <div className="loading-spinner"><Spinner /></div> : (
                    urls.map((image, index) => <UploadImageCard url={image.url} key={index} setBackgroundSelected={setBackgroundSelected} setBgImageSelected={setBgImageSelected} setUploadImagesSelected={setUploadImagesSelected} />)
                )}
                
            </div>
        </div>
    )
}

export default UploadImagesPage;