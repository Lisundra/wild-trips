import React, { useState } from 'react';
import { Checkbox } from 'antd';
import styles from './Filters.module.css';

const SeasonFilter = ({ setFilters }) => {
  const [checkedList, setCheckedList] = useState([]);

  const onChange = (list) => {
    setCheckedList(list);
    setFilters(prev => ({ ...prev, season: list }));
  };

  const options = [
    { label: 'Зима', value: 'Зима' },
    { label: 'Весна', value: 'Весна' },
    { label: 'Лето', value: 'Лето' },
    { label: 'Осень', value: 'Осень' },
  ];

  return (
    <>
      <p className={styles.filterName}>😭Сезон</p>
      <Checkbox.Group value={checkedList} options={options} onChange={onChange} />
    </>
  );
};

export default SeasonFilter;
