'use strict';

class CircleControl {
    constructor(project) {

        this._project = project;

        this._controlUi = document.createElement('div');
        this._controlUi.style.userSelect = 'none';
        this._controlUi.style.color = '#000000';
        this._controlUi.style.backgroundColor = '#ffffff';
        this._controlUi.style.margin = '1px 10px';
        this._controlUi.style.padding = '0 0 7px';
        this._controlUi.style.boxShadow = '0 1px 4px -1px rgba(0,0,0,0.3)';
        this._controlUi.style.fontFamily = 'Roboto, Arial, sans-serif';
        this._controlUi.style.fontSize = '16px';

        const closeDiv = document.createElement('div');
        closeDiv.className = 'control-header';
        const nameSpan = document.createElement('span');
        nameSpan.className = 'control-name';
        nameSpan.innerText = 'Circle';
        const closeSpan = document.createElement('span');
        closeSpan.className = 'control-close';
        closeSpan.innerHTML = '<i class="material-icons" style="font-size: 13px;">close</i>';
        closeSpan.addEventListener('click', () => {
            this.hide();
        });
        closeDiv.appendChild(nameSpan);
        closeDiv.appendChild(closeSpan);
        this._controlUi.appendChild(closeDiv);

        const radiusDiv = document.createElement('div');
        radiusDiv.className = 'control-container';
        const radiusLabel = document.createElement('label');
        radiusLabel.htmlFor = 'radius-circle'
        radiusLabel.innerHTML = 'Radius:'
        this._radiusInput = document.createElement('input');
        this._radiusInput.id = 'radius-circle';
        this._radiusInput.type = 'number';
        this._radiusInput.min = 100;
        this._radiusInput.step = 1;
        this._radiusInput.value = this._project.drawingManager.circleOptions.radius;
        this.onRadiusChange = this.onRadiusChange.bind(this);
        this._radiusInput.addEventListener('input', this.onRadiusChange);
        radiusDiv.appendChild(radiusLabel);
        radiusLabel.appendChild(this._radiusInput);

        const fillColorDiv = document.createElement('div');
        fillColorDiv.className = 'control-container';
        const fillColorLabel = document.createElement('label');
        fillColorLabel.htmlFor = 'fill-color-circle'
        fillColorLabel.innerHTML = 'Fill Color:'
        this._fillColorInput = document.createElement('input');
        this._fillColorInput.id = 'fill-color-circle';
        this._fillColorInput.type = 'color';
        this._fillColorInput.value = this._project.drawingManager.circleOptions.fillColor;
        this.onFillColorChange = this.onFillColorChange.bind(this);
        this._fillColorInput.addEventListener('input', this.onFillColorChange);
        fillColorDiv.appendChild(fillColorLabel);
        fillColorLabel.appendChild(this._fillColorInput);

        const fillOpacityDiv = document.createElement('div');
        fillOpacityDiv.className = 'control-container';
        const fillOpacityLabel = document.createElement('label');
        fillOpacityLabel.htmlFor = 'fill-opacity-circle'
        fillOpacityLabel.innerHTML = 'Fill Opacity:'
        this._fillOpacityInput = document.createElement('input');
        this._fillOpacityInput.id = 'fill-opacity-circle';
        this._fillOpacityInput.type = 'number';
        this._fillOpacityInput.min = 0;
        this._fillOpacityInput.max = 1;
        this._fillOpacityInput.step = 0.01;
        this._fillOpacityInput.value = this._project.drawingManager.circleOptions.fillOpacity;
        this.onFillOpacityChange = this.onFillOpacityChange.bind(this);
        this._fillOpacityInput.addEventListener('input', this.onFillOpacityChange);
        fillOpacityDiv.appendChild(fillOpacityLabel);
        fillOpacityLabel.appendChild(this._fillOpacityInput);

        const strokeColorDiv = document.createElement('div');
        strokeColorDiv.className = 'control-container';
        const strokeColorLabel = document.createElement('label');
        strokeColorLabel.htmlFor = 'stroke-color-circle'
        strokeColorLabel.innerHTML = 'Stroke Color:'
        this._strokeColorInput = document.createElement('input');
        this._strokeColorInput.id = 'stroke-color-circle';
        this._strokeColorInput.type = 'color';
        this._strokeColorInput.value = this._project.drawingManager.circleOptions.strokeColor;
        this.onStrokeColorChange = this.onStrokeColorChange.bind(this);
        this._strokeColorInput.addEventListener('input', this.onStrokeColorChange);
        strokeColorDiv.appendChild(strokeColorLabel);
        strokeColorLabel.appendChild(this._strokeColorInput);

        const strokeOpacityDiv = document.createElement('div');
        strokeOpacityDiv.className = 'control-container';
        const strokeOpacityLabel = document.createElement('label');
        strokeOpacityLabel.htmlFor = 'stroke-opacity-circle'
        strokeOpacityLabel.innerHTML = 'Stroke Opacity:'
        this._strokeOpacityInput = document.createElement('input');
        this._strokeOpacityInput.id = 'stroke-opacity-circle';
        this._strokeOpacityInput.type = 'number';
        this._strokeOpacityInput.min = 0.05;
        this._strokeOpacityInput.max = 1;
        this._strokeOpacityInput.step = 0.01;
        this._strokeOpacityInput.value = this._project.drawingManager.circleOptions.strokeOpacity;
        this.onStrokeOpacityChange = this.onStrokeOpacityChange.bind(this);
        this._strokeOpacityInput.addEventListener('input', this.onStrokeOpacityChange);
        strokeOpacityDiv.appendChild(strokeOpacityLabel);
        strokeOpacityLabel.appendChild(this._strokeOpacityInput);

        const strokeWeightDiv = document.createElement('div');
        strokeWeightDiv.className = 'control-container';
        const strokeWeightLabel = document.createElement('label');
        strokeWeightLabel.htmlFor = 'stroke-weight-circle'
        strokeWeightLabel.innerHTML = 'Stroke Weight:'
        this._strokeWeightInput = document.createElement('input');
        this._strokeWeightInput.id = 'stroke-weight-circle';
        this._strokeWeightInput.type = 'number';
        this._strokeWeightInput.min = 1;
        this._strokeWeightInput.max = 32;
        this._strokeWeightInput.step = 1;
        this._strokeWeightInput.value = this._project.drawingManager.circleOptions.strokeWeight;
        this.onStrokeWeightChange = this.onStrokeWeightChange.bind(this);
        this._strokeWeightInput.addEventListener('input', this.onStrokeWeightChange);
        strokeWeightDiv.appendChild(strokeWeightLabel);
        strokeWeightLabel.appendChild(this._strokeWeightInput);

        const deleteDiv = document.createElement('div');
        deleteDiv.className = 'control-container';
        this._deleteSpan = document.createElement('span');
        this._deleteSpan.innerHTML = '<i class="material-icons md-18">delete_forever</i>';
        this._deleteSpan.id = 'delete-circle';
        this.onDeleteClicked = this.onDeleteClicked.bind(this);
        this._deleteSpan.addEventListener('click', this.onDeleteClicked)
        deleteDiv.appendChild(this._deleteSpan);

        this._controlUi.appendChild(radiusDiv);
        this._controlUi.appendChild(fillColorDiv);
        this._controlUi.appendChild(fillOpacityDiv);
        this._controlUi.appendChild(strokeColorDiv);
        this._controlUi.appendChild(strokeOpacityDiv);
        this._controlUi.appendChild(strokeWeightDiv);
        this._controlUi.appendChild(deleteDiv);
    }

