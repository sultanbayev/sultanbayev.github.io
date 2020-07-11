'use strict'

function getMetroStations(map) {
    const metroLocations = {
        station1: {center: {lat: 43.2305, lng: 76.86773}},
        station2: {center: {lat: 43.23672, lng: 76.878}},
        station3: {center: {lat: 43.23911, lng: 76.8985}},
        station4: {center: {lat: 43.24032, lng: 76.9174}},
        station5: {center: {lat: 43.23992, lng: 76.92757}},
        station6: {center: {lat: 43.24267, lng: 76.95102}},
        station7: {center: {lat: 43.25143, lng: 76.94559}},
        station8: {center: {lat: 43.25976, lng: 76.94514}},
        station9: {center: {lat: 43.27039, lng: 76.94506}},
        station10: {center: {lat: 43.224004, lng: 76.858655}},
        station11: {center: {lat: 43.224004, lng: 76.858655}},
    }
    const metroStations = [];
    for (let location in metroLocations) {
        const station = new google.maps.Marker({
            position: location.center,
            map: map,
            icon: {
                url: 'https://i.ibb.co/1rJhbzM/metro.png',
                anchor: new google.maps.Point(8,8)
            },
            zIndex: -5
        });
        metroStations.push(station)
    }
    return metroStations;
}

function getAlmatyBikeStations(map) {
    const url = 'https://almatybike.kz/api/stations/get';
    let response;
    let stations;
    try {
        response = UrlFetchApp.fetch(url);
        stations = JSON.parse(response);
    } catch(err) {
        return false;
    }
    const bikeshareStations = [];
    stations.forEach(station => {
        if (station.is_deleted != 0) return;
        if (station.is_hidden != 0) return;
        if (station.is_sales != 0) return;
        const latLng = new google.maps.LatLng(station.lat, station.lng);
        const scale = 5;
        let icon = {
            path: google.maps.SymbolPath.CIRCLE,
            scale: scale,
            fillColor: '#f23005',
            fillOpacity: 1,
            strokeWeight: 1,
        };
        if (station.is_not_active != 0) {
            icon.fillColor = '#eeeeee'
        }
        const stationMarker = new google.maps.Marker({
            position: latLng,
            map: map,
            icon: icon,
        });
        bikeshareStations.push(stationMarker);
        return bikeshareStations;
    });
}