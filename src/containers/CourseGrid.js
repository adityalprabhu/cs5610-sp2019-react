import React from 'react'
import CourseCard from "../components/CourseCard";
import '../assets/courseList.css'

const CourseGrid = ({courses, deleteCourse, addCourse, shouldHide}) =>
    <div className="container py-5 bg-faded">
        <div className="card-columns">
            {
                courses.map(course =>
                    <CourseCard
                        deleteCourse={deleteCourse}
                        course={course}
                        key={course.id}
                        shouldHide={shouldHide}/>
                )
            }
        </div>
    </div>;

export default CourseGrid