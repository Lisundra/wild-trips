import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Catalog.module.css';
import Filters from '../../components/Filters/Filters';
import CatalogList from '../../components/CatalogList/CatalogList';

export default function Catalog() {
    const [tours, setTours] = useState([]);

      // Достаём данные внутри useEffect
useEffect(() => {
    // Достаём discounted tours
    axios.get(`${import.meta.env.VITE_URL}/${import.meta.env.VITE_API}/tours`)
      .then((res) => {
        setTours(res.data);
      })
      .catch((error) => {
        console.error('Error fetching tours:', error);
      });  
}, []); // useEffect заканчивается здесь, передаётся пустой массив зависимостей

  return (
    <div className={styles.catalogContainer}>
        <Filters />
        <CatalogList tours={tours} />
    </div>
  )
}

