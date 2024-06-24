import React from 'react';
import { Select } from 'antd';
import styles from './Filters.module.css';

export default function SeasonFilter({ setFilters }) {
  
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
    setFilters(prev => ({...prev, season: value}));
  };
  
  const onSearch = (value: string) => {
    console.log('search:', value);
  };

    return (
    <>
    <p className={styles.filterName}>Сезон</p>
    <Select
    showSearch
    placeholder="Выберите сезон"
    optionFilterProp="label"
    onChange={onChange}
    onSearch={onSearch}
    options={[
      {
        value: 'Зима',
        label: 'Зима',
      },
      {
        value: 'Весна',
        label: 'Весна',
      },
      {
        value: 'Лето',
        label: 'Лето',
      },
      {
        value: 'Осень',
        label: 'Осень',
      },
    ]}
  />
  </>
);
}