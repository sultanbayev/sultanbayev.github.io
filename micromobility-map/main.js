const almaty = {
    center: {
        lat: 43.27,
        lng: 76.88
    }
}

const style = [{
    "elementType": "geometry",
    "stylers": [{
        "color": "#f5f5f5"
    }]
}, {
    "elementType": "labels.icon",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#616161"
    }]
}, {
    "elementType": "labels.text.stroke",
    "stylers": [{
        "color": "#f5f5f5"
    }]
}, {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#bdbdbd"
    }]
}, {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{
        "color": "#eeeeee"
    }]
}, {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#757575"
    }]
}, {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{
        "color": "#e5e5e5"
    }]
}, {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#9e9e9e"
    }]
}, {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{
        "color": "#ffffff"
    }]
}, {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#757575"
    }]
}, {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{
        "color": "#dadada"
    }]
}, {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#616161"
    }]
}, {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#9e9e9e"
    }]
}, {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [{
        "color": "#e5e5e5"
    }]
}, {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [{
        "color": "#eeeeee"
    }]
}, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{
        "color": "#c9c9c9"
    }]
}, {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#9e9e9e"
    }]
}];

const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: almaty.center,
    styles: style,
    streetViewControl: false,
    mapTypeControl: false,
});




const drawingManager = new google.maps.drawing.DrawingManager({
    drawingControl: true,
    drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ['polyline']
    }
});
drawingManager.setMap(map);

let polyline;
google.maps.event.addListener(drawingManager, 'polylinecomplete', (poly) => {
    poly.setEditable(true);
    polyline = poly;
});

google.maps.event.addListener(map, 'rightclick', () => {
    if (drawingManager.getDrawingMode() === 'polyline') {
        drawingManager.setDrawingMode(null);
    }
    polyline.getPath().getArray().forEach((i) => {
        console.log(i.lat() + ', ' + i.lng())
    })
});

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
    }
    const futureLocations = {
        station10: {center: {lat: 43.224004, lng: 76.858655}},
        station11: {center: {lat: 43.216784, lng: 76.839683}},
        station12: {center: {lat: 43.2159, lng: 76.80943}},
        station13: {center: {lat: 43.23385, lng: 76.79632}},
    }
    const metroStations = {
        current: [],
        future: []
    };
    for (let location in metroLocations) {
        const station = new google.maps.Marker({
            position: metroLocations[location].center,
            map: map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 7,
                fillColor: '#FF5733',
                fillOpacity: 1,
                strokeWeight: 1,
            },
            zIndex: -4,
        });
        metroStations.current.push(station)
    }
    for (let location in futureLocations) {
        const station = new google.maps.Marker({
            position: futureLocations[location].center,
            map: map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 7,
                fillColor: '#FFAB99',
                fillOpacity: 1,
                strokeWeight: 1,
            },
            zIndex: -5
        });
        metroStations.future.push(station)
    }
    return metroStations;
}

function getBikeshareStations(map) {
    const bikeshareStations = {
        markers: [],
        radiuses: []
    };
    const URL = 'https://almatybike.kz/api/stations/get';
    fetch(URL)
        .then(response => response.json())
        .then(stations => {
            stations.forEach(station => {
                if (station.is_deleted != 0) return;
                if (station.is_hidden != 0) return;
                if (station.is_sales != 0) return;
                const latLng = new google.maps.LatLng(station.lat, station.lng);
                const marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 3,
                        fillColor: '#DAF7A6',
                        fillOpacity: 1,
                        strokeWeight: 1,
                    },
                    visible: true,
                    zIndex: -6
                });
                bikeshareStations.markers.push(marker);
                const radius1 = new google.maps.Circle({
                    center: latLng,
                    map: map,
                    radius: 300,
                    fillColor: '#DAF7A6',
                    fillOpacity: 0.4,
                    strokeWeight: 0,
                    strokeColor: '#DAF7A6',
                    zIndex: -7
                });
                const radius2 = new google.maps.Circle({
                    center: latLng,
                    map: map,
                    radius: 400,
                    fillColor: '#DAF7A6',
                    fillOpacity: 0.1,
                    strokeWeight: 1,
                    strokeColor: '#DAF7A6',
                    zIndex: -8
                });
                bikeshareStations.radiuses.push(radius1);
        });
    });
    return bikeshareStations;
}

