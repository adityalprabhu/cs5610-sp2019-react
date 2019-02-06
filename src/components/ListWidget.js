import React from 'react'

const ListWidget = ({widget, updateWidget}) =>
    <div>

        <textarea id="listItems"
                  value={widget.text}
                  onChange={event => {
                      widget.text = event.target.value;
                      widget.listItems = widget.text.split(/\n/);
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
        <ul>
            {
                widget.listItems.map(item =>
                <li>{item}</li>)
        }
        </ul>
    </div>;

export default ListWidget;