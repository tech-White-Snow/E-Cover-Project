import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import  {selectMockUp, selectingMockup}  from "../../../actions/mockups";
import axios from "axios";
import { backendUrl } from "../../../utils/Constant";

const MockUpCard = ({mockup, setMockupsSelected}) => {
    const [url, setUrl] = useState();
    const {name} = useSelector(state=>state.workingMockup);
    const [size, setSize] = useState({
      width: 0,
      height: 0
    });

    useEffect(() => { async function getMockup() {

      const res = await axios.get(`${backendUrl}/api/ag-psd/mockup/${mockup}`);

      // const base64Image = btoa(
      //   new Uint8Array(res.data).reduce(
      //     (data, byte) => data + String.fromCharCode(byte),
      //     '',
      //   ),
      // );

      // const imageSrc = `data:image/jpeg;base64,${base64Image}`;
      // //console.log("--respond", res);
      //console.log("--imageSrc", imageSrc);
      setUrl(res.data.thumbnail);
      console.log(res.data)
      setSize({
        width: res.data.width,
        height: res.data.height
      })
    }; getMockup()}, []);

    const dispatch = useDispatch();

    const createWhiteImage = (width, height) => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d');
      context.fillStyle = '#ffffff'; // Set the color to white
      context.fillRect(0, 0, width, height);
      return canvas.toDataURL();
    };
    
    const onClick = async () => {
        setMockupsSelected(false);
        //dispatch(selectMockUp(url));
        const selectedMockup = {
          Selected: true,
          name: mockup,
          width: size.width,
          height: size.height,
          imageUrl: url,
          editImage: createWhiteImage(size.width, size.height)
        }
        
          //console.log(createWhiteImage(width, height))
      
        //localStorage.setItem('selectedMockup', JSON.stringify(selectedMockup));
        dispatch(selectingMockup(selectedMockup));
    }

    let ClassName = "image-card";
    if(name == mockup) ClassName += " selectedMockup";

    return (
        <div >
            <img 
                className = {ClassName}
                src = {url} 
                alt="testimg" 
                width={300} 
                //height={200}  
                onClick={onClick}
                backgroundColor={"#dedede"}
            />
        </div>
    )
}

export default MockUpCard;