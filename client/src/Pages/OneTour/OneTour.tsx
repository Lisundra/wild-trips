import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format, differenceInDays } from 'date-fns';
import { ru } from 'date-fns/locale';
import OneTourCarousel from '../../components/OneTourCarousel/OneTourCarousel';
import OneRatingStar from '../../components/OneRatingStar/OneRatingStar';
import RatingStars from '../../components/RatingStars/RatingStars';
import TourMap from '../../components/TourMap/TourMap';
import DifficultyTooltip from '../../components/DifficultyTooltip/DifficultyTooltip';
import OneTourButton from '../../components/OneTourButton/OneTourButton';
import EditorsChoiceMark from '../../components/EditorsChoiceMark/EditorsChoiceMark'
import styles from './OneTour.module.css';

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
  const formattedStartDateDetails = format(startDate, 'dd MMMM', { locale: ru });
  const formattedEndDate = format(endDate, 'dd MMM', { locale: ru });
  const formattedEndDateDetails = format(endDate, 'dd MMMM', { locale: ru });
  const daysDifference = differenceInDays(endDate, startDate);
  const daysWordForm = getDaysWordForm(daysDifference);
  
  let ratingColorClass = '';
  if (tour.average_rating < 6.0) {
    ratingColorClass = styles.redRating;
  } else if (tour.average_rating < 8.0) {
    ratingColorClass = styles.yellowRating;
  } else {
    ratingColorClass = styles.greenRating;
  }

  console.log('консоль тура', tour);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <div className={styles.upperWrapper}>
        <div className={styles.upperContainer}>
          <div className={styles.nameRatingContainer}>
            <p className={styles.nameTitle}>{tour.name}</p>
            <div className={styles.avgRatingContainer}>
              <div className={styles.avgRatingNumberContainer}>
                <p className={`${styles.avgRatingNumber} ${ratingColorClass}`}>
                  {tour.average_rating}
                </p>
              </div>
              <OneRatingStar rating={tour.average_rating} />
            </div>
          </div>
          {tour.editors_choice && <EditorsChoiceMark />}
          <div className={styles.priceRequestContainer}>
            <p className={styles.price}>{tour.price.toLocaleString('ru-RU')} ₽</p>
            <OneTourButton />
          </div>
        </div>
        <div className={styles.dateDurationDifficultyContainer}>
          <p className={styles.date}>
            {formattedStartDate} — {formattedEndDate}
          </p>
          <p className={styles.duration}>
            Длительность: {daysDifference} {daysWordForm}
          </p>
          <p className={styles.difficulty} style={{ position: 'relative' }}>
            Сложность: {tour.difficulty}
            <DifficultyTooltip />
          </p>
        </div>
      </div> 

      {/* Конец upperWrapper */}

      <div className={styles.OneTourCarouselContainer}>
        <OneTourCarousel { ...tour }/>
      </div>

      {/* Конец карусели */}

      <div className={styles.infoContainer}>
        <div className={styles.leftContainer}>
          <p className={styles.description}>
            {tour.description}
          </p>
          <div className={styles.mapContainer}>
            <TourMap tour={tour} />
          </div>
          <div className={styles.ratingStarsContainer}>
            <p className={styles.ratingStarsTitle}>
              Оставьте оценку этому маршруту
            </p>
            <RatingStars setTour={setTour} />
          </div>
          <div className={styles.facilitiesContainer}>
        <p className={styles.facilityTitle}>
          Удобства включенные в стоимость тура:
        </p>
        <p className={styles.facility}>
          {tour.Facilities.filter((facility) => (facility.TourOption.type === false)).map((facility) => (
            <p key={facility.id} className={styles.facilityItem}>
              {facility.name}
            </p>
          ))}
        </p>
        <br />
        <p className={styles.facilityTitle}>
          Удобства за дополнительную оплату:
        </p>
        <p className={styles.facility}>
          {tour.Facilities.filter((facility) => (facility.TourOption.type === true)).map((facility) => (
            <span key={facility.id} className={styles.facilityItem}>
              {facility.name}
            </span>
          ))}
        </p>
      </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.detailsWrapper}>
            <div className={styles.detailsContainer}>
              <table className={styles.detailsTable}>
                <caption className={styles.detailsTitle}>Детали тура</caption>
                <tbody>
                  <tr>
                    <td className={styles.detailLabel}>Тур:</td>
                    <td className={styles.detailValue}>{tour.name}</td>
                  </tr>
                  <tr>
                    <td className={styles.detailLabel}>Регион:</td>
                    <td className={styles.detailValue}>{tour.region}</td>
                  </tr>
                  <tr>
                    <td className={styles.detailLabel}>Даты:</td>
                    <td className={styles.detailValue}>
                      с {formattedStartDateDetails} по {formattedEndDateDetails}
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.detailLabel}>Сложность:</td>
                    <td className={styles.detailDifficultyValue} style={{ position: 'relative' }}>
                      {tour.difficulty}
                      <DifficultyTooltip />
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.detailLabel}>Подходит для отдыха с детьми:</td>
                    <td className={styles.detailValue}>
                      {tour.family_friendly ? 'Да' : 'Нет'}
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.detailLabel}>Размещение в туре:</td>
                    <td className={styles.detailValue}>
                      {tour.Housings.map((housing) => (
                        <p key={housing.id} className={styles.detailsItem}>
                          {housing.name}
                        </p>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.detailLabel}>Активности в туре:</td>
                    <td className={styles.detailValue2}>
                      {tour.Activities.map((activity) => (
                        <p key={activity.id} className={styles.detailsItem}>
                          {activity.name}
                        </p>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" style={{ textAlign: 'center' }}>
                      <OneTourButton />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneTour;