    get controlUi() {
        return this._controlUi;
    }

    update(circleOptions) {
        if (circleOptions !== undefined && typeof circleOptions === 'object') {
            if (circleOptions.radius) {
                this._radiusInput.value = circleOptions.radius;
            }
            if (circleOptions.fillColor) {
                this._fillColorInput.value = circleOptions.fillColor;
            }
            if (circleOptions.fillOpacity) {
                this._fillOpacityInput.value = circleOptions.fillOpacity;
            }
            if (circleOptions.strokeColor) {
                this._strokeColorInput.value = circleOptions.strokeColor;
            }
            if (circleOptions.strokeOpacity) {
                this._strokeOpacityInput.value = circleOptions.strokeOpacity;
            }
            if (circleOptions.strokeWeight) {
                this._strokeWeightInput.value = circleOptions.strokeWeight;
            }
        }
    }

    hide() {
        this._controlUi.style.display = 'none';
        this._project.map.panBy(1, 1);
        this._project.map.panBy(-1, -1);
    }

    show() {
        this._controlUi.style.display = 'block';
        this._project.map.panBy(1, 1);
        this._project.map.panBy(-1, -1);
    }

    onRadiusChange() {
        const input = event.target;
        const radiusValue = parseInt(input.value);
        if (!isNaN(radiusValue) && radiusValue >= 100) {
            if (this._project.currentCircleObj !== undefined) {
                this._project.currentCircleObj.setOptions({
                    radius: radiusValue
                });
            }
            this._project.updateCircleOptions({
                radius: radiusValue
            });
        }
    }

    onFillColorChange() {
        const input = event.target;
        if (this._project.currentCircleObj !== undefined) {
            this._project.currentCircleObj.setOptions({
                fillColor: input.value
            })
        }
        this._project.updateCircleOptions({
            fillColor: input.value
        });
    }

    onFillOpacityChange() {
        const input = event.target;
        if (this._project.currentCircleObj !== undefined) {
            this._project.currentCircleObj.setOptions({
                fillOpacity: input.value
            })
        }
        this._project.updateCircleOptions({
            fillOpacity: input.value
        });
    }

    onStrokeColorChange() {
        const input = event.target;
        if (this._project.currentCircleObj !== undefined) {
            this._project.currentCircleObj.setOptions({
                strokeColor: input.value
            })
        }
        this._project.updateCircleOptions({
            strokeColor: input.value
        });
    }

    onStrokeOpacityChange() {
        const input = event.target;
        if (this._project.currentCircleObj !== undefined) {
            this._project.currentCircleObj.setOptions({
                strokeOpacity: input.value
            })
        }
        this._project.updateCircleOptions({
            strokeOpacity: input.value
        });
    }

    onStrokeWeightChange() {
        const input = event.target;
        if (this._project.currentCircleObj !== undefined) {
            this._project.currentCircleObj.setOptions({
                strokeWeight: input.value
            })
        }
        this._project.updateCircleOptions({
            strokeWeight: input.value
        });
    }

    onDeleteClicked() {
        if (this._project.currentCircleObj !== undefined) {
            if (confirm("Are you sure to delete circle?")) {
                this._project.currentCircleObj.delete();
            }
        }
    }
}