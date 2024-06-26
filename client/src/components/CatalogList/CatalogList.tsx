import React from 'react'
import MiniCardForCatalog from '../MiniCardForCatalog/MiniCardForCatalog';
import styles from './CatalogList.module.css';

export default function CatalogList({ tours }) {

  // console.log(tours);
  return (
    <div className={styles.cardsContainer}>
        {tours.map((tour) => (
            <MiniCardForCatalog {...tour} key={tour.id}  />
        ))}
    </div>
  )
}
