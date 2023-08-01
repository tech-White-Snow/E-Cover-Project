import React from "react";
import { useDispatch } from "react-redux";
import  {selectMockUp}  from "../../../actions/mockups";

const MockUpCard = ({url, setMockupsSelected, index}) => {
    const dispatch = useDispatch()
    const onClick = () => {
        setMockupsSelected(false);
        dispatch(selectMockUp(url, index));
        console.log(url,index)
    }
    return (
    <div>
        <img src = {url} alt="testimg" width={300} height={200} className="image-card" onClick={onClick}/>
    </div>
    )
}

export default MockUpCard;