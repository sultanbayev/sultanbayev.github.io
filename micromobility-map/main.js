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
        drawingModes: ['polyline', 'polygon']
    }
});
drawingManager.setMap(map);

let polyline;
let polygon;

google.maps.event.addListener(drawingManager, 'polylinecomplete', (polyl) => {
    polyl.setEditable(true);
    polyline = polyl;
});

google.maps.event.addListener(drawingManager, 'polygoncomplete', (polyg) => {
    polyg.setEditable(true);
    polygon = polyg;
});

let exportText = '';
google.maps.event.addListener(map, 'rightclick', () => {
    if (drawingManager.getDrawingMode() === 'polyline') {
        drawingManager.setDrawingMode(null);
        polyline.getPath().getArray().forEach((i) => {
            console.log(i.lat() + ', ' + i.lng())
        })
    }
    if (drawingManager.getDrawingMode() === 'polygon') {
        drawingManager.setDrawingMode(null);
        polygon.getPath().getArray().forEach((i) => {
            exportText += '{lat: ' + i.lat() + ', lng: ' + i.lng() + '},';
        })
        console.log(exportText)
    }
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
                bikeshareStations.radiuses.push(radius1);
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
                bikeshareStations.radiuses.push(radius2);
        });
    });
    return bikeshareStations;
}

function getOzimStations(map) {
    const ozimLocations = [
        {lat: 43.2614, lng: 76.96469},
        {lat: 43.26081, lng: 76.95478},
        {lat: 43.25589, lng: 76.95592},
        {lat: 43.25748, lng: 76.94785},
        {lat: 43.25553, lng: 76.9463},
        {lat: 43.2604, lng: 76.94613},
        {lat: 43.26225, lng: 76.94416},
        {lat: 43.25964, lng: 76.94257},
        {lat: 43.25954, lng: 76.94163},
        {lat: 43.25868, lng: 76.94124},
        {lat: 43.25676, lng: 76.94092},
        {lat: 43.25942, lng: 76.93937},
        {lat: 43.26183, lng: 76.94073},
        {lat: 43.25933, lng: 76.93439},
        {lat: 43.25447, lng: 76.93182},
        {lat: 43.25326, lng: 76.92531},
        {lat: 43.25342, lng: 76.92731},
        {lat: 43.24986, lng: 76.92634},
        {lat: 43.24082, lng: 76.92763},
        {lat: 43.24152, lng: 76.93053},
        {lat: 43.24563, lng: 76.9336},
        {lat: 43.24924, lng: 76.93639},
        {lat: 43.24627, lng: 76.94272},
        {lat: 43.24824, lng: 76.94241},
        {lat: 43.24971, lng: 76.94179},
        {lat: 43.24632, lng: 76.94755},
        {lat: 43.24999, lng: 76.94708},
        {lat: 43.25157, lng: 76.94552},
        {lat: 43.24311, lng: 76.95189},
        {lat: 43.24339, lng: 76.95646},
        {lat: 43.24788, lng: 76.9565},
        {lat: 43.25041, lng: 76.95279},
        {lat: 43.25157, lng: 76.95614},
        {lat: 43.23915, lng: 76.95771},
        {lat: 43.23474, lng: 76.95793},
        {lat: 43.23396, lng: 76.95557},
        {lat: 43.23264, lng: 76.95316},
        {lat: 43.23443, lng: 76.95295},
        {lat: 43.23377, lng: 76.95024},
        {lat: 43.23261, lng: 76.94981},
        {lat: 43.2393, lng: 76.949},
        {lat: 43.23133, lng: 76.94518},
        {lat: 43.23893, lng: 76.94574},
        {lat: 43.23896, lng: 76.94484},
        {lat: 43.2389, lng: 76.94333},
        {lat: 43.23887, lng: 76.94252},
        {lat: 43.23855, lng: 76.94089},
        {lat: 43.23095, lng: 76.93365},
        {lat: 43.23729, lng: 76.93309},
        {lat: 43.23751, lng: 76.92914}, 
        {lat: 43.22661, lng: 76.92515},
        {lat: 43.23202, lng: 76.92004},
        {lat: 43.23671, lng: 76.91849},
        {lat: 43.24052, lng: 76.91686},
        {lat: 43.22624, lng: 76.91637},
        {lat: 43.22614, lng: 76.90607},
        {lat: 43.23596, lng: 76.90409},
        {lat: 43.24315, lng: 76.90366},
        {lat: 43.23862, lng: 76.89555},
        {lat: 43.23615, lng: 76.89036},
        {lat: 43.22217, lng: 76.8971},
        {lat: 43.21793, lng: 76.92781},
        {lat: 43.19805, lng: 76.89397},
        {lat: 43.20083, lng: 76.89311},
        {lat: 43.21899, lng: 76.92905},
        {lat: 43.24219, lng: 76.9381},
    ];
    const ozimStations = {
        markers: [],
        radiuses: [],
    };
    for (let location in ozimLocations) {
        const latLng = ozimLocations[location];
        const station = new google.maps.Marker({
            position: latLng,
            map: map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 3,
                fillColor: '#ff6600',
                fillOpacity: 1,
                strokeWeight: 1,
            },
            zIndex: -6,
        });
        ozimStations.markers.push(station)
        const radius1 = new google.maps.Circle({
            center: latLng,
            map: map,
            radius: 300,
            fillColor: '#ff6600',
            fillOpacity: 0.4,
            strokeWeight: 0,
            strokeColor: '#ff6600',
            zIndex: -7
        });
        ozimStations.radiuses.push(radius1);
        const radius2 = new google.maps.Circle({
            center: latLng,
            map: map,
            radius: 400,
            fillColor: '#ff6600',
            fillOpacity: 0.1,
            strokeWeight: 1,
            strokeColor: '#ff6600',
            zIndex: -8
        });
        ozimStations.radiuses.push(radius2);
    }
    return ozimStations;
}

