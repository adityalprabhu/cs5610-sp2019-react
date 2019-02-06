import React from 'react'

const ImageWidget = ({widget, updateWidget}) =>
    <div>

        <input
            value={widget.src}
            onChange={event => {
                widget.src = event.target.value
                updateWidget(widget)
            }}
            className="form-control"
            style={{marginTop: '10px'}}/>

        <input
            value={widget.title}
            className="form-control"
            onChange={event => {
                widget.title = event.target.value
            }}
            style={{marginTop: '10px'}}/>

        <h3>Preview</h3>
        <img src={widget.src}></img>
    </div>;

export default ImageWidget