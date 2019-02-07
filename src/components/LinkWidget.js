import React from 'react'

const LinkWidget = ({widget, updateWidget}) =>
    <div>
        <div className={"non-preview-container"}>

            <div className="input-group flex-nowrap">
                <label htmlFor="link" className="col-sm-3 col-form-label">Link URL</label>
                <input
                    id={"link"}
                    value={widget.src}
                    onChange={event => {
                        widget.src = event.target.value
                        updateWidget(widget)
                    }}
                    className="form-control"
                    style={{marginTop: '10px'}}
                    alt={"imageTitle"}
                    placeholder={"Link URL"}/>
            </div>

            <div className="input-group flex-nowrap">
                <label htmlFor="linkText" className="col-sm-3 col-form-label">
                    Link Text</label>
                <input
                    id={'linkText'}
                    value={widget.text}
                    onChange={event => {
                        widget.text = event.target.value
                        updateWidget(widget)
                    }}
                    className="form-control"
                    placeholder={"Link text"}
                    style={{marginTop: '10px'}}/>
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
        <a href={widget.src}>{widget.text}</a>
    </div>;

export default LinkWidget