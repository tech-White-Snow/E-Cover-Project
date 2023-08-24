import React, { useEffect, useState } from "react";
import './ImagePagesStyle.css'
import { useDispatch, useSelector } from "react-redux";
import { render_start } from "../../actions/render";
import Spinner from "../layout/Spinner";

const FinalizePage = () => {
    const {imageUrl, Selected} = useSelector(state=>state.workingMockup);
    
    const [mockupImage, setMockupImage] = useState();

    const changedImage = useSelector(state=>state.editedImage);

    const result = useSelector(state => state.render_start);

    const [isImg, setIsImg] = useState(false);
   
    const dispatch = useDispatch(); 
    useEffect(() => {
        console.log(changedImage.img);
    }, [changedImage.edited])

    const render = async () => {
        //dispatch(render_start(backgourndData, data));
        setIsImg(true);
        console.log(mockupImage, result.url)
    }
    const noImage = (
        <div style={{width: '150px', height: '200px', backgroundColor: 'white'}}></div>
    )
    const noMockup = (
        <img src={imageUrl} alt="result" className="show-results" style={{width: '400px', height: '300px'}} />
    )
    const final_mockup = (
        <img src={result.url} alt="result" style={{width: '400px', height: '300px'}} />
    )
    return (
        <div>
            <div>
                <div className="download-design-header">Download your Design</div>
                <div className="download-design-body">
                    { !changedImage.img ? noImage :
                        <img src={changedImage.img} alt="result" style={{width: '150px', height: '200px'}} />
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
                    <div className="render-button" onClick={render}>Render Mockup</div>
                </div>
            </div>
        </div>
    )
}

export default FinalizePage;