import React from 'react';
import { Rate } from 'antd';

function OneRatingStarMyTours({ rating }) {
  const starStyle = {
    width: '60px', /* Размер круглого элемента */
    height: '60px',
    borderRadius: '50%', /* Делаем элемент круглым */
    backgroundColor: 'rgba(253, 144, 10, 0.8)', /* Задаем цвет фона с прозрачностью */
    backdropFilter: 'blur(10px)', /* Эффект стекла с размытием */
    border: '1px solid rgba(255, 255, 255, 0.2)', /* Опционально: граница с прозрачностью */
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', /* Тень для выделения элемента */
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '20px',
    color: getColorByRating(rating),
    fontFamily: `'ExcentraPro-Bold', sans-serif`,
    fontSize: '32px',
    paddingTop: '10px',
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
    <div style={starStyle}>
      {rating}
    </div>
  );
}

export default OneRatingStarMyTours;
