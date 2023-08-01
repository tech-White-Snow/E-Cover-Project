import React from 'react';
import axios from 'axios';

const PSDViewer = () => {
  const handleReplaceLayer = async () => {
    try {
      const response = await axios.get('/api/replace-layer');
      if (response.ok) {
        console.log('---Layer replaced successfully!');
      } else {
        console.error('---An error occurred while replacing the layer.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleReplaceLayer}>Replace Layer</button>
    </div>
  );
};

export default PSDViewer;