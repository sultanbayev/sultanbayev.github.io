'use strict';

class Circle {
    constructor(project, circle) {

        this._project = project;
        this._circle = circle;

        this.setOptions(this._project.drawingManager.circleOptions);

        this._project.circleObjs.push(this);

        this.setCurrentAndEditable(true);

        this._project.circlesVisibilityControl.setAllVisible();
        this._project.circleControl.show();
        this._project.drawingManager.setDrawingMode(null);

        google.maps.event.addListener(this._circle, 'click', () => {
            this.onCircleClick();
        });

        google.maps.event.addListener(this._circle, 'radius_changed', () => {
            this.onRadiusChange();
        });
    }

    get circle() {
        return this._circle;
    }

    setVisible(boolean) {
        if (boolean) {
            this._circle.setVisible(true);
        } else {
            this._circle.setVisible(false);
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
        this._project.currentCircleObj = this;
    }

    setEditable(boolean) {
        if (boolean) {
            this._circle.setEditable(true);
        } else {
            this._circle.setEditable(false);
        }
    }

    getOptions() {
        return {
            'radius': this._circle.get('radius'),
            'fillColor': this._circle.get('fillColor'),
            'fillOpacity': this._circle.get('fillOpacity'),
            'strokeColor': this._circle.get('strokeColor'),
            'strokeOpacity': this._circle.get('strokeOpacity'),
            'strokeWeight': this._circle.get('strokeWeight')
        }
    }

    setOptions(circleOptions) {
        if (circleOptions.radius) {
            this._circle.set('radius', circleOptions.radius);
        }
        this.correctRadius();
        if (circleOptions.fillColor) {
            this._circle.set('fillColor', circleOptions.fillColor);
        }
        if (circleOptions.fillOpacity) {
            this._circle.set('fillOpacity', circleOptions.fillOpacity);
        }
        if (circleOptions.strokeColor) {
            this._circle.set('strokeColor', circleOptions.strokeColor);
        }
        if (circleOptions.strokeOpacity) {
            this._circle.set('strokeOpacity', circleOptions.strokeOpacity);
        }
        if (circleOptions.strokeWeight) {
            this._circle.set('strokeWeight', circleOptions.strokeWeight);
        }
    }

    onCircleClick() {
        if (this._circle.getEditable()) {
            this.setCurrentAndEditable(false);
        } else {
            this.setCurrentAndEditable(true);
            this._project.circleControl.show();
            this._project.circleControl.update(this.getOptions());
        }
    }

    onRadiusChange() {
        this.correctRadius();
        this._project.circleControl.update(this.getOptions());
    }

    correctRadius() {
        if (this._circle.getRadius() < 100) {
            this._circle.setOptions({
                radius: 100
            });
        }
    }

    delete() {
        google.maps.event.clearInstanceListeners(this._circle);
        this._circle.setMap(null);
        const index = this._project.circleObjs.findIndex(element => element === this);
        if (index !== -1) {
            this._project.circleObjs.splice(index, 1);
        }
        this.setCurrentAndEditable(false);
    }
}