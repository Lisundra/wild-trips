import React from 'react';
import { Carousel, Card, Button, ConfigProvider } from 'antd';
import { Link } from 'react-router-dom';
import styles from './NewCarousel.module.css';
import RegButton from '../RegButton/RegButton';

export default function NewCarousel({ tours }) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Carousel: {
            arrowSize: 100,
            arrowOffset: -70,
            dotOffset: 175,
          },
        },
      }}
    >
      <div className={styles.carouselContainer}>
        <Carousel
          className={styles.carouselFromAnt}
          autoplay
          draggable
          autoplaySpeed={5000}
          arrows
          slidesToShow={3}
          slidesToScroll={1}
          infinite
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
              },
            },
          ]}
        >
          {tours.map((tour) => {
            const tourImage = tour.Images && tour.Images.length > 0 ? tour.Images[0][0] : null;

            return (
              <div key={tour.id} className={styles.carouselSlide}>
                <Card
                  hoverable
                  className={styles.cardContainer}
                  cover={tourImage ? <img style={{ width: '600px', height: '250px', marginTop: '-25px' }} alt={tour.name} src={tourImage} /> : null}
                >
                  <Link to={`/${tour.id}`} className={styles.link}>
                    <h3 className={`${styles.tourName} text-custom-background`}>{tour.name}</h3>
                  </Link>
                  <div style={{ width: '100%' }}>
                    <Link
                      style={{ display: 'flex', justifyContent: 'center' }}
                      to={`/${tour.id}`}
                    >
                      <RegButton>Посмотреть программу</RegButton>
                    </Link>
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
