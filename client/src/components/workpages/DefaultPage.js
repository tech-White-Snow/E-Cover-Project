import React from "react";
import './ImagePagesStyle.css';
import { useSelector } from "react-redux";

const DefaultPage = ({bgImageSelected}) => {
    const mockupInfo = useSelector(state => state.selectMockUp);
    const bgInfo = useSelector(state => state.selectBackground);
    console.log(bgInfo);
    let muWidth = 400;
    // let muHeight = (400 / mockupInfo.width) * mockupInfo.height;
    let muHeight = 500;
    let bgWidth = 600;
    let bgHeight = (600 / bgInfo.width) * bgInfo.height;
    let dx = (muWidth - bgWidth) / 2;
    let dy = (muHeight - bgHeight) /2;
    const noImage = (
        <div style={{width: `${muWidth}px`, height: `${muHeight}px`, backgroundColor: 'white'}}></div>
    )
    const image = (
        // <div  style={{position: 'relative'}}>
            <img src={bgInfo.url} alt="result" style={{zIndex: '100', position: 'absolute', width: `${bgWidth}px`, height: `${bgHeight}px`}} />
        // </div>
    )
    return (
        <div style={{alignItems: "center", justifyContent: "center"}}>
            {
                bgImageSelected === true && mockupInfo !== null ? (
                    <div style={{position: 'relative'}}>
                      <div style={{zIndex: '0', position: "relative", top: '0', left: '0'}}>
                        {noImage}
                      </div>
                      <div style={{zIndex: '100', position: 'absolute', top: `${dy}px`, left: `${dx}px`,  width: `${bgWidth}px`, height: `${bgHeight}px`, opacity: '0.5'}}>
                        {image}
                      </div>
                    </div>
                ) : 
                mockupInfo === null && bgImageSelected === false ? (
                    <h1>Please Choose your Mock Up</h1>
                ) : noImage
            }
            
        </div>
    )
}
export default DefaultPage;