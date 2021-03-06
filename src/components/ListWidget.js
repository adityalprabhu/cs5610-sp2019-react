import React from 'react'
let listItems = []

const ListWidget = ({widget, updateWidget}) => {
    console.log("hmmmmmmmmmm")
    console.log(listItems)
    if(listItems.length == 0){
        console.log("SDsdsdsdsdsdsdsdsdsdsdsd")
        listItems = widget.ltext.split(/\n/);
        updateWidget(widget)
    }
    return(<div>
        <div className={"non-preview-container"}>

            <div className="input-group flex-nowrap">
                <label htmlFor="listItems" className="col-sm-3 col-form-label">List Items</label>
                <textarea id="listItems"
                          value={widget.ltext}
                          onChange={event => {
                              widget.ltext = event.target.value;
                              listItems = widget.ltext.split(/\n/);
                              updateWidget(widget)
                          }}
                          className="form-control"
                          placeholder="Enter text"
                          aria-label="List text"
                          style={{marginTop: '10px'}}/>
            </div>

            <div className="input-group flex-nowrap">
                <label htmlFor="listType" className="col-sm-3 col-form-label">List Type</label>
                <select
                    id={"listType"}
                    onChange={event => {
                        widget.listType = parseInt(event.target.value);
                        listItems = widget.ltext.split(/\n/);
                        updateWidget(widget)
                    }}
                    value={widget.listType}
                    className="form-control"
                    style={{marginTop: '10px'}}>
                    <option value="-1">Select List Type</option>
                    <option value="0">Unordered List</option>
                    <option value="1">Ordered List</option>
                </select>
            </div>

            <div className="input-group flex-nowrap">
                <label htmlFor="widgetName" className="col-sm-3 col-form-label">Widget Name</label>
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
            widget.listType === 0 &&
            <ul>
                {
                    listItems.map((item, index) =>
                        <li key={index + (new Date()).getTime()}>{item}</li>)
                }
            </ul> ||
            widget.listType === 1 &&
            <ol>
                {
                    listItems.map((item, index) =>
                        <li key={index + (new Date()).getTime()}>{item}</li>)
                }
            </ol>
        }
    </div>)
};


export default ListWidget;