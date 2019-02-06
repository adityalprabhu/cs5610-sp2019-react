import React from 'react'

const ParagraphWidget = ({widget, updateWidget}) =>
    <div>

        <textarea id="listItems"
                  value={widget.text}
                  onChange={event => {
                      widget.text = event.target.value
                      updateWidget(widget)
                  }}
                  className="form-control"
                  placeholder="Enter text"
                  aria-label="List text" />

        <input
            value={widget.title}
            className="form-control"
            onChange={event => {
                widget.title = event.target.value
            }}
            style={{marginTop: '10px'}}/>

        <h3>Preview</h3>
        <p>{widget.text}</p>
    </div>;

export default ParagraphWidget;