import React, { useEffect, useState } from "react";
import './ImagePagesStyle.css'
import './FinalizePage.css'
import { useDispatch, useSelector } from "react-redux";
import { render_start, render_end } from "../../actions/render";
import { Button, Slider } from '@mui/material';
import Spinner from "../layout/Spinner";
import axios from 'axios';
import { backendUrl } from "../../utils/Constant";
import ImagePreview from "./subtools/ImagePreview";
import Resizer from 'react-image-file-resizer';
import { checkSignature } from "ag-psd/dist/psdReader";

const FinalizePage = () => {
    const {imageUrl, Selected, name, psdWidth, psdHeight} = useSelector(state=>state.workingMockup);
    
    const [mockupImage, setMockupImage] = useState();
    const [renderedImage, setRenderedImage] = useState(null);
    const [rendered, setRendered] = useState(false);
    const [changedImage, setChangedImage] = useState({
        img: '',
    });
    const editedImage = useSelector(state=>state.editedImage);

    const result = useSelector(state => state.render_start);

    const [isImg, setIsImg] = useState(false);
    const [valueSlider, setValueSlider] = useState(1);
   
    const dispatch = useDispatch(); 

    useEffect(()=>{
        if(editedImage.img){
            const file = convertDataUrlToFile(editedImage.img, "edited.jpg");
            //console.log(file);
            // setChangedImage({
            //     img: editedImage.img})
            try {
                Resizer.imageFileResizer(
                file,
                8000,
                8000,
                "JPEG",
                95,
                0,
                (uri) => {
                    //console.log(uri);
                    setChangedImage({
                        img: uri})
                },
                "base64",
                200,
                200
                );
            } catch (err) {
                console.log(err);
            }
        }
    },[editedImage]);

    useEffect(()=>{
        setIsImg(false);
    }, [imageUrl]);
    
    const handleSliderChange = (event, newValue) =>{
        if (typeof newValue === 'number') {
            setValueSlider(newValue);
          }
    }

    const valueLabelFormat = (value) =>{
        return `X ${value}`
    }

    const convertDataUrlToFile = (dataUrl, filename) => {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        const blob = new Blob([u8arr], { type: mime });
        return new File([blob], filename, { type: mime });
    }

    const render = async () =>{
        try{
            dispatch(render_start());
            setIsImg(false);
            const imageData = changedImage.img;
            //console.log(imageData)
            console.log('Origin Image Size:', imageData.length, 'bytes');
            const config = {
                headers: {
                'Content-Type': 'application/json',
                },
            };
            const body = JSON.stringify({ imageData });
            //console.log(body);
            const res = await axios.post(`${backendUrl}/api/ag-psd/render-image`, {imageData, name});
            
            //console.log(res.data.imageData);
            const base64ImageData = `data:image/png;base64,${res.data.imageData}`;
        
            console.log('Rendered Image Size:', res.data.imageData.length, 'bytes');
            setRenderedImage(res.data.imageData);
            dispatch(render_end());
            setRendered(true);
            setIsImg(true);
        }catch(err){
            console.log(err);
        }
    }

    const saveJPG = async () =>{
        const link = document.createElement('a');
        const file = convertDataUrlToFile(`data:image/jpeg;base64,${renderedImage}`, "rendered.jpg");
        try {
            await Resizer.imageFileResizer(
              file,
              valueSlider*psdWidth,
              valueSlider*psdHeight,
              "JPEG",
              100,
              0,
              (uri) => {
                link.href = uri;
                link.download = 'MockupImage.jpg';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              },
              "base64",
              valueSlider*psdWidth,
              valueSlider*psdHeight,
            );
        } catch (err) {
            link.href = `data:image/jpeg;base64,${renderedImage}`;
            link.download = 'MockupImage.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            console.log(err);
        }
    }

    const savePNG = async () =>{
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
        const file = convertDataUrlToFile(`data:image/png;base64,${renderedImage}`, "rendered.png");
        try {
            await Resizer.imageFileResizer(
              file,
              valueSlider*psdWidth,
              valueSlider*psdHeight,
              "PNG",
              100,
              0,
              (uri) => {
                link.href = uri;
                link.download = 'MockupImage.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              },
              "base64",
              valueSlider*psdWidth,
              valueSlider*psdHeight,
            );
        } catch (err) {
            link.href = `data:image/png;base64,${renderedImage}`;
            link.download = 'MockupImage.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            console.log(err);
        }
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
           <div style = {{width: '80%', margin: 'auto', marginTop: '40px'}}>
                        <Slider
                            padding="0px"
                            value={valueSlider}
                            defaultValue={1}
                            min={0.5}
                            step={0.1}
                            max={2}
                            // scale={calculateValue}
                            getAriaValueText={valueLabelFormat}
                            valueLabelFormat={valueLabelFormat}
                            onChange={handleSliderChange}
                            valueLabelDisplay="on"
                        />
                    </div>
            <Button
                variant="contained" 
                color="success"
                className="save-button"
                style={{
                    margin: "0px 10px",
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
                    margin: "0px 10px",
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