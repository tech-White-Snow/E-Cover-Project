const express = require('express');
const router = express.Router();
const axios = require('axios');
const sharp = require('sharp');

// router.post('/mock-up-info', async (req, res) => {
//   try {
//     console.log('asdf')
//     console.log(req.body.dataSource);

//     const buffer = fs.readFileSync(req.body.dataSource);
//     const psd = ag_psd.readPsd(buffer, {});
//     const smart_layer = psd.children.find(child => child.name === 'mm_img:Your Image');
//     const width = smart_layer.placedLayer.width;
//     const height = smart_layer.placedLayer.height;
//     res.json({width: width, height: height});

//   } catch (error) {
//     console.error(error);
//     res.status(500).send('error');
//   }
// });

router.post('/bg-info', async (req, res) => {
  const url = req.body.imageSource;
  console.log(url)
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');
    const metadata = await sharp(buffer).metadata();
    const { width, height } = metadata;
    console.log(width, height);
    res.json({width: width, height: height});
})

module.exports = router;