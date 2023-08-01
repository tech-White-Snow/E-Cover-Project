import React, { useEffect, useState } from "react";
import './ImagePagesStyle.css'
import { useSelector } from "react-redux";

const MockupsPage = ({bgImageSelected}) => {
    const backgourndData = useSelector(state => state.selectBackground);
    const bgIndex = backgourndData.index;
    const bgURL = backgourndData.url;
    const mockupData = useSelector(state => state.selectMockUp);
    const muIndex = mockupData.index;
    const muURL = mockupData.url;
    const [isImg, setIsImg] = useState(false);
    // const [mockup, setMockup] = useState(0);
    useEffect(() => {
        setIsImg(false);
        

    }, [bgIndex, muIndex])
    const render = () => {
        console.log(bgIndex, bgURL, muIndex, muURL, resultURL)
        setIsImg(true);
    }
    // const image1 = (
    //     <img src="http://192.168.134.125:3000/testdata/image1.jpg" alt="result" style={{width: '150px', height: '200px'}} />
    // )
    // const image2 = (
    //     <img src="http://192.168.134.125:3000/testdata/image2.jpg" alt="result" style={{width: '150px', height: '200px'}} />
    // )
    // const image3 = (
    //     <img src="http://192.168.134.125:3000/testdata/image3.jpg" alt="result" style={{width: '150px', height: '200px'}} />
    // )
    const noImage = (
        <div style={{width: '150px', height: '200px', backgroundColor: 'white'}}></div>
    )
    // const mockupImg1 = (
    //     <img src="http://192.168.134.125:3000/testdata/test_result1.png" alt="result" className="show-results" />
    // )
    // const mockupImg2 = (
    //     <img src="http://192.168.134.125:3000/testdata/test_result2.png" alt="result" className="show-results" />
    // )
    // const mockupImg3 = (
    //     <img src="http://192.168.134.125:3000/testdata/test_result3.png" alt="result" className="show-results" />
    // )
    const noMockup = (
        <img src={muURL} alt="result" className="show-results" style={{width: '400px', height: '300px'}} />
    )
    const resultURL = `http://192.168.134.125:3000/testdata/results/test_result_${muIndex+1}_${bgIndex+1}.png`;
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
                    {/* {index === 0 && isImg === true ? mockupImg1
                     : index === 1 && isImg === true ? mockupImg2 
                     : index === 2 && isImg === true ? mockupImg3 : noMockup} */}
                    {muURL === null ? <div>Your Mock up is blank</div> : 
                     isImg === false ? noMockup : 
                     bgURL === null ? <div>Your Background Image is blank</div> :   
                    (
                        <img src={resultURL} alt="result" style={{width: '400px', height: '300px'}} />
                    )}
                    <div className="render-button" onClick={render}>Render Mockup</div>
                </div>
            </div>
        </div>
    )
}

export default MockupsPage;