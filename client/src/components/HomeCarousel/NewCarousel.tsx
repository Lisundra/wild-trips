import React from 'react';
import { Carousel, Card } from 'antd';
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
        {tours.map((tour) => (
          <div key={tour.id} className={styles.carouselSlide}>
            <Card
              hoverable
              className={styles.cardContainer}
              // cover={<img alt={tour.name} src={tour.images[0]?.image_path} />}
            >
              <Link to={`/tours/${tour.id}`} className={styles.link}>
                <h3 className={`${styles.tourName} text-custom-background`}>{tour.name}</h3>
              </Link>
              <div>
                <p className={styles.tourCountry}>{tour.country}</p>
                <Link to={`/${tour.id}`} className="bg-emerald-500 hover:bg-emerald-400 text-white py-2 px-4 rounded inline-block mt-2">
                  Посмотреть программу
                </Link>
              </div>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
