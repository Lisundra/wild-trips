import React, { useState, useEffect } from 'react';
import { Checkbox, Button } from 'antd';
import axios from 'axios';
import styles from './Filters.module.css';
import CatalogButton from '../CatalogButton/CatalogButton';

function ActivitiesFilter({ setFilters }) {
    const [checkedList, setCheckedList] = useState([]);
    const [collapsed, setCollapsed] = useState(true); // Состояние для сворачивания/разворачивания списка

    const onChange = (value) => {
        console.log('Selected Activities:', value);
        setCheckedList(value);
        setFilters((prev) => ({ ...prev, activities: value })); // Обновляем фильтры с выбранными видами отдыха
    };

    useEffect(() => {
        // Вызываем функцию для применения фильтров, когда изменяются checkedList
        applyFilters();
    }, [checkedList]);

    const applyFilters = () => {
        axios
            .get(`${import.meta.env.VITE_URL}/${import.meta.env.VITE_API}/tours`, {
                params: { activities: checkedList } // Передаем выбранные виды отдыха как параметр запроса
            })
            .then((res) => {
                setFilters((prev) => ({ ...prev, tours: res.data })); // Обновляем состояние с данными о турах
            })
            .catch((error) => {
                console.error('Error fetching tours:', error);
            });
    };

    const options = [
        { label: 'Пешеходные прогулки', value: 'Пешеходные прогулки' },
        { label: 'Треккинг', value: 'Треккинг' },
        { label: 'Велопрогулки', value: 'Велопрогулки' },
        { label: 'Поход в горы', value: 'Поход в горы' },
        { label: 'Джип-туры', value: 'Джип-туры' },
        { label: 'Катание на квадроциклах', value: 'Катание на квадроциклах' },
        { label: 'Катание на снегоходах', value: 'Катание на снегоходах' },
        { label: 'Катание на собачьих упряжках', value: 'Катание на собачьих упряжках' },
        { label: 'Лыжные туры', value: 'Лыжные туры' },
        { label: 'Обзорные туры', value: 'Обзорные туры' },
        { label: 'Конные прогулки', value: 'Конные прогулки' },
        { label: 'Круизы', value: 'Круизы' },
        { label: 'Сплавы', value: 'Сплавы' },
        { label: 'Яхтинг', value: 'Яхтинг' },
        { label: 'Каякинг', value: 'Каякинг' },
        { label: 'Дайвинг', value: 'Дайвинг' },
        { label: 'Экспедиции', value: 'Экспедиции' },
        { label: 'Этнотуры', value: 'Этнотуры' },
        { label: 'Полет на вертолёте', value: 'Полет на вертолёте' },
        { label: 'Парапланеризм', value: 'Парапланеризм' },
    ];

    return (
        <div className={styles.activitiesFilter}>
            <p className={styles.filterName}>Виды отдыха</p>
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
            <CatalogButton
                size="small"
                onClick={() => setCollapsed(!collapsed)}
                className={styles.showAllButton}
                style={{ width: '75%', marginTop: '10px' }}
            >
                {collapsed ? 'Показать все' : 'Свернуть'}
            </CatalogButton>
        </div>
    );
}

export default ActivitiesFilter;
