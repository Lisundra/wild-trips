import React from 'react';
import { Carousel, Card } from 'antd';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import styles from './HomeCarousel.module.css';

export default function HomeCarousel({ tours }) {
  return (
    <div className={styles.carouselContainer}>
      <Carousel className={styles.carouselFromAnt} autoplay draggable autoplaySpeed={5000} arrows>
        {tours.map((tour) => {
          const startDate = new Date(tour.start_date);
          const endDate = new Date(tour.end_date);
          const formattedStartDate = format(startDate, 'dd MMM', { locale: ru });
          const formattedEndDate = format(endDate, 'dd MMM', { locale: ru });

          return (
            <div key={tour.id}>
              <Card
                className={styles.cardContainer}
                hoverable
                // cover={<img alt={tour.name} src={tour.images[0]?.image_path} />}
              >
                <Link to={`/tours/${tour.id}`} className={styles.link}>
                <h3 className={`${styles.tourName} text-custom-background`}>{tour.name}</h3>
              </Link>
                <div>
                  <p className={styles.tourPrice}>
                    {tour.discount !== null ? (
                      <>
                        <span className={`${styles.discountedPrice} ${styles.originalPrice} mr-2`}>{tour.price} ₽</span>
                        <span>{tour.price - tour.discount} ₽</span>
                      </>
                    ) : (
                      <span className={styles.originalPrice}>{tour.price}₽</span>
                    )}
                  </p>
                  <p className={styles.tourDates}>{formattedStartDate} — {formattedEndDate}</p>
                  <Link to={`/${tour.id}`} className="bg-emerald-500 hover:bg-emerald-400 text-white py-2 px-4 rounded inline-block mt-2">
                    Посмотреть программу
                  </Link>
                </div>
              </Card>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
