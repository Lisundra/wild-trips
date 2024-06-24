import React from 'react';
import { Rate } from 'antd';

function RatingStars() {
  const starStyle = {
    fontSize: '50px',
  };

  return (
    <div>
      <Rate
        count={10}
        style={starStyle} 
      />
    </div>
  );
}

export default RatingStars;