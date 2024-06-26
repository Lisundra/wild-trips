import React, { useState } from 'react';
import { Card, Carousel } from 'antd';
import { EditOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';
import DifficultyClue from '../DifficultyClue/DifficultyClue';
import EditTour from '../../components/EditTour/EditTour';

function MiniCardTour({
  id,
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
  onEdit,
  onDelete,
  onViewDetails,
}) {
  const [editing, setEditing] = useState(false); // Состояние для отображения модального окна редактирования

  const handleEdit = () => {
    setEditing(true); // Открываем модальное окно редактирования при клике на кнопку EditOutlined
  };

  const handleCancelEdit = () => {
    setEditing(false); // Закрываем модальное окно редактирования
  };

  return (
    <Card
      style={{ width: 400, border: '1px solid #f0f0f0' }}
      cover={
        <div className="relative">
          <Carousel arrows draggable touchMove>
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
      actions={[
        <InfoCircleOutlined key="details" onClick={() => onViewDetails(id)} />,
        <EditOutlined key="edit" onClick={() => onEdit(id)} />, // Кнопка для открытия модального окна редактирования
        <DeleteOutlined key="delete" onClick={() => onDelete(id)} />,
      ]}
    >
      <Meta
        title={title}
        description={
          <div>
            <p>{subtitle}</p>
            <p>
              {start_date} — {end_date}
            </p>
            <p>{duration}</p>
            <div className='flex ml'>
                <p>Сложность: {difficulty}</p>  
                <DifficultyClue difficulty={difficulty} />
            </div>
            <p>Кол-во заявок: {numberBooking}</p>
            <p>Price: {price}</p>
          </div>
        }
      />
      {editing && (
        <EditTour
          tour={{
            id,
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
          }}
          onUpdate={(updatedTour) => {
            // Обработчик обновления данных тура после редактирования
            // Например, можно передать обновленные данные на сервер
            // и затем обновить состояние компонента MiniCardTour
            console.log('Updated tour:', updatedTour);
            setEditing(false); // Закрыть редактирование после сохранения изменений
          }}
          onCancel={handleCancelEdit} // Передаем функцию для закрытия модального окна при отмене
        />
      )}
    </Card>
  );
}

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
  rating: 0,
  Images: ['/src/assets/images/minimalizm-montains-1.png', '/src/assets/images/minimalizm-montains-1.png', '/src/assets/images/minimalizm-montains-1.png'], 
};

export default MiniCardTour;
