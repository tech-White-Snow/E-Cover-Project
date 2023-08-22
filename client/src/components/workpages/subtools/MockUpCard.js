import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import  {selectMockUp}  from "../../../actions/mockups";
import axios from "axios";
import { backendUrl } from "../../../utils/Constant";

const MockUpCard = ({mockup, setMockupsSelected}) => {
    const [url, setUrl] = useState();
    useEffect(() => { async function getMockup() {
        // const options = {
        //     method: 'GET',
        //     url: `https://api.mediamodifier.com/mockup/nr/${nr}`,
        //     headers: {Accept: 'application/json', api_key: '7279b6bf-f931-4b94-a7bd-05deb552e3cb'}
        // };
        // const {data} = await axios.request(options);
        // console.log(data.mockup.image)
        // setUrl(data.mockup.image);
        
        

    //     console.log('request');
      console.log(mockup);
      const res = await axios.get(`${backendUrl}/api/ag-psd/mockup/${mockup}`, { responseType: 'arraybuffer' });
    //     console.log(res);
    //    // const imageURL = URL.createObjectURL(res.data.image.obj);
    //     setUrl(res.data);
    //  console.log(res.data);
      console.log(mockup);
      const base64Image = btoa(
        new Uint8Array(res.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          '',
        ),
      );

      const imageSrc = `data:image/jpeg;base64,${base64Image}`;
      console.log("--respond", res);
      console.log("--imageSrc", imageSrc);
      setUrl(imageSrc);

    }; getMockup()}, []);
    const dispatch = useDispatch();
    const onClick = async () => {
        setMockupsSelected(false);
        dispatch(selectMockUp(url));
    }

    return (
        <div>
            <img 
                src = {url} 
                alt="testimg" 
                width={300} 
                //height={200} 
                className="image-card" 
                onClick={onClick}
                backgroundColor={"#dedede"}
            />
        </div>
    )
}

export default MockUpCard;