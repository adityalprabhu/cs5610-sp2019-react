import React from 'react'
import ModuleListItem from "./ModuleListItem";
import CourseService from "../services/CourseService";
import '../assets/moduleList.css'
import ModuleService from "../services/ModuleService";

class ModuleList extends React.Component {
    constructor(props) {
        super(props);

        this.courseService = CourseService.getInstance();
        this.moduleService = ModuleService.getInstance();
        this.state = {
            modules: this.props.modules,
            disableEditTitle: true
        };

        this.titleChanged = this.titleChanged.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
        this.createModule = this.createModule.bind(this);
    }

    createModule = () => {

        var self = this;
        this.moduleService
            .createModule(this.props.course.id)
            .then(function(updated_modules){
                self.setState({
                    modules: updated_modules
                })
            })
    };



    deleteModule = (e, moduleId) => {
        e.stopPropagation();

        if(this.state.modules.length == 1){
            alert("Can't delete for now as only one module left!")
        }else {
            var self = this;
            this.moduleService
                .deleteModule(moduleId, this.state.modules)
                .then(function(newModules){
                    self.setState({
                        modules: newModules,
                        id: self.props.course.id,
                        title: self.props.course.title,
                        modules: newModules
                    })
                });

            this.props.resetAllOnDelete();

            // this.setState({
            //     modules: this.state.modules.filter(
            //         module => module.id !== moduleId
            //     )
            // }, () => {
            //     this.courseService.updateCourse(
            //         {
            //             id: this.props.course.id,
            //             title: this.props.course.title,
            //             modules: this.state.modules
            //         });
            //
            //     this.props.resetAllOnDelete();
            //
            //     // var course = this.courseService.findCourseById(this.props.course.id)
            //     // console.log(course);
            // });
        }
    };



    titleChanged = (event) => {

        console.log("in title change !")


        var changedModuleIndex = this.state.modules.findIndex(x => x.id == this.props.selectedModuleId);
        var allModules = this.state.modules;
        allModules[changedModuleIndex].title = event.target.value ;

        this.setState(
            {
                modules: allModules
            });
    };

    editTitle = () => {
        this.state.disableEditTitle = false;
    };

    editModule = () => {
        var self = this;
        console.log(document.getElementById("newTitle").value)
        this.moduleService
            .editModule(
                this.props.selectedModuleId,
                { title: document.getElementById("newTitle").value})
            .then(function(editedModule){
                console.log(editedModule);
                self.setState({
                    disableEditTitle : true
                })
                document.getElementById("newTitle").value = ""
            });
    };

    render() {
        return(
            <div style={{marginTop: '10px'}} className="modules">
                <ul className="list-group">
                    <li className="list-group-item">
                        <div className={"row"}>
                            <div className={"col-8"}>
                                <input
                                    onChange={this.titleChanged}
                                    className="form-control"
                                    disabled={this.state.disableEditTitle}
                                    id={"newTitle"}/>
                            </div>
                            <div className={"col-4"} hidden={this.state.disableEditTitle}>
                                <button
                                    onClick={this.editModule}
                                    className="btn btn-success btn-block"><i className="fas fa-check"></i></button>
                            </div>
                            <div className={"col-4"} hidden={!this.state.disableEditTitle}>
                                <button
                                    onClick={this.createModule}
                                    className="btn btn-primary btn-block"><i className="fas fa-plus"></i></button>
                            </div>
                        </div>
                    </li>
                    {
                        this.state.modules.map(
                            (module) => {
                                return (
                                    <ModuleListItem
                                        selectModule={this.props.selectModule}
                                        deleteModule={this.deleteModule}
                                        editTitle={this.editTitle}
                                        selectedModuleId={this.props.selectedModuleId}
                                        key={module.id}
                                        module={module}/>
                                )
                            }
                        )
                    }
                </ul>
            </div>
        )
    }
}
export default ModuleList;