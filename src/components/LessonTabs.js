import React from 'react'
import {Link} from 'react-router-dom'
import '../assets/moduleList.css'
import CourseService from "../services/CourseService";

class LessonTabs extends React.Component {
    constructor(props) {
        super(props);
        this.courseService = new CourseService();

        this.state = {
            lessons: this.props.lessons
        };

        // this.titleChanged = this.titleChanged.bind(this);
    }

    titleChanged = (event) => {
        this.setState(
            {
                module: {title: event.target.value}
            });
    };

    createLesson = () => {
        console.log("in create!");

        this.setState(
            {
                lessons: [
                    ...this.state.lessons,
                    {
                        title: 'New Lesson',
                        id: (new Date()).getTime(),
                        topics: [
                            {
                                "id": 1,
                                "title": "topic1"
                            }
                        ]
                    }
                ]
            }
        );

        console.log(this.state.lessons);

    };

    render() {
        return (
            <ul className="nav nav-tabs nav-justified">
                {
                    this.state.lessons.map(lesson =>

                        <li onClick={() => this.props.selectLesson(lesson)}
                            className={['nav-item nav-link', lesson.id == this.props.selectedLessonId ? 'active' : ''].join(" ")}
                            key={lesson.id}
                            style={{borderBottom: "1px solid #d3d3d3"}}>
                            <div className="row">
                                <div className="col-6">{lesson.title}</div>
                                <div className="col-6">
                                    <Link className="btn btn-warning" to={``}>
                                        <i className="fas fa-pencil-alt"></i>
                                    </Link>
                                    <span>       </span>
                                    <button className="btn btn-danger" onClick={() => this.props.deleteLesson(lesson.id)}>
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                        </li>
                    )
                }
                <li className="list-group-item">
                    <div className={"row"}>
                        <div className={"col-8"}>
                            <input
                                onChange={this.titleChanged}
                                className="form-control"/>
                        </div>
                        <div className={"col-4"}>
                            <div
                                onClick={this.createLesson}
                                className="btn btn-primary btn-block"><i className="fas fa-plus">
                            </i>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        )
    }
};

export default LessonTabs;