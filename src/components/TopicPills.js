
import React from 'react'
import {Link} from 'react-router-dom'
import CourseService from "../services/CourseService";
import TopicService from "../services/TopicService";

class TopicPills extends React.Component {
    constructor(props) {
        super(props);
        this.courseService = CourseService.getInstance();
        this.topicService = TopicService.getInstance();

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
        var self = this;
        this.topicService
            .createTopic(this.props.course.id, this.props.module.id, this.props.lesson.id)
            .then(function (updated_topics) {
                self.setState({
                    topics: updated_topics
                })
            });
    };

    deleteTopic = (e, topicId) => {
        e.stopPropagation();

        if(this.state.topics.length == 1){
            alert("Can't delete for now as only one topic left!")
        }else {

            var self = this;
            this.topicService
                .deleteTopic(topicId, this.state.topics)
                .then(function(updatedTopics){
                    self.setState({
                        topics: updatedTopics
                    })
                });

            this.props.resetAllTopicsOnDelete();
        }
    };


    editTitle = () => {
        this.state.disableEditTitle = false;
    };

    editTopic = () => {
        var self = this;
        console.log(document.getElementById("topicTitle").value)
        this.topicService
            .editTopic(
                this.props.selectedTopicId,
                { title: document.getElementById("topicTitle").value})
            .then(function(editedTopic){
                console.log(editedTopic);
                self.setState({
                    disableEditTitle : true
                });
                document.getElementById("topicTitle").value = ""
            });
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
                                    <button className="btn btn-warning" onClick={this.editTitle}>
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
                                disabled={this.state.disableEditTitle}
                                id={"topicTitle"}/>
                        </div>
                        <div className={"col-4"} hidden={this.state.disableEditTitle}>
                            <button
                                onClick={this.editTopic}
                                className="btn btn-success btn-block"><i className="fas fa-check"></i></button>
                        </div>
                        <div className={"col-4"} hidden={!this.state.disableEditTitle}>
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