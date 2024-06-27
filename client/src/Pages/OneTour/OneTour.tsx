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
import AssistantModal from '../../components/AssistantModal/AssistantModal';

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
  const [avgRating, setAvgRating] = useState(null);
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState({email:'', name:''})
  const [loading, setLoading] = useState(true)
  console.log("🚀 ~ OneTour ~ userData:", userData)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${import.meta.env.VITE_URL}/${import.meta.env.VITE_API}/tours/${id}`, {
          withCredentials: true,
        });
        setTour(result.data);

        const resultUserData = await axios.get(`${import.meta.env.VITE_URL}/${import.meta.env.VITE_API}/users/user/get`, {
          withCredentials: true,
        });
        setUserData({email:resultUserData.data.email || '', name: resultUserData.data.full_name  || ''});

        setLoading(false)
        console.log('useEffect отрабатывает', result.data, resultUserData);
      } catch (error) {
        console.error('Ошибка при получении данных', error);
      }
    };


    

    fetchData();
  }, [id, avgRating, visible]);

  useEffect(() => {
    if (avgRating !== null) {
      setTour((prevTour) => ({
        ...prevTour,
        average_rating: avgRating
      }));
    }
  }, [avgRating]);

  if (!tour || loading) {
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

      <AssistantModal 
      userName={userData.name} 
      userEmail={userData.email} 
      visible={visible} 
      setVisible={setVisible}>
      </AssistantModal>

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
              <button onClick={()=>setVisible(!visible)}>
            <OneTourButton />
            </button>
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
          Погрузитесь в уникальную атмосферу Долины гейзеров на Камчатке, которая является самым крупным гейзерным полем в Евразии. Здесь вас ждет захватывающее путешествие по этим удивительным местам, где вы сможете увидеть мощные гейзеры, кипящие источники и другие природные явления, которые поражают воображение. Камчатка славится своей дикостью и недоступностью, что делает ее идеальным местом для любителей природы и приключений. Множество редких видов растений и животных, живущих в этом регионе, удивят вас своим многообразием и красотой.
          </p>
          <p className={styles.description}>
            В течение 7 дней вы окунетесь в мир вулканических ландшафтов и уникальной флоры и фауны, которые делают этот регион настоящим чудом природы. Каждый день будет наполнен новыми открытиями и незабываемыми впечатлениями. Вы сможете наблюдать, как гейзеры выбрасывают свои струи воды и пара на высоту до нескольких десятков метров, почувствуете жар от кипящих источников и насладитесь чистым воздухом, наполненным ароматом дикорастущих трав. Природа Камчатки невероятно разнообразна и удивительна, и вы сможете оценить все ее богатства во время вашего путешествия.
          </p>
          <p className={styles.description}>
            Под руководством опытных гидов вы сможете узнать много интересного о гейзерах, вулканах и истории этого удивительного места. Ваши гиды не только проведут вас по самым интересным маршрутам, но и поделятся с вами знаниями о геологической структуре региона, его истории и легендах, связанных с этим местом. Вы узнаете о том, как гейзеры образуются и почему они существуют только в нескольких местах на Земле. Это путешествие подарит вам не только эстетическое удовольствие, но и новые знания, которые обогатят ваше понимание природы и ее удивительных явлений.
          </p>
          <div className={styles.mapContainer}>
            <TourMap tour={tour} />
          </div>
          <div className={styles.ratingStarsContainer}>
            <p className={styles.ratingStarsTitle}>
              Оставьте оценку этому маршруту
            </p>
            <RatingStars setTour={setTour} setAvgRating={setAvgRating} />
          </div>
          <div className={styles.facilitiesContainer}>
        <p className={styles.facilityTitle}>
          Удобства включенные в стоимость тура:
        </p>
        <p className={styles.facility}>
          {tour.Facilities.filter((facility) => (facility.TourOption.type === false)).map((facility) => (
            <span key={facility.id} className={styles.facilityItem}>
              {facility.name}
            </span>
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
