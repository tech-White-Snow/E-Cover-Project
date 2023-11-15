import Perspective from 'perspectivejs';

const getPerspectiveImage = async (imageData, width, start, end, height, transform) => {
  try {
    const image = await getTransformedImage(imageData, start, end, height, transform);
    
    if (!transform.perTransform.length) {
      console.log("No transform");
      return image;
    }

    const perImage = await getPerTransformedImage(transform, image);
    return perImage;
  } catch (error) {
    console.error(error);
    // Handle any errors that may occur during image transformation
    throw error; // Rethrow the error to propagate it
  }
};

const getTransformedImage = (imageData, start, end, height, transform) => {
  const img = new Image();

  return new Promise((resolve, reject) => {
    img.onload = function() {
      const canvas = document.createElement('canvas');
      canvas.width = transform.layerWidth;
      canvas.height = transform.layerHeight;
      const context = canvas.getContext('2d');
      context.drawImage(
        img,
        start,
        0,
        end - start,
        height,
        0,
        0,
        transform.layerWidth,
        transform.layerHeight
      );
      const transformedImage = canvas.toDataURL('image/png');
      resolve(transformedImage);
    };

    img.src = imageData;
  });
};

const getPerTransformedImage = (transform, image) => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    let canvas1 = document.createElement("canvas");
    let transformedImage;
    canvas1.width = transform.layerWidth;
    canvas1.height = transform.layerHeight;

    img.onload = function () {
      try {
        const ctx = canvas1.getContext("2d");

        const p = new Perspective(ctx, img);

        const { perTransform } = transform;

        let xmin = 30000,
          ymin = 30000;
        perTransform.map((value, index) => {
          if (index % 2 === 0) {
            if (value < xmin) xmin = value;
          } else {
            if (value < ymin) ymin = value;
          }
        });

        p.draw([
          [perTransform[0] - xmin, perTransform[1] - ymin],
          [perTransform[2] - xmin, perTransform[3] - ymin],
          [perTransform[4] - xmin, perTransform[5] - ymin],
          [perTransform[6] - xmin, perTransform[7] - ymin],
        ]);

        transformedImage = canvas1.toDataURL("image/png");
        resolve(transformedImage); // Resolve the promise with the transformed image
      } catch (err) {
        console.log(err);
        transformedImage = image;
        resolve(transformedImage); // Resolve the promise with the original image
      }
    };

    img.src = image;
  });
}
// Function to convert base64 to buffer
// function base64ToBuffer(base64Data) {
//     const binaryString = window.atob(base64Data);
//     const buffer = new Uint8Array(binaryString.length);
  
//     for (let i = 0; i < binaryString.length; i++) {
//       buffer[i] = binaryString.charCodeAt(i);
//     }
  
//     return buffer;
// }

export default getPerspectiveImage;