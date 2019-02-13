import CourseService from "./CourseService";

class LessonService {
    static myInstance = null;
    static courses;

    constructor() {
        this.apiUrl = "http://localhost:8080";
        this.courseService = CourseService.getInstance();

    }

    static getInstance() {
        if (LessonService.myInstance == null) {
            LessonService.myInstance =
                new LessonService();
        }
        return this.myInstance;
    }

    createLesson = (courseId, moduleId) => {

        var newModule = {
            id: parseInt((new Date()).getTime()/1000),
            title: "New Lesson",
            topics: [{
                id: parseInt((new Date()).getTime() / 1000),
                title: "Topic 1",
                widgets: [{
                    id: parseInt((new Date()).getTime() / 1000),
                    title: "Widget 1",
                }]
            }]
        };

        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(newModule)

        };
        let self = this;
        let updatedCourse = self.courseService.findCourseById(courseId);
        let updatedModule;
        for(let module of updatedCourse.modules) {
            if(module.id == moduleId){
                updatedModule = module;
            }
        }
        return fetch(this.apiUrl+'/api/module/'+moduleId+'/lesson', requestOptions)
            .then(this.handleResponse)
            .then(function(response) {
                // console.log(response);
                updatedModule.lessons.push(response);

                // console.log(updatedModule);
                return updatedModule.lessons;
            });


    };


    deleteLesson = (lessonId, lessons) => {

        const requestOptions = {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json'}
        };

        var self = this;
        console.log(lessonId);
        let updatedLessons = lessons.filter(lesson => lesson.id !== lessonId);
        return fetch(this.apiUrl+'/api/lesson/' + lessonId, requestOptions)
            .then(this.handleResponse)
            .then(function(response) {
                // console.log(response);
                self.courseService.findAllCourses();
                // console.log(updatedLessons);
                return updatedLessons;
            });
    };

    editLesson = (lessonId, lesson) => {
        const requestOptions = {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(lesson)
        };
        var self = this;
        console.log(lessonId);
        return fetch(this.apiUrl+'/api/lesson/' + lessonId, requestOptions)
            .then(this.handleResponse)
            .then(function(response) {
                // console.log(response);
                self.courseService.findAllCourses();
                return response;
            });
    };

    handleResponse = (response) => {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                    // auto logout if 401 response returned from api
                    // logout();
                    // location.reload(true);
                    console.log("401 Error");
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        });
    }

}

export default LessonService;