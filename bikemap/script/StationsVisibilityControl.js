'use strict';

class StationsVisibilityControl {
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
        this._controlUi.title = 'Check to toggle stations visibility';

        const labelMetro = document.createElement('label');
        labelMetro.htmlFor = 'metro-visibility';
        labelMetro.style.cursor = 'pointer';
        this._checkboxMetro = document.createElement('input');
        this._checkboxMetro.type = 'checkbox';
        this._checkboxMetro.checked = true;
        this._checkboxMetro.id = 'metro-visibility';
        this._checkboxMetro.style.marginRight = '10px';
        labelMetro.appendChild(this._checkboxMetro);
        labelMetro.lastChild.after('Metro stations');
        this._controlUi.appendChild(labelMetro);
        this.onMetroCheckboxChanged = this.onMetroCheckboxChanged.bind(this);
        this._checkboxMetro.addEventListener('change', this.onMetroCheckboxChanged);

        const labelBikeshare = document.createElement('label');
        labelBikeshare.htmlFor = 'metro-visibility';
        labelBikeshare.style.cursor = 'pointer';
        this._checkboxBikeshare = document.createElement('input');
        this._checkboxBikeshare.type = 'checkbox';
        this._checkboxBikeshare.checked = true;
        this._checkboxBikeshare.id = 'metro-visibility';
        this._checkboxBikeshare.style.marginRight = '10px';
        labelBikeshare.appendChild(this._checkboxBikeshare);
        labelBikeshare.lastChild.after('Bikeshare stations');
        this._controlUi.appendChild(labelBikeshare);
        this.onBikeshareCheckboxChanged = this.onBikeshareCheckboxChanged.bind(this);
        this._checkboxBikeshare.addEventListener('change', this.onBikeshareCheckboxChanged);
    }

    get controlUi() {
        return this._controlUi;
    }

    onMetroCheckboxChanged() {
        if (this._checkboxMetro.checked) {
            this.setMetroStationsVisible();
        } else {
            this.setMetroStationsHidden();
        }
    }

    setMetroStationsVisible() {
        this._project.setMetroStationsVisible(true);
        this._checkboxMetro.checked = true;
    }

    setMetroStationsHidden() {
        this._project.setMetroStationsVisible(false);
        this._checkboxMetro.checked = false;
    }

    onBikeshareCheckboxChanged() {
        if (this._checkboxBikeshare.checked) {
            this.setBikeshareStationsVisible();
        } else {
            this.setBikeshareStationsHidden();
        }
    }

    setBikeshareStationsVisible() {
        this._project.setBikeshareStationsVisible(true);
        this._checkboxBikeshare.checked = true;
    }

    setBikeshareStationsHidden() {
        this._project.setBikeshareStationsVisible(false);
        this._checkboxBikeshare.checked = false;
    }

}