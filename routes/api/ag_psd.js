const express = require('express');
const router = express.Router();
const axios = require('axios');
const sharp = require('sharp');
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

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
  const url = req.body.imageSource;
  console.log(url)
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');
    const metadata = await sharp(buffer).metadata();
    const { width, height } = metadata;
    console.log(width, height);
    res.json({width: width, height: height});
});

router.post('/upload-image', auth , uploadImage.single('file'), async (req, res) => {
  console.log(req.user)
  const userID = req.user.id;
  const image = req.file;
  console.log(image.path)

  const fileStream = fs.createReadStream(image.path);
  const s3params = {
    Bucket: BUCKET,
    Key: image.originalname,
    Body: fileStream,
  };
  s3Content.upload(s3params, async function(err, data) {
    let image;

    if (err) {
        console.log('Error uploading file:', err);
    } else {
        console.log('File uploaded successfully. Location:', data.Location);
        image = data.Location;
        const user = await User.findById(userID);
        console.log(user.id);
        user.images.push({url: image});
        await user.save();
    }
    res.json({ message: 'Registration successful', url: data.Location });
  });
});

router.get('/all-upload-image', auth, async (req, res) => {
  const userID = req.user.id;
  const user = await User.findById(userID);
  res.json(user.images);
})

module.exports = router;