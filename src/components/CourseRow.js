import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const CourseRow = ({course, deleteCourse,shouldHide}) =>

    <div className="row table-row">

        <div className="col-4">
            <Link to={`/course/${course.id}`}>
                {course.title}
            </Link>
        </div>
        <div className="col-2 col-xs-4 d-none d-sm-block">Professor</div>
        <div className="col-3 d-none d-sm-block">Mon Dec 24 2018 10:00:00</div>
        <div className="col-3" >
            <Link className="btn btn-warning" to={`/course/${course.id}`} onClick={() => shouldHide("cr")}>
                <i className="fas fa-pencil-alt"></i>
            </Link>
            <span>       </span>
            <button className="btn btn-danger" onClick={() => deleteCourse(course)}>
                <i className="fas fa-trash"></i>
            </button>
        </div>
    </div>;


export default CourseRow;