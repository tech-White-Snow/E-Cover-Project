import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import  {selectMockUp}  from "../../../actions/mockups";
import axios from "axios";

const MockUpCard = ({nr, setMockupsSelected}) => {
    const [url, setUrl] = useState();
    useEffect(() => { async function getMockup() {
        const options = {
            method: 'GET',
            url: `https://api.mediamodifier.com/mockup/nr/${nr}`,
            headers: {Accept: 'application/json', api_key: '3b9a8454-342b-4f2d-810f-26098524e34d'}
        };
        const {data} = await axios.request(options);
        console.log(data)
        setUrl(data.mockup.image);
    }; getMockup()}, []);
    const dispatch = useDispatch();
    const onClick = async () => {
        setMockupsSelected(false);
        dispatch(selectMockUp(nr));
    }
    return (
    <div>
        <img src = {url} alt="testimg" width={300} height={200} className="image-card" onClick={onClick}/>
    </div>
    )
}

export default MockUpCard;