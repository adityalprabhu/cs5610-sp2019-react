import React from 'react'
import '../assets/moduleList.css'

export default class WidgetList
    extends React.Component {
    render() {
        return(
            <div style={{marginTop: '5%'}}>
                <div>
                    <div className="row widget-action-bar">
                        <div className="col-sm-6" />
                        <div className="col-sm-6 content">
                            <span>
                                <button className="btn btn-danger save-btn">Save</button>
                            </span>
                            <span>
                                <button className="btn btn-success save-btn">Add Widget</button>
                            </span>
                            <span className="float-right">Preview</span>
                            <span className="float-right">
                                <label className="switch">
                                    <input type="checkbox"/>
                                    <span className="slider round"></span>
                                </label>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="card" id="headingWidget" name="dynamicWidget">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-7">
                                <h5 className="card-title">Heading Widget</h5>
                            </div>
                            <div className="row col-sm-5">
                                <div className="col-sm-2 text-center" style={{padding: '1px'}}>
                                    <button className="icon">
                                        <i className="fas fa-arrow-up" />
                                    </button>
                                </div>
                                <div className="col-sm-2 text-center" style={{padding: '1px'}}>
                                    <button className="icon">
                                        <i className="fas fa-arrow-down" />
                                    </button>
                                </div>
                                <div className="col-sm-6">
                                    <select className="form-control" id="widgetType" required="required" style={{width: '100%'}}>
                                        <option value="heading">Heading</option>
                                        <option value="list">List</option>
                                        <option value="paragraph">Paragraph</option>
                                        <option value="image">Image</option>
                                        <option value="link">Link</option>
                                    </select>
                                </div>
                                <div className="col-sm-2 text-center" style={{padding: '1px'}}>
                                    <button className="icon-danger">
                                        <i className="fas fa-times" style={{color: 'white'}} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="input-group flex-nowrap" style={{marginTop: '2%'}}>
                                <label htmlFor="headingText" className="col-sm-3 col-form-label">
                                    Heading Text</label> <input id="headingText" type="text" className="form-control" placeholder="Heading text" aria-label="Heading text" aria-describedby="addon-wrapping" />
                            </div>
                            <div className="input-group flex-nowrap" style={{marginTop: '2%'}}>
                                <label htmlFor="headingSize" className="col-sm-3 col-form-label">
                                    Heading Size </label> <select className="form-control" id="headingSize" required="required" style={{width: '100%'}}>
                                <option value="heading1">Heading 1</option>
                                <option value="heading2">Heading 2</option>
                                <option value="heading3">Heading 3</option>
                                <option value="heading4">Heading 4</option>
                                <option value="heading5">Heading 5</option>
                                <option value="heading6">Heading 6</option>
                            </select>
                            </div>
                            <div className="input-group flex-nowrap" style={{marginTop: '2%'}}>
                                <label htmlFor="widgetName" className="col-sm-3 col-form-label">
                                    Widget Name </label> <input type="text" id="widgetName" className="form-control" placeholder="Widget Name" aria-label="Widget Name" aria-describedby="addon-wrapping" />
                            </div>
                            <div className="flex-nowrap" style={{marginTop: '2%'}}>
                                <h5>Preview</h5>
                                <h1>Heading text</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card" id="listWidget" name="dynamicWidget">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-7">
                                <h5 className="card-title">List Widget</h5>
                            </div>
                            <div className="row col-sm-5">
                                <div className="col-sm-2 text-center" style={{padding: '1px'}}>
                                    <button className="icon">
                                        <i className="fas fa-arrow-up" />
                                    </button>
                                </div>
                                <div className="col-sm-2 text-center" style={{padding: '1px'}}>
                                    <button className="icon">
                                        <i className="fas fa-arrow-down" />
                                    </button>
                                </div>
                                <div className="col-sm-6">
                                    <select className="form-control" id="widgetType" required="required" style={{width: '100%'}}>
                                        <option value="heading">Heading</option>
                                        <option value="list">List</option>
                                        <option value="paragraph">Paragraph</option>
                                        <option value="image">Image</option>
                                        <option value="link">Link</option>
                                    </select>
                                </div>
                                <div className="col-sm-2 text-center" style={{padding: '1px'}}>
                                    <button className="icon-danger">
                                        <i className="fas fa-times" style={{color: 'white'}} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="input-group flex-nowrap" style={{marginTop: '2%'}}>
                                <label htmlFor="listItems" className="col-sm-3 col-form-label">
                                    List Items`</label>
                                <textarea id="listItems" className="form-control" placeholder="Put each item in a separate row" aria-label="List text" defaultValue={"Put each item in a separate row"} />
                            </div>
                            <div className="input-group flex-nowrap" style={{marginTop: '2%'}}>
                                <label htmlFor="listType" className="col-sm-3 col-form-label">
                                    List Type</label>
                                <select className="form-control" id="listType" required="required" style={{width: '100%'}}>
                                    <option value="ul">Unordered List</option>
                                    <option value="ol">Ordered List</option>
                                </select>
                            </div>
                            <div className="input-group flex-nowrap" style={{marginTop: '2%'}}>
                                <label htmlFor="widgetName" className="col-sm-3 col-form-label">
                                    Widget Name </label> <input type="text" id="widgetName" className="form-control" placeholder="Widget Name" aria-label="Widget Name" aria-describedby="addon-wrapping" />
                            </div>
                            <div className="flex-nowrap" style={{marginTop: '2%'}}>
                                <h5>Preview</h5>
                                <ul>
                                    <li>Put each</li>
                                    <li>item in</li>
                                    <li>a separate row</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card" id="paragraphWidget" name="dynamicWidget">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-7">
                                <h5 className="card-title">Paragraph Widget</h5>
                            </div>
                            <div className="row col-sm-5">
                                <div className="col-sm-2 text-center" style={{padding: '1px'}}>
                                    <button className="icon">
                                        <i className="fas fa-arrow-up" />
                                    </button>
                                </div>
                                <div className="col-sm-2 text-center" style={{padding: '1px'}}>
                                    <button className="icon">
                                        <i className="fas fa-arrow-down" />
                                    </button>
                                </div>
                                <div className="col-sm-6">
                                    <select className="form-control" id="widgetType" required="required" style={{width: '100%'}}>
                                        <option value="heading">Heading</option>
                                        <option value="list">List</option>
                                        <option value="paragraph">Paragraph</option>
                                        <option value="image">Image</option>
                                        <option value="link">Link</option>
                                    </select>
                                </div>
                                <div className="col-sm-2 text-center" style={{padding: '1px'}}>
                                    <button className="icon-danger">
                                        <i className="fas fa-times" style={{color: 'white'}} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="input-group flex-nowrap" style={{marginTop: '2%'}}>
                                <label htmlFor="paragraphText" className="col-sm-3 col-form-label">
                                    Paragraph Text</label>
                                <textarea id="paragraphText" className="form-control" placeholder="Lorem Ipsum" aria-label="Paragraph text" defaultValue={""} />
                            </div>
                            <div className="input-group flex-nowrap" style={{marginTop: '2%'}}>
                                <label htmlFor="widgetName" className="col-sm-3 col-form-label">
                                    Widget Name </label> <input type="text" id="widgetName" className="form-control" placeholder="Widget Name" aria-label="Widget Name" aria-describedby="addon-wrapping" />
                            </div>
                            <div className="flex-nowrap" style={{marginTop: '2%'}}>
                                <h5>Preview</h5>
                                <p>Lorem Ipsum</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card" id="imageWidget" name="dynamicWidget">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-7">
                                <h5 className="card-title">Image Widget</h5>
                            </div>
                            <div className="row col-sm-5">
                                <div className="col-sm-2 text-center" style={{padding: '1px'}}>
                                    <button className="icon">
                                        <i className="fas fa-arrow-up" />
                                    </button>
                                </div>
                                <div className="col-sm-2 text-center" style={{padding: '1px'}}>
                                    <button className="icon">
                                        <i className="fas fa-arrow-down" />
                                    </button>
                                </div>
                                <div className="col-sm-6">
                                    <select className="form-control" id="widgetType" required="required" style={{width: '100%'}}>
                                        <option value="heading">Heading</option>
                                        <option value="list">List</option>
                                        <option value="paragraph">Paragraph</option>
                                        <option value="image">Image</option>
                                        <option value="link">Link</option>
                                    </select>
                                </div>
                                <div className="col-sm-2 text-center" style={{padding: '1px'}}>
                                    <button className="icon-danger">
                                        <i className="fas fa-times" style={{color: 'white'}} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="input-group flex-nowrap" style={{marginTop: '2%'}}>
                                <label htmlFor="imageURL" className="col-sm-3 col-form-label">
                                    Image URL</label>
                                <input className="form-control" id="imageURL" placeholder="http://lorempixel.com/300/150/" defaultValue="http://lorempixel.com/300/150/" aria-label="Image URL" />
                            </div>
                            <div className="input-group flex-nowrap" style={{marginTop: '2%'}}>
                                <label htmlFor="widgetName" className="col-sm-3 col-form-label">
                                    Widget Name </label> <input type="text" className="form-control" id="widgetName" placeholder="Widget Name" aria-label="Widget Name" aria-describedby="addon-wrapping" />
                            </div>
                            <div className="flex-nowrap" style={{marginTop: '2%'}}>
                                <h5>Preview</h5>
                                <img src="http://lorempixel.com/300/150/" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card" id="linkWidget" name="dynamicWidget">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-7">
                                <h5 className="card-title">Link Widget</h5>
                            </div>
                            <div className="row col-sm-5">
                                <div className="col-sm-2 text-center" style={{padding: '1px'}}>
                                    <button className="icon">
                                        <i className="fas fa-arrow-up" />
                                    </button>
                                </div>
                                <div className="col-sm-2 text-center" style={{padding: '1px'}}>
                                    <button className="icon">
                                        <i className="fas fa-arrow-down" />
                                    </button>
                                </div>
                                <div className="col-sm-6">
                                    <select className="form-control" id="widgetType" required="required" style={{width: '100%'}}>
                                        <option value="heading">Heading</option>
                                        <option value="list">List</option>
                                        <option value="paragraph">Paragraph</option>
                                        <option value="image">Image</option>
                                        <option value="link">Link</option>
                                    </select>
                                </div>
                                <div className="col-sm-2 text-center" style={{padding: '1px'}}>
                                    <button className="icon-danger">
                                        <i className="fas fa-times" style={{color: 'white'}} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="input-group flex-nowrap" style={{marginTop: '2%'}}>
                                <label htmlFor="linkURL" className="col-sm-3 col-form-label">
                                    Link URL</label>
                                <input className="form-control" id="linkURL" placeholder="Enter link URL here/" defaultValue="https://www.youtube.com/user/jannunzi" aria-label="Link URL" />
                            </div>
                            <div className="input-group flex-nowrap" style={{marginTop: '2%'}}>
                                <label htmlFor="linkText" className="col-sm-3 col-form-label">
                                    Link Text</label>
                                <input type="text" className="form-control" id="linkText" placeholder="Link Text" aria-label="Link text" aria-describedby="addon-wrapping" />
                            </div>
                            <div className="input-group flex-nowrap" style={{marginTop: '2%'}}>
                                <label htmlFor="linkDesc" className="col-sm-3 col-form-label">
                                    Link Description</label>
                                <input type="text" className="form-control" id="linkDesc" placeholder="Link Description" aria-label="Link description" aria-describedby="addon-wrapping" defaultValue="This is a link to a youtube channel" />
                            </div>
                            <div className="input-group flex-nowrap" style={{marginTop: '2%'}}>
                                <label htmlFor="widgetName" className="col-sm-3 col-form-label">
                                    Widget Name </label> <input type="text" className="form-control" placeholder="Widget Name" aria-label="Widget Name" aria-describedby="addon-wrapping" />
                            </div>
                            <div className="flex-nowrap" style={{marginTop: '2%'}}>
                                <h5>Preview</h5>
                                <a href="https://www.youtube.com/user/jannunzi">Link Text</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};