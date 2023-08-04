import React, { useEffect, useState } from "react";
import './ImagePagesStyle.css';
import { useSelector } from "react-redux";
import Spinner from '../layout/Spinner';

const DefaultPage = ({bgImageSelected}) => {
    const [muWidth, setMuWidth] = useState(0);
    const [muHeight, setMuHeight] = useState(0);
    // const [bgWidth, setBgWidth] = useState(0);
    // const [bgHeight, setBgHeight] = useState(0);
    let bgWidth;
    let bgHeight;
    // const [dx, setDx] = useState(0);
    // const [dy, setDy] = useState(0);
    let dx;
    let dy;
    const {data} = useSelector(state => state.selectMockUp);
    const {loading} = useSelector(state => state.selectMockUp);
    const bgInfo = useSelector(state => state.selectBackground);
    const bg_loading = bgInfo.loading;
    useEffect(() => {
            console.log(data);
            if(data !== null) {
                console.log('errororororo')
                const image_layer = data.mockup.layers.find(layer => layer.type === 'image');
                setMuWidth(400);
                setMuHeight((400 / image_layer.placeholder.width) * image_layer.placeholder.height);
            } else {
                setMuWidth(0);
                setMuHeight(0);
            }
    }, [data, bgInfo]);
    
    bgWidth = 600;
    bgHeight = 600 / bgInfo.width * bgInfo.height;
    dx = (muWidth - bgWidth) / 2;
    dy = (muHeight - bgHeight) /2;
    
    const noImage = (
        <>
            {loading === true ? (
                <div  className="loading-spinner">
                    <Spinner />
                </div>
            ) : (
                (
                    <div style={{width: `${muWidth}px`, height: `${muHeight}px`, backgroundColor: 'white'}}></div>
                )
            )}
        </>
    )

    const image = (
        // <div  style={{position: 'relative'}}>
            <img src={bgInfo.url} alt="result" style={{zIndex: '100', position: 'absolute', width: `${bgWidth}px`, height: `${bgHeight}px`}} />
        // </div>
    )
    const loadedPage = (
        <div style={{alignItems: "center", justifyContent: "center", zIndex: '0'}}>
            {
                bgImageSelected === true && data !== null ? (
                    <div style={{position: 'relative'}}>
                      <div style={{zIndex: '0', position: "relative", top: '0', left: '0'}}>
                        {noImage}
                      </div>
                      {bg_loading === true ? (   
                            <div  className="loading-spinner">
                                <Spinner />
                            </div>
                        ) : (
                            <div style={{zIndex: '100', position: 'absolute', top: `${dy}px`, left: `${dx}px`,  width: `${bgWidth}px`, height: `${bgHeight}px`, opacity: '0.5'}}>
                                {image}
                            </div>
                        )}
                      
                    </div>
                ) : 
                data === null && bgImageSelected === false ? (
                    <h1>Please Choose your Mock Up</h1>
                ) : noImage
            }
            
        </div>
    )
    return (
        <div>
            
            {loadedPage}
            
        </div>
    )
}
export default DefaultPage;