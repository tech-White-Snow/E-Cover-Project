const express = require('express');
const router = express.Router();
const PSD = require('psd');
const fs = require('fs');
const cors = require('cors');
const ag_psd = require('ag-psd');
require ("ag-psd/initialize-canvas.js");
const canvas = require('canvas');

router.post('/mock-up-info', async (req, res) => {
  try {
    console.log('asdf')
    console.log(req.body.dataSource);

    const buffer = fs.readFileSync(req.body.dataSource);
    const psd = ag_psd.readPsd(buffer, {});
    const smart_layer = psd.children.find(child => child.name === 'mm_img:Your Image');
    const width = smart_layer.placedLayer.width;
    const height = smart_layer.placedLayer.height;
    res.json({width: width, height: height});

  } catch (error) {
    console.error(error);
    res.status(500).send('error');
  }
});

router.post('/bg-info', async (req, res) => {
  try {
    console.log(req.body.imageSource)
    const image = new canvas.Image();
    image.src = fs.readFileSync(req.body.imageSource);
    const width = image.width;
    const height = image.height;
    res.json({width: width, height: height});
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router;