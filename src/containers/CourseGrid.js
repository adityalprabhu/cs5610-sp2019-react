import React from 'react'
import CourseCard from "../components/CourseCard";
// import CourseCard from './CourseCard'
// import NewCourseCard from "./NewCourseCard";
import '../assets/courseList.css'

const CourseGrid = ({courses, deleteCourse, addCourse}) =>
    <div className="container py-5 bg-faded">
        <div className="card-columns">
            {
                courses.map(course =>
                    <CourseCard
                        deleteCourse={deleteCourse}
                        course={course}
                        key={course.id}/>
                )
            }
            {/*<NewCourseCard*/}
            {/*addCourse={addCourse}/>*/}
        </div>
    </div>;

export default CourseGrid