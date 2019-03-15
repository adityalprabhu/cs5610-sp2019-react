import React from 'react'

const ImageWidget = ({widget, updateWidget}) =>
    <div>
        <div className={"non-preview-container"}>

            <div className="input-group flex-nowrap">
                <label htmlFor="imageSrc" className="col-sm-3 col-form-label">Image URL</label>
                <input
                    id={"imageSrc"}
                    value={widget.url}
                    onChange={event => {
                        widget.url = event.target.value
                        updateWidget(widget)
                    }}
                    className="form-control"
                    style={{marginTop: '10px'}}
                    alt={"imageTitle"}
                    placeholder={"Image URL"}/>
            </div>

            <div className="input-group flex-nowrap">
                <label htmlFor="widgetName" className="col-sm-3 col-form-label">Widget Name</label>
                <input
                    id={"widgetName"}
                    value={widget.title}
                    className="form-control"
                    onChange={event => {
                        widget.title = event.target.value
                    }}
                    style={{marginTop: '10px'}}/>
            </div>

            <h6 style={{marginTop: '10px'}}>Preview</h6>
        </div>
        <img src={widget.url}></img>
    </div>;

export default ImageWidget