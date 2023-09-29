import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, getUploadImages } from "../../actions/uploadImage";
import UploadImageCard from "./subtools/UploadImageCard";
import Spinner from "../layout/Spinner";

const UploadImagesPage = ({setBgImageSelected, setUploadImagesSelected, setBackgroundSelected}) => {
    const dispatch = useDispatch();
    const selectImage = async (e) => {
        const image = e.target.files[0];
        if(!image) return;
        console.log(image);
        dispatch(uploadImage(image));
    };
    // const selectUploadedImage = () => {

    // }
    const {urls} = useSelector(state => state.uploadImage);
    const {url} = useSelector(state => state.uploadImage);
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
            <div className="upload-page-body">
                {loading === true ? <div className="loading-spinner"><Spinner /></div> : (
                    urls.map((image, index) => <UploadImageCard url={image.url} setBackgroundSelected={setBackgroundSelected} setBgImageSelected={setBgImageSelected} setUploadImagesSelected={setUploadImagesSelected} index={index} />)
                )}
                
            </div>
        </div>
    )
}

export default UploadImagesPage;