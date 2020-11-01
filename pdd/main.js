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

const almaty = {
    center: {
        lat: 43.27,
        lng: 76.88
    }
}

const astana = {
    center: {
        lat: 51.14614447699594,
        lng: 71.44561486209467
    }
}

const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: almaty.center,
    styles: style,
    streetViewControl: false,
    mapTypeControl: false,
});

let circles = [];

function updateCircles(records) {
    clearMap();
    circles = records.map(record => {
        return new google.maps.Circle({
            center: new google.maps.LatLng(record.geometry.y, record.geometry.x),
            map: map,
            radius: 100,
            clickable: false,
            fillOpacity: (record.attributes['FD1R13P2'] != null ? 0.6 : 0.2),
            fillColor: (record.attributes['FD1R13P2'] != null ? '#000000' : '#ff0000'),
            strokeWeight: 0,
            zIndex: (record.attributes['FD1R13P2'] != null ? 50000 : 1)
        })
    });
}

function clearMap() {
    circles.forEach(circle => {
        circle.setMap(null);
    })
}

const filterForm = document.getElementById('filter-form');
filterForm.addEventListener('submit', submitHandler);

let request = {
    year: "2020",
    city: "АЛМАТЫ",

    type0: "type0",
    type1: "type1",
    type2: "type2",

    day: "day",
    night: "night",
    dusk: "dusk",
    daytimeNull: "daytimeNull",

    alatau: "alatau",
    almaly: "almaly",
    auezov: "auezov",
    bostandyk: "bostandyk",
    medeu: "medeu",
    nauryzbay: "nauryzbay",
    turksib: "turksib",
    zhetsu: "zhetsu",

    sober: "sober",
    unknown: "unknown",
    dui: "dui",
    other: "other",

    death: "death",
    injury: "injury",

    heatmapCheck: "heatmapCheck"
}

function submitHandler(e) {
    e.preventDefault();
    showStatus();
    const form = e.target;
    const fordData = new FormData(form);
    const newRequest = Object.fromEntries(fordData);
    request = newRequest;
    processRecords();
}

function showStatus() {
    const status = document.getElementById('status');
    status.innerHTML = 'please wait...';
}

function hideStatus() {
    setTimeout(() => {
        const status = document.getElementById('status');
        status.innerHTML = '';
    }, 500)
}

function setMapCenter() {
    if (request.city === 'АЛМАТЫ') {
        map.setCenter(almaty.center);
        map.setZoom(12);
    }
    if (request.city === 'НУР-СУЛТАН') {
        map.setCenter(astana.center);
        map.setZoom(12);
    }
}

const city = document.getElementById('city');
city.addEventListener('change', (e) => {
    if (e.target.value === 'НУР-СУЛТАН') {
        disableDistricts();
    } else if (e.target.value === 'АЛМАТЫ') {
        enableDistricts();
    }
})

function disableDistricts() {
    const alatau = document.getElementById('alatau');
    const almaly = document.getElementById('almaly');
    const auezov = document.getElementById('auezov');
    const bostandyk = document.getElementById('bostandyk');
    const medeu = document.getElementById('medeu');
    const nauryzbay = document.getElementById('nauryzbay');
    const turksib = document.getElementById('turksib');
    const zhetsu = document.getElementById('zhetsu');
    [alatau, almaly, auezov, bostandyk, medeu, nauryzbay, turksib, zhetsu].forEach(checkbox => {
        checkbox.disabled = true;
    })
}

function enableDistricts() {
    const alatau = document.getElementById('alatau');
    const almaly = document.getElementById('almaly');
    const auezov = document.getElementById('auezov');
    const bostandyk = document.getElementById('bostandyk');
    const medeu = document.getElementById('medeu');
    const nauryzbay = document.getElementById('nauryzbay');
    const turksib = document.getElementById('turksib');
    const zhetsu = document.getElementById('zhetsu');
    [alatau, almaly, auezov, bostandyk, medeu, nauryzbay, turksib, zhetsu].forEach(checkbox => {
        checkbox.disabled = false;
    })
}

