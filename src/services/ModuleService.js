import CourseService from "./CourseService";

class ModuleService {
    static myInstance = null;
    static courses;

    constructor() {
        // this.courses = [];
        this.apiUrl = "http://localhost:8080";
        // this.courses = courses;
        var self = this;
        this.courseService = CourseService.getInstance();

    }

    static getInstance() {
        console.log("in get instance")
        if (ModuleService.myInstance == null) {
            ModuleService.myInstance =
                new ModuleService();
        }
        return this.myInstance;
    }

    createModule = (courseId) => {

        var newModule = {
            title: 'New Module',
            id: parseInt((new Date()).getTime()/1000),
            lessons: [
                {
                    "id": parseInt((new Date()).getTime()/1000),
                    "title": "Lesson 1",
                    "topics": [
                        {
                            "id": parseInt((new Date()).getTime()/1000),
                            "title": "Topic 1"
                        }
                    ]
                }
            ]
        };

        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(newModule)

        };
        let self = this;
        let updatedCourse = self.courseService.findCourseById(courseId);
        return fetch(this.apiUrl+'/api/courses/'+courseId+'/modules', requestOptions)
            .then(this.handleResponse)
            .then(function(response) {
                console.log(response);
                let modules = updatedCourse.modules;
                modules.push(response);
                console.log(modules);
                return modules;
            });


    };


    deleteModule = (moduleId, modules) => {

        const requestOptions = {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json'}
        };

        var self = this;
        console.log(moduleId);
        let updatedModules = modules.filter(module => module.id !== moduleId)
        return fetch(this.apiUrl+'/api/modules/' + moduleId, requestOptions)
            .then(this.handleResponse)
            .then(function(response) {
                console.log(response);
                console.log(updatedModules);
                return updatedModules;
            });
    };

    editModule = (moduleId, module) => {
        const requestOptions = {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(module)
        };

        var self = this;
        console.log(moduleId);
        return fetch(this.apiUrl+'/api/modules/' + moduleId, requestOptions)
            .then(this.handleResponse)
            .then(function(response) {
                console.log(response);
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


export default ModuleService;