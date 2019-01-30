import React from 'react'
import {Link} from 'react-router-dom'
import '../assets/moduleList.css'
import CourseService from "../services/CourseService";

class LessonTabs extends React.Component {
    constructor(props) {
        super(props);
        this.courseService = new CourseService();

        console.log(this.props.lessons)
        this.state = {
            lessons: this.props.lessons,
            disableEditTitle: true
        };



        // this.titleChanged = this.titleChanged.bind(this);
        // this.editLesson = this.editLesson.bind(this);

        // this.fetchTrans = this.fetchTrans().bind(this);
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
                        "title": 'New Lesson',
                        "id": (new Date()).getTime(),
                        "topics": [
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

    deleteLesson = (lessonId) => {

        var currLessons = this.state.lessons;

        this.setState({
            lessons: currLessons.filter(
                lesson => lesson.id !== lessonId
            )
        });
    };


    editLesson = () => {
        console.log("in edit lesson");
        this.state.disableEditTitle = false;
    };



    componentDidUpdate(prevProps) {
        if (prevProps.lessons[0].id !== this.props.lessons[0].id) {

            this.setState(
                {
                    lessons: this.props.lessons
                });
        }


    }


    render() {
        return (
            <ul className="nav nav-tabs nav-justified" style={{marginTop: "10px"}}>
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
                                    <button className="btn btn-danger" onClick={() => this.deleteLesson(lesson.id)}>
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