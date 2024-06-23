import React from 'react';
import { Select } from 'antd';
import styles from './Filters.module.css';

const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log('search:', value);
};

export default function SeasonFilter() {
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