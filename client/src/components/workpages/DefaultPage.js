import React from "react";
import './ImagePagesStyle.css';
import { useSelector } from "react-redux";

const DefaultPage = ({bgImageSelected}) => {
    const {url} = useSelector(state => state.selectBackground);
    console.log(url)
    const noImage = (
        <div style={{width: '400px', height: '500px', backgroundColor: 'white', zIndex: '0'}}></div>
    )
    const image = (
        <div  style={{position: 'relative'}}>
            <img src={url} alt="result" style={{width: '500px', height: '500px'}} />
        </div>
    )
    // const image2 = (
    //     <div  style={{position: 'relative'}}>
    //     <img src="http://192.168.134.125:3000/testdata/image2.jpg" alt="result" style={{width: '800px', height: '450px'}} />
        
    //     </div>
    // )
    // const image3 = (
    //     <div  style={{position: 'relative'}}>
    //     <img src="http://192.168.134.125:3000/testdata/image3.jpg" alt="result" style={{width: '500px', height: '500px'}} />
        
    //     </div>
    // )
    return (
        <div>
            {/* {
                bgImageSelected === 1 ? image1 :
                bgImageSelected === 2 ? image2 : 
                bgImageSelected === 3 ? image3 :
                noImage
            } */}
            {
                bgImageSelected === true ? image : 
                noImage
            }
            
        </div>
    )
}
export default DefaultPage;