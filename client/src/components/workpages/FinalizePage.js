import React, { useEffect, useState } from "react";
import './ImagePagesStyle.css'
import './FinalizePage.css'
import { useDispatch, useSelector } from "react-redux";
import { render_start, render_end } from "../../actions/render";
import { Button } from '@mui/material';
import Spinner from "../layout/Spinner";
import axios from 'axios';
import { backendUrl } from "../../utils/Constant";
import ImagePreview from "./subtools/ImagePreview";

const FinalizePage = () => {
    const {imageUrl, Selected, name} = useSelector(state=>state.workingMockup);
    
    const [mockupImage, setMockupImage] = useState();
    const [renderedImage, setRenderedImage] = useState(null);
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
        console.log(body);
        const res = await axios.post(`${backendUrl}/api/ag-psd/render-image`, {imageData, name});
        
        //console.log(res.data);
        const base64ImageData = `data:image/png;base64,${res.data.imageData}`;
       
        setRenderedImage(res.data.imageData)
        dispatch(render_end());
        setRendered(true);
        setIsImg(true);
    }

    const saveJPG = () =>{
        const link = document.createElement('a');
        link.href = `data:image/jpeg;base64,${renderedImage}`;
        link.download = 'MockupImage.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const savePNG = () =>{
        // if(!renderedImage) return;
        // const byteCharacters = atob(renderedImage);
        // const byteNumbers = new Array(byteCharacters.length);
        // for (let i = 0; i < byteCharacters.length; i++) {
        //   byteNumbers[i] = byteCharacters.charCodeAt(i);
        // }
        // const byteArray = new Uint8Array(byteNumbers);
        // const blob = new Blob([byteArray], { type: "image/png" });
        // const url = URL.createObjectURL(blob);
        // const link = document.createElement("a");
        // link.href = url;
        // link.download = "image.png";
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
        const link = document.createElement('a');
        link.href = `data:image/png;base64,${renderedImage}`;
        link.download = 'MockupImage.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const noImage = (
        <div style={{width: '150px', height: '200px', backgroundColor: 'white'}}></div>
    )
    const noMockup = (
        <img src={imageUrl} alt="result" className="show-results" style={{maxWidth: '400px', maxHeight: '250px', width: 'auto', height: 'auto'}} />
    )
    //<img src={renderedImage} alt="result" style={{maxWidth: '350px', maxHeight: '300px', width: 'auto', height: 'auto'}} />
        
    const final_mockup = (
        <ImagePreview imageUrl={`data:image/png;base64,${renderedImage}`} />
    )
    const save = (
        <div className="save-image">  
           
            <Button
                variant="contained" 
                color="success"
                className="save-button"
                style={{
                    margin: "10px",
                    padding: '2px 15px',
                    fontSize: "15px",
                    color: 'white',
                    borderRadius: '8px',
                }}
                onClick={saveJPG}
            >
                Save as JPG
            </Button>
            <Button
                variant="contained" 
                color="success"
                className="save-button"
                style={{
                    margin: "10px",
                    padding: '2px 15px',
                    fontSize: "15px",
                    color: 'white',
                    borderRadius: '8px',
                }}
                onClick={savePNG}
            >
                Save as PNG
            </Button>
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
                </div>
                <div style={{textAlign: 'center'}}>
                   <Button 
                        variant="contained" 
                        color="success"
                        className="render-button"
                        style={{
                            padding: '2px 15px',
                            fontSize: "15px",
                            color: 'white',
                            borderRadius: '8px',
                        }}
                        onClick={render}
                    >Render Mockup</Button>
                    {rendered && isImg ? save : ""}
                </div>
            </div>
        </div>
    )
}

export default FinalizePage;