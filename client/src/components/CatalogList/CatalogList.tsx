import React from 'react'
import MiniCardForCatalog from '../MiniCardForCatalog/MiniCardForCatalog';

export default function CatalogList({ tours }) {

  console.log(tours);
  return (
    <div>
        {tours.map((tour) => (
            <MiniCardForCatalog {...tour} key={tour.id}  />
        ))}
    </div>
  )
}
