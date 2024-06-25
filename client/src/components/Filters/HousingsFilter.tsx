import React, { useState } from 'react';
import { Checkbox, Button } from 'antd';
import styles from './Filters.module.css';

const HousingsFilter = ({ setFilters }) => {
  const [checkedList, setCheckedList] = useState([]);
  const [collapsed, setCollapsed] = useState(true);

  const onChange = (value) => {
    console.log('Selected Housings:', value);
    setCheckedList(value);
    setFilters((prev) => ({ ...prev, housings: value }));
  };

  const options = [
    { label: 'Отель', value: 'Отель' },
    { label: 'Плавучий отель', value: 'Плавучий отель' },
    { label: 'Гостевой дом', value: 'Гостевой дом' },
    { label: 'Бунгало', value: 'Бунгало' },
    { label: 'Юрта', value: 'Юрта' },
    { label: 'Хижина', value: 'Хижина' },
    { label: 'Ферма', value: 'Ферма' },
    { label: 'Глэмпинг', value: 'Глэмпинг' },
    { label: 'Кемпинг', value: 'Кемпинг' },
    { label: 'Турбаза', value: 'Турбаза' },
  ];

  return (
    <div className={styles.housingsFilter}>
      <p className={styles.filterName}>Тип размещения</p>
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
      <Button
        size="small"
        onClick={() => setCollapsed(!collapsed)}
        className={styles.showAllButton}
        style={{ width: '75%', marginTop: '10px' }}
      >
        {collapsed ? 'Показать все' : 'Свернуть'}
      </Button>
    </div>
  );
};

export default HousingsFilter;
