import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Catalog.module.css';
import Filters from '../../components/Filters/Filters';
import CatalogList from '../../components/CatalogList/CatalogList';

const Catalog = () => {
    const [tours, setTours] = useState([]);
    const [filters, setFilters] = useState({
        season: null,
        difficulty: [],
        price: [1, 2000000],
        duration: [1, 30],
        family_friendly: null,
        start_date: null,
        end_date: null,
        activities: [],
    });

    useEffect(() => {
        fetchTours();
    }, [filters]);

    const fetchTours = () => {
        axios.get(`${import.meta.env.VITE_URL}/${import.meta.env.VITE_API}/tours`)
            .then((res) => {
                let filteredTours = res.data;

                if (filters.season) {
                  console.log(filters.season);
                  const filterSeasonArr = [];
                  for (let i = 0; i < filters.season.length; i++) {
                    const result = filteredTours.filter(tour => tour.season === filters.season[i]);
                      filterSeasonArr.push(result);
                  }
                  console.log(filterSeasonArr); // массив с массивами туров по этим сезонам
                  filteredTours = filterSeasonArr.flat(2);
                }

                if (filters.difficulty.length > 0) {
                    filteredTours = filteredTours.filter(tour => filters.difficulty.includes(tour.difficulty));
                }

                filteredTours = filteredTours.filter(tour => tour.price >= filters.price[0] && tour.price <= filters.price[1]);

                filteredTours = filteredTours.filter(tour => tour.duration >= filters.duration[0] && tour.duration <= filters.duration[1]);

                if (filters.family_friendly !== null) {
                    filteredTours = filteredTours.filter(tour => tour.family_friendly === filters.family_friendly);
                }

                if (filters.start_date && filters.end_date) {
                    const filterStartDate = new Date(filters.start_date);
                    const filterEndDate = new Date(filters.end_date);

                    filteredTours = filteredTours.filter(tour => {
                        const tourStartDate = new Date(tour.start_date);
                        const tourEndDate = new Date(tour.end_date);
                        return tourStartDate >= filterStartDate && tourEndDate <= filterEndDate;
                    });
                }

                if (filters.activities.length > 0) {
                    // Фильтрация по активностям
                    filteredTours = filteredTours.filter(tour =>
                        filters.activities.every(activity =>
                            tour.activities.some(tourActivity => tourActivity.name === activity)
                        )
                    );
                }

                // Обработка изображений туров
                const dataWithImages = filteredTours.map(tour => {
                    if (tour.Images && tour.Images.length > 0) {
                        return {
                            ...tour,
                            Images: JSON.parse(tour.Images[0].image_path)
                        };
                    } else {
                        return tour;
                    }
                });

                setTours(dataWithImages);
            })
            .catch((error) => {
                console.error('Error fetching tours:', error);
            });
    };

    return (
        <div className={styles.catalogContainer}>
            <Filters setFilters={setFilters} />
            <CatalogList tours={tours} />
        </div>
    );
};

export default Catalog;
