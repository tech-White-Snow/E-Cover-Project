import express from 'express';
const router = express.Router();
//import axios from 'axios';
//import sharp from 'sharp';
import multer from 'multer';
// import AWS from 'aws-sdk';
import fs from 'fs';
import auth from '../../middleware/auth.js';
import User from '../../models/User.js';
//import path from 'path';
//import request from 'request';
import replacedImage from '../../mockupfiles/change-smart-layer.js';
import { readPsd } from 'ag-psd';
//import { createCanvas, Image } from 'canvas';
//import imageminJpegtran from 'imagemin-jpegtran';
import imagemin  from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import MockupData from '../../models/MockupData.js';
// import imagemin =  require('imagemin');
// import imageminPngquant from 'imagemin-pngquant');


//import CircularJSON from 'circular-json';

import initializeCanvas from "ag-psd/initialize-canvas.js";
import { CLIENT_RENEG_WINDOW } from 'tls';
//import { group } from 'console';

// const AWS_ACCESS_KEY_ID = "AKIAVBHONSQBZMPWQAUF";
// const AWS_SECRET_ACCESS_KEY = "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";
// const BUCKET = "fadaimageupload";

// AWS.config.update({
//   accessKeyId: AWS_ACCESS_KEY_ID,
//   secretAccessKey: AWS_SECRET_ACCESS_KEY,
//   region: 'us-east-1'
// });
// const s3Content = new AWS.S3();
const uploadImage = multer({ dest: "upload/image/" });

router.post('/bg-info', async (req, res) => {
  // const url = req.body.imageSource;
  // console.log(url)
  //   const response = await axios.get(url, { responseType: 'arraybuffer' });
  //   const buffer = Buffer.from(response.data, 'binary');
  //   const metadata = await sharp(buffer).metadata();
  //   const { width, height } = metadata;
  //   console.log(width, height);
  //   res.json({width: width, height: height});
});

// router.post('/all-mockup', async(req, res)=>{
//   //console.log(req.body);
//   //res.json({d:'dd'});
//   let resData = [];
//   req.body.mockups.map((group, key) =>{
//     group.mockups.map(async (filename, key1)=>{
//       resData = [
//         ...resData,
//         await getMockupData(filename)
//       ];
//     })
//   })

//   console.log(resData)
// });


router.post('/all-mockup', async(req, res)=>{ 
  // let resData = []; 
  // for (let group of req.body.mockups) {
  //   let group1 = {
  //     group: group.group,
  //     mockups: group.mockups,
  //     data: []
  //   };
  //   let data1 = [];
  //   for (let filename of group.mockups) { 
  //     data1.push(await getMockupData(filename));
  //     //resData.push(await getMockupData(filename)); 
  //   }
  //   group1.data = data1;
  //   resData.push(group1);
  // } 
  const resData = await MockupData.find({});
  res.json(resData);
});

// const getMockupData = async (filename) => {
//   try{
//     const buffer_data = await fs.readFileSync(`mockupfiles/psd/${filename}.psd`);
//     const psd_data = await readPsd(buffer_data, {skipThumbnail: false});
//     //console.log("get psd image --- ", psd_data.imageResources)

//     const psdWidth = psd_data.width;
//     const psdHeight = psd_data.height;

//     let width, height, spin_width=0, ifSpin = false;
//     //console.log(psd_data.linkedFiles)
//     let spine, rect, rectTransform, spineTransform;
//     if(psd_data.children){
//       psd_data.children.map((child, index)=>{
//         if(child.name && child.name==='mm_img:Your Image')  {rect = child;}
//         if(child.name && child.name==='mm_img:Spine')  {spine = child;}
//         //console.log('each_child ===== ', index, child)
//         if(child.children) child.children.map((subchild) => {
//           if(subchild.name && subchild.name==='mm_img:Your Image')  {rect = subchild;}
//           if(subchild.name && subchild.name==='mm_img:Spine')  {spine = subchild;}
//         })
//       })
//     }
//     if(rect){
//       width = rect.placedLayer.width;
//       height = rect.placedLayer.height;
//       rectTransform = {
//         transform: rect.placedLayer.transform,
//         perTransform: rect.placedLayer.nonAffineTransform,
//         layerWidth: rect.right - rect.left,
//         layerHeight: rect.bottom - rect.top
//       };
//     }
//     if(spine){
//       spin_width = spine.placedLayer.width;
//       ifSpin = true;
//       spineTransform = {
//         transform: spine.placedLayer.transform,
//         perTransform: spine.placedLayer.nonAffineTransform,
//         layerWidth: spine.right - spine.left,
//         layerHeight: spine.bottom - spine.top
//       };
//     }      

