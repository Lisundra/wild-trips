import React, { useState, useEffect } from 'react';
import { Checkbox, Button } from 'antd';
import axios from 'axios';
import styles from './Filters.module.css';

const RegionFilter = ({ setFilters }) => {
    const [checkedList, setCheckedList] = useState([]);
    const [collapsed, setCollapsed] = useState(true); // Состояние для сворачивания/разворачивания списка

    const onChange = (value) => {
        console.log(value);
        setCheckedList(value);
        setFilters((prev) => ({ ...prev, regions: value })); // Обновляем фильтры с выбранными регионами
    };

    useEffect(() => {
        // Вызываем функцию для применения фильтров, когда изменяются checkedList
        applyFilters();
    }, [checkedList]);

    const applyFilters = () => {
        axios
            .get(`${import.meta.env.VITE_URL}/${import.meta.env.VITE_API}/tours`, {
                params: { regions: checkedList } // Передаем выбранные регионы как параметр запроса
            })
            .then((res) => {
                setFilters((prev) => ({ ...prev, tours: res.data })); // Обновляем состояние с данными о турах
            })
            .catch((error) => {
                console.error('Error fetching tours:', error);
            });
    };

    const options = [
        { label: '???', value: '???' },
        
    ];

    return (
        <div className={styles.housingsFilter}>
            <p className={styles.filterName}>Регион</p>
            <div className={styles.checkboxContainer}>
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
            </div>
            <Button
                size="small"
                onClick={() => setCollapsed(!collapsed)}
                className={styles.showAllButton}
                style={{ width: '75%', marginTop: '10px' }}
            >
                {collapsed ? 'Показать все' : 'Свернуть'}
            </Button>
        </div>
    );
};

export default RegionFilter;

