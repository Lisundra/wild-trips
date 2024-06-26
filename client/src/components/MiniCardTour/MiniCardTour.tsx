import React from 'react';
import { Button, Card, Carousel } from 'antd';
import Meta from 'antd/es/card/Meta';
import DifficultyClue from '../DifficultyClue/DifficultyClue';

const MiniCardTour = ({
  title,
  subtitle,
  start_date,
  end_date,
  start=new Date(start_date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('.').reverse().join('-'),
  end=new Date(end_date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('.').reverse().join('-'),
  duration,
  difficulty,
  numberBooking,
  price,
  average_rating,
  Images,
}) => {
    // console.log("🚀 ~ Images:", Images)
    

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
            {average_rating}
          </div>
        </div>
      }
    >
      <Meta
        title={title}
        description={
          <div>
            <p>{subtitle}</p>
            <p>
              {start} — {end}
            </p>
            <p>Длительность в днях: {duration}</p>
            <div className='flex ml'>
                <p>Сложность: {difficulty}</p>  
                <DifficultyClue difficulty={difficulty} />
            </div>
            <p>Кол-во заявок: {numberBooking}</p>
            <p>От {price} руб.</p>
          </div>
        }
      />
    </Card>
  );
};

// Задание значений по умолчанию для пропсов
MiniCardTour.defaultProps = {
  title: 'Название',
  subtitle: 'Описание',
  start_date: 'Дата начала',
  end_date: 'Дата окончания',
  duration: 'Длительность',
  difficulty: 'Уровень сложности',
  numberBooking: 0,
  price: 0,
  average_rating: 0,
  Images: ['/src/assets/images/minimalizm-montains-1.png', '/src/assets/images/minimalizm-montains-1.png', '/src/assets/images/minimalizm-montains-1.png'], 
};

export default MiniCardTour;