//     const resData = {
//       success: true,
//       width: width+spin_width,
//       height: height,
//       psdWidth: psdWidth,
//       psdHeight: psdHeight,
//       ifSpin: ifSpin,
//       spinWidth: spin_width,
//       rectTransform,
//       spineTransform,
//       // thumbnail: psd_data.canvas.toDataURL(),
//       //thumbnail: Buffer.from(imageData).toString('base64')                              
//     };

//     //console.log("----   ", resData);
//     return resData;
//   } catch (err){
//     console.log("error ------", err.message);
//     return null;
//   }
// }

router.get('/mockup/:mockup', async (req, res) => {
  const filename = req.params.mockup;
  //console.log(filename);
  
  // var PSD = require('psd');
  // var psd = PSD.fromFile(`./mockupfiles/psd/${filename}.psd`);
  // psd.parse();

  // // console.log("-fromFile", psd.image);
  // // console.log("fromFile --", psd.tree().export());
  // //console.log(psd.tree().childrenAtPath('A/B/C')[0].export());

  // // You can also use promises syntax for opening and parsing
  // PSD.open(`./mockupfiles/psd/${filename}.psd`).then(function (psd) {
  //   //console.log("Open function", psd);
  //   return psd.image.saveAsPng('./output.png');
  // }).then(function () {
  //   console.log("Finished!");
  // });

  //const imageData = await fs.readFileSync(`mockupfiles/image/${filename}.png`);
  //console.log(imageData);

  try{
    const buffer_data = await fs.readFileSync(`mockupfiles/psd/${filename}.psd`);
    const psd_data = await readPsd(buffer_data, {skipThumbnail: false});
    //console.log("get psd image --- ", psd_data.imageResources)

    const psdWidth = psd_data.width;
    const psdHeight = psd_data.height;

    let width, height, spin_width=0, ifSpin = false;
    if(psd_data.linkedFiles) {
      let psb_data;
      let psb_spine;
      //console.log(psd_data.linkedFiles)
      psd_data.linkedFiles.map((linked, index)=>{
        if(typeof linked.name === 'string' && linked.name.includes('Rectangle')) 
          psb_data = linked.data;
        if(typeof linked.name === 'string' && linked.name.includes('Spine')) 
          psb_spine = linked.data;
      })
      if(psb_data){
        const psb = readPsd(psb_data);
        width = psb.width;
        height = psb.height;
      }
      if(psb_spine){
        const spine = readPsd(psb_spine);
        spin_width = spine.width;
        ifSpin = true;
      }
    }

    console.log(width, spin_width);
    const resData = {
      success: true,
      width: width+spin_width,
      height: height,
      psdWidth: psdWidth,
      psdHeight: psdHeight,
      ifSpin: ifSpin,
      spinWidth: spin_width,
      // thumbnail: psd_data.canvas.toDataURL(),
      //thumbnail: Buffer.from(imageData).toString('base64')                              
    };

    //console.log("----   ", resData);
    res.json(resData);
  } catch (err){
    console.log("error ------", err.message);
    res.status(500).send('Server error');
  }

  // //const absolutePath = path.resolve('./output.png');
  // const imagePath = path.join(__dirname, '../../mockupfiles/image', `${filename}.png`);
  // res.sendFile(imagePath);

  // console.log(imagePath);
  // // res.json({ image: data});
  
});

