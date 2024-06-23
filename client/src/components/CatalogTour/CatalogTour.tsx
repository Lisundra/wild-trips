import React from 'react';

const CatalogTour = React.memo(({ tour }) => (
    <div className="ml-80" key={tour.id}>
      <h3 className='mt-8'>{tour.name}</h3>
      <p>{tour.subtitle}</p>
    </div>
  ));

export default CatalogTour;