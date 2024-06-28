import React from 'react';
import { Carousel, Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import styles from './NewCarousel.module.css';

export default function NewCarousel({ tours }) {
  return (
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
                cover={tourImage ? <img alt={tour.name} src={tourImage} /> : null}
              >
                <Link to={`/${tour.id}`} className={styles.link}>
                  <h3 className={`${styles.tourName} text-custom-background`}>{tour.name}</h3>
                </Link>
                <div>
                  <Link
                    to={`/${tour.id}`}
                  >
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
