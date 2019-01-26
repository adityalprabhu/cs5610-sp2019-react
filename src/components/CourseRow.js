import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const CourseRow = ({course, deleteCourse}) =>

    <div className="row table-row">
        <div className="col-4">{course.title}</div>
        <div className="col-2 col-xs-4">Professor</div>
        <div className="col-3 d-none d-sm-block">Mon Dec 24 2018 10:00:00</div>
        <div className="col-3" >
            <Link className="btn btn-primary" to={`/course/${course.id}`}>
                <i className="fas fa-pencil-alt"></i>
            </Link>
            <span>       </span>
            <button className="btn btn-danger" onClick={() => deleteCourse(course)}>
                <i className="fas fa-times"></i>
            </button>
        </div>
    </div>;


export default CourseRow;




// const CourseCard = ({course, deleteCourse}) =>
//     <div className="card"
//          styles={{width: '18rem'}}>
//         <img className="card-img-top"
//              src="https://picsum.photos/300/200"/>
//         <div className="card-body">
//             <h5 className="card-title">{course.title}</h5>
//             <p className="card-text">Card text.</p>
//             <Link className="btn btn-primary" to={`/course/${course.id}`}>Edit</Link>
//             <a onClick={() => deleteCourse(course)}
//                className="btn btn-danger">Delete</a>
//         </div></div>
// export default CourseCard;