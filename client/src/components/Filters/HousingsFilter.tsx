import React from 'react';
import { Select } from 'antd';
import styles from './Filters.module.css';

const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log('search:', value);
};

export default function HousingsFilter() {
    return (
    <>
    <p className={styles.filterName}>Тип размещения</p>
    <Select
    showSearch
    placeholder="Выберите желаемые типы размещения"
    optionFilterProp="label"
    onChange={onChange}
    onSearch={onSearch}
    options={[
      {
        value: 'Отель',
        label: 'Отель',
      },
      {
        value: 'Плавучий отель',
        label: 'Плавучий отель',
      },
      {
        value: 'Гостевой дом',
        label: 'Гостевой дом',
      },
      {
        value: 'Бунгало',
        label: 'Бунгало',
      },
      {
        value: 'Юрта',
        label: 'Юрта',
      },
      {
        value: 'Хижина',
        label: 'Хижина',
      },
      {
        value: 'Ферма',
        label: 'Ферма',
      },
      {
        value: 'Глэмпинг',
        label: 'Глэмпинг',
      },
      {
        value: 'Кемпинг',
        label: 'Кемпинг',
      },
      {
        value: 'Турбаза',
        label: 'Турбаза',
      },
    ]}
  />
  </>
);
}