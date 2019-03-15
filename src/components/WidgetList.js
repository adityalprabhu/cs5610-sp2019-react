
import React, {Component} from 'react'
import WidgetComponent from './WidgetComponent'
import '../assets/moduleList.css'

class WidgetList extends Component {

    constructor(props){
        super(props);
        console.log(this.props.widgets,this.props.topic, this.props.course, this.props.module, this.props.lesson)
        props.loadWidgets(props.widgets,props.topic, props.course, props.module, props.lesson)


        console.log(this.props.widgets)
        this.state =
            {
                widgets: this.props.widgets
            }
    }

    componentDidUpdate(prevProps, prevState){
        console.log(this.props.widgets)

        // this.props.loadWidgets(this.props.widgets, this.props.topic, this.props.course, this.props.module, this.props.lesson)


        if (prevProps.widgets != null && this.props.widgets != null){
            console.log(prevProps.widgets)
            this.props = prevProps
            console.log(this.props.widgets)
            // if(prevProps.widgets[0] != this.props.widgets[0]){
            //     this.props = prevProps
            // }
        }
        // console.log("helllloooooo")
        // // this.p rops.loadWidgets(this.props.widgets,this.props.topic, this.props.course, this.props.module, this.props.lesson)
        // console.log(this.props)
        // if(prevProps.widgets!= null && this.props.widgets != null
        // ) {
        //     console.log(this.props.widgets)
        //     console.log(prevProps.widgets)
        //     if (prevProps.widgets !== this.props.widgets) {
        //
        //
        //         console.log("again?")
        //         console.log(this.props.widgets)
        //         console.log(prevProps.widgets)
        //
        //     }
        // }
    }

    componentWillReceiveProps(newProps){
        // alert("in cwrp")
        let self = this;
        this.props.loadWidgets(this.props.widgets, this.props.topic, this.props.course, this.props.module, this.props.lesson)

        // try {
        //     newProps.then(res => {
        //         alert(res);
        //         self.props = res
        //
        //         console.log(self.props.widgets)
        //     })
        // }catch(e){
        //     self.props = newProps
        // }
    }

    togglePreview = (e) => {
        let widgetComponent = document.getElementById('widgetComponent')
        if(e.target.checked){
            widgetComponent.classList.add('hide')
        }else{
            widgetComponent.classList.remove('hide')
        }
    };

    render()
    {
        return (
            <div>
                <div style={{marginTop: '5%'}}>
                    <div>
                        <div className="row widget-action-bar">
                            <div className="col-sm-8" />
                            <div className="col-sm-4 content">
                             <span><button
                                 className="btn btn-primary"
                                 onClick={() => this.props.save(this.props.topic.id)}>
                                 Save
                             </button></span>
                                <span className="float-right">Preview</span>
                                <span className="float-right">
                                <label className="switch">
                                   <input type="checkbox" id={"previewBtn"} onChange={event => {
                                       this.togglePreview(event)
                                   }}/>
                                     <span className="slider round"></span>
                                 </label>
                             </span>
                            </div>
                        </div>
                    </div>
                </div>
                <h1>Widget List {this.props.widgets.length}</h1>
                <div className="list-group" id={"widgetComponent"}>
                    {
                        this.props.widgets && this.props.widgets.map((widget, index) =>
                            <WidgetComponent
                                key={widget.id}
                                updateWidget={this.props.updateWidget}
                                deleteWidget={this.props.deleteWidget}
                                widget={widget}
                                moveWidgetUp={this.props.moveWidgetUp}
                                moveWidgetDown={this.props.moveWidgetDown}
                                index={index}
                                noOfWidgets={this.props.widgets.length}/>
                        )
                    }
                    <button
                        onClick={() => this.props.addWidget(this.props.topic.id, this.props.course.id)}
                        className="btn btn-success"
                        style={{marginTop: "10px"}}>
                        Add Widget
                        <i className={"fas fa-plus"} style={{marginLeft: "5px"}}></i>
                    </button>
                </div>
            </div>
        )
    }
}

export default WidgetList;












