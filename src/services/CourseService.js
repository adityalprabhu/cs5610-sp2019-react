import courses from './courses.json'

class CourseService {
    static myInstance = null;
    static courses;

    constructor() {
        // CourseService.courses = [];
        this.apiUrl = "http://localhost:8080";
        // this.apiUrl = " https://cs5610-sp19-adityalprabhu.herokuapp.com";
        // this.courses = courses;
        var self = this;

        if(CourseService.myInstance == null){
            this.findAllCourses()
                .then(function(courses){
                    CourseService.courses = courses;
                })
        }

        this.courses =  CourseService.courses;

    }

    static getInstance() {
        if (CourseService.myInstance == null) {
            CourseService.myInstance =
                new CourseService();
        }
        return this.myInstance;
    }



    findAllCourses = () => {
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json'
            }

        };
        var self = this;

        return fetch(this.apiUrl+'/api/courses', requestOptions)
            .then(this.handleResponse)
            .then(function(response) {


                self.courses = response;
                // console.log(self.courses);
                // console.log(self.courses);
                return response;

            });
    };


    addCourse = (course) => {

        var newCourse = {
            // id: parseInt((new Date()).getTime()/1000),
            title: course.title == "" ? "New Course" : course.title,
            // modules: []
        };

        //
        // modules: [{
        //     id: parseInt((new Date()).getTime()/1000),
        //     title: "Module 1",
        //     lessons: [{
        //         id:parseInt((new Date()).getTime()/1000),
        //         title: "Lesson 1",
        //         topics: [{
        //             id: parseInt((new Date()).getTime()/1000),
        //             title: "Topic 1",
        //             widgets : [{
        //                 id: parseInt((new Date()).getTime()/1000),
        //                 title: "Widget 1",
        //             }]
        //         }]
        //     }]
        // }]

        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(newCourse)

        };
        var self = this;
        return fetch(this.apiUrl+'/api/courses', requestOptions)
            .then(this.handleResponse)
            .then(function(response) {
                if(self.courses == ""){
                    self.courses = []
                }
                self.courses.push(response);
                return self.courses;
            });
    };


    deleteCourse = delCourse => {

        const requestOptions = {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json'}
        };
        var self = this;
        // console.log(delCourse.id);
        self.courses = self.courses.filter(
            course => course.id !== delCourse.id
        );
        return fetch(this.apiUrl+'/api/courses/' + delCourse.id, requestOptions)
            .then(this.handleResponse)
            .then(function(response) {
                return self.courses;
            });
    };


    createModule = (courseId) => {

        var newModule = {
            "title": 'New Module',
            "id": parseInt((new Date()).getTime()/1000),
            "lessons": [{
                "id": parseInt((new Date()).getTime()/1000),
                "title": "Lesson 1",
                "topics": [{
                    "id": parseInt((new Date()).getTime()/1000),
                    "title": "New Topic",
                    "widgets" : [{
                        "id": parseInt((new Date()).getTime()/1000),
                        "title": "New Widget",
                    }]
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
        let updatedCourse = this.findCourseById(courseId);
        return fetch(this.apiUrl+'/api/courses/'+courseId+'/modules', requestOptions)
            .then(this.handleResponse)
            .then(function(response) {
                // console.log(response);
                let modules = updatedCourse.modules;
                modules.push(response);
                // console.log(modules);
                return modules;
            });


    };


    createWidget = (topicId, widget, courseId) => {

        let self = this
        console.log(self)
        for(let course of self.courses) {
            for(let module of course.modules) {
                for(let lesson of module.lessons) {
                    for(let topic of lesson.topics) {
                        if(topic.id == topicId) {
                            topic.widgets.push(widget);
                            return topic.widgets.slice(0)
                        }
                    }
                }
            }
        }
        return []
    };

    findWidgets = (topicId) => {
        for(let course of this.courses) {
            for(let module of course.modules) {
                for(let lesson of module.lessons) {
                    for(let topic of lesson.topics) {
                        if(topic.id == topicId) {
                            return topic.widgets
                        }
                    }
                }
            }
        }
        return []
    };

    findWidget = (widgetId) => {
        for(let course of this.courses) {
            for(let module of course.modules) {
                for(let lesson of module.lessons) {
                    for(let topic of lesson.topics) {
                        if(topic.widgets){
                            for(let widget of topic.widgets){
                                if(widget.id == widgetId) {
                                    return widget
                                }
                            }
                        }
                    }
                }
            }
        }
        return []
    };

    updateWidget = (widgetId, widget) => {
        for(let course of this.courses) {
            for(let module of course.modules) {
                for(let lesson of module.lessons) {
                    for(let topic of lesson.topics) {
                        if(topic.widget){
                            topic.widgets.map(w =>
                                w.id === widgetId ? widget : w
                            )
                        }
                    }
                }
            }
        }
        return this.findWidget(widgetId)
    };

    deleteWidget= (widgetId) => {

        for(let course of this.courses) {
            for(let module of course.modules) {
                for(let lesson of module.lessons) {
                    for(let topic of lesson.topics) {
                        if(topic.widgets){
                            topic.widgets = topic.widgets.filter(widget => widget.id !== widgetId);
                        }
                    }
                }
            }
        }
        return this.findWidget(widgetId)
    };

    moveWidgetUp = (widget, widgets) => {
        let allWidgets = widgets;
        let i = allWidgets.findIndex(w => w.id == widget.id);
        console.log(allWidgets);

        let temp = allWidgets[i-1];
        allWidgets[i-1] = allWidgets[i];
        allWidgets[i] = temp;

        console.log(allWidgets);

        return allWidgets.slice(0);
    };

    moveWidgetDown = (widget, widgets) => {
        let allWidgets = widgets;
        let i = allWidgets.findIndex(w => w.id == widget.id);
        console.log(allWidgets);

        let temp = allWidgets[i+1];
        allWidgets[i+1] = allWidgets[i];
        allWidgets[i] = temp;

        console.log(allWidgets);

        return allWidgets.slice(0);
    };



    //
    // addCourse = course => {
    //
    //     var newCourse = {
    //         id: (new Date()).getTime()/100000,
    //         title: course.title == "" ? "New Course" : course.title,
    //         modules: [
    //             {
    //                 id: (new Date()).getTime()/100000,
    //                 title: "Module 1",
    //                 lessons: [
    //                     {
    //                         id:(new Date()).getTime()/100000,
    //                         title: "Lesson 1",
    //                         topics: [
    //                             {
    //                                 id:(new Date()).getTime()/100000,
    //                                 title: "Topic 1"
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             }
    //         ]
    //     };
    //
    //     var self = this;
    //
    //     this.addCourseWebService(newCourse)
    //         .then(newCourse => {
    //             self.courses.push(newCourse);
    //             console.log(self.courses);
    //
    //             return self.courses;
    //         });
    //     // this.courses.push(newCourse);
    // };


    findCourseById = courseId => {

        // console.log(CourseService.courses);
        return(CourseService.courses.find(
            course => course.id === courseId
        ));


    };

    //
    // findAllCourses = () => {
    //     return this.courses;
    // };




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

    findAllWidgets = (course1, module1, lesson1, topic1) => {
        console.log(CourseService.courses)

        let courseIndex= CourseService.courses.findIndex(
            course => course.id === course1.id
        );

        let moduleIndex = CourseService.courses[courseIndex].modules.findIndex(
            module => module.id === module1.id
        );

        let lessonIndex = CourseService.courses[courseIndex].modules[moduleIndex].lessons.findIndex(
            lesson => lesson.id === lesson1.id
        );

        let topicIndex = CourseService.courses[courseIndex].modules[moduleIndex].lessons[lessonIndex].topics.findIndex(
            topic => topic.id === topic1.id
        );

        return CourseService.courses[courseIndex].modules[moduleIndex].lessons[lessonIndex].topics[topicIndex].widgets
        // return courses[0].modules[0].lessons[0].topics[0].widgets
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
export default CourseService