function getMetroLines(map) {
    const metrolLines = [];

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
            });
            metrolLines.push(line);
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
            });
            metrolLines.push(line);
        } else if (index == metroStations.future.length - 1) {
            const line = new google.maps.Polyline({
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
            });
            metrolLines.push(line);
        }
    }
    return metrolLines;
}

function getBrtLines(map) {
    const brtLines = [];
    const brtLine1 = new google.maps.Polyline({
        path: [
            {lat: 43.19475, lng: 76.88184},
            {lat: 43.20615808759213, lng: 76.87781583959604},
            {lat: 43.20651781552368, lng: 76.87959682638193},
            {lat: 43.212757975506825, lng: 76.87738668615366},
            {lat: 43.21289872363244, lng: 76.87813770467783},
            {lat: 43.21672200505054, lng: 76.87676442819806},
            {lat: 43.217292526063126, lng: 76.87616362791461},
    
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
    brtLines.push(brtLine1);
    brtLines.push(brtLine2);
    brtLines.push(brtLine3);
    brtLines.push(brtLine4);
    return brtLines;
}

function getLrtLines(map) {
    const lrtLines = [];
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
    lrtLines.push(lrtLine1);
    lrtLines.push(lrtLine2);
    return lrtLines;
}

const bikeshareStations = getBikeshareStations(map);
const metroStations = getMetroStations(map);
const ozimStations = getOzimStations(map);
const metroLines = getMetroLines(map);
const brtLines = getBrtLines(map);
const lrtLines = getLrtLines(map);

function setLinesViibility(checkbox) {
    if (checkbox.id == 'brt-lines') {
        if (checkbox.checked) {
            setLinesVisible(brtLines);
        } else {
            setLinesInvisible(brtLines);
        }
    }
    if (checkbox.id == 'lrt-lines') {
        if (checkbox.checked) {
            setLinesVisible(lrtLines);
        } else {
            setLinesInvisible(lrtLines);
        }
    }
    if (checkbox.id == 'metro-lines') {
        if (checkbox.checked) {
            setMetroLinesVisible(metroLines, metroStations);
        } else {
            setMetroLinesInvisible(metroLines, metroStations);
        }
    }
}

function setShareVisibility(checkbox) {
    if (checkbox.id == 'bikeshare') {
        if (checkbox.checked) {
            setShareVisibile(bikeshareStations);
        } else {
            setShareInvisibile(bikeshareStations);
        }
    }
    if (checkbox.id == 'ozim') {
        if (checkbox.checked) {
            setShareVisibile(ozimStations);
        } else {
            setShareInvisibile(ozimStations);
        }
    }
}

function setLinesInvisible(lines) {
    for (let line in lines) {
        lines[line].setVisible(false);
    }
}

function setLinesVisible(lines) {
    for (let line in lines) {
        lines[line].setVisible(true);
    }
}

function setMetroLinesInvisible(metroLines, metroStations) {
    for (let station in metroStations.future) {
        metroStations.future[station].setVisible(false);
    }
    for (let station in metroStations.current) {
        metroStations.current[station].setVisible(false);
    }

    for (let line in metroLines) {
        metroLines[line].setVisible(false);
    }
}

function setMetroLinesVisible(metroLines, metroStations) {
    for (let station in metroStations.future) {
        metroStations.future[station].setVisible(true);
    }
    for (let station in metroStations.current) {
        metroStations.current[station].setVisible(true);
    }

    for (let line in metroLines) {
        metroLines[line].setVisible(true);
    }
}

function setShareVisibile(shareStations) {
    for (let station in shareStations.markers) {
        shareStations.markers[station].setVisible(true)
    }
    for (let radius in shareStations.radiuses) {
        shareStations.radiuses[radius].setVisible(true)
    }
}

function setShareInvisibile(shareStations) {
    for (let station in shareStations.markers) {
        shareStations.markers[station].setVisible(false)
    }
    for (let radius in shareStations.radiuses) {
        shareStations.radiuses[radius].setVisible(false)
    }
}

function getOzimZone(map) {
    const poly = new google.maps.Polygon({
        paths: [
            {lat: 43.193769640246096, lng: 76.89351833343504},{lat: 43.19439537971659, lng: 76.89223087310789},{lat: 43.19677313118974, lng: 76.89132965087889},{lat: 43.24246426440234, lng: 76.88957012176512},{lat: 43.24479602832596, lng: 76.89383190913328},{lat: 43.24792204426766, lng: 76.92297142787108},{lat: 43.25376726359742, lng: 76.92262810511717},{lat: 43.262594441343495, lng: 76.92471634959067},{lat: 43.262531937658345, lng: 76.92887913798178},{lat: 43.26365699417314, lng: 76.9452727994808},{lat: 43.26653204414092, lng: 76.97170865153159},{lat: 43.26165687932827, lng: 76.97342526530112},{lat: 43.25678132410491, lng: 76.97282445048178},{lat: 43.256218734918264, lng: 76.96570050333823},{lat: 43.25453093617211, lng: 76.95943486307944},{lat: 43.22916182792477, lng: 76.96191402672797},{lat: 43.22584722558185, lng: 76.94079967736273},{lat: 43.22071861774669, lng: 76.93307491539984},{lat: 43.21377554667336, lng: 76.94461777934367},{lat: 43.21133590159048, lng: 76.94264367350871},{lat: 43.215339370395775, lng: 76.92479089030559},{lat: 43.20726960958122, lng: 76.91406205424602},{lat: 43.20406793458928, lng: 76.91394601467103},{lat: 43.20150276865513, lng: 76.91008363368958},{lat: 43.20106480271645, lng: 76.90587792995423},{lat: 43.193769640246096, lng: 76.89351833343504},{lat: 43.19439537971659, lng: 76.89223087310789},{lat: 43.19677313118974, lng: 76.89132965087889},{lat: 43.24246426440234, lng: 76.88957012176512},{lat: 43.24479602832596, lng: 76.89383190913328},{lat: 43.24792204426766, lng: 76.92297142787108},{lat: 43.25376726359742, lng: 76.92262810511717},{lat: 43.262594441343495, lng: 76.92471634959067},{lat: 43.262531937658345, lng: 76.92887913798178},{lat: 43.26365699417314, lng: 76.9452727994808},{lat: 43.26653204414092, lng: 76.97170865153159},{lat: 43.26165687932827, lng: 76.97342526530112},{lat: 43.25678132410491, lng: 76.97282445048178},{lat: 43.256218734918264, lng: 76.96570050333823},{lat: 43.25453093617211, lng: 76.95943486307944},{lat: 43.22916182792477, lng: 76.96191402672797},{lat: 43.22584722558185, lng: 76.94079967736273},{lat: 43.22071861774669, lng: 76.93307491539984},{lat: 43.21377554667336, lng: 76.94461777934367},{lat: 43.21133590159048, lng: 76.94264367350871},{lat: 43.215339370395775, lng: 76.92479089030559},{lat: 43.20726960958122, lng: 76.91406205424602},{lat: 43.20406793458928, lng: 76.91394601467103},{lat: 43.20150276865513, lng: 76.91008363368958},{lat: 43.20106480271645, lng: 76.90587792995423},
        ],
        map: map,
        zIndex: -10,
        fillColor: '#ff6600',
        fillOpacity: 0.1,
        strokeWeight: 1,
        strokeColor: '#ff6600',
    });
    return poly;
}

function getJetZone(map) {
    const poly = new google.maps.Polygon({
        paths: [
            {lat: 43.17703750763437, lng: 76.89063746738024},{lat: 43.176380294171764, lng: 76.89437110232898},{lat: 43.192731067394625, lng: 76.89296390580056},{lat: 43.1947960184397, lng: 76.89631130265114},{lat: 43.195915598842205, lng: 76.89770357447672},{lat: 43.197881927349876, lng: 76.90013551935853},{lat: 43.199375769034596, lng: 76.9029035590619},{lat: 43.20080700712673, lng: 76.90557503924073},{lat: 43.20186800030929, lng: 76.91275612313837},{lat: 43.20446696085377, lng: 76.91455651023557},{lat: 43.2076419656125, lng: 76.91410589912107},{lat: 43.215089242592946, lng: 76.9244484970825},{lat: 43.209141929890215, lng: 76.93953114986098},{lat: 43.21377108347753, lng: 76.94489556789077},{lat: 43.220776701660284, lng: 76.93330842494643},{lat: 43.22549878475418, lng: 76.94013196468032},{lat: 43.22349741671083, lng: 76.94399434566176},{lat: 43.22682778191706, lng: 76.95032435893691},{lat: 43.2257489511397, lng: 76.95251304149306},{lat: 43.224060308114076, lng: 76.95326406001723},{lat: 43.22286745346208, lng: 76.95437365299853},{lat: 43.2236492537527, lng: 76.95772104984911},{lat: 43.225072104553576, lng: 76.95701294666918},{lat: 43.2253222726901, lng: 76.9591587138811},{lat: 43.22565061681134, lng: 76.96179800755175},{lat: 43.22117873061849, lng: 76.9632889172355},{lat: 43.222460913348755, lng: 76.96869625060953},{lat: 43.2229612700263, lng: 76.96869625060953},{lat: 43.22464994349516, lng: 76.9677735707084},{lat: 43.227605009510086, lng: 76.9667650601188},{lat: 43.23107585647672, lng: 76.96500553100503},{lat: 43.23199825553481, lng: 76.96513427703775},{lat: 43.23326457726552, lng: 76.96434034316934},{lat: 43.237266606286326, lng: 76.96197999923623},{lat: 43.2407837975916, lng: 76.96116460769571},{lat: 43.2425152946489, lng: 76.96064962356485},{lat: 43.24393770504396, lng: 76.96116460769571},{lat: 43.24587588113359, lng: 76.96011318176187},{lat: 43.24968106576865, lng: 76.96024192779458},{lat: 43.25409361465408, lng: 76.95945691509489},{lat: 43.25500003741641, lng: 76.97228993487496},{lat: 43.25673470543061, lng: 76.97291220736642},{lat: 43.26034453179444, lng: 76.97475756716867},{lat: 43.263266615437296, lng: 76.97990740847726},{lat: 43.26518945668164, lng: 76.97910243490874},{lat: 43.26804880976268, lng: 76.9771497867459},{lat: 43.26747070002722, lng: 76.97350198248564},{lat: 43.26525195763836, lng: 76.97358781317412},{lat: 43.26545508530451, lng: 76.97296554068267},{lat: 43.266564462905976, lng: 76.97159224966704},{lat: 43.268673787084005, lng: 76.96970397452056},{lat: 43.26881440609696, lng: 76.96906024435698},{lat: 43.26773631869558, lng: 76.96828776816069},{lat: 43.26536421066284, lng: 76.966784024574},{lat: 43.265004829948104, lng: 76.95329046712138},{lat: 43.26852041971078, lng: 76.9530973480723},{lat: 43.26675814137844, lng: 76.93063754197044},{lat: 43.265492515813115, lng: 76.93083066101951},{lat: 43.26551982514463, lng: 76.92664100287342},{lat: 43.2635822741729, lng: 76.92430211661244},{lat: 43.25890010529846, lng: 76.92480790024173},{lat: 43.25836878969118, lng: 76.91086041336429},{lat: 43.257306144567885, lng: 76.90167785404765},{lat: 43.25253964051529, lng: 76.90219283817851},{lat: 43.25167373758659, lng: 76.88793505111468},{lat: 43.23940833615113, lng: 76.88784138523938},{lat: 43.23797018777664, lng: 76.87610403859021},{lat: 43.22084294779636, lng: 76.85066718839363},{lat: 43.21349329097302, lng: 76.85710449002937},{lat: 43.20760099084902, lng: 76.8631827883729},{lat: 43.20516109877649, lng: 76.86605811643686},{lat: 43.19846653474096, lng: 76.86987758207407},{lat: 43.196026620463236, lng: 76.87318159290217},{lat: 43.194274580611264, lng: 76.87966180988215},{lat: 43.194243293728185, lng: 76.88116384693049},{lat: 43.19352369099042, lng: 76.88180757709407},{lat: 43.193335967141586, lng: 76.8829662913885},{lat: 43.193899136955736, lng: 76.88648534961604},{lat: 43.19305438028561, lng: 76.88798738666438},{lat: 43.18676526864371, lng: 76.88884569354914},
        ],
        map: map,
        zIndex: -10,
        fillColor: '#0000cc',
        fillOpacity: 0.2,
        strokeWeight: 1,
        strokeColor: '#0000cc',
    });
    return poly;
}

function getElevenZone(map) {
    const poly = new google.maps.Polygon({
        paths: [
            {lat: 43.2041569567106, lng: 76.86689348186694},{lat: 43.19927679946908, lng: 76.86938257183276},{lat: 43.196648860805844, lng: 76.87230081524096},{lat: 43.194959411899085, lng: 76.87633485759936},{lat: 43.19430239135924, lng: 76.8818709370061},{lat: 43.194364965048756, lng: 76.88895196880542},{lat: 43.194364965048756, lng: 76.89513177837573},{lat: 43.195303562692125, lng: 76.89725608791552},{lat: 43.19755613813649, lng: 76.89957351650439},{lat: 43.20060636817431, lng: 76.90545291866503},{lat: 43.20145102030186, lng: 76.91021652187548},{lat: 43.20414131580455, lng: 76.91390724147998},{lat: 43.2076472358826, lng: 76.91405913084645},{lat: 43.21493217339348, lng: 76.92416569441457},{lat: 43.21543259185653, lng: 76.92347904890676},{lat: 43.213243230763375, lng: 76.914338080584},{lat: 43.21518238313831, lng: 76.91120526045461},{lat: 43.21977980445298, lng: 76.9097461387505},{lat: 43.22594043097774, lng: 76.9114198371758},{lat: 43.22622186605029, lng: 76.91811463087697},{lat: 43.21909177706096, lng: 76.91918751448293},{lat: 43.21583917883406, lng: 76.92360779493947},{lat: 43.21499472592594, lng: 76.92450901716848},{lat: 43.226440759097265, lng: 76.94163223951955},{lat: 43.22784790991676, lng: 76.94489380568166},{lat: 43.22887979987251, lng: 76.96227452009816},{lat: 43.229255028252524, lng: 76.96617981642385},{lat: 43.23114125187326, lng: 76.96527859419484},{lat: 43.23204801619235, lng: 76.96527859419484},{lat: 43.237425789342254, lng: 76.96188828200002},{lat: 43.242365418564, lng: 76.96077248304982},{lat: 43.24405355444931, lng: 76.96124455183644},{lat: 43.24613370481332, lng: 76.96046820041262},{lat: 43.25010363037528, lng: 76.96042528506838},{lat: 43.254010784761014, lng: 76.9596528088721},{lat: 43.254330231685955, lng: 76.9656798647157},{lat: 43.25683066582988, lng: 76.96542237265027},{lat: 43.258455892966104, lng: 76.9649073885194},{lat: 43.2608311469041, lng: 76.96499321920788},{lat: 43.26348757114297, lng: 76.96688149435437},{lat: 43.26301879881726, lng: 76.95799801809704},{lat: 43.26511262059249, lng: 76.95786927206433},{lat: 43.262675030151, lng: 76.9240948961488},{lat: 43.25879968545545, lng: 76.92460988027966},{lat: 43.257916844970495, lng: 76.91106525024075},{lat: 43.25694795620684, lng: 76.90153804381985},{lat: 43.252384595392016, lng: 76.90196719726224},{lat: 43.25165184725506, lng: 76.89233352505502},{lat: 43.23038046153287, lng: 76.89478176732091},{lat: 43.226878304819635, lng: 76.88971775670079},{lat: 43.218814666596636, lng: 76.89207938286354},{lat: 43.21853319732839, lng: 76.88937571617653},{lat: 43.21815790294958, lng: 76.8873157796531},{lat: 43.21068280876494, lng: 76.88804534050514},{lat: 43.208587115835186, lng: 76.88838866325905},
        ],
        map: map,
        zIndex: -10,
        fillColor: '#FFD30C',
        fillOpacity: 0.3,
        strokeWeight: 1,
        strokeColor: '#FFD30C',
    });
    return poly;
}

const elevenZone = getElevenZone(map);
const ozimZone = getOzimZone(map);
const jetZone = getJetZone(map);

function setZoneVisibility(checkbox) {
    if (checkbox.id == 'jet-zone') {
        if (checkbox.checked) {
            setZoneVisibile(jetZone);
        } else {
            setZoneInvisibile(jetZone);
        }
    }
    if (checkbox.id == 'eleven-zone') {
        if (checkbox.checked) {
            setZoneVisibile(elevenZone);
        } else {
            setZoneInvisibile(elevenZone);
        }
    }
    if (checkbox.id == 'ozim-zone') {
        if (checkbox.checked) {
            setZoneVisibile(ozimZone);
        } else {
            setZoneInvisibile(ozimZone);
        }
    }
}

function setZoneVisibile(zone) {
    zone.setVisible(true);
}

function setZoneInvisibile(zone) {
    zone.setVisible(false);
}




