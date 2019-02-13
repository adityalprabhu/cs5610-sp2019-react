import React from 'react'
import {Link} from 'react-router-dom'
import '../assets/moduleList.css'
import CourseService from "../services/CourseService";
import LessonService from "../services/LessonService";

class LessonTabs extends React.Component {
    constructor(props) {
        super(props);
        this.courseService = CourseService.getInstance();
        this.lessonService = LessonService.getInstance();

        this.state = {
            lessons: this.props.module.lessons,
            disableEditTitle: true
        };

        this.titleChanged = this.titleChanged.bind(this);
        this.editLesson = this.editLesson.bind(this);
    }

    createLesson = () => {

        var self = this;
        this.lessonService
            .createLesson(this.props.course.id, this.props.module.id)
            .then(function(updated_lessons){
                self.setState({
                    lessons: updated_lessons
                })
            })
    };

    deleteLesson = (e, lessonId) => {
        e.stopPropagation();

        if(this.state.lessons.length == 1){
            alert("Can't delete for now as only one lesson left!")
        }else {

            var self = this;
            this.lessonService
                .deleteLesson(lessonId, this.state.lessons)
                .then(function(newLessons){
                    self.setState({
                        lessons: newLessons
                    })
                });

            this.props.resetAllLessonsOnDelete();
        }
    };


    titleChanged = (event) => {

        var changedLessonIndex = this.state.lessons.findIndex(x => x.id == this.props.selectedLessonId);
        var allLessons = this.state.lessons;
        allLessons[changedLessonIndex].title = event.target.value ;

        this.setState(
            {
                lessons: allLessons
            });
    };


    editTitle = () => {
        this.state.disableEditTitle = false;
    };

    editLesson = () => {
        var self = this;
        console.log(document.getElementById("lessonTitle").value)
        this.lessonService
            .editLesson(
                this.props.selectedLessonId,
                { title: document.getElementById("lessonTitle").value})
            .then(function(editedLesson){
                console.log(editedLesson);
                self.setState({
                    disableEditTitle : true
                });
                document.getElementById("lessonTitle").value = ""
            });
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
                                    <button className="btn btn-warning" onClick={this.editTitle}>
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
                                disabled={this.state.disableEditTitle}
                                id={"lessonTitle"}/>
                        </div>
                        <div className={"col-4"} hidden={this.state.disableEditTitle}>
                            <button
                                onClick={this.editLesson}
                                className="btn btn-success btn-block"><i className="fas fa-check"></i></button>
                        </div>
                        <div className={"col-4"} hidden={!this.state.disableEditTitle}>
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