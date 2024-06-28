import React from 'react';
import { Card, Carousel } from 'antd';
import Meta from 'antd/es/card/Meta';
import styles from './MiniCardTour.module.css';
import OneRatingStar from '../OneRatingStar/OneRatingStar';
import OneRatingStarMyTours from '../OneRatingStarMyTours/OneRatingStarMyTours';

function MiniCardTour({
  title,
  subtitle,
  start_date,
  end_date,
  duration,
  difficulty,
  numberBooking,
  price,
  average_rating,
  Images,
}) {
  const start = new Date(start_date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).replace('.', '');
  
  const end = new Date(end_date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).replace('.', '');

  let ratingColorClass = '';
  if (average_rating < 6.0) {
    ratingColorClass = styles.redRating;
  } else if (average_rating < 8.0) {
    ratingColorClass = styles.yellowRating;
  } else {
    ratingColorClass = styles.greenRating;
  }

  return (
    <Card
      style={{ width: '400px', height: '450px', border: '0px solid #ffffff', marginLeft: '-25px', marginTop: '-25px', position: 'relative', overflow: 'visible' }}
      cover={
        <div className="relative">
          <Carousel arrows draggable touchMove>
            {Images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Slide ${index}`}
                  style={{ width: '99.9%', height: '200px', objectFit: 'cover' }}
                />
              </div>
            ))}
          </Carousel>
          <div className="absolute top-2 right-2 text-white rounded-full px-2 py-1">
            <div className={styles.avgRatingNumberContainer}>
              <div>
                <OneRatingStarMyTours rating={average_rating} />
              </div>
            </div>
          </div>
        </div>
      }
    >
      <Meta
        title={<span style={{ fontSize: '22px' }}>{title}</span>}
        description={
          <div style={{ fontSize: '19px', lineHeight: '20px' }}>
            <div>
              <p>{subtitle}</p>
              <p>
                Даты: с {start} по {end}
              </p>
              <p>Длительность тура: {duration} дней</p>
              <div className='flex ml'>
                <p>Сложность: {difficulty}</p>  
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: '0px', left: '25px' }}>
              <p>Количество заявок: {numberBooking}</p>
              <p>Стоимость тура: от {price} руб.</p>
            </div>
          </div>
        }
      />
    </Card>
  );
}

// Задание значений по умолчанию для пропсов
MiniCardTour.defaultProps = {
  title: 'Название',
  subtitle: 'Описание',
  start_date: 'Дата начала',
  end_date: 'Дата окончания',
  duration: 'Длительность',
  difficulty: 'Уровень сложности',
  numberBooking: 0,
  price: 0,
  average_rating: 0,
  Images: ['/src/assets/images/minimalizm-montains-1.png', '/src/assets/images/minimalizm-montains-1.png', '/src/assets/images/minimalizm-montains-1.png'], 
};

export default MiniCardTour;
