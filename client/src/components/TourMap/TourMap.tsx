import React, { useEffect } from 'react';

function TourMap({ tour }) {
  const cleanedCoordinates = tour.coordinates.replace(/["\\]/g, '');

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.async = true;
    script.src = `https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%${cleanedCoordinates}&width=100%&height=600&lang=ru_RU&scroll=false`;

    const mapContainer = document.getElementById('map-container');
    mapContainer.appendChild(script);

    return () => {
      mapContainer.removeChild(script);
    };
  }, [cleanedCoordinates]);

  return (
    <div 
      id="map-container" 
      style={{ 
        width: '100%', 
        height: '600px', 
        borderRadius: '25px', 
        overflow: 'hidden' 
      }}
    ></div>
  );
}

export default TourMap;
