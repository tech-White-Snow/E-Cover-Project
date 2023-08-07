import React, { useState } from 'react';

import MyCoverPage from '../workpages/MyCoverPage'
import MockupsPage from '../workpages/MockupsPage'
import BackgroundPage from '../workpages/BackgroundPage'
import AIImagePage from '../workpages/AIImagesPage'
import AddTextPage from '../workpages/AddTextPage'
import StockImagePage from '../workpages/StockImagesPage'
import UploadImagePage from '../workpages/UploadImagesPage'
import FinalizePage from '../workpages/FinalizePage'
import InsertImagePage from '../workpages/InsertImagePage'
import DefaultPage from '../workpages/DefaultPage'

import './designStyle.css';

const CreateCover = () => {
  //Transform pages
  const[backgoundSelected, setBackgroundSelected] = useState(false);
  const[mockupsSelected, setMockupsSelected] = useState(false);
  const[finalizeSelected, setFinalizeSelected] = useState(false);
  const[myConversSelected, setMyConversSelected] = useState(false);
  const[addTextSelected, setAddTextSelected] = useState(false);
  const[aiImagesSelected, setAIImagesSelected] = useState(false);
  const[insertImagesSelected, setInsertImagesSelected] = useState(false);
  const[stockImagesSelected, setStockImagesSelected] = useState(false);
  const[uploadImagesSelected, setUploadImagesSelected] = useState(false);

  //Transform pages actions
  const myCoversClicked = () => {
    console.log('My conver clicked');
    setMyConversSelected(!myConversSelected);
    setMockupsSelected(false);
    setAddTextSelected(false);
    setAIImagesSelected(false);
    setInsertImagesSelected(false);
    setStockImagesSelected(false);
    setUploadImagesSelected(false);
    setFinalizeSelected(false);
    setBackgroundSelected(false);
  }
  const mockupsClicked = () => {
    console.log('Mockups clicked');
    setMyConversSelected(false);
    setMockupsSelected(!mockupsSelected);
    setAddTextSelected(false);
    setAIImagesSelected(false);
    setInsertImagesSelected(false);
    setStockImagesSelected(false);
    setUploadImagesSelected(false);
    setFinalizeSelected(false);
    setBackgroundSelected(false);
  }
  const backgroundClicked = () => {
    console.log('Background clicked');
    setMyConversSelected(false);
    setMockupsSelected(false);
    setAddTextSelected(false);
    setAIImagesSelected(false);
    setInsertImagesSelected(false);
    setStockImagesSelected(false);
    setUploadImagesSelected(false);
    setFinalizeSelected(false);
    setBackgroundSelected(!backgoundSelected);
  }
  // const addTextHovered = () => {
  //   setAddTextSelected(true);
  // }
  // const addTextOut = () => {
  //   setAddTextSelected(false);
  // }
  const addTextClicked = () => {
    setAddTextSelected(!addTextSelected);
  }
  const aiImagesClicked = () => {
    console.log('AI Images clicked');
    setMyConversSelected(false);
    setMockupsSelected(false);
    setAddTextSelected(false);
    setAIImagesSelected(!aiImagesSelected);
    setInsertImagesSelected(false);
    setStockImagesSelected(false);
    setUploadImagesSelected(false);
    setFinalizeSelected(false);
    setBackgroundSelected(false);
  }
  const insertImagesClicked = () => {
    console.log('Insert Images clicked');
    setMyConversSelected(false);
    setMockupsSelected(false);
    setAddTextSelected(false);
    setAIImagesSelected(false);
    setInsertImagesSelected(!insertImagesSelected);
    setStockImagesSelected(false);
    setUploadImagesSelected(false);
    setFinalizeSelected(false);
    setBackgroundSelected(false);
  }
  const stockImagesClicked = () => {
    console.log('Stock Images clicked');
    setMyConversSelected(false);
    setMockupsSelected(false);
    setAddTextSelected(false);
    setAIImagesSelected(false);
    setInsertImagesSelected(false);
    setStockImagesSelected(!stockImagesSelected);
    setUploadImagesSelected(false);
    setFinalizeSelected(false);
    setBackgroundSelected(false);
  }
  const uploadImagesClicked = () => {
    console.log('Upload Images clicked');
    setMyConversSelected(false);
    setMockupsSelected(false);
    setAddTextSelected(false);
    setAIImagesSelected(false);
    setInsertImagesSelected(false);
    setStockImagesSelected(false);
    setUploadImagesSelected(!uploadImagesSelected);
    setFinalizeSelected(false);
    setBackgroundSelected(false);
  }
  const finalizeClicked = () => {
    console.log('Finalize clicked');
    setMyConversSelected(false);
    setMockupsSelected(false);
    setAddTextSelected(false);
    setAIImagesSelected(false);
    setInsertImagesSelected(false);
    setStockImagesSelected(false);
    setUploadImagesSelected(false);
    setFinalizeSelected(!finalizeSelected);
    setBackgroundSelected(false);
  }

  //Select Attributes
  const[bgImageSelected, setBgImageSelected] = useState(0);

  //Create default page
  const defaultPage = (
    <DefaultPage bgImageSelected={bgImageSelected} />
  )

  //Create My Cover Page
  const myCoverPage = (
    myConversSelected === true ? (
      <div className='show-extrapage'>
        <MyCoverPage />
      </div>
    ) : (
      <div className='hidden-extrapage'>
        
      </div>
    )
  )

  //Create Mock ups Page
  const mockUpsPage = (
    mockupsSelected === true ? (
      <div className='show-extrapage'>
        <MockupsPage setMockupsSelected={setMockupsSelected} />
      </div>
    ) : (
      <div className='hidden-extrapage'>
        <MockupsPage />
      </div>
    )
  )

  //Create My Background Page
  const backgroundPage = (
    backgoundSelected === true ? (
      <div className='show-extrapage'>
        <BackgroundPage setBgImageSelected = {setBgImageSelected} setBackgroundSelected = {setBackgroundSelected} setUploadImagesSelected = {setUploadImagesSelected} />
      </div>
    ) : (
      <div className='hidden-extrapage'>
        <BackgroundPage />
      </div>
    )
  )

  //Create Add Text Page
  const addTextPage = (
    addTextSelected === true ? (
      <div className='show-text-component'>
        <AddTextPage
            setAddTextSelected={setAddTextSelected}
            setMyConversSelected={setMyConversSelected}
            setMockupsSelected={setMockupsSelected}
            setAIImagesSelected={setAIImagesSelected}
            setInsertImagesSelected={setInsertImagesSelected}
            setStockImagesSelected={setStockImagesSelected}
            setUploadImagesSelected={setUploadImagesSelected}
            setFinalizeSelected={setFinalizeSelected}
            setBackgroundSelected={setBackgroundSelected}
         />
      </div>
    ) : (
      <div className='hidden-text-component'>
        
      </div>
    )
  )

  //Create AI Images Page
  const aiImagePage = (
    aiImagesSelected === true ? (
      <div className='show-extrapage'>
        <AIImagePage />
      </div>
    ) : (
      <div className='hidden-extrapage'>
        
      </div>
    )
  )

  //Create Insert Images Page
  const insertImagePage = (
    insertImagesSelected === true ? (
      <div className='show-extrapage'>
        <InsertImagePage />
      </div>
    ) : (
      <div className='hidden-extrapage'>
        
      </div>
    )
  )

  //Create Stock Images Page
  const stockImagesPage = (
    stockImagesSelected === true ? (
      <div className='show-extrapage'>
        <StockImagePage />
      </div>
    ) : (
      <div className='hidden-extrapage'>
        
      </div>
    )
  )

  //Create Upload Images Page
  const uploadImagePage = (
    uploadImagesSelected === true ? (
      <div className='show-extrapage'>
        <UploadImagePage setBgImageSelected = {setBgImageSelected} setUploadImagesSelected = {setUploadImagesSelected} />
      </div>
    ) : (
      <div className='hidden-extrapage'>
        
      </div>
    )
  )

  //Create Finalize Page
  const finalizePage = (
    finalizeSelected === true ? (
      <div className='show-finalizepage'>
        <FinalizePage bgImageSelected = {bgImageSelected} />
      </div>
    ) : (
      <div className='hidden-finalizepage'>
        <FinalizePage bgImageSelected = {bgImageSelected} />
      </div>
    )
  )

  return(
    <div className='blackboard w-full flex-col h-full'>
      <div className='text-white top-toolbar' style={{height: '50px'}}>
        
      </div>
      <div className='flex h-full'>
        <div className='flex-col text-white left-toolbar'>
          <div className='myicons justify-center text-center items-center' onClick={myCoversClicked}>
            <img src='https://app.myecovermaker.com/app/images/icons/mymockups.png' style={{width: '35px', height: '35px', marginLeft: '30px'}} alt='mycovers' />
            <small className='text-sky-600'>
              My Covers
            </small>
          </div>
          <div className='myicons justify-center text-center items-center' onClick={mockupsClicked}>
            <img src='https://app.myecovermaker.com/app/images/icons/mockups.png' style={{width: '35px', height: '35px', marginLeft: '30px'}} alt='mycovers' />
            <small className='text-sky-600'>
              Mockups
            </small>
          </div>
          <div className='myicons justify-center text-center items-center' onClick={backgroundClicked}>
            <img src='https://app.myecovermaker.com/app/images/icons/backgrounds.png' style={{width: '35px', height: '35px', marginLeft: '30px'}} alt='mycovers' />
            <small className='text-sky-600'>
              Background
            </small>
          </div>
          <div className='myicons justify-center text-center items-center' onClick={addTextClicked} >
            <img src='https://app.myecovermaker.com/app/images/icons/text.png' style={{width: '35px', height: '35px', marginLeft: '30px'}} alt='mycovers' />
            <small className='text-sky-600'>
              Add Text
            </small>
          </div>
          <div className='myicons justify-center text-center items-center' onClick={aiImagesClicked}>
            <img src='https://app.myecovermaker.com/app/images/icons/ai.png' style={{width: '35px', height: '35px', marginLeft: '30px'}} alt='mycovers' />
            <small className='text-sky-600'>
              AI Images
            </small>
          </div>
          <div className='myicons justify-center text-center items-center' onClick={insertImagesClicked}>
            <img src='https://app.myecovermaker.com/app/images/icons/graphics.png' style={{width: '35px', height: '35px', marginLeft: '30px'}} alt='mycovers' />
            <small className='text-sky-600'>
              Insert Images
            </small>
          </div>
          <div className='myicons justify-center text-center items-center' onClick={stockImagesClicked}>
            <img src='https://app.myecovermaker.com/app/images/icons/images.png' style={{width: '35px', height: '35px', marginLeft: '30px'}} alt='mycovers' />
            <small className='text-sky-600'>
              Stock Images
            </small>
          </div>
          <div className='myicons justify-center text-center items-center' onClick={uploadImagesClicked}>
            <img src='https://app.myecovermaker.com/app/images/icons/upload.png' style={{width: '35px', height: '35px', marginLeft: '30px'}} alt='mycovers' />
            <small className='text-sky-600'>
              Upload Images
            </small>
          </div>
          <div className='myicons justify-center text-center items-center' onClick={finalizeClicked}>
            <img src='https://app.myecovermaker.com/app/images/icons/finalize.png' style={{width: '45px', height: '35px', marginLeft: '25px'}} alt='mycovers' />
            <small className='text-sky-600'>
              Finalize
            </small>
          </div>
        </div>
        <div className='main-workboard'>
          {defaultPage}
          {myCoverPage}
          {mockUpsPage}
          {backgroundPage}
          {addTextPage}
          {aiImagePage}
          {insertImagePage}
          {stockImagesPage}
          {uploadImagePage}
          {finalizePage}
        </div>
      </div>
    </div>
  )  
}

export default CreateCover;