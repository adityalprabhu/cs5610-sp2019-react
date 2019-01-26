import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const CourseCard = ({course, deleteCourse}) =>

    <div className="card"
         styles={{width: '18rem'}}>
        {/*<img className="card-img-top"*/}
        {/*src="https://picsum.photos/300/200"/>*/}
        <div className="card-body">
            <h5 className="card-title">{course.title}</h5>
            <p className="card-text">Professor</p>
            <Link className="btn btn-primary card-edit-btn" to={`/course/${course.id}`}>Edit</Link>
            <button onClick={() => deleteCourse(course)}
               className="btn btn-danger card-delete-btn">Delete</button>
        </div>
    </div>

export default CourseCard;