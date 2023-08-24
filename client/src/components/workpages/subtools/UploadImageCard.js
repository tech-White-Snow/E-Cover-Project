import React from "react";
import { useDispatch } from "react-redux";
import  {selectBackground}  from "../../../actions/background";

const UploadImageCard = ({url, setBgImageSelected, setUploadImagesSelected,setBackgroundSelected, index}) => {
    
    const dispatch = useDispatch()
    const onClick = () => {
        setUploadImagesSelected(false);
        // setBgImageSelected(true);
        // setBackgroundSelected(false);
        // dispatch(selectBackground(url, index));
        // console.log(url,index)
    }
    return (
        <div>
            <img src = {url} alt="testimg"  className="image-card" onClick={onClick}/>
        </div>
    )
}

export default UploadImageCard;