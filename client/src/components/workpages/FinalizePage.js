import React, { useEffect, useState } from "react";
import './ImagePagesStyle.css'
import './FinalizePage.css'
import { useDispatch, useSelector } from "react-redux";
import { render_start, render_end } from "../../actions/render";
import Spinner from "../layout/Spinner";
import axios from 'axios';
import { backendUrl } from "../../utils/Constant";

const FinalizePage = () => {
    const {imageUrl, Selected, name} = useSelector(state=>state.workingMockup);
    
    const [mockupImage, setMockupImage] = useState();
    const [renderedImage, setRenderedImage] = useState("");
    const [rendered, setRendered] = useState(false);
    const changedImage = useSelector(state=>state.editedImage);

    const result = useSelector(state => state.render_start);

    const [isImg, setIsImg] = useState(false);
   
    const dispatch = useDispatch(); 

    useEffect(()=>{
        setIsImg(false);
    }, [imageUrl]);
    const render = async () => {
        dispatch(render_start());
        setIsImg(true);
        const imageData = changedImage.img;
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          };
        const body = JSON.stringify({ imageData });
        const res = await axios.post(`${backendUrl}/api/ag-psd/render-image`, {imageData, name});
        
        console.log(res.data);
        setRenderedImage(res.data.thumbnail)
        dispatch(render_end());
        setRendered(true);
        setIsImg(true);
    }

    const saveJPG = () =>{

    }

    const savePNG = () =>{
        
    }

    const noImage = (
        <div style={{width: '150px', height: '200px', backgroundColor: 'white'}}></div>
    )
    const noMockup = (
        <img src={imageUrl} alt="result" className="show-results" style={{maxWidth: '400px', maxHeight: '300px', width: 'auto', height: 'auto'}} />
    )
    const final_mockup = (
        <img src={renderedImage} alt="result" style={{maxWidth: '400px', maxHeight: '300px', width: 'auto', height: 'auto'}} />
    )
    const save = (
        <div className="save-image">  
            <div 
                className="save-button" 
                onClick={saveJPG}>
                    Save as JPG
            </div>
            <div 
                className="save-button" 
                onClick={savePNG}>
                    Save as PNG
            </div>
        </div>
    );
    return (
        <div>
            <div>
                <div className="download-design-header">Download your Design</div>
                <div className="download-design-body">
                    { !changedImage.img ? noImage :
                        <img src={changedImage.img} alt="result" style={{maxWidth: '350px', maxHeight: '220px', width: 'auto', height: 'auto'}} />
                    }
                </div>
            </div>
            <div>
                <div className="download-design-header">Download 3D Mockup</div>
                <div className="download-3Dmockup-body">
                    {result.loading === true ? <div style={{height: '300px'}}><Spinner /></div> : (
                        <div className="download-3Dmockup-body">
                            {
                                Selected === null ? <div>Your Mock up is blank</div> : 
                                isImg === false ? noMockup : final_mockup
                            }
                        </div>
                    )}
                    <div className="render-button" onClick={render}>{isImg ? "Rerender Mockup" : "Render Mockup"}</div>
                    {rendered && isImg ? save : ""}
                </div>
            </div>
        </div>
    )
}

export default FinalizePage;