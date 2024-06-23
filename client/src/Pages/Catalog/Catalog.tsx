import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Catalog.module.css';
import Filters from '../../components/Filters/Filters';
import CatalogList from '../../components/CatalogList/CatalogList';
import MiniCardTour from '../../components/MiniCardTour/MiniCardTour';

export default function Catalog() {
    const [tours, setTours] = useState([]);
    const [filters, setFilters] = useState({
      season: null,
      diffuculty: [],
      price: [],
    });

      // Достаём данные внутри useEffect
useEffect(() => {
    // Достаём discounted tours
    axios.get(`${import.meta.env.VITE_URL}/${import.meta.env.VITE_API}/tours`)
      .then((res) => {
        let result = res.data;
        for (const filterName in filters) {
          if (['season'].includes(filterName)) {
            if (filters[filterName] !== null) {
              result = result.filter(item => item[filterName].toLowerCase() === filters[filterName].toLowerCase());
            }
          } if (['difficulty'].includes(filterName)) {
            if (filters[filterName].length) {
              result = result.filter(item => filters[filterName].map(el => el.toLowerCase()).includes(item[filterName].toLowerCase()));
            }
          } 
        }
    // result = result.filter(item => item.price >= 100000 && item.price <= 300000)
        setTours(result);
        console.log(res.data, result);
      })
      .catch((error) => {
        console.error('Error fetching tours:', error);
      });  
}, [filters]); 

// useEffect(() => {
//   console.log(filters, tours);
//   console.log(data);
//   setTours(data);
// }, [filters])

  return (
    <div className={styles.catalogContainer}>
        <Filters setFilters={setFilters} />
        <CatalogList tours={tours} />
    </div>
  )
}

