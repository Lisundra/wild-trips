import React from 'react';
import { Carousel, Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import styles from './HomeCarousel.module.css';

// Стиль для контента слайда
const contentStyle = {
  margin: '0 auto', // Центрируем содержимое
  maxWidth: '800px', // Максимальная ширина контента
  height: '500px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
}

export default function NewCarousel({ tours }) {
  return (
    <Carousel className={styles.carouselFromAnt} autoplay autoplaySpeed={5000} arrows>
      {tours.map((tour) => (
        <div key={tour.id}>
          <Card
            hoverable
            // cover={<img alt={tour.name} src={tour.images[0]?.image_path} />}
          >
            <h3 className={`${styles.tourName} text-custom-background`}>{tour.name}</h3>
            <div>
            <p className={styles.tourCountry}>{tour.country}</p>
              {/* Используем Link вместо Button и указываем to */}
              <Link to={`/tours/${tour.id}`} className="bg-emerald-500 hover:bg-emerald-400 text-white py-2 px-4 rounded inline-block mt-2">
                Посмотреть программу
              </Link>
            </div>
          </Card>
        </div>
      ))}
    </Carousel>
  );
}



