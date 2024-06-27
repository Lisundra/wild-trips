import React, { useEffect, useState } from 'react';
import { Checkbox, Button } from 'antd';
import axios from 'axios';
import styles from './Filters.module.css';
import CatalogButton from '../CatalogButton/CatalogButton';

function Facilitiesfilter({ setFilters }) {
  const [checkedList, setCheckedList] = useState([]);
  const [collapsed, setCollapsed] = useState(true);

  const onChange = (value) => {
    console.log('Selected Facilities:', value);
    setCheckedList(value);
    setFilters((prev) => ({ ...prev, facilities: value }));
  };

  useEffect(() => {
    // Вызываем функцию для применения фильтров, когда изменяются checkedList
    applyFilters();
}, [checkedList]);

const applyFilters = () => {
    axios
        .get(`${import.meta.env.VITE_URL}/${import.meta.env.VITE_API}/tours`, {
            params: { facilities: checkedList } // Передаем выбранные виды услуг как параметр запроса
        })
        .then((res) => {
            setFilters((prev) => ({ ...prev, tours: res.data })); // Обновляем состояние с данными о турах
        })
        .catch((error) => {
            console.error('Error fetching tours:', error);
        });
};

  const options = [
    { label: 'Услуги гида', value: 'Услуги гида' },
    { label: 'Посещение термальных источников', value: 'Посещение термальных источников' },
    { label: 'Билеты в музеи', value: 'Билеты в музеи' },
    { label: 'Экскурсии по программе тура', value: 'Экскурсии по программе тура' },
    { label: 'Проживание в местах размещения', value: 'Проживание в местах размещения' },
    { label: 'Медицинская страховка', value: 'Медицинская страховка' },
    { label: 'Завтраки', value: 'Завтраки' },
    { label: 'Трёхразовое питание', value: 'Трёхразовое питание' },
    { label: 'Оформление всех документов', value: 'Оформление всех документов' },
    { label: 'Помощь в оформлении визы', value: 'Помощь в оформлении визы' },
    { label: 'Билеты в парки, резервации и заповедники', value: 'Билеты в парки, резервации и заповедники' },
    { label: 'Все трансферы внутри тура', value: 'Все трансферы внутри тура' },
    { label: 'Индивидуальные трансферы', value: 'Индивидуальные трансферы' },
    { label: 'Ж/Д билеты до точки старта тура', value: 'Ж/Д билеты до точки старта тура' },
    { label: 'Авиабилеты до точки старта тура', value: 'Авиабилеты до точки старта тура' },
    { label: 'Перевоз багажа', value: 'Перевоз багажа' },
    { label: 'Одноместное размещение', value: 'Одноместное размещение' },
    { label: 'Двухместное размещение', value: 'Двухместное размещение' },
    { label: 'Палатка класса "Люкс"', value: 'Палатка класса "Люкс"' },

  ];

  return (
    <div className={styles.housingsFilter}>
      <p className={styles.filterName}>Доступные услуги</p>
      <div className={styles.checkboxContainer}>
        {collapsed ? (
          options.slice(0, 5).map((option) => (
            <Checkbox
              key={option.value}
              checked={checkedList.includes(option.value)}
              onChange={(e) => {
                const value = e.target.checked
                  ? [...checkedList, option.value]
                  : checkedList.filter((item) => item !== option.value);
                onChange(value);
              }}
              className={styles.checkbox}
            >
              {option.label}
            </Checkbox>
          ))
        ) : (
          options.map((option) => (
            <Checkbox
              key={option.value}
              checked={checkedList.includes(option.value)}
              onChange={(e) => {
                const value = e.target.checked
                  ? [...checkedList, option.value]
                  : checkedList.filter((item) => item !== option.value);
                onChange(value);
              }}
              className={styles.checkbox}
            >
              {option.label}
            </Checkbox>
          ))
        )}
      </div>
      <CatalogButton
        size="small"
        onClick={() => setCollapsed(!collapsed)}
        className={styles.showAllButton}
        style={{ width: '75%', marginTop: '10px' }}
      >
        {collapsed ? 'Показать все' : 'Свернуть'}
      </CatalogButton>
    </div>
  );
}

export default Facilitiesfilter;
