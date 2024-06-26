import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Catalog.module.css';
import Filters from '../../components/Filters/Filters';
import CatalogList from '../../components/CatalogList/CatalogList';

function Catalog() {
    const [tours, setTours] = useState([]); // состояние tours — для хранения списка туров, который будет отображаться
    const [filters, setFilters] = useState({ // состояние filters — для хранения значений фильтров
        //! состояние filters инициализируется объектом, где season является пустым массивом []
        season: null,
        difficulty: [],
        price: [1, 2000000],
        duration: [1, 30],
        family_friendly: null,
        start_date: null,
        end_date: null,
        activities: [],
    });

    //! useEffect, чтобы при каждом изменении состояния filters (включая season) загружать данные туров и применять фильтрацию
    useEffect(() => {
        getToursAndApplyFilters();
    }, [filters]);

    //! загружает данные о турах с сервера и применяет фильтры.
    const getToursAndApplyFilters = () => {
        axios.get(`${import.meta.env.VITE_URL}/${import.meta.env.VITE_API}/tours`)
            .then((res) => {
                let filteredTours = res.data;

                // console.log('нажали на фильтры - образовали из них новый массив', filters.season); //! передается из компонента фильтров (SeasonFilter) в состояние фильтров (filters) компонента Catalog
                if (filters.season && filters.season.length > 0) {  // Если массив образовался, и в нём что-то есть
                //   console.log(filters.season);
                  const filteredToursByFilterArr = []; //! заводим временный массив туров, прошедших проверку, создаётся каждый раз новый при каждой итерации цикла - при нажатии нового чекбокса
                  console.log('нажали на новый фильтр - создался новый массив c турами, прошедшими проверку этого фильтра', filteredToursByFilterArr);
//! Делаем фильтрацию по массиву нажатых фильтров - [ 'Весна', 'Осень' ]
//! проходимся по каждому нажатому фильтру в массиве и сравниваем на соответствие тура с этим фильтром
                  for (let i = 0; i < filters.season.length; i++) {
                    const result = filteredTours.filter(tour => tour.season === filters.season[i]);
                    filteredToursByFilterArr.push(result); //! совпадения сохраняем в отфильтрованный массив
                  }
                //? После нажатия чекбоксов получаем массив из массивов подходящих туров: [ [зимний тур, зимний тур, зимний тур] , [осенний тур, осенний тур, осенний тур] ]
                  filteredTours = filteredToursByFilterArr.flat(2); //! По завершении цикла for, результаты объединяем в один массив с помощью  flat(2) в один одномерный массив

                  //? Ура, наш результат [{тур}, {тур}, {тур}, {тур}]
                  console.log('Ура, наш результат - объединённый массив нужных туров', filteredTours);
                }


                console.log('нажали на фильтры - образовали из них новый массив', filters.difficulty); 
                if (filters.difficulty && filters.difficulty.length > 0) { // Если массив образовался, и в нём что-то есть
                    console.log(filters.difficulty);
                    const filteredToursByFilterArr = []; 
                    console.log('по нажатию на новый фильтр - создаётся по массиву c турами, прошедшими проверку на этот фильтр (внутри массива для результата)', filteredToursByFilterArr);
                    for (let i = 0; i < filters.difficulty.length; i++) {
                        const result = filteredTours.filter(tour => tour.difficulty === filters.difficulty[i]);
                        filteredToursByFilterArr.push(result);
                    }
                    filteredTours = filteredToursByFilterArr.flat(2);
                    console.log('Ура, наш результат - объединённый массив нужных туров', filteredTours);
                }


                // console.log('нажали на фильтры - изменилось состояние фильтра на противоположное', filters.family_friendly); 
                //? null - рисуются все туры без этого фильтра
                //? при нажатии с детьми filters.family_friendly становится равно true 
                if (filters.family_friendly !== null) {  //! если сделать !== false то при отмене фильтра не будут возвращаться остальные карточки и будет пустая страница без туров при перезагрузке
                    // console.log(filters.family_friendly);
                    filteredTours = filteredTours.filter(tour => tour.family_friendly === filters.family_friendly); //! Кладём в массив с результатом туры, прошедшие проверку
                    console.log('Ура, наш результат - массив нужных туров', filteredTours);
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


                filteredTours = filteredTours.filter(tour => tour.price >= filters.price[0] && tour.price <= filters.price[1]);

                filteredTours = filteredTours.filter(tour => tour.duration >= filters.duration[0] && tour.duration <= filters.duration[1]);



                if (filters.activities.length > 0) {
                    // Фильтрация по активностям
                    filteredTours = filteredTours.filter(tour =>
                        filters.activities.every(activity =>
                            tour.activities.some(tourActivity => tourActivity.name === activity)
                        )
                    );
                }

                // Проверяем туры на наличие изображения
                const dataWithImages = filteredTours.map(tour => {
                    if (tour.Images && tour.Images.length > 0) {
                        return {
                            ...tour,
                            Images: JSON.parse(tour.Images[0].image_path)
                        };
                    } 
                        return tour;
                    
                });

                setTours(dataWithImages); //! обновляет состояние компонента Catalog и передает отфильтрованные туры в компонент CatalogList 
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
}

export default Catalog;
