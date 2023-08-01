const express = require('express');
const router = express.Router();
const PSD = require('psd');
const fs = require('fs');
const cors = require('cors');

router.get('/api/replace-layer', async (req, res) => {
  try {
    const psd = await PSD.open('./testdata/test1.psd');
    const tree = psd.tree();

    // Find the layer you want to replace
    const layerToReplace = tree.descendants().find(layer => layer.name === 'LayerName');

    // Replace the layer with your own image
    const imageBuffer = fs.readFileSync('./testdata/image1.png');
    const image = await PSD.fromBuffer(imageBuffer);
    const imageTree = image.tree();
    const imageLayer = imageTree.descendants()[0];

    layerToReplace.replaceWith(imageLayer);

    // Save the modified PSD
    const outputPath = './testdata/test/psd';
    await psd.writeAs('raw', outputPath);

    res.send('Layer replaced successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while replacing the layer.');
  }
});

module.exports = router;