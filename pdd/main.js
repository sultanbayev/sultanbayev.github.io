const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {
        lat: 43.24704406575034,
        lng: 76.92955542657376
    },
    mapTypeId: 'terrain',
    mapTypeControl: false,
    streetViewControl: false,
    scaleControl: true,
    mapTypeControl: true,
    clickableIcons: true
});

let data = {};

$.getJSON("data.json", json => {
    const features = json.features.map(feature => {
        return {
            location: new google.maps.LatLng(feature.geometry.y, feature.geometry.x),
            weight: 1
        }
    });

    console.log(features)

    const heatmap = new google.maps.visualization.HeatmapLayer({
        data: features,
        radius: 30,
        maxIntensity: 10,
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
    heatmap.setMap(map);
});

