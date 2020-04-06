mapboxgl.accessToken =
  'pk.eyJ1Ijoic2FtLWJlcjIiLCJhIjoiY2s1MWdyc3djMHR6YzNnc2EwZ3M0dHgwMyJ9.WXCjj3zCqFinvCSJ1WUPug';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 11,
  center: [13.41053, 52.52437]
});

async function getLocations() {
  const res = await fetch('/api/v1/locations');
  const data = await res.json();

  // console.log('GET LOCATION: ', data);
  const locations = data.data.map(loc => {
    // console.log(loc);
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [loc.location.coordinates[0], loc.location.coordinates[1]]
      },
      properties: {
        storeId: loc.storeId,
        icon: 'marker'
      }
    };
  });

  loadMap(locations);
}

function loadMap(locations) {
  map.on('load', function() {
    map.addLayer({
      id: 'points',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: locations
        }
      },
      layout: {
        'icon-image': '{icon}-15',
        'icon-size': 3,
        'text-field': '{storeId}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 1.3],
        'text-anchor': 'top'
      }
    });
  });
}

getLocations();
