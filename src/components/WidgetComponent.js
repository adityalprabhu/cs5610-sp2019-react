import React from 'react'
import HeadingWidget from './HeadingWidget'
import ImageWidget from './ImageWidget'
import ParagraphWidget from "./ParagraphWidget";
import ListWidget from "./ListWidget";

const WidgetComponent = ({widget, deleteWidget, updateWidget, moveWidgetUp, moveWidgetDown, index, noOfWidgets}) =>
    <div className="card" id="headingWidget" name="dynamicWidget">
        <div className="card-body">
            {/*<button onClick={() => deleteWidget(widget)}>Delete</button>*/}
            <div className="row">
                <div className="col-sm-7">
                    <h5 className="card-title">{widget.type} Widget</h5>
                </div>
                <div className="row col-sm-5">
                    {
                        index !== 0 &&
                    <div className="col-sm-2 text-center" style={{padding: '1px'}}>
                        <button className="icon" onClick={() => moveWidgetUp(widget)}>
                            <i className="fas fa-arrow-up" />
                        </button>
                    </div>
                    }
                    {
                        index !== noOfWidgets-1 &&
                        <div className="col-sm-2 text-center" style={{padding: '1px'}}>
                            <button className="icon" onClick={() => moveWidgetDown(widget)}>
                                <i className="fas fa-arrow-down" />
                            </button>
                        </div>

                    } <div className="col-sm-6">
                        <select className="form-control" id="widgetType"
                                required="required" style={{width: '100%'}}
                                value={widget.type}
                                onChange={(event) => {
                                    widget.type = event.target.value;
                                    updateWidget(widget)
                                }}>
                            <option value="HEADING">Heading</option>
                            <option value="IMAGE">Image</option>
                            <option value="LIST">List</option>
                            <option value="PARAGRAPH">Paragraph</option>
                            <option value="LINK">Link</option>
                        </select>
                    </div>
                    <div className="col-sm-2 text-center" style={{padding: '1px'}}>
                        <button className="icon-danger" onClick={() => deleteWidget(widget)}>
                            <i className="fas fa-times" style={{color: 'white'}} />
                        </button>
                    </div>
                </div>
            </div>

            {/*<select id="widgetType" required="required"*/}
            {/*onChange={(event) => {*/}
            {/*widget.type = event.target.value;*/}
            {/*updateWidget(widget)*/}
            {/*}}*/}
            {/*className="form-control" value={widget.type}>*/}
            {/*<option value="HEADING">Heading</option>*/}
            {/*<option value="IMAGE">Image</option>*/}
            {/*</select>*/}
            {
                widget.type==='HEADING' &&
                <HeadingWidget
                    updateWidget={updateWidget}
                    widget={widget}/>
                ||
                widget.type==='IMAGE' &&
                <ImageWidget   widget={widget}
                               updateWidget={updateWidget}/>
                ||
                widget.type==='PARAGRAPH' &&
                <ParagraphWidget   widget={widget}
                               updateWidget={updateWidget}/>
                ||
                widget.type==='LIST' &&
                <ListWidget   widget={widget}
                              updateWidget={updateWidget}/>
            }
        </div>
    </div>;

export default WidgetComponent