function processRecords() {
    setMapCenter();
    const filename = 'query' + request.year + '.json';

    $.getJSON(filename, json => {
        let records = json.features;
        // const uniques = [new Set(records.map(record => record.attributes['FD1R141P1']))];
        // console.log(uniques)
        records = filterByCity(records, request.city);
        if (request.city === 'АЛМАТЫ') {
            records = filterByDistrict(records);
        }
        records = filterByType(records);
        records = filterByDaytime(records);
        records = filterByDeathsAndInjuries(records);
        records = filterByCondition(records);


        updateStats(records);
        if (!request.heatmapCheck) {
            removeHeatmap();
            updateCircles(records);
        } else {
            clearMap();
            setHeatmap(records);
        }

    }).done(() => {
        hideStatus();
    });
}

function filterByDistrict(records) {
    let newRecords = records;
    if (!request.alatau) {
        newRecords = newRecords.filter(record => record.attributes['FD1R06P2'] !== "197512 Алатауский район");
    }
    if (!request.almaly) {
        newRecords = newRecords.filter(record => record.attributes['FD1R06P2'] !== "197511 Алмалинский район");
    }
    if (!request.auezov) {
        newRecords = newRecords.filter(record => record.attributes['FD1R06P2'] !== "197513 Ауэзовский район");
    }
    if (!request.bostandyk) {
        newRecords = newRecords.filter(record => record.attributes['FD1R06P2'] !== "197514 Бостандыкский район");
    }
    if (!request.medeu) {
        newRecords = newRecords.filter(record => record.attributes['FD1R06P2'] !== "197517 Медеуский район");
    }
    if (!request.nauryzbay) {
        newRecords = newRecords.filter(record => record.attributes['FD1R06P2'] !== "197541 Наурызбайский район");
    }
    if (!request.turksib) {
        newRecords = newRecords.filter(record => record.attributes['FD1R06P2'] !== "197519 Турксибский район");
    }
    if (!request.zhetsu) {
        newRecords = newRecords.filter(record => record.attributes['FD1R06P2'] !== "197515 Жетысуский район");
    }
    return newRecords;
}

function filterByDeathsAndInjuries(records) {
    let newRecords = records;
    if (!request.death) {
        newRecords = newRecords.filter(record => record.attributes['FD1R13P2'] === null);
    }
    if (!request.injury) {
        newRecords = newRecords.filter(record => record.attributes['FD1R13P1'] === null);
    }
    return newRecords;
}

function filterByType(records) {
    let newRecords = records;
    if (!request.type0) {
        newRecords = newRecords.filter(record => record.attributes['RTA_TYPE'] !== 0);
    }
    if (!request.type1) {
        newRecords = newRecords.filter(record => record.attributes['RTA_TYPE'] !== 1);
    }
    if (!request.type2) {
        newRecords = newRecords.filter(record => record.attributes['RTA_TYPE'] !== 2);
    }
    return newRecords;
}

function filterByDaytime(records) {
    let newRecords = records;
    if (!request.day) {
        newRecords = newRecords.filter(record => record.attributes['FD1R07P2'] !== 'день');
    }
    if (!request.night) {
        newRecords = newRecords.filter(record => record.attributes['FD1R07P2'] !== 'ночь');
    }
    if (!request.dusk) {
        newRecords = newRecords.filter(record => record.attributes['FD1R07P2'] !== 'сумерки');
    }
    if (!request.daytimeNull) {
        newRecords = newRecords.filter(record => record.attributes['FD1R07P2'] !== null);
    }
    return newRecords;
}

function filterByCondition(records) {
    let newRecords = records;
    if (!request.sober) {
        newRecords = newRecords.filter(record => record.attributes['FD1R141P1'] !== 'трезвый');
    }
    if (!request.dui) {
        newRecords = newRecords.filter(record => record.attributes['FD1R141P1'] !== 'алкогольное опьянение');
        newRecords = newRecords.filter(record => record.attributes['FD1R141P1'] !== 'наркотическое опьянение');
        newRecords = newRecords.filter(record => record.attributes['FD1R141P1'] !== 'токсикоманическое опьянение');
    }
    if (!request.other) {
        newRecords = newRecords.filter(record => record.attributes['FD1R141P1'] !== 'резкое ухудшение здоровья');
        newRecords = newRecords.filter(record => record.attributes['FD1R141P1'] !== "время непрерывного нахождения в пути");
    }
    if (!request.unknown) {
        newRecords = newRecords.filter(record => record.attributes['FD1R141P1'] !== null);
    }
    return newRecords;

}

