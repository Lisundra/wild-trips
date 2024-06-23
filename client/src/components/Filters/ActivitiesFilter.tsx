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
      {
        value: 'Джип-туры',
        label: 'Джип-туры',
      },
      {
        value: 'Катание на квадроциклах',
        label: 'Катание на квадроциклах',
      },
      {
        value: 'Катание на снегоходах',
        label: 'Катание на снегоходах',
      },
      {
        value: 'Катание на собачьих упряжках',
        label: 'Катание на собачьих упряжках',
      },
      {
        value: 'Лыжные туры',
        label: 'Лыжные туры',
      },
      {
        value: 'Обзорные туры',
        label: 'Обзорные туры',
      },
      {
        value: 'Конные прогулки',
        label: 'Конные прогулки',
      },
      {
        value: 'Круизы',
        label: 'Круизы',
      },
      {
        value: 'Сплавы',
        label: 'Сплавы',
      },
      {
        value: 'Яхтинг',
        label: 'Яхтинг',
      },
      {
        value: 'Каякинг',
        label: 'Каякинг',
      },
      {
        value: 'Дайвинг',
        label: 'Дайвинг',
      },
      {
        value: 'Экспедиции',
        label: 'Экспедиции',
      },
      {
        value: 'Этнотуры',
        label: 'Этнотуры',
      },
      {
        value: 'Полет на вертолёте',
        label: 'Полет на вертолёте',
      },
      {
        value: 'Парапланеризм',
        label: 'Парапланеризм',
      },
    ]}
  />
  </>
);
}