const bikeshareStations = getBikeshareStations(map);
const metroStations = getMetroStations(map);

for (let index = 0; index < metroStations.current.length; index++) {
    const station = metroStations.current[index];
    if (index < metroStations.current.length - 1) {
        const nextStation = metroStations.current[index + 1];
        const line = new google.maps.Polyline({
            clickable: false,
            map: map,
            path: [station.getPosition(), nextStation.getPosition()],
            strokeColor: '#FF0000',
            strokeWeight: 5,
            zIndex: -5,
        })
    }
}

for (let index = 0; index < metroStations.future.length; index++) {
    const station = metroStations.future[index];
    if (index < metroStations.future.length - 1) {
        const nextStation = metroStations.future[index + 1];
        const line = new google.maps.Polyline({
            clickable: false,
            map: map,
            path: [station.getPosition(), nextStation.getPosition()],
            // strokeColor: '#FF0000',
            strokeWeight: 0,
            zIndex: -5,
            icons: [
                {
                    icon: {
                        path: "M 0,-1 0,1",
                        strokeOpacity: 1,
                        scale: 5,
                        strokeColor: '#FF0000',
                    },
                    offset: "0",
                    repeat: "20px",
                },
            ],
        })
    } else if (index == metroStations.future.length - 1) {
        new google.maps.Polyline({
            clickable: false,
            map: map,
            path: [new google.maps.LatLng(43.224004, 76.858655), new google.maps.LatLng(43.2305, 76.86773)],
            // strokeColor: '#FF0000',
            strokeWeight: 0,
            zIndex: -5,
            icons: [
                {
                    icon: {
                        path: "M 0,-1 0,1",
                        strokeOpacity: 1,
                        scale: 5,
                        strokeColor: '#FF0000',
                    },
                    offset: "0",
                    repeat: "20px",
                },
            ],
        })
    }
}

