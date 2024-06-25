import React, { useState } from 'react';
import { Checkbox } from 'antd';
import styles from './Filters.module.css';


export default function RatingFilter({ setFilters }) {
  const [checkedList, setCheckedList] = useState([]);

  const onChange = (list) => {
    // console.log(list);
    setCheckedList(list);
    setFilters(prev => ({...prev, rating: list}))
    
  };

  const options = [
    { label: 'От 7.0', value: 'От 7.0' },
    { label: 'От 8.0', value: 'От 8.0' },
    { label: 'От 9.0', value: 'От 9.0' },
  ];

  return (
    <>
    <p className={styles.filterName}>Рейтинг</p>
    <Checkbox.Group value={checkedList} options={options} onChange={onChange} /> 
  </>
);
}