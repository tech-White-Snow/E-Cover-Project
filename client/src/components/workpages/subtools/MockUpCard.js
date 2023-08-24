import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import  {selectMockUp, selectingMockup}  from "../../../actions/mockups";
import axios from "axios";
import { backendUrl } from "../../../utils/Constant";

const MockUpCard = ({mockup, setMockupsSelected}) => {
    const [url, setUrl] = useState();
    const {name} = useSelector(state=>state.workingMockup);

    useEffect(() => { async function getMockup() {

      const res = await axios.get(`${backendUrl}/api/ag-psd/mockup/${mockup}`, { responseType: 'arraybuffer' });

      const base64Image = btoa(
        new Uint8Array(res.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          '',
        ),
      );

      const imageSrc = `data:image/jpeg;base64,${base64Image}`;
      //console.log("--respond", res);
      //console.log("--imageSrc", imageSrc);
      setUrl(imageSrc);
    }; getMockup()}, []);

    const dispatch = useDispatch();
    const onClick = async () => {
        setMockupsSelected(false);
        dispatch(selectMockUp(url));

        let image = new Image();
        image.src = url;
        const widthMockup = image.width;
        const heightMockup = image.height;
        
        const selectedMockup = {
          Selected: true,
          name: mockup,
          width: widthMockup,
          height: heightMockup,
          imageUrl: url
        }

        localStorage.setItem('selectedMockup', JSON.stringify(selectedMockup));
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