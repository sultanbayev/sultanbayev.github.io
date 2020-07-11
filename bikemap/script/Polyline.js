'use strict';

class Polyline {
    constructor(project, polyline) {
        this._project = project;
        this._polyline = polyline;

        this.setOptions(this._project.drawingManager.polylineOptions);

        this._project.polylineObjs.push(this);

        this.setCurrentAndEditable(true);
        this._project.polylinesVisibilityControl.setAllVisible();
        this._project.polylineControl.show();

        google.maps.event.addListener(this._polyline, 'click', () => {
            this.onPolylineClick();
        });

        this._vertexInfoWindow = this.createVertexInfoWindow();

        google.maps.event.addListener(this._polyline, 'rightclick', (e) => {
            this.onPolylineRightClick(e);
        });

        google.maps.event.addListener(this._vertexInfoWindow, 'closeclick', () => {
            google.maps.event.clearInstanceListeners(this._vertexInfoWindow.getContent());
        });
    }

    get polyline() {
        return this._polyline;
    }

    createVertexInfoWindow() {
        const content = document.createElement('div');
        content.innerText = 'delete vertex';
        content.className = 'vertex-delete';
        return new google.maps.InfoWindow({
            content: content
        });
    }

    setVisible(boolean) {
        if (boolean) {
            this._polyline.setVisible(true);
        } else {
            this._polyline.setVisible(false);
        }
    }

    setCurrentAndEditable(boolean) {
        this._project.resetEditable();
        this._project.resetCurrent();
        if (boolean) {
            this.setCurrent()
            this.setEditable(true);
        }
    }

    setCurrent() {
        this._project.currentPolylineObj = this;
    }

    setEditable(boolean) {
        if (boolean) {
            this._polyline.setEditable(true);
        } else {
            this._polyline.setEditable(false);
        }
    }

    getOptions() {
        return {
            'strokeColor': this._polyline.get('strokeColor'),
            'strokeOpacity': this._polyline.get('strokeOpacity'),
            'strokeWeight': this._polyline.get('strokeWeight')
        }
    }

    setOptions(polylineOptions) {
        if (polylineOptions.strokeColor) {
            this._polyline.set('strokeColor', polylineOptions.strokeColor);
        }
        if (polylineOptions.strokeOpacity) {
            this._polyline.set('strokeOpacity', polylineOptions.strokeOpacity);
        }
        if (polylineOptions.strokeWeight) {
            this._polyline.set('strokeWeight', polylineOptions.strokeWeight);
        }
    }

    onPolylineClick() {
        if (this._polyline.getEditable()) {
            this.setCurrentAndEditable(false);
        } else {
            this.setCurrentAndEditable(true);
            this._project.polylineControl.show();
            this._project.polylineControl.update(this.getOptions());
        }
    }

    onPolylineRightClick(e) {
        if (e.vertex == undefined) {
            return;
        }
        if (this._polyline.getPath().getArray().length < 3) {
            return;
        }
        this._vertexInfoWindow.setPosition(this._polyline.getPath().getAt(e.vertex));
        this._vertexInfoWindow.open(this._project.map);

        google.maps.event.addDomListenerOnce(this._vertexInfoWindow.getContent(), 'click', () => {
            this._polyline.getPath().removeAt(e.vertex);
            this._vertexInfoWindow.close();
        });
    }

    delete() {
        google.maps.event.clearInstanceListeners(this._polyline);
        this._polyline.setMap(null);
        const index = this._project.polylineObjs.findIndex(element => element === this._project.currentPolylineObj);
        if (index != -1) {
            this._project.polylineObjs.splice(index, 1);
        }
        this.setCurrentAndEditable(false);
    }
}
