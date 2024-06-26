import React, { useState, useEffect } from 'react';
import { Rate } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function RatingStars({ setTour }) { //! приняли пропс setTour
  const { id } = useParams();
  const [currentRating, setCurrentRating] = useState(0);
  const starStyle = {
    fontSize: '50px',
  };

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await axios
        .get(`${import.meta.env.VITE_URL}/${import.meta.env.VITE_API}/tours/${id}/rating`,
        { withCredentials: true }
        );
        setCurrentRating(response.data.rating);
      } catch (error) {
        console.error('Ошибка при получении рейтинга', error);
      }
    };

    fetchRating();
  }, [id])

  const handleRatingChange = async (value) => {
    try {
      const response = await axios
        .post(`${import.meta.env.VITE_URL}/${import.meta.env.VITE_API}/tours/${id}/rate`,
        { rating: value },
        { withCredentials: true }
        );
      console.log('Рейтинг успешно отправлен', response.data.tour);
      setCurrentRating(value);
      // setTour((prev) => prev.map((el) => {
      //     if (el.id === response.data.tour.id) {
      //       return {
      //         ...el,
      //         average_rating: response.data.tour.average_rating
      //       };
      //     }
      //     return el;
      //   }));
      // setTour((prev) => {
      //   console.log('предыдущий рейтинг', prev.average_rating);
      //   console.log('новый рейтинг', Number(response.data.tour.average_rating));
      //   prev.average_rating = Number(response.data.tour.average_rating);
      //   console.log('текущий рейтинг', prev.average_rating);
        
      //   return prev;
      // });

      // setTour((prev) => {
      //   console.log('консоль прева', prev)
      // });
    } catch (error) {
      console.error('Ошибка при отправке рейтинга', error);
    }
  };

  return (
    <div>
      <Rate
        count={10}
        value={currentRating}
        style={starStyle}
        onChange={handleRatingChange}
        allowClear={false}
      />
    </div>
  );
}

export default RatingStars;