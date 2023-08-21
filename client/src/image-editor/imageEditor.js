import React, { useState, useEffect } from 'react';
import FilerobotImageEditor, { TABS, TOOLS} from 'react-filerobot-image-editor';
import './imageEditor.css';

import logo from '../logo.svg';

function ImageEditor() {
    const [isImgEditorShown, setIsImgEditorShown] = useState(false);
    const image = new Image();
    image.width = 200; // Set the desired width
    image.height = 150; // Set the desired height
    const [srcImage, setSrcImage] = useState(image);

    const openImgEditor = () => {
      setIsImgEditorShown(true);
      console.log(FilerobotImageEditor);
    };

    useEffect(() => {
        const image1 = new Image();
        image1.width = 1800; // Set the desired width
        image1.height = 1700; // Set the desired height
        // Set any other properties or attributes for the image
        image1.src = createWhiteImage(image.width, image.height);
        image1.alt = 'Image description';
        // Add event listeners or perform any other operations on the image

        setSrcImage(image1);
        console.log(image1);
    }, []);

    const createWhiteImage = (width, height) => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');
        context.fillStyle = '#ffffff'; // Set the color to white
        context.fillRect(0, 0, width, height);
        return canvas.toDataURL();
      };

    const closeImgEditor  = () => {
      setIsImgEditorShown(false);
    };
    
    const annotationsCommon = {
        fill: '#444444',
        stroke: '#444444',
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
       <button onClick={openImgEditor}>Open Filerobot image editor</button>
              {isImgEditorShown && (
              <FilerobotImageEditor
                  source={srcImage}
                  useZoomPresetsMenu = {false}
                  disableZooming = {true}
                  onSave={(editedImageObject, designState) => console.log('saved', editedImageObject, designState)}
                  onClose={closeImgEditor}
                  annotationsCommon={{
                    fill: '#ff0000'
                  }}
                  Image={{ 
                    fill: undefined,
                    disableUpload: false,
                    gallery: [
                        {
                            originalUrl: logo, // The url of the image in original size to be added in canvas
                            previewUrl: logo, // The url of the image to be used as preview in gallery list (for less data consuming & better performance).
                        },
                        {
                          originalUrl: logo, // The url of the image in original size to be added in canvas
                          previewUrl: logo, // The url of the image to be used as preview in gallery list (for less data consuming & better performance).
                      },
                      {
                        originalUrl: logo, // The url of the image in original size to be added in canvas
                        previewUrl: logo, // The url of the image to be used as preview in gallery list (for less data consuming & better performance).
                    },
                    {
                      originalUrl: logo, // The url of the image in original size to be added in canvas
                      previewUrl: logo, // The url of the image to be used as preview in gallery list (for less data consuming & better performance).
                  },
                  {
                    originalUrl: logo, // The url of the image in original size to be added in canvas
                    previewUrl: logo, // The url of the image to be used as preview in gallery list (for less data consuming & better performance).
                },
                {
                  originalUrl: logo, // The url of the image in original size to be added in canvas
                  previewUrl: logo, // The url of the image to be used as preview in gallery list (for less data consuming & better performance).
              },
              {
                originalUrl: logo, // The url of the image in original size to be added in canvas
                previewUrl: logo, // The url of the image to be used as preview in gallery list (for less data consuming & better performance).
            },
            {
              originalUrl: logo, // The url of the image in original size to be added in canvas
              previewUrl: logo, // The url of the image to be used as preview in gallery list (for less data consuming & better performance).
          },
          {
            originalUrl: logo, // The url of the image in original size to be added in canvas
            previewUrl: logo, // The url of the image to be used as preview in gallery list (for less data consuming & better performance).
        },
        {
          originalUrl: logo, // The url of the image in original size to be added in canvas
          previewUrl: logo, // The url of the image to be used as preview in gallery list (for less data consuming & better performance).
      },
      {
        originalUrl: logo, // The url of the image in original size to be added in canvas
        previewUrl: logo, // The url of the image to be used as preview in gallery list (for less data consuming & better performance).
    },
    {
      originalUrl: logo, // The url of the image in original size to be added in canvas
      previewUrl: logo, // The url of the image to be used as preview in gallery list (for less data consuming & better performance).
  },
  {
    originalUrl: logo, // The url of the image in original size to be added in canvas
    previewUrl: logo, // The url of the image to be used as preview in gallery list (for less data consuming & better performance).
},
{
  originalUrl: logo, // The url of the image in original size to be added in canvas
  previewUrl: logo, // The url of the image to be used as preview in gallery list (for less data consuming & better performance).
},
{
  originalUrl: logo, // The url of the image in original size to be added in canvas
  previewUrl: logo, // The url of the image to be used as preview in gallery list (for less data consuming & better performance).
},
{
originalUrl: logo, // The url of the image in original size to be added in canvas
previewUrl: logo, // The url of the image to be used as preview in gallery list (for less data consuming & better performance).
},
                    ]
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
               
                />
              )}
        </div>
    );
}
export default ImageEditor;