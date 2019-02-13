
import React from 'react'
import {Link} from 'react-router-dom'
import CourseService from "../services/CourseService";

class TopicPills extends React.Component {
    constructor(props) {
        super(props);
        this.courseService = new CourseService();

        this.state = {
            topics: this.props.lesson.topics,
            topic: this.props.lesson.topics[0],
            disableEditTitle: true,
            topicDeleted: false
        };

        this.titleChanged = this.titleChanged.bind(this);
        this.editTopic = this.editTopic.bind(this);
    }

    titleChanged = (event) => {
        var changedTopicIndex = this.state.topics.findIndex(x => x.id == this.props.selectedTopicId);
        var allTopics = this.state.topics;
        allTopics[changedTopicIndex].title = event.target.value ;

        this.setState(
            {
                topics: allTopics
            });
    };

    createTopic = () => {
        console.log("in create topic!");

        this.setState(
            {
                topics: [
                    ...this.state.topics,
                    {
                        "id": (new Date()).getTime(),
                        "title": "New Topic"
                    }
                ]
            },() => {
                var newLesson = this.courseService.updateLesson(
                    this.props.course,
                    this.props.module,
                    {
                        id: this.props.lesson.id,
                        title: this.props.lesson.title,
                        topics: this.state.topics
                    });

                console.log(newLesson);
            }
        );

    };

    deleteTopic = (e, topicId) => {
        e.stopPropagation();

        if(this.state.topics.length == 0){
            alert("Can't delete for now as only one topic left!")
        }else {
            this.setState({
                topics: this.state.topics.filter(
                    topic => topic.id !== topicId
                )
            }, () => {
                let newLesson = this.courseService.updateLesson(
                    this.props.course,
                    this.props.module,
                    {
                        id: this.props.lesson.id,
                        title: this.props.lesson.title,
                        topics: this.state.topics
                    });

                console.log(newLesson);

                this.props.resetAllTopicsOnDelete();

            });
        }
    };

    editTopic = () => {
        console.log("in edit topic");
        this.state.disableEditTitle = false;
    };

    componentDidUpdate(prevProps) {


        if(prevProps.lesson.topics[0] != null) {
            if (prevProps.lesson.topics[0].id !== this.props.lesson.topics[0].id) {

                this.setState(
                    {
                        topics: this.props.lesson.topics
                    });
            }
        }


    }

    render() {
        return (

            <ul className="nav nav-pills" style={{marginTop: "15px"}}>
                {
                    (this.state.topics !=null) && this.state.topics.map(topic =>

                        <li onClick={() => this.props.selectTopic(topic)}
                            className={['nav-item nav-link', topic.id == this.props.selectedTopicId ? 'active' : ''].join(" ")}
                            key={topic.id} style={{border: "1px solid #d3d3d3"}}>
                            <div className="row">
                                <div className="col-5">{topic.title}</div>
                                <div className="col-7">
                                    <button className="btn btn-warning" onClick={this.editTopic}>
                                        <i className="fas fa-pencil-alt"></i>
                                    </button>
                                    <span>       </span>
                                    <button className="btn btn-danger" onClick={(e) => this.deleteTopic(e, topic.id)}>
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
                                onClick={this.createTopic}
                                className="btn btn-primary btn-block"><i className="fas fa-plus">
                            </i>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        )
    }
}


export default TopicPills;