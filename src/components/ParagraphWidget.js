import React from 'react'

const ParagraphWidget = ({widget, updateWidget}) =>
    <div>
        <div className={"non-preview-container"}>

            <div className="input-group flex-nowrap">
                <label htmlFor="paragraphText" className="col-sm-3 col-form-label">Paragraph Text</label>
                <textarea id="paragraphText"
                          value={widget.ptext}
                          onChange={event => {
                              widget.ptext = event.target.value;
                              updateWidget(widget)
                          }}
                          className="form-control"
                          placeholder="Paragraph text"
                          aria-label="List text"
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
        <p>{widget.ptext}</p>
    </div>;

export default ParagraphWidget;