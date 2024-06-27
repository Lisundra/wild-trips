import React from 'react';
import { Button, Card, Carousel } from 'antd';
import Meta from 'antd/es/card/Meta';
import DifficultyClue from '../DifficultyClue/DifficultyClue';
import OneRatingStar from '../OneRatingStar/OneRatingStar';
import styles from './MiniCardTour.module.css';

function MiniCardTour({
  title,
  subtitle,
  start_date,
  end_date,
  start=new Date(start_date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('.').reverse().join('-'),
  end=new Date(end_date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('.').reverse().join('-'),
  duration,
  difficulty,
  numberBooking,
  price,
  average_rating,
  Images,
}) {
    // console.log("🚀 ~ Images:", Images)
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
      style={{ width: 350, border: '1px solid #ffffff', marginLeft: -25, marginTop: -25 }}
      cover={
        <div className="relative">
          <Carousel arrows draggable touchMove>
            {Images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Slide ${index}`}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
              </div>
            ))}
          </Carousel>
          <div className="absolute top-2 right-2 text-white rounded-full px-2 py-1">
            <div className={styles.avgRatingNumberContainer}>
              <div className={styles.numberContainer}>
                <p className={`${styles.avgRatingNumber} ${ratingColorClass}`}>
                  {average_rating}
                </p>
              </div>
              <OneRatingStar rating={average_rating} />
            </div>
          </div>
        </div>
      }
    >
      <Meta
        title={title}
        description={
          <div>
            <p>{subtitle}</p>
            <p>
              {start} — {end}
            </p>
            <p>Длительность в днях: {duration}</p>
            <div className='flex ml'>
                <p>Сложность: {difficulty}</p>  
                <DifficultyClue difficulty={difficulty} />
            </div>
            <p>Кол-во заявок: {numberBooking}</p>
            <p>От {price} руб.</p>
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
