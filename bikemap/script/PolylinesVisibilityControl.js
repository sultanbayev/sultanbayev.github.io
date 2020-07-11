'use strict';

class PolylinesVisibilityControl {
    constructor(project) {

        this._project = project;

        this._controlUi = document.createElement('div');
        this._controlUi.style.userSelect = 'none';
        this._controlUi.style.margin = '1px 10px';
        this._controlUi.style.userSelect = 'none';
        this._controlUi.style.color = 'rgba(0,0,0,1)';
        this._controlUi.style.backgroundColor = 'rgb(255,255,255)';
        this._controlUi.style.boxShadow = '0 1px 4px -1px rgba(0,0,0,.3)';
        this._controlUi.style.fontFamily = 'Roboto,Arial,sans-serif';
        this._controlUi.style.fontSize = '16px';
        this._controlUi.style.padding = '10px';
        this._controlUi.style.width = '110px';
        this._controlUi.title = 'Check to toggle polylines visibility';

        const label = document.createElement('label');
        label.htmlFor = 'polylines-visibility';
        label.style.cursor = 'pointer';

        this._checkbox = document.createElement('input');
        this._checkbox.type = 'checkbox';
        this._checkbox.checked = true;
        this._checkbox.id = 'polylines-visibility';
        this._checkbox.style.marginRight = '10px';

        label.appendChild(this._checkbox);
        label.lastChild.after('Polylines');
        this._controlUi.appendChild(label);

        this.onCheckboxChanged = this.onCheckboxChanged.bind(this);
        this._checkbox.addEventListener('change', this.onCheckboxChanged);
    }

    get controlUi() {
        return this._controlUi;
    }

    get checkbox() {
        return this._checkbox;
    }

    onCheckboxChanged() {
        if (this._checkbox.checked) {
            this.setAllVisible();
            this._project.polylineControl.show();
        } else {
            this.setAllHidden();
        }
    }

    setAllVisible() {
        this._project.setPolylinesVisible(true);
        this._checkbox.checked = true;
    }

    setAllHidden() {
        this._project.setPolylinesVisible(false);
        this._project.setPolylinesEditable(false);
        this._project.currentPolylineObj = undefined;
        this._checkbox.checked = false;
    }

}