router.post('/upload-image', auth , uploadImage.single('file'), async (req, res) => {
  console.log(req.user)
  const userID = req.user.id;
  const image = req.file;
  const user = await User.findById(userID);
  //console.log(user.id);

  // Read the image file and retrieve its data
  fs.readFile(image.path, async (error, data) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Error reading image file');
    }

    const imageData = data.toString('base64');
    // Use the imageData as needed (e.g., save it to a database, send it in a response, etc.)

    // Cleanup: Delete the temporary file
    fs.unlink(image.path, (error) => {
      if (error) {
        console.error(error);
      }
    });

    const imageSrc = `data:image/jpeg;base64,${imageData}`;

    //console.log(user.images);
    if(user.images === null){
      user.images = [
        {url: imageSrc}
      ]
    }
    else    user.images.push({url: imageSrc});
    await user.save();
    res.json({ message: 'Registration successful', url: imageSrc });

    //console.log(imageSrc)
    // // Send a response or perform other operations
    // res.status(200).send('Image uploaded successfully');
  });

  // const fileStream = fs.createReadStream(image.path);
  // console.log(fileStream );
  // const s3params = {
  //   Bucket: BUCKET,
  //   Key: image.layeralname,
  //   Body: fileStream,
  // };
  // s3Content.upload(s3params, async function(err, data) {
  //   let image;

  //   if (err) {
  //       console.log('Error uploading file:', err);
  //   } else {
  //       console.log('File uploaded successfully. Location:', data.Location);
  //       image = data.Location;
  //       const user = await User.findById(userID);
  //       console.log(user.id);
  //       user.images.push({url: image});
  //       await user.save();
  //   }
  //   res.json({ message: 'Registration successful', url: data.Location });
  // });
});

router.get('/all-upload-image', auth, async (req, res) => {
  try{  
    const userID = req.user.id;
    const user = await User.findById(userID);
    res.json(user.images);
  }catch(err){
    console.log("error ------", err.message);
    res.status(500).send('Server error');
  }
  //  const imagesData = [];
  // user.images.forEach( async (image, index) => {
  //   await request({ url: image.url, encoding: null }, (error, response, body) => {
  //     if (!error && response.statusCode === 200) {
  //       const imageData = body.toString('base64');
  //       // Add the base64 image data to the array
  //       imagesData.push(imageData);
  //     }
      
  //     console.log("ddddd    ", index);
  //     // After all the requests have completed
  //     if (index === user.images.length - 1) {
  //       res.json(imagesData);
  //       //console.log(imagesData)
  //     }
  //   });
  // });
})

router.post('/render-image', auth , async (req, res) => {
  try {
    // const {imageData, group, filename} = req.body;
    const {rectImage, spineImage, name, ifSpin} = req.body;

    console.log(" ----- ", name);
    const result = await replacedImage(rectImage, spineImage, name, ifSpin);
    //console.log(result, "-----")
    if(!(await result).ifSuccess) {
      res.json({ result: false, message: (await result).reason });
      console.log(result.reason)
      return;
    }
    const changedMockup = await getImageFromPSD();
    
    //console.log(changedMockup);
    if(changedMockup.success){
      res.json(changedMockup);
      console.log("send imageData")
    }else{
      res.status(500).send('Server error');
      console.log("cannot send")
    }
  } catch(err) {
    console.log("error ------", err.message);
    res.status(500).send('Server error');
  }
  //console.log(user.id);
});

const getImageFromPSD = async () =>{
  try{

    //const buffer_data = await fs.readFileSync('result_layer.png');
    const files = await imagemin(['mockupfiles/result_origin.png'], {
      plugins: [
        // imageminJpegtran(),
        imageminPngquant({
          quality: [0.9, 1]
        })
      ]
    });
    
    //console.log(files);
    //console.log(buffer_data)
    
    //console.log(buffer_data);
    //const psd_data = await readPsd(buffer_data, {skipThumbnail: false});
    //console.log("get psd image --- ", psd_data.imageResources)
    return({
      success: true,
      imageData: Buffer.from(files[0].data).toString('base64')
      //imageData: Buffer.from(buffer_data).toString('base64')
    })
  } catch (err){
    console.log("------- ", err.message);
    return({
      success: false,
      message: err.message
    })
  }
}

