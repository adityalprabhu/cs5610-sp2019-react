import React, {Component} from 'react';
import CourseRow from "../components/CourseRow";
// import CourseService from '../../services/CourseService';

const CourseTable = ({courses, deleteCourse, addCourse, shouldHide}) =>
    <div className="container-fluid">
        <div className="listTable">
            <div className="row table-row table-heading">
                <div className="col-4">Title</div>
                <div className="col-2">Owner</div>
                <div className="col-3 d-none d-sm-block">Modified</div>
                <div className="col-3"></div>
            </div>

            {
                courses.map(course =>
                    <CourseRow
                        deleteCourse={deleteCourse}
                        course={course}
                        key={course.id}
                    shouldHide={shouldHide}/>
                )
            }
        </div>
    </div>


export default CourseTable;

