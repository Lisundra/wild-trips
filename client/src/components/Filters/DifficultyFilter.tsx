import React, { useState } from 'react';
import { Checkbox } from 'antd';
import styles from './Filters.module.css';


export default function DifficultyFilter({ setFilters }) {
  const [checkedList, setCheckedList] = useState([]);

  const onChange = (list) => {
    // console.log(list);
    setCheckedList(list);
    setFilters(prev => ({...prev, difficulty: list}))
    
  };

  const options = [
    { label: 'Низкая', value: 'Низкая' },
    { label: 'Средняя', value: 'Средняя' },
    { label: 'Высокая', value: 'Высокая' },
  ];

  return (
    <>
    <p className={styles.filterName}>Сложность</p>
    <Checkbox.Group value={checkedList} options={options} onChange={onChange} /> 
  </>
);
}