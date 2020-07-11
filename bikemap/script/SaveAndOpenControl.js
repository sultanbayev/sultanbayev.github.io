class SaveAndOpenControl {
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
        this._controlUi.style.width = '210px';

        this._saveButton = document.createElement('button');
        this._saveButton.innerText = 'Save';
        this.onSaveButtonClicked = this.onSaveButtonClicked.bind(this);
        this._saveButton.addEventListener('click', this.onSaveButtonClicked);

        this._openInput = document.createElement('input');
        this._openInput.type = 'file';
        this._openInput.accept = "application/json";
        this._openInput.style.marginLeft = '10px';
        this._openInput.style.width = '150px';
        this.onOpenInputChangedClicked = this.onOpenInputChangedClicked.bind(this);
        this._openInput.addEventListener('change', this.onOpenInputChangedClicked);

        this._controlUi.appendChild(this._saveButton);
        this._controlUi.appendChild(this._openInput);
    }

    get controlUi() {
        return this._controlUi;
    }

    onSaveButtonClicked() {
        const a = document.createElement("a");
        const file = new Blob([this._project.saveProject()], {
            type: 'application/json'
        });
        a.href = URL.createObjectURL(file);
        a.download = 'bikemap.json';
        a.click();
    }

    onOpenInputChangedClicked(event) {
        const input = event.target;
        const files = input.files;
        if (files.length !== 0) {
            if (confirm("Do you want to upload data?")) {
                const file = files[0];
                const fileReader = new FileReader();
                this.onFileReaderLoad = this.onFileReaderLoad.bind(this)
                fileReader.onload = this.onFileReaderLoad;
                fileReader.readAsText(file);
            }
        }
    }

    onFileReaderLoad(e) {
        const result = e.target.result;
        const json = JSON.parse(result);
        if (json.circles && json.polylines) {
            const circles = json.circles;
            const polylines = json.polylines;
            circles.forEach(element => {
                const options = element.options;
                options.center = element.center;
                options.radius = element.radius;
                options.draggable = false;
                options.editable = false;
                options.clickable = true;
                options.map = this._project.map;
                const circleObj = this._project.createNewCircleObj(new google.maps.Circle(options), options);
                circleObj.setEditable(false);
            });
            polylines.forEach(element => {
                const options = element.options;
                options.path = element.path;
                options.draggable = false;
                options.editable = false;
                options.clickable = true;
                options.map = this._project.map;
                const polylineObj = this._project.createNewPolylineObj(new google.maps.Polyline(options), options);

                const segments = element.polylineSegments;
                segments.forEach(segment => {
                    const segmentOptions = segment.options;
                    segmentOptions.map = this._project.map;
                    segmentOptions.path = segment.path;
                    const segmentObj = {
                        segment: new google.maps.Polyline(segmentOptions),
                        info: segment.info,
                        color: segment.color
                    };
                    polylineObj.createSegmentInfo();
                    polylineObj.createSegmentInfoListener(segmentObj);
                    polylineObj.setEditable(false);
                    polylineObj.polylineSegmentsObjs.push(segmentObj);
                });
            });
        }
    }

}