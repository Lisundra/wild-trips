import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HomeCarousel from '../../components/HomeCarousel/HomeCarousel';
import EmailSubscription from '../../components/EmailSubscription/EmailSubscription';
import styles from './Home.module.css';
import NewCarousel from '../../components/HomeCarousel/NewCarousel';

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
      setDiscountedTours(res.data);
    })
    .catch((error) => {
      console.error('Error fetching discounted tours:', error);
    });

  // Достаём editor's choice tours
  axios.get(`${import.meta.env.VITE_URL}/${import.meta.env.VITE_API}/tours/editors`)
    .then((res) => {
      setEditorsTours(res.data);
    })
    .catch((error) => {
      console.error('Error fetching editor\'s choice tours:', error);
    });

  // Достаём new tours
  axios.get(`${import.meta.env.VITE_URL}/${import.meta.env.VITE_API}/tours/new`)
    .then((res) => {
      setNewTours(res.data);
    })
    .catch((error) => {
      console.error('Error fetching new tours:', error);
    });
}, []); // useEffect заканчивается здесь, передаётся пустой массив зависимостей


  return (
    <div className={styles.wrapper}>
      <div className='homeContainer'>
        <div className="backgroundContainer">
            {/* Заглушка для видео */}
            <img className="w-screen h-screen object-cover" src="/src/assets/images/river.png" alt="background with nature" />
        </div>
        <div className="toursContainer">
        <h2 className="text-5xl font-bold text-center text-gray-800 my-4">Найдите путешествие вашей мечты!</h2>
        <h3 className='text-4xl font-semibold text-rose-600 ml-24 my-8'>Горящие предложения</h3>

        <div className="mt-8"> 
          <HomeCarousel tours={discountedTours}/>
        </div>

        <div className="mt-10"> 
          <HomeCarousel tours={editorsTours}/>
        </div>

        <EmailSubscription/>

        <h3 className='text-4xl font-bold text-center text-gray-800 ml-8 mt-8'>Наши новинки</h3>
        <div className="mt-10"> 
          <NewCarousel tours={newTours}/>
        </div>
        </div>
    </div>
    </div>
  )
}
