import React, { useEffect, useState } from 'react';
// import 'antd/dist/antd.css';
import { Button } from "antd";
import HomeCarousel from '../../components/HomeCarousel/HomeCarousel';
import EmailSubscription from '../../components/EmailSubscription/EmailSubscription';
import axios from 'axios';


export default function Home() {
  // const [discountedTours, setDiscountedTours] = useState([]);
  // const [editorsTours, setEditorsTours] = useState([]);
  // const [newTours, setNewTours] = useState([]);

  // useEffect(() => {
  //   axios.get(`${import.meta.env.VITE_URL}/${import.meta.env.VITE_API}/discounted`)
  //     .then((res) => {
  //       setDiscountedTours(res.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching discounted tours:', error);
  //     });
  // }, []);


  return (
    <div className='homeContainer'>
        <div className="backgroundContainer">
            {/* Заглушка для видео */}
            <img className="w-screen h-screen object-cover" src="/src/assets/images/river.png" alt="background with nature" />
        </div>
        <div className="toursContainer">
        <h2 className="text-5xl font-bold text-center text-gray-800 my-4">Найдите путешествие вашей мечты!</h2>
        <h3 className='text-4xl font-semibold text-rose-600'>Горящие предложения</h3>

        <div className="mt-8"> 
          <HomeCarousel />
        </div>

        <div className="mt-20"> 
          <HomeCarousel />
        </div>

        <EmailSubscription/>

        <h3 className='text-4xl font-bold text-gray-800'>Наши новинки</h3>
        <div className="mt-20"> 
          <HomeCarousel />
        </div>

        {/* <HomeCarousel tours={discountedTours}/>

        <HomeCarousel tours={editorsChoiceTours}/>

        <HomeCarousel tours={recentTrips}/> */}
        </div>
    </div>
  )
}
