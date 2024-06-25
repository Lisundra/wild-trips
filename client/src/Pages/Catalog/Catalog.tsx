import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Catalog.module.css';
import Filters from '../../components/Filters/Filters';
import CatalogList from '../../components/CatalogList/CatalogList';

export default function Catalog() {
    const [tours, setTours] = useState([]);
    const [filters, setFilters] = useState({
      season: null,
      diffuculty: [],
      price: [1, 2000000],
      duration: [1, 30],
      family_friendly: null,
      start_date: null,
      end_date: null,
    });

      // Достаём данные внутри useEffect
useEffect(() => {
    axios.get(`${import.meta.env.VITE_URL}/${import.meta.env.VITE_API}/tours`)
      .then((res) => {
        let result = res.data;
        console.log(res.data);

        const dataWithImage = res.data.map(card=>{
          if (card.Images) {
            const newObj = {
             ...card,
             'Images': (JSON.parse(card.Images[0].image_path))
            }
            return newObj;
          }
         })

        for (const filterName in filters) {
          if (['season'].includes(filterName)) {
            if (filters[filterName] !== null) {
              result = result.filter(item => item[filterName].toLowerCase() === filters[filterName].toLowerCase());
            }
          } if (['difficulty'].includes(filterName)) {
            if (filters[filterName].length) {
              result = result.filter(item => filters[filterName].map(el => el.toLowerCase()).includes(item[filterName].toLowerCase()));
            }
          } if (['price'].includes(filterName)) {
            result = result.filter(item => item.price >= filters[filterName][0] && item.price <= filters[filterName][1]);
          } if (['duration'].includes(filterName)) {
            result = result.filter(item => item.duration >= filters[filterName][0] && item.duration <= filters[filterName][1]);
          } if (['family_friendly'].includes(filterName) && filters[filterName] !== null) {
            result = result.filter(item => item.family_friendly === filters[filterName]);
        } if (['start_date', 'end_date'].includes(filterName) && filters.start_date && filters.end_date) {
          result = result.filter(item => {
              const tourStartDate = new Date(item.start_date);
              const tourEndDate = new Date(item.end_date);
              const filterStartDate = new Date(filters.start_date);
              const filterEndDate = new Date(filters.end_date);
              return tourStartDate >= filterStartDate && tourEndDate <= filterEndDate;
          });
      }
  }

    // result = result.filter(item => item.price >= 100000 && item.price <= 300000)
        setTours(dataWithImage);
        console.log(dataWithImage, result);
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

