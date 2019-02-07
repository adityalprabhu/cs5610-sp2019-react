import React from 'react'

const HeadingWidget = ({widget, updateWidget}) =>
    <div>
        <div className={"non-preview-container"}>
            <div className="input-group flex-nowrap">
                <label htmlFor="headingText" className="col-sm-3 col-form-label">
                    Heading Text</label>
                <input
                    id={'headingText'}
                    value={widget.text}
                    onChange={event => {
                        widget.text = event.target.value
                        updateWidget(widget)
                    }}
                    className="form-control"
                    placeholder={"Heading text"}
                    style={{marginTop: '10px'}}/>
            </div>

            <div className="input-group flex-nowrap">
                <label htmlFor="headingSize" className="col-sm-3 col-form-label">
                    Heading Size </label>
                <select
                    id={"headingSize"}
                    onChange={event => {
                        widget.size = parseInt(event.target.value)
                        updateWidget(widget)
                    }}
                    value={widget.size}
                    className="form-control"
                    style={{marginTop: '10px'}}>
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                    <option value="4">Heading 4</option>
                    <option value="5">Heading 5</option>
                </select>
            </div>

            <div className="input-group flex-nowrap">
                <label htmlFor="widgetName" className="col-sm-3 col-form-label">
                    Widget Name</label>
                <input
                    id={"widgetName"}
                    value={widget.title}
                    className="form-control"
                    onChange={event => {
                        widget.title = event.target.value
                        updateWidget(widget)
                    }}
                    style={{marginTop: '10px'}}/>
            </div>

            <h6 style={{marginTop: '10px'}}>Preview</h6>
        </div>
        {
            widget.size === 1 && <h1>{widget.text}</h1> ||
            widget.size === 2 && <h2>{widget.text}</h2> ||
            widget.size === 3 && <h3>{widget.text}</h3> ||
            widget.size === 4 && <h4>{widget.text}</h4> ||
            widget.size === 5 && <h5>{widget.text}</h5>
        }
    </div>;

export default HeadingWidget