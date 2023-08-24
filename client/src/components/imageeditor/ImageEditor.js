import React, { useState, useEffect, useRef } from 'react';
import FilerobotImageEditor, { TABS, TOOLS} from 'react-filerobot-image-editor';
import {getCurrentImgDataFnRef} from 'react-filerobot-image-editor';
import './ImageEditor.css';

import logo from './logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setEditedImage } from '../../actions/editedImage';

function ImageEditor() {
    const editedImage = useRef();
 
    const {Selected, width, height} = useSelector(state=>state.workingMockup);
    const {edited} = useSelector(state=>state.editedImage);
    const mockup = useSelector(state=>state.workingMockup);
    const Gallery = useSelector(state=>state.uploadImage.urls);

    const image = new Image();
    image.width = 200; // Set the desired width
    image.height = 150; // Set the desired height
    const [srcImage, setSrcImage] = useState(image);
    const [editorGallery, setEditorGallery] = useState([]);


    // const loadThumbnail = async (src) => {
    //   const image = new Image();
    //   image.src = src;
    //   await image.decode(); // Wait until image is fully loaded

    //   // Create a canvas element
    //   const canvas = document.createElement('canvas');
    //   canvas.width = 80; // Desired thumbnail width
    //   canvas.height = (image.height * canvas.width) / image.width; // Calculate height based on original aspect ratio
      
    //   // Resize original image to thumbnail size
    //   const ctx = canvas.getContext('2d');
    //   ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      
    //   // Convert canvas content to data URL of thumbnail
    //   console.log(image);
    //   const thumbnailDataUrl = canvas.toDataURL();
    //   return thumbnailDataUrl;
    // };
    
    useEffect(()=>{
      var gallery = [
        {
          originalUrl: logo, // The url of the image in original size to be added in canvas
          previewUrl: logo, // The url of the image to be used as preview in gallery list (for less data consuming & better performance).
        }
      ];
      Gallery.map((image, key)=>{
        console.log(image);
        gallery = [
          ...gallery,
          {
            originalUrl: image.url, // The url of the image in original size to be added in canvas
            previewUrl: image.url, // The url of the image to be used as preview in gallery list (for less data consuming & better performance).
          }
        ];
      })
      setEditorGallery(gallery);
    }, [Gallery]);

    useEffect(() => {
        // console.log(editedImage);
        const image1 = new Image();
        image1.width = 1000; // width; // Set the desired width
        image1.height = 1300; //height; // Set the desired height
        // Set any other properties or attributes for the image
        //image1.src = createWhiteImage(image.width, image.height);
        image1.src = createWhiteImage(300, 400);
        image1.alt = 'Image description';
        // Add event listeners or perform any other operations on the image

        setSrcImage(image1);
    }, [mockup]);

    const dispatch = useDispatch();
    useEffect(()=>{
      console.log(editedImage);
      if(edited){
        if(editedImage != null && editedImage.current){
          const imageBase64 = editedImage?.current({}).imageData.imageBase64;
          const edited = new Image();
          edited.src = imageBase64;
          console.log(imageBase64);
          edited.alt = "Edited image";
          dispatch(setEditedImage(imageBase64));
        }
      }
    }, [edited])

    const createWhiteImage = (width, height) => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d');
      context.fillStyle = '#ffffff'; // Set the color to white
      context.fillRect(0, 0, width, height);
      return canvas.toDataURL();
    };

    const annotationsCommon = {
        fill: '#999999',
        stroke: '#999999',
        strokeWidth: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 0,
        shadowColor: '#999999',
        shadowOpacity: 1,
        opacity: 1,
    }

    return (
      <div style = {{width: '80wh', height: '90vh', margin: 'auto'}}>
        {/* {console.log(srcImage)} */}
        {Selected && (
          <FilerobotImageEditor
            source={srcImage}
            useZoomPresetsMenu = {true}
            getCurrentImgDataFnRef={editedImage}
            disableZooming = {false}
            onSave={(editedImageObject, designState) => console.log('saved', editedImageObject, designState)}
            annotationsCommon={{
              fill: '#ff0000'
            }}
            Image={{ 
              fill: undefined,
              disableUpload: false,
              gallery: editorGallery
            }}
            Text={{  ...annotationsCommon,
              text: 'Your text',
              fontFamily: 'Arial',
              fonts: [
                { label: 'Arial', value: 'Arial' },
                'Tahoma',
                'Sans-serif',
                'Tahoma',
                { label: 'Comic Sans', value: 'Comic-sans' },
              ],
              fontSize: 25,
              letterSpacing: 0,
              lineHeight: 1,
              align: 'left',
              fontStyle: 'normal',
              onFontChange: (newFontFamily, reRenderCanvasFn) => undefined,
            }}
            Rotate={{ angle: 90, componentType: 'button' }}
            tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK]} // or {['Adjust', 'Annotate', 'Watermark']}
            defaultTabId={TABS.ANNOTATE} // or 'Annotate'
            defaultToolId={TOOLS.TEXT} // or 'Text'
            noCrossOrigin={true}
          />
        )}
      </div>
    );
}
export default ImageEditor;