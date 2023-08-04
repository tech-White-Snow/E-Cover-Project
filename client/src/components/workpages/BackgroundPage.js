import React from "react";

import './ImagePagesStyle.css';
import BackgroundCard from "./subtools/BackgroundCard";

const BackgroundPage = ({setBgImageSelected, setBackgroundSelected}) => {
    const urls = ['https://m.aplus.io/app/backgrounds/colorful/024.jpg', 'https://m.aplus.io/app/backgrounds/colorful/030.jpg', 'https://img.freepik.com/free-photo/gelato-ice-cream-shop-logo-with-wrinkled-paper-texture-remixed-media_53876-126835.jpg?size=626&ext=jpg&uid=R110516327&ga=GA1.1.552866607.1689920344&semt=sph']
    return (
        <div className="p-1">
            <div className="background-page-header">
                Choose Background Page
            </div>
            <div className="background-page-body p-1">
                {urls.map((url, index) => {
                    return (<BackgroundCard url = {url} setBgImageSelected={setBgImageSelected} setBackgroundSelected={setBackgroundSelected} index={index} />)
                })}
            </div>
        </div>
    )
}

export default BackgroundPage;