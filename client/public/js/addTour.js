function initMap() {
  const mapContainer = document.getElementById('map');
  const coordinatesInput = document.getElementById('coordinates');
  const markerTitleInput = document.getElementById('markerTitle');
  const lineCoordinates = [];
  const markers = []; // Массив для хранения маркеров

  ymaps3.ready.then(() => {
    const {
      YMap,
      YMapDefaultSchemeLayer,
      YMapDefaultFeaturesLayer,
      YMapFeature,
      YMapControls,
      YMapControlButton,
      YMapListener,
    } = ymaps3;

    const map = new YMap(
      mapContainer,
      {
        location: {
          center: [37.621335, 55.754506],
          zoom: 5,
        },
        showScaleInCopyrights: true,
      },
      [
        new YMapDefaultSchemeLayer({}),
        new YMapDefaultFeaturesLayer({}),
      ]
    );

    const line = new YMapFeature({
      geometry: {
        type: 'LineString',
        coordinates: lineCoordinates,
      },
      style: { stroke: [{ color: '#01BBEA', width: 4 }] },
    });
    map.addChild(line);

    ymaps3.import('@yandex/ymaps3-controls@0.0.1').then((res) => {
      const { YMapZoomControl } = res;
      map.addChild(
        new YMapControls({ position: 'right' })
          .addChild(new YMapZoomControl({}))
      );
    });

    const listener = new YMapListener({
      onClick: onClickListenerHandler,
    });
    map.addChild(listener);

    function onClickListenerHandler(object, event) {
      const markerTitle = markerTitleInput.value.trim(); // Убираем лишние пробелы
      
      //! Всегда добавляем координаты клика в линию
      lineCoordinates.push(event.coordinates);
      line.update({
        geometry: {
          type: 'LineString',
          coordinates: lineCoordinates,
        },
      });
      coordinatesInput.value = JSON.stringify(lineCoordinates);

      //! Добавляем маркер только если поле ввода не пустое
      if (markerTitle) {
        ymaps3.import('@yandex/ymaps3-markers@0.0.1').then((res) => {
          const { YMapDefaultMarker } = res;
          const newMarker = new YMapDefaultMarker({
            coordinates: event.coordinates,
            color: '#01BBEA',
            title: markerTitle,
            iconLayout: 'default#image',
            iconImageHref: '../src/assets/avatars/1719151273810-1534058.png',
            iconImageSize: [20, 20] //! задаем размер изображения маркера
          });
          map.addChild(newMarker);
          markers.push(newMarker); //! Сохраняем маркер в массив
        });
      }

      bottomControls.addChild(clearLineBtn);
      bottomControls.addChild(clearLastLineBtn);
    }

    const bottomControls = new YMapControls({ position: 'bottom' });
    map.addChild(bottomControls);

    let clearLineBtn = new YMapControlButton({
      text: 'ОЧИСТИТЬ ВСЁ',
      color: '#fff',
      background: '#007afce6',
      onClick: onClickBtnHandler,
    });

    function onClickBtnHandler() {
      lineCoordinates.length = 0;
      line.update({
        geometry: {
          type: 'LineString',
          coordinates: lineCoordinates,
        },
      });
      coordinatesInput.value = JSON.stringify(lineCoordinates);
      markers.forEach(marker => map.removeChild(marker));
      markers.length = 0;
      if (!lineCoordinates.length) {
        bottomControls.removeChild(clearLineBtn);
        bottomControls.removeChild(clearLastLineBtn);
      }
    }

    let clearLastLineBtn = new YMapControlButton({
      text: 'УБРАТЬ ПОСЛЕДНЕЕ',
      color: '#fff',
      background: '#007afce6',
      onClick: onClickBtnLineHandler,
    });

    function onClickBtnLineHandler() {
      if (lineCoordinates.length > 0) {
        lineCoordinates.pop();
        line.update({
          geometry: {
            type: 'LineString',
            coordinates: lineCoordinates,
          },
        });
        coordinatesInput.value = JSON.stringify(lineCoordinates);
      }
      if (markers.length > 0) {
        const lastMarker = markers.pop();
        map.removeChild(lastMarker);
      }
      if (!lineCoordinates.length) {
        bottomControls.removeChild(clearLineBtn);
        bottomControls.removeChild(clearLastLineBtn);
      }
    }

    bottomControls.addChild(clearLineBtn);
    bottomControls.addChild(clearLastLineBtn);
  });
}

document.addEventListener('DOMContentLoaded', initMap);
