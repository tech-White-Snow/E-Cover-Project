const express = require('express');
const router = express.Router();
const axios = require('axios');
//const sharp = require('sharp');
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const path = require('path');
const request = require('request');
const replacedImage = require('../../mockupfiles/change-smart-layer');
const { writePsdBuffer, readPsd } = require('ag-psd');
//const { createCanvas, Image } = require('canvas');
const CircularJSON = require('circular-json');

const initializeCanvas = require("ag-psd/initialize-canvas.js");

const AWS_ACCESS_KEY_ID = "AKIAVBHONSQBZMPWQAUF";
const AWS_SECRET_ACCESS_KEY = "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";
const BUCKET = "fadaimageupload";

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1'
});
const s3Content = new AWS.S3();
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

router.get('/mockup/:mockup', async (req, res) => {
  const filename = req.params.mockup;
  console.log(filename);
  
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

  try{
    const buffer_data = await fs.readFileSync(`mockupfiles/psd/${filename}.psd`);
    const psd_data = await readPsd(buffer_data, {skipThumbnail: false});
    //console.log("get psd image --- ", psd_data.imageResources)

    let width, height;
    if(psd_data.linkedFiles) {
      let psb_data;
      //console.log(psd_data.linkedFiles)
      psd_data.linkedFiles.map((linked, index)=>{
        if(typeof linked.name === 'string' && linked.name.includes('Rectangle')) 
          psb_data = linked.data;
      })
      if(psb_data){
        const psb = readPsd(psb_data);
        width = psb.width;
        height = psb.height;
      }
    }


    const resData = {
      success: true,
      width: width,
      height: height,
      thumbnail: psd_data.imageResources.thumbnail.toDataURL(),                              
    };

    console.log("----   ", resData.width, resData.height);
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
  //   Key: image.originalname,
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
  const userID = req.user.id;
  const user = await User.findById(userID);
  res.json(user.images);
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
    const {imageData, name} = req.body;
    const result = await replacedImage(imageData, name);
    //console.log(result, "-----")
    if(!(await result).ifSuccess) {
      res.json({ result: false, message: (await result).reason });
      return;
    }
    const changedMockup = await getImageFromPSD();
    
    if(changedMockup.success){
      res.json(changedMockup);
    }else{
      res.status(500).send('Server error');
    }
  } catch(err) {
    console.log("error ------", err.message);
    res.status(500).send('Server error');
  }
  //console.log(user.id);
});

const getImageFromPSD = async () =>{
  try{
    const buffer_data = await fs.readFileSync('replacedImage.psd');
    const psd_data = await readPsd(buffer_data, {skipThumbnail: false});
    //console.log("get psd image --- ", psd_data.imageResources)
    return({
      success: true,
      imageData: psd_data.canvas.toDataURL(),
      thumbnail: psd_data.imageResources.thumbnail.toDataURL()
    })
  } catch (err){
    console.log("------- ", err.message);
    return({
      success: false,
      message: err.message
    })
  }
}
module.exports = router;
