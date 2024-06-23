import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format, differenceInDays } from 'date-fns';
import { ru } from 'date-fns/locale';
import OneTourCarousel from '../../components/OneTourCarousel/OneTourCarousel';
import DrawnTourMap from '../../components/DrawnTourMap/DrawnTourMap';

function getDaysWordForm(days) {
  const lastDigit = days % 10;
  const lastTwoDigits = days % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return 'дней';
  } if (lastDigit === 1) {
    return 'день';
  } if (lastDigit >= 2 && lastDigit <= 4) {
    return 'дня';
  } 
    return 'дней';
}

function OneTour() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/${import.meta.env.VITE_API}/tours/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setTour(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!tour) {
    return <div>Loading...</div>;
  }

  const startDate = new Date(tour.start_date);
  const endDate = new Date(tour.end_date);
  const formattedStartDate = format(startDate, 'dd MMM', { locale: ru });
  const formattedEndDate = format(endDate, 'dd MMM', { locale: ru });
  const daysDifference = differenceInDays(endDate, startDate);
  const daysWordForm = getDaysWordForm(daysDifference);

  return (
    <div>
      <br />
      <br />
      <div className="mt-8"> 
        <OneTourCarousel { ...tour }/>
      </div>
      <p className='m-3'>{tour.name}</p>
      <button className='m-3' type='button'>
        Отправить заявку
      </button>
      <p className='m-3'>Цена: {tour.price.toLocaleString('ru-RU')} ₽</p>
      <p className='m-3'>{formattedStartDate} — {formattedEndDate}</p>
      <p className='m-3'>Длительность: {daysDifference} {daysWordForm}</p>
      <p className='m-3'>Сложность: {tour.difficulty}</p>
      <p className='m-3'>{tour.region}</p>
      <p className='m-3'>{tour.description}</p>
      <p className='m-3'>Активности в туре:<br/>
        {tour.Activities.map((activity, index) => (
          <span key={activity.id}>
            {activity.name}{index < tour.Activities.length - 1 ? ', ' : ''}
          </span>
        ))}
      </p>
      <p className='m-3'>Размещение в туре:<br/>
        {tour.Housings.map((housing, index) => (
          <span key={housing.id}>
            {housing.name}{index < tour.Housings.length - 1 ? ', ' : ''}
          </span>
        ))}
      </p>
      <p className='m-3'>Удобства включенные в стоимость тура:<br/>
        {tour.Facilities.filter((facility) => (facility.TourOption.type === false)).map((facility) => (
          <span key={facility.id}>
            {facility.name}
          </span>
        ))}
      </p>
      <br />
      <p className='m-3'>Удобства за дополнительную оплату:<br/>
        {tour.Facilities.filter((facility) => (facility.TourOption.type === true)).map((facility) => (
          <span key={facility.id}>
            {facility.name}
          </span>
        ))}
      </p>
      <div className="map-container m-3">
        <DrawnTourMap />
      </div>
    </div>
  );
}

export default OneTour;