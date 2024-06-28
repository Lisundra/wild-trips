import React from 'react';
import { Carousel, Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import EditorsChoiceMark from '../../components/EditorsChoiceMark/EditorsChoiceMark'
import styles from './HomeCarousel.module.css';

export default function HomeCarousel({ tours }) {
  return (
    <div className={styles.carouselContainer}>
      <Carousel className={styles.carouselFromAnt} autoplay draggable autoplaySpeed={5000} arrows>
        {tours.map((tour) => {
          // console.log('-________-', tour.Images[0][0]);
          const startDate = new Date(tour.start_date);
          const endDate = new Date(tour.end_date);
          const formattedStartDate = format(startDate, 'dd MMM', { locale: ru });
          const formattedEndDate = format(endDate, 'dd MMM', { locale: ru });

          const tourImage = tour.Images && tour.Images.length > 0 ? tour.Images[0][0] : null;
          console.log('Первое фото из тура', tourImage);

          return (
            <div key={tour.id}>
              <Card
                className={styles.cardContainer}
                hoverable
                cover={tourImage ? <img alt={tour.name} src={tourImage} /> : null}
              >
                <Link to={`/${tour.id}`} className={styles.link}>
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
                  <Link to={`/${tour.id}`} >
                    <Button>Посмотреть программу</Button>
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
