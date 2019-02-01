import courses from './courses.json'

class CourseService {

    constructor() {
        this.courses = courses;
    }

    addCourse = course => {

        var newCourse = {
            id: (new Date()).getTime(),
            title: course.title,
            modules: [
                {
                    id: "1",
                    title: "Module 1",
                    lessons: [
                        {
                            id:"1",
                            title: "Lesson 1",
                            topics: [
                                {
                                    id:"1",
                                    title: "Topic 1"
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        if(newCourse.title == ""){
            newCourse.title = "New Course"
        }

        this.courses.push(newCourse);
        return this.courses
    };


    findCourseById = courseId => {

        return(this.courses.find(
            course => course.id === courseId
        ));


    };


    findAllCourses = () =>
        this.courses;


    deleteCourse = deleteCourse =>
        this.courses = this.courses.filter(
            course => course.id !== deleteCourse.id
        );

    updateCourse = updateCourse => {
        var courseIndex= this.courses.findIndex(
            course => course.id === updateCourse.id
        );

        this.courses[courseIndex].title = updateCourse.title;
        this.courses[courseIndex].modules = updateCourse.modules;

        // console.log(this.courses[courseIndex]);

        return(this.courses[courseIndex])
    }
}
export default CourseService