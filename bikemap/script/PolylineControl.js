'use strict';

export default class PolylineControl {
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
        nameSpan.innerText = 'Polyline';
        const closeSpan = document.createElement('span');
        closeSpan.className = 'control-close';
        closeSpan.innerHTML = '<i class="material-icons" style="font-size: 13px;">close</i>';
        closeSpan.addEventListener('click', () => {
            this.hide();
        });
        closeDiv.appendChild(nameSpan);
        closeDiv.appendChild(closeSpan);
        this._controlUi.appendChild(closeDiv);

        const strokeColorDiv = document.createElement('div');
        strokeColorDiv.className = 'control-container';
        const strokeColorLabel = document.createElement('label');
        strokeColorLabel.htmlFor = 'stroke-color-polyline'
        strokeColorLabel.innerHTML = 'Stroke Color:'
        this._strokeColorInput = document.createElement('input');
        this._strokeColorInput.id = 'stroke-color-polyline';
        this._strokeColorInput.type = 'color';
        this._strokeColorInput.value = this._project.drawingManager.polylineOptions.strokeColor;
        this.onStrokeColorChange = this.onStrokeColorChange.bind(this);
        this._strokeColorInput.addEventListener('input', this.onStrokeColorChange);
        strokeColorDiv.appendChild(strokeColorLabel);
        strokeColorLabel.appendChild(this._strokeColorInput);

        const strokeOpacityDiv = document.createElement('div');
        strokeOpacityDiv.className = 'control-container';
        const strokeOpacityLabel = document.createElement('label');
        strokeOpacityLabel.htmlFor = 'stroke-opacity-polyline'
        strokeOpacityLabel.innerHTML = 'Stroke Opacity:'
        this._strokeOpacityInput = document.createElement('input');
        this._strokeOpacityInput.id = 'stroke-opacity-polyline';
        this._strokeOpacityInput.type = 'number';
        this._strokeOpacityInput.min = 0.05;
        this._strokeOpacityInput.max = 1;
        this._strokeOpacityInput.step = 0.01;
        this._strokeOpacityInput.value = this._project.drawingManager.polylineOptions.strokeOpacity;
        this.onStrokeOpacityChange = this.onStrokeOpacityChange.bind(this);
        this._strokeOpacityInput.addEventListener('input', this.onStrokeOpacityChange);
        strokeOpacityDiv.appendChild(strokeOpacityLabel);
        strokeOpacityLabel.appendChild(this._strokeOpacityInput);

        const strokeWeightDiv = document.createElement('div');
        strokeWeightDiv.className = 'control-container';
        const strokeWeightLabel = document.createElement('label');
        strokeWeightLabel.htmlFor = 'stroke-weight-polyline'
        strokeWeightLabel.innerHTML = 'Stroke Weight:'
        this._strokeWeightInput = document.createElement('input');
        this._strokeWeightInput.id = 'stroke-weight-polyline';
        this._strokeWeightInput.type = 'number';
        this._strokeWeightInput.min = 1;
        this._strokeWeightInput.max = 32;
        this._strokeWeightInput.step = 1;
        this._strokeWeightInput.value = this._project.drawingManager.polylineOptions.strokeWeight;
        this.onStrokeWeightChange = this.onStrokeWeightChange.bind(this);
        this._strokeWeightInput.addEventListener('input', this.onStrokeWeightChange);
        strokeWeightDiv.appendChild(strokeWeightLabel);
        strokeWeightLabel.appendChild(this._strokeWeightInput);

        const panelDiv = document.createElement('div');
        panelDiv.className = 'control-container';

        this._deleteSpan = document.createElement('span');
        this._deleteSpan.innerHTML = '<i class="material-icons">delete_forever</i>';
        this._deleteSpan.id = 'delete-polyline';
        this.onDeleteClicked = this.onDeleteClicked.bind(this);
        this._deleteSpan.addEventListener('click', this.onDeleteClicked)
        panelDiv.appendChild(this._deleteSpan);

        this._controlUi.appendChild(strokeColorDiv);
        this._controlUi.appendChild(strokeOpacityDiv);
        this._controlUi.appendChild(strokeWeightDiv);
        this._controlUi.appendChild(panelDiv);
    }

    get controlUi() {
        return this._controlUi;
    }

    update(polylineOptions) {
        if (polylineOptions !== undefined && typeof polylineOptions === 'object') {
            if (polylineOptions.strokeColor) {
                this._strokeColorInput.value = polylineOptions.strokeColor
            };
            if (polylineOptions.strokeOpacity) {
                this._strokeOpacityInput.value = polylineOptions.strokeOpacity
            };
            if (polylineOptions.strokeWeight) {
                this._strokeWeightInput.value = polylineOptions.strokeWeight
            };
        }
    }

    hide() {
        this._controlUi.style.display = 'none';
        this._project.map.panBy(1,1);
        this._project.map.panBy(-1,-1);
    }

    show() {
        this._controlUi.style.display = 'block';
        this._project.map.panBy(1,1);
        this._project.map.panBy(-1,-1);
    }

    onStrokeColorChange() {
        const input = event.target;
        if (this._project.currentPolylineObj !== undefined) {
            this._project.currentPolylineObj.setOptions({
                strokeColor: input.value
            })
        }
        this._project.updateCircleOptions({
            strokeColor: input.value
        });
    }

    onStrokeOpacityChange() {
        const input = event.target;
        if (this._project.currentPolylineObj !== undefined) {
            this._project.currentPolylineObj.setOptions({
                strokeOpacity: input.value
            })
        }
        this._project.updateCircleOptions({
            strokeOpacity: input.value
        });
    }

    onStrokeWeightChange() {
        const input = event.target;
        if (this._project.currentPolylineObj !== undefined) {
            this._project.currentPolylineObj.setOptions({
                strokeWeight: input.value
            })
        }
        this._project.updateCircleOptions({
            strokeWeight: input.value
        });
    }

    onDeleteClicked() {
        if (this._project.currentPolylineObj !== undefined) {
            if (confirm("Are you sure to delete polyline?")) {
                this._project.currentPolylineObj.delete();
            }
        }
    }
}