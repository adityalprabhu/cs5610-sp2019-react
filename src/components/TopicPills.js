
import React from 'react'
import {Link} from 'react-router-dom'


const TopicPills = ({topics, deleteTopic, selectTopic, selectedTopicId}) =>

    <ul className="nav nav-pills" style={{marginTop: "15px"}}>
        {
            topics.map(topic =>

                <li onClick={() => selectTopic(topic)}
                    className={['nav-item nav-link', topic.id == selectedTopicId ? 'active' : ''].join(" ")}
                    key={topic.id} style={{border: "1px solid #d3d3d3", marginLeft: "5px"}}>
                    <div className="row">
                        <div className="col-5">{topic.title}</div>
                        <div className="col-7" >
                            <Link className="btn btn-warning" to={``}>
                                <i className="fas fa-pencil-alt"></i>
                            </Link>
                            <span>       </span>
                            <button className="btn btn-danger" onClick={() => deleteTopic(topic.id)}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                </li>
            )
        }
    </ul>;

export default TopicPills;