import React from 'react';
import { Rate } from 'antd';

function OneRatingStar({ rating }) {
  const starStyle = {
    fontSize: '50px',
    color: getColorByRating(rating),
  };

  function getColorByRating(rating) {
    if (rating < 6.0) {
      return '#DA2C38';
    } if (rating < 8.0) {
      return '#FADB14';
    } 
      return '#55A630';
    
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Rate
        disabled
        defaultValue={1}
        count={1}
        style={starStyle}
      />
    </div>
  );
}

export default OneRatingStar;
