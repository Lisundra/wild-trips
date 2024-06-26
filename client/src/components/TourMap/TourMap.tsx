import React from 'react';

function TourMap({ tour }) {
  const cleanedCoordinates = tour.coordinates.replace(/["\\]/g, '');
  return (
    <div style={{ borderRadius: '25px', overflow: 'hidden' }}>
      <iframe 
        src={`https://yandex.ru/map-widget/v1/?um=constructor%${cleanedCoordinates}&amp;source=constructor`} 
        width="100%" 
        height="600" 
        frameBorder="0"
      />
    </div>
  );
}

export default TourMap;
