
import React from 'react'
import {Link} from 'react-router-dom'
import CourseService from "../services/CourseService";


// const TopicPills = ({topics, deleteTopic, selectTopic, selectedTopicId}) =>

class TopicPills extends React.Component {
    constructor(props) {
        super(props);
        this.courseService = new CourseService();

        this.state = {
            topics: this.props.topics,
            topic: this.props.topics[0],
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
            }
        );

        console.log(this.props.topics);

    };

    deleteTopic = (topicId) => {
        console.log(topicId);
        this.setState({
            topics: this.state.topics.filter(
                topic => topic.id !== topicId
            ),
            topicDeleted:true
        });
    };

    editTopic = () => {
        console.log("in edit topic");
        this.state.disableEditTitle = false;
    };

    componentDidUpdate(prevProps) {

    if(!this.state.topicDeleted) {


        if (prevProps.topics[0].id !== this.props.topics[0].id) {

            this.setState(
                {
                    topics: this.props.topics
                });
        }
    }



    }

    render() {
        return (

            <ul className="nav nav-pills" style={{marginTop: "15px"}}>
                {
                    this.state.topics.map(topic =>

                        <li onClick={() => this.props.selectTopic(topic)}
                            className={['nav-item nav-link', topic.id == this.props.selectedTopicId ? 'active' : ''].join(" ")}
                            key={topic.id} style={{border: "1px solid #d3d3d3", marginLeft: "5px"}}>
                            <div className="row">
                                <div className="col-5">{topic.title}</div>
                                <div className="col-7">
                                    <button className="btn btn-warning" onClick={this.editTopic}>
                                        <i className="fas fa-pencil-alt"></i>
                                    </button>
                                    <span>       </span>
                                    <button className="btn btn-danger" onClick={() => this.deleteTopic(topic.id)}>
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