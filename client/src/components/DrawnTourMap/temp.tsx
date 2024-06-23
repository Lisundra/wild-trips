<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
    <script crossorigin src="https://cdn.jsdelivr.net/npm/@babel/standalone@7/babel.min.js"></script>
    <!-- To make the map appear, you must add your apikey -->
    <script src="https://api-maps.yandex.ru/v3/?apikey=<YOUR_APIKEY>&lang=en_US" type="text/javascript"></script>

    <script
      data-plugins="transform-modules-umd"
      data-presets="typescript"
      type="text/babel"
      src="./common.ts"
    ></script>
    <script data-plugins="transform-modules-umd" data-presets="typescript" type="text/babel">
      import {LOCATION} from './common';

      window.map = null;

      main();
      async function main() {
        // Waiting for all api elements to be loaded
        await ymaps3.ready;
        const {YMap, YMapDefaultSchemeLayer, YMapControls} = ymaps3;

        // Load the control package and extract the zoom control from it
        const {YMapZoomControl} = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');

        // Initialize the map
        map = new YMap(
          // Pass the link to the HTMLElement of the container
          document.getElementById('app'),
          // Pass the map initialization parameters
          {location: LOCATION, showScaleInCopyrights: true},
          // Add a map scheme layer
          [new YMapDefaultSchemeLayer({})]
        );

        // Using YMapControls you can change the position of the control.
        map.addChild(
          // Here we place the control on the right
          new YMapControls({position: 'right'})
            // Add the first zoom control to the map
            .addChild(new YMapZoomControl({}))
        );

        map.addChild(
          // Here we place the control on the bottom
          new YMapControls({position: 'bottom'})
            // Add the second zoom control to the map
            .addChild(new YMapZoomControl({}))
        );
      }
    </script>

    <!-- prettier-ignore -->
    <style> html, body, #app { width: 100%; height: 100%; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; } .toolbar { position: absolute; z-index: 1000; top: 0; left: 0; display: flex; align-items: center; padding: 16px; } .toolbar a { padding: 16px; }  </style>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
