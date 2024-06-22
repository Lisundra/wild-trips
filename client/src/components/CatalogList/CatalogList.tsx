import React from 'react'
import CatalogTour from '../CatalogTour/CatalogTour';

export default function CatalogList({ tours }) {
  return (
    <div>
        {tours.map((tour) => (
          <div className="ml-80">
            <CatalogTour key={tour.id} tour={tour} />
            </div>
        ))}
    </div>
  )
}
