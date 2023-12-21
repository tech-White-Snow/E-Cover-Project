import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from '@mui/material';
import  { selectingMockup}  from "../../../actions/mockups";

import axios from 'axios';
import { backendUrl } from "../../../utils/Constant";
import { togglePlugCover } from "../../../actions/editedImage";

const CoverCard = ({
    coverId, 
    mockup, 
    renderedImage, 
    designState, 
    setMyCoversSelected,
    setLoadPreDesign
}) => {
    
    const dispatch = useDispatch();
    const {_id} = useSelector(state=>state.auth.user);

    const onClick = async () => {
        setMyCoversSelected(false);
        setLoadPreDesign({
            renderedImage, 
            designState,
        })
        dispatch(selectingMockup(mockup));
    }

    const deleteCover = async () => {
        try{
            const res = await axios.delete(`${backendUrl}/api/ag-psd/cover/${_id}`, { data: {coverId,} });
            dispatch(togglePlugCover());
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div style={{
            position: 'relative'
        }}>
            <img 
                className = "image-card"
                //src = {`https://fadaimageupload.s3.amazonaws.com/${mockup}.png`} 
                src = {`data:image/png;base64, ${renderedImage}`}
                alt="My covers Image" 
                width="500px"
                style={{
                    paddingRight: "20px",
                    width: "170px"
                }}
                onClick={onClick}
            />
              <Button 
                variant="contained" 
                color="success"
                className="cover-button"
                style={{
                    padding: '2px 10px',
                    fontSize: "15px",
                    color: 'white',
                    borderRadius: '8px',
                    minWidth: '40px!important',
                    position: 'absolute',
                    top: '5px',
                    right: '5px'
                }}
                onClick={deleteCover}
            >Delete</Button>
        </div>
    )
}

export default CoverCard;