router.post('/save-cover', auth , async (req, res) => {
  try {

    const {userId, renderedImage, designState, mockup} = req.body;
    const user = await User.findById(userId);
    
    if (user.covers === null) {
      user.covers = [];
    } else if (user.covers.length >= 10) {
      user.covers.shift(); // Remove the first element
    }

    // let annotation = designState.annotations;
    // designState.annotations = {};
    // let index = 0;
    // Object.entries(annotation).map(([key, value]) => { 
    //   // Return the modified item
    //   index++;
    //   const id = `image-${index}`;
    //   value.id = id;
    //   value.gallery = [];
    //   designState.annotations = {
    //     ...designState.annotations,
    //     [id]: {
    //       stroke: value.stroke,
    //       strokeWidth: value.stroke,
    //       shadowOffsetX: value.stroke,
    //       shadowOffsetY: value.stroke,
    //       shadowBlur: value.stroke,
    //       shadowColor: value.stroke,
    //       shadowOpacity: value.stroke,
    //       opacity: value.stroke,
    //       disableUpload: value.stroke,
    //       gallery: value.gallery,
    //       name: value.name,
    //       id: `image-${i}`,
    //       image: value.image,
    //       x: value.x,
    //       y: value.y,
    //       width: value.width,
    //       height: value.height,
    //       rotation: value.rotation,
    //       scaleX: value.scaleX,
    //       scaleY: value.scaleY
    //     },
    //   };
    // });

    // if(index < 15){
    //   for(let i=index+1; i<=15; i++){
    //     const id = `image-${i}`;
    //     designState.annotations = {
    //       ...designState.annotations,
    //       [id]: {
    //         stroke: '#000000',
    //         strokeWidth: 0,
    //         shadowOffsetX: 0,
    //         shadowOffsetY: 0,
    //         shadowBlur: 0,
    //         shadowColor: '#000000',
    //         shadowOpacity: 1,
    //         opacity: 1,
    //         disableUpload: false,
    //         gallery: [],
    //         name: 'Image',
    //         id: `image-${i}`,
    //         image: 'a',
    //         x: 0,
    //         y: 0,
    //         width: 0,
    //         height: 0
    //       },
    //     };
    //   }
    // }
    
    const stringState = JSON.stringify(designState);
    const stringMockup = JSON.stringify(mockup);

    user.covers.push({ renderedImage, designState: stringState, mockup: stringMockup, });
  
    await user.save();
   

    res.json({ message: 'Save successful'});

  } catch(err) {
    console.log("error ------", err.message);
    res.status(500).send('Server error');
  }
  //console.log(user.id);
});

router.get('/get-covers/:userid', auth, async (req, res) => {
  try{  
    const userID = req.params.userid;
    const user = await User.findById(userID);
    const covers = [];
    user.covers.map((cover, index) => {
      covers.push({
          _id: cover._id,
          renderedImage: cover.renderedImage,
          designState: JSON.parse(cover.designState),
          mockup: JSON.parse(cover.mockup),
      });
    })
    res.json(covers);
  }catch(err){
    console.log("error ------", err.message);
    res.status(500).send('Server error');
  }
});

router.delete('/cover/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const { coverId } = req.body;
    
    // Find the user by userId
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the index of the cover item with the given coverId
    const coverIndex = user.covers.findIndex(
      (cover) => cover._id.toString() === coverId
    );

    // Check if the cover item exists
    if (coverIndex === -1) {
      return res.status(404).json({ message: 'Cover item not found' });
    }

    // Remove the cover item from the user's schema
    user.covers.splice(coverIndex, 1);

    // Save the updated user
    await user.save();

    res.json({ message: 'Cover item deleted successfully' });

  } catch (err) {
    console.error('Error deleting cover item:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

//module.exports = router;
export default router;
