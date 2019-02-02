import React from 'react'
import {Link} from 'react-router-dom'
import '../assets/moduleList.css'
import CourseService from "../services/CourseService";

class LessonTabs extends React.Component {
    constructor(props) {
        super(props);
        this.courseService = new CourseService();

        this.state = {
            lessons: this.props.module.lessons,
            disableEditTitle: true
        };

        this.titleChanged = this.titleChanged.bind(this);
        this.editLesson = this.editLesson.bind(this);
    }

    titleChanged = (event) => {

        var changedLessonIndex = this.state.lessons.findIndex(x => x.id == this.props.selectedLessonId);
        var allLessons = this.state.lessons;
        allLessons[changedLessonIndex].title = event.target.value ;

        this.setState(
            {
                lessons: allLessons
            });
    };

    createLesson = () => {

        this.setState(
            {
                lessons: [
                    ...this.state.lessons,
                    {
                        "id": (new Date()).getTime(),
                        "title": "New Lesson",
                        "topics": [
                            {
                                "id": 1,
                                "title": "Topic 1"
                            }
                        ]
                    }
                ]
            },() => {
                var newModule = this.courseService.updateModule(
                    this.props.course,
                    {
                        id: this.props.module.id,
                        title: this.props.module.title,
                        lessons: this.state.lessons
                    });

                console.log(newModule);
            }
        );
    };

    deleteLesson = (e, lessonId) => {
        e.stopPropagation();

        if(this.state.lessons.length == 1){
            alert("Can't delete for now as only one lesson left!")
        }else {
            this.setState({
                lessons: this.state.lessons.filter(
                    lesson => lesson.id !== lessonId
                )
            }, () => {
                var newModule = this.courseService.updateModule(
                    this.props.course,
                    {
                        id: this.props.module.id,
                        title: this.props.module.title,
                        lessons: this.state.lessons
                    });

                this.props.resetAllLessonsOnDelete();

                // var course = this.courseService.findCourseById(this.props.course.id)
                console.log(newModule);
            });
        }
    };



    editLesson = () => {
        console.log("in edit lesson");
        this.state.disableEditTitle = false;
    };



    componentDidUpdate(prevProps) {
        if (prevProps.module.lessons[0].id !== this.props.module.lessons[0].id) {

            this.setState(
                {
                    lessons: this.props.module.lessons
                });
        }
    }


    render() {
        return (
            <ul className="nav nav-tabs nav-justified" style={{marginTop: '10px'}}>
                {
                    this.state.lessons.map(lesson =>

                        <li onClick={() => this.props.selectLesson(lesson)}
                            className={['nav-item nav-link', lesson.id == this.props.selectedLessonId ? 'active' : ''].join(" ")}
                            key={lesson.id}
                            style={{borderBottom: "1px solid #d3d3d3"}}>
                            <div className="row">
                                <div className="col-6">{lesson.title}</div>
                                <div className="col-6">
                                    <button className="btn btn-warning" onClick={this.editLesson}>
                                        <i className="fas fa-pencil-alt"></i>
                                    </button>
                                    <span>       </span>
                                    <button className="btn btn-danger" onClick={(e) => this.deleteLesson(e, lesson.id)}>
                                        <i className="fas fa-trash"></i>
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
                                className="form-control"
                                disabled={this.state.disableEditTitle}/>
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