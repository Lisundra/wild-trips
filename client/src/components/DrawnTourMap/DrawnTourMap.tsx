import React, { useEffect, useRef, useState } from 'react';

function DrawnTourMap({ onInputChange }) {
  const inputRef = useRef(null);
  const [coordinates,setCoordinates] = useState('')

  useEffect(() => {
    const scriptYandexMap = document.createElement('script');
    scriptYandexMap.src = "https://api-maps.yandex.ru/v3/?apikey=87ed632f-c0e8-449d-bbea-679b283fdda3&lang=ru_RU";
    scriptYandexMap.defer = true;
    scriptYandexMap.onload = () => {
      const scriptAddTrail = document.createElement('script');
      scriptAddTrail.src = "/js/addTour.js";
      scriptAddTrail.defer = true;
      scriptAddTrail.onload = () => {
        if (typeof initMap === 'function') {
          initMap();
        }
      };
      document.head.appendChild(scriptAddTrail);
    };
    document.head.appendChild(scriptYandexMap);

    return () => {
      document.head.removeChild(scriptYandexMap);
      const existingScriptAddTrail = document.head.querySelector('script[src="/js/addTour.js"]');
      if (existingScriptAddTrail) {
        document.head.removeChild(existingScriptAddTrail);
      }
    };
  }, []);

  const handleClickMap = (event) => {
    const inputValue = inputRef.current.value;
    // console.log('Input value:', JSON.parse(inputValue));
    onInputChange(  JSON.parse(inputValue) )
  };

  return (
    <>
      <input
        name="coordinates"
        id="coordinates"
        style={{ width: "1300px" }}
        ref={inputRef}
        // onInput={handleInputChange}

      />
      <input id="markerTitle" type="text" placeholder="Enter marker title" />
      <div id="map" className="map" onClick={handleClickMap} style={{ width: "100%", height: "400px", backgroundColor: "#333" }} />
    </>
  );
}

export default DrawnTourMap;