import React from 'react';
import { Carousel } from 'antd';
import styles from './OneTourCarousel.module.css';

function OneTourCarousel({ Images }) {
  
  const images = (JSON.parse(Images[0].image_path))
  console.log(images);

  let carouselRef = null;

  const handlePrev = () => {
    carouselRef.prev();
  };

  const handleNext = () => {
    carouselRef.next();
  };

  return (
    <div className={styles.carouselContainer}>
      <Carousel
        dots
        infinite
        speed={500}
        slidesToShow={3}
        slidesToScroll={1}
        waitForAnimate
        arrows
        draggable // включаем возможность перетаскивания мышью
        className={styles.carousel}
        ref={(ref) => (carouselRef = ref)} // сохраняем ссылку на компонент Carousel
      >
        {images.map((src, index) => (
          <div key={index} className={styles.carouselItem}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className={styles.carouselImage}
            />
          </div>
        ))}
      </Carousel>
      <button type='button' onClick={handlePrev} className={styles.prevButton}></button>
      <button type='button' onClick={handleNext} className={styles.nextButton}></button>
    </div>
  );
}

export default OneTourCarousel;
