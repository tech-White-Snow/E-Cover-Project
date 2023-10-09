import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import  {selectMockUp, selectingMockup}  from "../../../actions/mockups";
import axios from "axios";
import { backendUrl } from "../../../utils/Constant";
import mockupsImage from '../../../img/mockups.jpg';

const MockUpCard = ({mockup, setMockupsSelected}) => {
    const [url, setUrl] = useState(mockupsImage);
    const {name} = useSelector(state=>state.workingMockup);
    const [size, setSize] = useState({
      width: 0,
      height: 0
    });
    const [spin, setSpin] = useState({
      ifSpin: false,
      spinWidth: 0
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
      setUrl(`data:image/png;base64,${res.data.thumbnail}`);
      //console.log(res.data)
      setSize({
        width: res.data.width,
        height: res.data.height
      })
      setSpin({
        ifSpin: res.data.ifSpin,
        spinWidth: res.data.spinWidth
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
      if(spin.ifSpin){
        // Draw the dotted line
        context.strokeStyle = 'black'; // Set the line color to black
        context.setLineDash([5, 5]); // Set the line dash pattern
        context.beginPath();
        context.moveTo(spin.spinWidth, 0); // Starting point
        context.lineTo(spin.spinWidth, size.height); // Ending point
        context.stroke();

        context.font = '24px Arial'; // Set the font size and type
        context.fillStyle = 'black'; // Set the text color
        context.textBaseline = 'top'; // Set the vertical alignment
        context.fillText(`Spine ${spin.spinWidth}px`, spin.spinWidth, 5); // Draw the text on the canvas
    }
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
          ifSpin: spin.ifSpin,
          spinWidth: spin.spinWidth,
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