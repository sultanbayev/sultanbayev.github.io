'use strict';

class Project {
    constructor() {

        this._polylineObjs = [];
        this._circleObjs = [];
        this._currentCircleObj;
        this._currentPolylineObj;

        this._map = new google.maps.Map(document.getElementById('map'), {
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
            clickableIcons: false,
            zoomControl: false
        });

        this._elevator = new google.maps.ElevationService;

        this._drawingManager = new google.maps.drawing.DrawingManager({
            circleOptions: {
                clickable: true,
                editable: false,
                draggable: false,
                radius: 500,
                fillColor: '#000000',
                fillOpacity: 0.6,
                strokeColor: '#000000',
                strokeOpacity: 1,
                strokeWeight: 1,
                zIndex: -5,
                strokePosition: google.maps.StrokePosition.OUTSIDE
            },
            polylineOptions: {
                clickable: true,
                editable: false,
                draggable: false,
                strokeColor: '#000000',
                strokeOpacity: 1,
                strokeWeight: 3,
            },
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: ['circle', 'polyline']
            }
        });
        this._drawingManager.setMap(this._map);
        
        this._circleControl = new CircleControl(this);
        this._map.controls[8].push(this._circleControl.controlUi);

        this._polylineControl = new PolylineControl(this);
        this._map.controls[8].push(this._polylineControl.controlUi);

        this._circlesVisibilityControl = new CirclesVisibilityControl(this);
        this._map.controls[4].push(this._circlesVisibilityControl.controlUi);

        this._polylinesVisibilityControl = new PolylinesVisibilityControl(this);
        this._map.controls[4].push(this._polylinesVisibilityControl.controlUi);

        google.maps.event.addListener(this._drawingManager, 'polylinecomplete', (polyline) => {
            this.onPolylineComplete(polyline);
        });

        google.maps.event.addListener(this._drawingManager, 'circlecomplete', (circle) => {
            this.onCircleComplete(circle);
        });

        google.maps.event.addListener(this._map, 'rightclick', () => {
            if (this._drawingManager.getDrawingMode() === 'polyline' || this._drawingManager.getDrawingMode() === 'circle') {
                this._drawingManager.setDrawingMode(null);
            }
        });
    }

    get map() {
        return this._map;
    }

    get elevator() {
        return this._elevator;
    }

    get drawingManager() {
        return this._drawingManager;
    }

    get circleControl() {
        return this._circleControl;
    }

    get polylineControl() {
        return this._polylineControl;
    }

    get circlesVisibilityControl() {
        return this._circlesVisibilityControl;
    }

    get polylinesVisibilityControl() {
        return this._polylinesVisibilityControl;
    }

    get polylineObjs() {
        return this._polylineObjs;
    }

    get circleObjs() {
        return this._circleObjs;
    }

    set currentPolylineObj(polylineObj) {
        this._currentPolylineObj = polylineObj;
    }

    get currentPolylineObj() {
        return this._currentPolylineObj;
    }

    set currentCircleObj(circleObj) {
        this._currentCircleObj = circleObj;
    }

    get currentCircleObj() {
        return this._currentCircleObj;
    }

    updateCircleOptions(circleOptions) {
        if (circleOptions !== undefined && typeof circleOptions === 'object') {
            if (circleOptions.radius) {
                if (circleOptions.radius < 100) {
                    this._drawingManager.circleOptions.radius = 100;
                } else {
                    this._drawingManager.circleOptions.radius = circleOptions.radius;
                }
            }
            if (circleOptions.fillColor) {
                this._drawingManager.circleOptions.fillColor = circleOptions.fillColor;
            }
            if (circleOptions.fillOpacity) {
                this._drawingManager.circleOptions.fillOpacity = circleOptions.fillOpacity;
            }
            if (circleOptions.strokeColor) {
                this._drawingManager.circleOptions.strokeColor = circleOptions.strokeColor;
            }
            if (circleOptions.strokeOpacity) {
                this._drawingManager.circleOptions.strokeOpacity = circleOptions.strokeOpacity;
            }
            if (circleOptions.strokeWeight) {
                this._drawingManager.circleOptions.strokeWeight = circleOptions.strokeWeight;
            }
        }
    }

    updatePolylineOptions(polylineOptions) {
        if (polylineOptions !== undefined && typeof polylineOptions === 'object') {
            if (polylineOptions.strokeColor) {
                this._drawingManager.polylineOptions.strokeColor = polylineOptions.strokeColor;
            }
            if (polylineOptions.strokeOpacity) {
                this._drawingManager.polylineOptions.strokeOpacity = polylineOptions.strokeOpacity;
            }
            if (polylineOptions.strokeWeight) {
                this._drawingManager.polylineOptions.strokeWeight = polylineOptions.strokeWeight;
            }
        }
    }

    onCircleComplete(circle) {
        new Circle(this, circle);
    }

    onPolylineComplete(polyline) {
        if (polyline.getPath().getArray().length < 2) {
            polyline.setMap(null);
            return;
        }
        new Polyline(this, polyline);
    }

    resetEditable() {
        this._polylineObjs.forEach(element => element.polyline.setEditable(false));
        this._circleObjs.forEach(element => element.circle.setEditable(false));
    }

    resetCurrent() {
        this._currentPolylineObj = undefined;
        this._currentCircleObj = undefined;
    }

    setCirclesVisible(boolean) {
        if (boolean) {
            this.circleObjs.forEach(c => {
                c.setVisible(true);
            });
        } else {
            this.circleObjs.forEach(c => {
                c.setVisible(false);
            });
        }
    }

    setCirclesEditable(boolean) {
        if (boolean) {
            this.circleObjs.forEach(c => {
                c.setEditable(true);
            });
        } else {
            this.circleObjs.forEach(c => {
                c.setEditable(false);
            });
        }
    }

    setPolylinesVisible(boolean) {
        if (boolean) {
            this._polylineObjs.forEach(p => {
                p.setVisible(true)
            });
        } else {
            this._polylineObjs.forEach(p => {
                p.setVisible(false)
            });
        }
    }

    setPolylinesEditable(boolean) {
        if (boolean) {
            this.polylineObjs.forEach(p => {
                p.setEditable(true);
            });
        } else {
            this.polylineObjs.forEach(p => {
                p.setEditable(false);
            });
        }
    }



}