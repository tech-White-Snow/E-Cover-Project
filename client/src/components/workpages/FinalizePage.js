import React, { useEffect, useState } from "react";
import './ImagePagesStyle.css'
import { useDispatch, useSelector } from "react-redux";
import { render_start } from "../../actions/render";
import Spinner from "../layout/Spinner";

const MockupsPage = () => {
    const backgourndData = useSelector(state => state.selectBackground);
    const {data} = useSelector(state => state.selectMockUp);
    const [mockupImage, setMockupImage] = useState();
    const bgIndex = backgourndData.index;
    const bgURL = backgourndData.url;
    const result = useSelector(state => state.render_start);
    function getMockUpURL(data) {
        if (data === null) {return null;}
        else {return data.mockup.image};
    }
    const muURL = getMockUpURL(data);
    const [isImg, setIsImg] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        setIsImg(false);
        console.log(data)
        if (data !== null) { setMockupImage(data.mockup.image); }
    }, [bgIndex, data])
    const render = async () => {
        dispatch(render_start(backgourndData, data));
        setIsImg(true);
        console.log(mockupImage, result.url)
    }
    const noImage = (
        <div style={{width: '150px', height: '200px', backgroundColor: 'white'}}></div>
    )
    const noMockup = (
        <img src={mockupImage} alt="result" className="show-results" style={{width: '400px', height: '300px'}} />
    )
    const final_mockup = (
        <img src={result.url} alt="result" style={{width: '400px', height: '300px'}} />
    )
    return (
        <div>
            <div>
                <div className="download-design-header">Download your Design</div>
                <div className="download-design-body">
                    {bgURL === null ? noImage :
                        <img src={bgURL} alt="result" style={{width: '150px', height: '200px'}} />
                    }
                </div>
            </div>
            <div>
                <div className="download-design-header">Download 3D Mockup</div>
                <div className="download-3Dmockup-body">
                    {result.loading === true ? <div style={{height: '300px'}}><Spinner /></div> : (
                        <div className="download-3Dmockup-body">
                            {
                                muURL === null ? <div>Your Mock up is blank</div> : 
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

export default MockupsPage;