import fs from 'fs';
import path from 'path';
import "ag-psd/initialize-canvas.js"; // only needed for reading image data and thumbnails
import { readPsd, writePsd, writePsdBuffer, writePsdUint8Array } from "ag-psd";
import { createCanvas, Image } from "canvas";
import { exec } from 'child_process';
import { promisify } from 'util';
const execAsync = promisify(exec);

// import * as util from "util";
// import * as path from "path";

const replaceImage =  async (rectImage, spineImage, name, ifSpin) => {
  
  try {
    console.log(path.resolve(`mockupfiles/psd/${name}.psd`));
    const ifChanged = await changeImageByNode(path.resolve(`mockupfiles/psd/${name}.psd`), rectImage, spineImage);
    const ifExcuted = await executePythonFile();

    if(!ifChanged || !ifExcuted) {
      console.log(ifChanged + "\n")
      console.log(ifExcuted + "\n")
      const value = {
        ifSuccess: false,
        reason: "Error: don't change image."
      } 
      return value;
    }

    const value = {
      ifSuccess: true,
      reason: "Successfully rendered."
    } 
    return value;

  } catch (err) {
    //psd_api.Close()
    console.log(err);
    const value = {
      ifSuccess: false,
      reason: "Error: render image."
    } 
    return value;
  }
};



const saveInputImagefile =  async (imageData) => {
  try{
    //console.log(imageData);
    const base64Data = imageData.replace(/^data:image\/png;base64,/, '');
    
    const buffer = Buffer.from(base64Data, 'base64');

    // Save the image file
    const imagePath = path.join(path.resolve('Input.jpg'));
    //console.log(buffer);
    //console.log(imagePath)
    fs.writeFileSync(imagePath, buffer);
    console.log(buffer)
    return true;
  } catch (err){
    return false;
  }
}
    
function loadCanvasFromFile(imageData, width, height) {
  try{
    const img = new Image();
  
    // Remove the data URL prefix to extract only the base64 data
    const base64Data = imageData.replace(/^data:image\/png;base64,/, '');

    // Convert the base64 data to a buffer
    const bufferData = Buffer.from(base64Data, 'base64');

    img.src = bufferData;
    
    const canvas = createCanvas(width, height);
    canvas.getContext("2d").drawImage(img, 0, 0, width, height);
    return canvas;
  }
  catch(err){
    console.log(err)
  }

}

async function changeImageByNode(path, rectImage, spineImage) {
  try{
    const buffer = fs.readFileSync(path);

    // read only document structure
    const psd1 = readPsd(buffer, {});
    
    // const smart_object_layer = psd1.children.find((layer) => layer.name === "mm_img:Your Image");
    // console.log(smart_object_layer)
    let smart_object_layer, spineLayer;
    //console.log(psd1)
    if(psd1.children){
      psd1.children.map((child, index)=>{
        if(child.name && child.name==='mm_img:Your Image')  {smart_object_layer = child; }
        if(child.name && child.name==='mm_img:Spine')  {spineLayer = child; }
        
        //console.log('each_child ===== ', index, child)
        if(child.children) child.children.map((subchild) => {
          if(subchild.name && subchild.name==='mm_img:Your Image')  {smart_object_layer = subchild; }
          if(subchild.name && subchild.name==='mm_img:Spine')  {spineLayer = subchild; }
        })
      })
    }else{
      console.log("error: wrong mockup psd file.");
      return false;
    }
    //console.log(smart_object_layer);
    //console.log(rectImage)
    const canvas1 = loadCanvasFromFile(rectImage, smart_object_layer.right - smart_object_layer.left, smart_object_layer.bottom - smart_object_layer.top);
    smart_object_layer.canvas = canvas1;

    if(spineLayer ) { 
      const canvas2 = loadCanvasFromFile(spineImage, spineLayer.right - spineLayer.left, spineLayer.bottom - spineLayer.top);
      spineLayer.canvas = canvas2;
    }
    
    const new_buffer = writePsdBuffer(psd1, {});
    
    fs.writeFileSync('./mockupfiles/output_psd.psd', new_buffer);
    
    return true;
  }catch(err){
    console.log(err)
    return false;
  }
}

async function executePythonFile() {
  try {
    const { stdout, stderr } = await execAsync('python mockupfiles/123.py');
    console.log(stdout);
    console.log(stderr);
    return true;
  } catch (err) {
    console.error(`Error executing the Python command: ${err}`);
    return false;
  }
}

export default replaceImage;

