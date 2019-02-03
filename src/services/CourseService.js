import courses from './courses.json'

class CourseService {

    constructor() {
        this.courses = courses;
    }

    createWidget = (topicId, widget) => {};

    findWidgets = (topicId) => {};

    findWidget = (widgetId) => {};

    updateWidget = (widgetId, widget) => {};

    deleteWidget= (widgetId) => {};

    


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


        return(this.courses[courseIndex])
    };

    updateModule = (updateCourse, updateModule) => {
        let courseIndex= this.courses.findIndex(
            course => course.id === updateCourse.id
        );

        let moduleIndex = this.courses[courseIndex].modules.findIndex(
            module => module.id === updateModule.id
        );

        this.courses[courseIndex].modules[moduleIndex].title = updateModule.title;
        this.courses[courseIndex].modules[moduleIndex].lessons = updateModule.lessons;


        return(this.courses[courseIndex].modules[moduleIndex])
    };


    updateLesson = (updateCourse, updateModule, updateLesson) => {
        let courseIndex= this.courses.findIndex(
            course => course.id === updateCourse.id
        );

        let moduleIndex = this.courses[courseIndex].modules.findIndex(
            module => module.id === updateModule.id
        );

        let lessonIndex = this.courses[courseIndex].modules[moduleIndex].lessons.findIndex(
            lesson => lesson.id === updateLesson.id
        );

        this.courses[courseIndex].modules[moduleIndex].lessons[lessonIndex].title = updateLesson.title;
        this.courses[courseIndex].modules[moduleIndex].lessons[lessonIndex].topics = updateLesson.topics;


        return(this.courses[courseIndex].modules[moduleIndex].lessons[lessonIndex])
    };

}
export default CourseService