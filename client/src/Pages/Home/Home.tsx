import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HomeCarousel from '../../components/HomeCarousel/HomeCarousel';
import EmailSubscription from '../../components/EmailSubscription/EmailSubscription';
import styles from './Home.module.css';
import NewCarousel from '../../components/HomeCarousel/NewCarousel';
import EditorsChoiceMark from '../../components/EditorsChoiceMark/EditorsChoiceMark';

export default function Home() {
  //! Создание состояний (useState) для хранения массивов туров, которые будут использоваться в каруселях.
  //! Эти массивы заполнятся данными с сервера из эндпоинтов
  const [discountedTours, setDiscountedTours] = useState([]);
  const [editorsTours, setEditorsTours] = useState([]);
  const [newTours, setNewTours] = useState([]);

  // Достаём данные внутри useEffect
useEffect(() => {
  // Достаём discounted tours
  axios.get(`${import.meta.env.VITE_URL}/${import.meta.env.VITE_API}/tours/discounted`)
    .then((res) => {
      // console.log('*_________________*', res.data);
      let specificTours = res.data;

       // Проверяем туры на наличие изображения и парсим их
       const dataWithImages = specificTours.map(tour => {
        if (tour.Images && tour.Images.length > 0) {
          return {
            ...tour,
            Images: tour.Images.map(image => JSON.parse(image.image_path))
          };
        }
        return tour;
      });

      console.log('Скидочные туры с картинками', dataWithImages);
      setDiscountedTours(dataWithImages);
    })
    .catch((error) => {
      console.error('Error fetching discounted tours:', error);
    });

  // Достаём editor's choice tours
  axios.get(`${import.meta.env.VITE_URL}/${import.meta.env.VITE_API}/tours/editors`)
    .then((res) => {
      // console.log('*_________________*', res.data);
      let specificTours = res.data;

      // Проверяем туры на наличие изображения и парсим их
      const dataWithImages = specificTours.map(tour => {
        if (tour.Images && tour.Images.length > 0) {
          return {
            ...tour,
            Images: tour.Images.map(image => JSON.parse(image.image_path))
          };
        }
        return tour;
      });

    console.log('Туры от редакции с картинками', dataWithImages);
      setEditorsTours(dataWithImages);
    })
    .catch((error) => {
      console.error('Error fetching editor\'s choice tours:', error);
    });

  // Достаём new tours
  axios.get(`${import.meta.env.VITE_URL}/${import.meta.env.VITE_API}/tours/new`)
    .then((res) => {
      // console.log('*_________________*', res.data);
      let specificTours = res.data;

      // Проверяем туры на наличие изображения и парсим их
      const dataWithImages = specificTours.map(tour => {
        if (tour.Images && tour.Images.length > 0) {
          return {
            ...tour,
            Images: tour.Images.map(image => JSON.parse(image.image_path))
          };
        }
        return tour;
      });

      console.log('Новые туры с картинками', dataWithImages);
      setNewTours(dataWithImages);
    })
    .catch((error) => {
      console.error('Error fetching new tours:', error);
    });
}, []); // useEffect заканчивается здесь, передаётся пустой массив зависимостей

  return (
    <div className={styles.homeContainer}>
      <div className={styles.backgroundContainer}>
      <video className={styles.video} autoPlay loop muted>
        <source src="/src/assets/images/homepage_video.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.overlay}></div>
    </div>
        <div className="toursContainer">
        <h1 className={styles.mainHeading}>Найдите путешествие вашей мечты!</h1>
        <h3 className={styles.discountsHeading}>Горящие предложения</h3>

        <div className="mt-8"> 
          <HomeCarousel tours={discountedTours}/>
        </div>
        <div style={{ position: 'relative' }}>
        <div style={{ 
    position: 'absolute', 
    zIndex: '10', 
    right: '400px', 
    top: '75px', 
    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
    borderRadius: '50px', 
    backdropFilter: 'blur(10px)', 
    WebkitBackdropFilter: 'blur(10px)', 
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)' 
}}>            <EditorsChoiceMark />
          </div>
        </div>
        <div className="mt-10"> 
          <HomeCarousel tours={editorsTours}/>
        </div>

        <EmailSubscription/>

        <h3 className={styles.newToursHeading}>Наши новинки</h3>
        <div className="mt-8"> 
          <NewCarousel tours={newTours}/>
        </div>
        </div>
    </div>
  )
}
