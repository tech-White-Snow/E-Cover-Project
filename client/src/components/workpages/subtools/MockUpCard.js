import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import  { selectingMockup}  from "../../../actions/mockups";
import { PUBLIC_URL } from "../../../utils/Constant";

const MockUpCard = ({mockup, mockupData, setMockupsSelected}) => {
    const imagePath = PUBLIC_URL + `/mockup/${mockup}.png`;
    const [url, setUrl] = useState(imagePath);
    const {name} = useSelector(state=>state.workingMockup);
    const [size, setSize] = useState({
      width: mockupData.width,
      height: mockupData.height,
      psdWidth: mockupData.psdWidth,
      psdHeight: mockupData.psdHeight,
      rectTransform: mockupData.rectTransform,
      spineTransform: mockupData.spineTransform,
    });
    const [spin, setSpin] = useState({
      ifSpin: mockupData.ifSpin,
      spinWidth: mockupData.spinWidth
    });

    // useEffect(() => { async function getMockup() {
    //   //const res = await axios.get(`${backendUrl}/api/ag-psd/mockup/${mockup}`);

    //   // const base64Image = btoa(
    //   //   new Uint8Array(res.data).reduce(
    //   //     (data, byte) => data + String.fromCharCode(byte),
    //   //     '',
    //   //   ),
    //   // );

    //   // const imageSrc = `data:image/jpeg;base64,${base64Image}`;
    //   // //console.log("--respond", res);
    //   //console.log("--imageSrc", imageSrc);
    //   // setUrl(`data:image/png;base64,${res.data.thumbnail}`);
    //   //setUrl(imagePath);
    //   //console.log(res.data)
    //   setSize({
    //     width: res.data.width,
    //     height: res.data.height,
    //     psdWidth: res.data.psdWidth,
    //     psdHeight: res.data.psdHeight,
    //   })
    //   setSpin({
    //     ifSpin: res.data.ifSpin,
    //     spinWidth: res.data.spinWidth
    //   })
    // }; getMockup()}, []);

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

        context.font = '15px Arial'; // Set the font size and type
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
          loading: false,
          rendered: false,
          Selected: true,
          name: mockup,
          width: size.width,
          height: size.height,
          psdHeight: size.psdHeight,
          psdWidth: size.psdWidth,
          ifSpin: spin.ifSpin,
          spinWidth: spin.spinWidth,
          imageUrl: url,
          rectTransform: size.rectTransform,
          spineTransform: size.spineTransform,
          editImage: createWhiteImage(size.width, size.height)
        }

        dispatch(selectingMockup(selectedMockup));
    }

    let ClassName = "image-card";
    if(name == mockup) ClassName += " selectedMockup";

    return (
        <div >
            <img 
                className = {ClassName}
                //src = {`https://fadaimageupload.s3.amazonaws.com/${mockup}.png`} 
                src = {url}
                alt="testimg" 
                width={300} 
                //height={200}  
                onClick={onClick}
            />
        </div>
    )
}

export default MockUpCard;