function filterByCity(records, cityName) {
    return records.filter(record => record.attributes['FD1R06P3'] === cityName);
}

function updateStats(records) {
    clearStats();
    updateAccidentsStats(records);
    updateAccidentsStatsByDaytime(records);
    updateAccidentsStatsByCondition(records);
    updateDeathsStats(records);
    updateInjuriesStats(records);
}

function clearStats() {
    const statsContainer = document.getElementById('stats');
    statsContainer.innerHTML = '';
}

function updateAccidentsStats(records) {
    const total = records.length;
    const statsContainer = document.getElementById('stats');
    const thisStats = document.createElement('div');
    thisStats.innerHTML = 'Total accidents: ' + total;
    statsContainer.appendChild(thisStats);
}

function updateAccidentsStatsByDaytime(records) {
    const day = (records.filter(record => record.attributes['FD1R07P2'] === 'день')).length;
    const night = (records.filter(record => record.attributes['FD1R07P2'] === 'ночь')).length;
    const dusk = (records.filter(record => record.attributes['FD1R07P2'] === 'сумерки')).length;
    const unknown = (records.filter(record => record.attributes['FD1R07P2'] === null)).length;
    const statsContainer = document.getElementById('stats');
    const thisStats = document.createElement('div');
    thisStats.classList.add('sub');
    thisStats.innerHTML = day + ' day / ' + night + ' night / ' + dusk + ' dusk / ' + unknown + ' unknw';
    statsContainer.appendChild(thisStats);
}

function updateAccidentsStatsByCondition(records) {
    const sober = (records.filter(record => record.attributes['FD1R141P1'] === 'трезвый')).length;
    const unknown = (records.filter(record => record.attributes['FD1R141P1'] === null)).length;
    const dui = records.filter(record => record.attributes['FD1R141P1'] === 'алкогольное опьянение' || record.attributes['FD1R141P1'] === 'наркотическое опьянение' || record.attributes['FD1R141P1'] === 'токсикоманическое опьянение').length;
    const other = records.filter(record => record.attributes['FD1R141P1'] === 'резкое ухудшение здоровья' || record.attributes['FD1R141P1'] === 'время непрерывного нахождения в пути').length;
    const statsContainer = document.getElementById('stats');
    const thisStats = document.createElement('div');
    thisStats.classList.add('sub2');
    thisStats.innerHTML = sober + ' sober / ' + unknown + ' unknw / ' + dui + ' dui / ' + other + ' other';
    statsContainer.appendChild(thisStats);
}

function updateDeathsStats(records) {
    const total = records.reduce(((total, current) => {
        return total + current.attributes['FD1R13P2'];
    }), 0);
    const statsContainer = document.getElementById('stats');
    const thisStats = document.createElement('div');
    thisStats.innerHTML = 'Deaths: ' + total;
    statsContainer.appendChild(thisStats);
}

function updateInjuriesStats(records) {
    const total = records.reduce(((total, current) => {
        return total + current.attributes['FD1R13P1'];
    }), 0);
    const statsContainer = document.getElementById('stats');
    const thisStats = document.createElement('div');
    thisStats.innerHTML = 'Injuried: ' + total;
    statsContainer.appendChild(thisStats);
}

const heatmap = new google.maps.visualization.HeatmapLayer({
    // radius: 30,
    // maxIntensity: 10,
    dissipating: true,
    gradient: [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
    ]
});

function setHeatmap(records) {
    const data = records.map(record => {
        return {
            location: new google.maps.LatLng(record.geometry.y, record.geometry.x),
            weight: 1
        }
    })
    heatmap.setData(data);
    heatmap.setMap(map);
}

function removeHeatmap() {
    heatmap.setMap(null);
}
