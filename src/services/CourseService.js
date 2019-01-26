import courses from './courses.json'

class CourseService {

    constructor() {
        this.courses = courses;
    }

    addCourse = newCourse => {

        console.log(newCourse)

        var course = {
            id: (new Date()).getTime(),
            title: newCourse.title
        };

        console.log(newCourse.owner);

        this.courses.push(course);
        return this.courses
    };


    findCourseById = courseId =>
        this.courses = this.courses.find(
            course => course.id === courseId
        );


    findAllCourses = () =>
        this.courses;


    deleteCourse = deleteCourse =>
        this.courses = this.courses.filter(
            course => course.id !== deleteCourse.id
        )
}
export default CourseService