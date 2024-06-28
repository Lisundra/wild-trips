import React from 'react';
import { ConfigProvider, Carousel, Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import EditorsChoiceMark from '../../components/EditorsChoiceMark/EditorsChoiceMark';
import styles from './HomeCarousel.module.css';
import RegButton from '../RegButton/RegButton';

export default function HomeCarousel({ tours }) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Carousel: {
            arrowSize: 100,
            arrowOffset: 120,
          },
        },
      }}
    >
      <div className={styles.carouselContainer}>
        <Carousel className={styles.carouselFromAnt} draggable autoplay autoplaySpeed={5000} arrows>
          {tours.map((tour) => {
            const startDate = new Date(tour.start_date);
            const endDate = new Date(tour.end_date);
            const formattedStartDate = format(startDate, 'dd MMM', { locale: ru });
            const formattedEndDate = format(endDate, 'dd MMM', { locale: ru });

            const tourImage = tour.Images && tour.Images.length > 0 ? tour.Images[0][0] : null;
            console.log('Первое фото из тура', tourImage);

            return (
              <div className={styles.upperWrapper} key={tour.id} style={{ width: '100%' }}>
                <Card
                  bodyStyle={{ padding: "0"}}
                  className={styles.cardContainer}
                  hoverable
                >
                  <div className={styles.innerPartsContainer}>
                    <div className={styles.textAndBtnContainer}>
                      <Link to={`/${tour.id}`} className={styles.link}>
                        <h3 className={`${styles.tourName} text-custom-background`}>{tour.name}</h3>
                      </Link>
                      <div className={styles.tourPriceDateAndButton}>
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
                          <RegButton>Посмотреть программу</RegButton>
                        </Link>
                      </div>
                    </div>
                    <div className={styles.imageContainer}>
                      {tourImage ? <img style={{ width: '600px' }} className={styles.imageItem} alt={tour.name} src={tourImage} /> : null}
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </Carousel>
      </div>
    </ConfigProvider>
  );
}
