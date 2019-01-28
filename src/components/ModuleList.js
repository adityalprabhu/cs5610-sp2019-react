import React from 'react'
import ModuleListItem from "./ModuleListItem";
import CourseService from "../services/CourseService";

class ModuleList extends React.Component {
    constructor(props) {
        super(props);
        this.courseService = new CourseService();

        this.state = {
            modules: this.props.modules
        };

        // this.titleChanged = this.titleChanged.bind(this);
    }

    createModule = () => {

        this.setState(
            {
                modules: [
                    ...this.state.modules,
                    {
                        title: 'New Module',
                        id: (new Date()).getTime(),
                        lessons: [
                            {
                                "id": 1,
                                "title": "dummy"
                            }
                        ]
                    }
                ]
            }
        );



        this.courseService.updateCourse(
            {
                id: this.props.course.id,
                title: this.props.course.title,
                modules: [
                    ...this.state.modules,
                    {
                        title: 'New Module',
                        id: (new Date()).getTime(),
                        lessons: [
                            {
                                id: 1,
                                title: "dummy"
                            }
                        ]
                    }
                ]
            })
    };

    deleteModule = moduleId => {
        console.log(moduleId);

        this.setState({
            modules: this.state.modules.filter(
                module => module.id !== moduleId
            )
        });

        console.log(this.state.modules[0]);
        this.props.deleteModule(moduleId);

    };

    titleChanged = (event) => {
        this.setState(
            {
                module: {title: event.target.value}
            });
    };

    render() {
        return(
            <div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <input
                            onChange={this.titleChanged}
                            className="form-control"/>
                        <button
                            onClick={this.createModule}
                            className="btn btn-primary btn-block">Add Module</button>
                    </li>
                    {
                        this.state.modules.map(
                            (module) => {
                                return (
                                    <ModuleListItem
                                        selectModule={this.props.selectModule}
                                        deleteModule={this.deleteModule}
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