import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const CourseCard = ({course, deleteCourse}) =>

    <div className="card"
         styles={{width: '18rem'}}>
        <img className="card-img-top"
             src="https://picsum.photos/300/200"/>
        <div className="card-body">
            <h5 className="card-title">
                <Link to={`/course/${course.id}`}>
                    {course.title}
                </Link>
            </h5>
            <p className="card-text">Professor</p>
            <div className={"row"}>
                <div className={"col-4"}>
                    <Link className="btn btn-warning card-edit-btn" to={`/course/${course.id}`}>
                        <i className="fas fa-pencil-alt"></i>
                    </Link>
                </div>
                <div className={"col-4"}></div>
                <div className={"col-4"}>
                    <button onClick={() => deleteCourse(course)}
                            className="btn btn-danger card-delete-btn">
                        <i className="fas fa-trash"></i></button>
                </div>
            </div>
        </div>
    </div>

export default CourseCard;