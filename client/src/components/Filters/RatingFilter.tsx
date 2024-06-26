import React, { useState } from 'react';
import { Radio } from 'antd';
import styles from './Filters.module.css';

export default function RatingFilter({ setFilters }) {
  const [value, setValue] = useState(null);

  const onChange = (e) => {
    setValue(e.target.value);
    setFilters(prev => ({ ...prev, average_rating: e.target.value }));
  };

  const options = [
    { label: 'От 7.0', value: 'От 7.0' },
    { label: 'От 8.0', value: 'От 8.0' },
    { label: 'От 9.0', value: 'От 9.0' },
  ];

  return (
    <>
      <p className={styles.filterName}>Рейтинг</p>
      <Radio.Group onChange={onChange} value={value}>
        {options.map(option => (
          <Radio key={option.value} value={option.value}>
            {option.label}
          </Radio>
        ))}
      </Radio.Group>
    </>
  );
}