const brtLine1 = new google.maps.Polyline({
    path: [
        {lat: 43.19475, lng: 76.88184},
        {lat: 43.20615808759213, lng: 76.87781583959604},
        {lat: 43.20651781552368, lng: 76.87959682638193},
        {lat: 43.212757975506825, lng: 76.87738668615366},
        {lat: 43.21289872363244, lng: 76.87813770467783},
        {lat: 43.21672200505054, lng: 76.87676442819806},
        {lat: 43.217292526063126, lng: 76.87616362791461},
        // {lat: 43.22454400207421, lng: 76.8873645327608},
        // {lat: 43.226637192270324, lng: 76.9176413081209},
        // {lat: 43.226855106633224, lng: 76.92814483862323},
        // {lat: 43.232608057185985, lng: 76.93680837374133},
        // {lat: 43.23534363284399, lng: 76.94210573654574},
        // {lat: 43.25449862531616, lng: 76.93973332267207},
        // {lat: 43.25671379170791, lng: 76.9722571186344},
        // {lat: 43.256664925470524, lng: 76.98298293720883},
        // {lat: 43.26328179270677, lng: 76.98349641259712},
        // {lat: 43.26868365560847, lng: 76.98680013973218},
        // {lat: 43.27414973176207, lng: 76.9846325376625},
        // {lat: 43.277875140411766, lng: 76.98459489243989},
        // {lat: 43.284349560895905, lng: 76.98721799856004},
        // {lat: 43.28548873398783, lng: 76.99049010496539},
    ],
    map: map,
    strokeColor: '#0000BB',
    strokeWeight: 5,
    zIndex: -5,
});
const brtLine2 = new google.maps.Polyline({
    path: [
        {lat: 43.217292526063126, lng: 76.87616362791461},
        {lat: 43.22454400207421, lng: 76.8873645327608},
    ],
    map: map,
    // strokeColor: '#0000BB',
    strokeWeight: 0,
    zIndex: -5,
    icons: [
        {
            icon: {
                path: "M 0,-2 0,0",
                strokeOpacity: 1,
                scale: 5,
                strokeColor: '#0000BB',
            },
            offset: "0",
            repeat: "20px",
        },
    ],
});
const brtLine3 = new google.maps.Polyline({
    path: [
        {lat: 43.22454400207421, lng: 76.8873645327608},
        {lat: 43.226637192270324, lng: 76.9176413081209},
        {lat: 43.226855106633224, lng: 76.92814483862323},
        {lat: 43.232608057185985, lng: 76.93680837374133},
        // {lat: 43.23534363284399, lng: 76.94210573654574},
        // {lat: 43.25449862531616, lng: 76.93973332267207},
        // {lat: 43.25671379170791, lng: 76.9722571186344},
        // {lat: 43.256664925470524, lng: 76.98298293720883},
        // {lat: 43.26328179270677, lng: 76.98349641259712},
        // {lat: 43.26868365560847, lng: 76.98680013973218},
        // {lat: 43.27414973176207, lng: 76.9846325376625},
        // {lat: 43.277875140411766, lng: 76.98459489243989},
        // {lat: 43.284349560895905, lng: 76.98721799856004},
        // {lat: 43.28548873398783, lng: 76.99049010496539},
    ],
    map: map,
    strokeColor: '#0000BB',
    strokeWeight: 5,
    zIndex: -5,
});
const brtLine4 = new google.maps.Polyline({
    path: [
        {lat: 43.232608057185985, lng: 76.93680837374133},
        {lat: 43.23534363284399, lng: 76.94210573654574},
        {lat: 43.25449862531616, lng: 76.93973332267207},
        {lat: 43.25671379170791, lng: 76.9722571186344},
        {lat: 43.256664925470524, lng: 76.98298293720883},
        {lat: 43.26328179270677, lng: 76.98349641259712},
        {lat: 43.26868365560847, lng: 76.98680013973218},
        {lat: 43.27414973176207, lng: 76.9846325376625},
        {lat: 43.277875140411766, lng: 76.98459489243989},
        {lat: 43.284349560895905, lng: 76.98721799856004},
        {lat: 43.28548873398783, lng: 76.99049010496539},
    ],
    map: map,
    // strokeColor: '#0000BB',
    strokeWeight: 0,
    zIndex: -5,
    icons: [
        {
            icon: {
                path: "M 0,-2 0,0",
                strokeOpacity: 1,
                scale: 5,
                strokeColor: '#0000BB',
            },
            offset: "0",
            repeat: "20px",
        },
    ],
});
const lrtLine1 = new google.maps.Polyline({
    path: [
        {lat: 43.29823360216031, lng: 76.81202874614135},
        {lat: 43.2961096853139, lng: 76.81383119059936},
        {lat: 43.28705097182206, lng: 76.81580529643432},
        {lat: 43.28517658678126, lng: 76.81546197368041},
        {lat: 43.26427328145851, lng: 76.81898103190795},
        {lat: 43.23905634513328, lng: 76.82948456241027},
        {lat: 43.24131902836963, lng: 76.83887765838043},
        {lat: 43.24361191222925, lng: 76.84906871153251},
        {lat: 43.24481058622866, lng: 76.8517495794429},
        {lat: 43.25009638883467, lng: 76.87770129276649},
        {lat: 43.25237966289046, lng: 76.91134088767902},
        {lat: 43.254740258482684, lng: 76.94498350007669},
        {lat: 43.25813960444119, lng: 76.9445099225475},
        {lat: 43.26382386407061, lng: 76.94389762452082},
        {lat: 43.265126725894426, lng: 76.96202361585782},
        {lat: 43.27080438270497, lng: 76.96115956736938},
    ],
    map: map,
    // strokeColor: '#00BB00',
    strokeWeight: 0,
    zIndex: -5,
    icons: [
        {
            icon: {
                path: "M 0,-2 0,0",
                strokeOpacity: 1,
                scale: 5,
                strokeColor: '#00BB00',
            },
            offset: "0",
            repeat: "20px",
        },
    ],
});
const lrtLine2 = new google.maps.Polyline({
    path: [
        {lat: 43.23904488780458, lng: 76.82953848027626},
        {lat: 43.2377317893255, lng: 76.82383073949256},
        {lat: 43.24192109987738, lng: 76.82224287175575},
        {lat: 43.239857744110736, lng: 76.81365980290809},
        {lat: 43.23349572425679, lng: 76.79851978872354},
        {lat: 43.23310488850608, lng: 76.79678171728189},
    ],
    map: map,
    // strokeColor: '#00BB00',
    strokeWeight: 0,
    zIndex: -5,
    icons: [
        {
            icon: {
                path: "M 0,-2 0,0",
                strokeOpacity: 1,
                scale: 5,
                strokeColor: '#00BB00',
            },
            offset: "0",
            repeat: "20px",
        },
    ],
});


