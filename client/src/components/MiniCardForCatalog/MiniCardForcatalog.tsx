import React from 'react';
import { Card, Carousel } from 'antd';
import Meta from 'antd/es/card/Meta';
import DifficultyClue from '../DifficultyClue/DifficultyClue';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const MiniCardForCatalog = ({
  title,
  subtitle,
  start_date,
  end_date,
  duration,
  difficulty,
  numberBooking,
  price,
  rating,
  Images,
}) => {
  const formattedStartDate = format(new Date(start_date), 'dd MMM', { locale: ru });
  const formattedEndDate = format(new Date(end_date), 'dd MMM', { locale: ru });

  return (
    <Card
      style={{ width: 400, border: '1px solid #f0f0f0' }}
      cover={
        <div className="relative">
          <Carousel arrows={true} draggable touchMove={true}>
            {Images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Slide ${index}`}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
              </div>
            ))}
          </Carousel>
          <div className="absolute top-2 right-2 bg-orange-400 text-white rounded-full px-2 py-1">
            {rating}
          </div>
        </div>
      }
    >
      <div style={{ minHeight: '450px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Meta
          title={title}
          description={
            <div>
              <p>{subtitle}</p>
              <p>
                {formattedStartDate} — {formattedEndDate}
              </p>
              <p>{duration} дней</p>
              <div className='flex ml'>
                <p>Сложность: {difficulty}</p>
                <DifficultyClue difficulty={difficulty} />
              </div>
              {/* <p>Кол-во заявок: {numberBooking}</p> */}
              <p>От {price} руб.</p>
            </div>
          }
        />
      </div>
    </Card>
  );
};

// Задание значений по умолчанию для пропсов
MiniCardForCatalog.defaultProps = {
  title: 'Название',
  subtitle: 'Описание',
  start_date: '2024-12-27',
  end_date: '2025-01-03',
  duration: 'Длительность',
  difficulty: 'Уровень сложности',
  numberBooking: 0,
  price: 0,
  rating: 0,
  Images: ['/src/assets/images/arctic.png', '/src/assets/images/fjord.png', '/src/assets/images/river.png'], 
};

export default MiniCardForCatalog;
