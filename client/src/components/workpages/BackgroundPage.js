import React, { useState } from "react";

import './ImagePagesStyle.css';
import BackgroundCard from "./subtools/BackgroundCard";

const BackgroundPage = ({setBgImageSelected, setBackgroundSelected}) => {
    // const chooseImage1 = () => {
    //     setBgImageSelected(1);
    //     console.log('sdfsdfsdf')
    //     setBackgroundSelected(false);
    // }
    // const chooseImage2 = () => {
    //     setBgImageSelected(2);
    //     console.log('sdfsdfsdf')
    //     setBackgroundSelected(false);
    // }
    // const chooseImage3 = () => {
    //     setBgImageSelected(3);
    //     console.log('sdfsdfsdf')
    //     setBackgroundSelected(false);
    // }
    const urls = ['http://192.168.134.125:3000/testdata/images/image1.jpg', 'http://192.168.134.125:3000/testdata/images/image2.jpg', 'http://192.168.134.125:3000/testdata/images/image3.jpg']
    return (
        <div className="p-1">
            <div className="background-page-header">
                Choose Background Page
            </div>
            <div className="background-page-body p-1">
                {/* <img src = 'http://192.168.134.125:3000/testdata/image1.jpg' alt="testimg" width={300} height={200} className="image-card" onClick={chooseImage1}/>
                <img src = 'http://192.168.134.125:3000/testdata/image2.jpg' alt="testimg" width={300} height={200} className="image-card" onClick={chooseImage2}/>
                <img src = 'http://192.168.134.125:3000/testdata/image3.jpg' alt="testimg" width={300} height={200} className="image-card" onClick={chooseImage3}/> */}
                {urls.map((url, index) => {
                    return (<BackgroundCard url = {url} setBgImageSelected={setBgImageSelected} setBackgroundSelected={setBackgroundSelected} index={index} />)
                })}
            </div>
        </div>
    )
}

export default BackgroundPage;