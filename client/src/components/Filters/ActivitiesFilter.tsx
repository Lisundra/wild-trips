import React from 'react';
import { Select } from 'antd';
import styles from './Filters.module.css';

const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log('search:', value);
};

export default function ActivitiesFilter() {
    return (
    <>
    <p className={styles.filterName}>Виды отдыха</p>
    <Select
    showSearch
    placeholder="Выберите вид отдыха"
    optionFilterProp="label"
    onChange={onChange}
    onSearch={onSearch}
    options={[
      {
        value: 'Пешеходные прогулки',
        label: 'Пешеходные прогулки',
      },
      {
        value: 'Треккинг',
        label: 'Треккинг',
      },
      {
        value: 'Велопрогулки',
        label: 'Велопрогулки',
      },
      {
        value: 'Поход в горы',
        label: 'Поход в горы',
      },
    ]}
  />
  </>
);
}