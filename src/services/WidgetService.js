import CourseService from "./CourseService";

class WidgetService {
    static myInstance = null;
    static courses;

    constructor() {
        this.apiUrl = "https://ancient-coast-13605.herokuapp.com";
        // this.apiUrl = " https://cs5610-sp19-adityalprabhu.herokuapp.com";
        this.courseService = CourseService.getInstance();

    }

    static getInstance() {
        if (WidgetService.myInstance == null) {
            WidgetService.myInstance = new WidgetService();
        }
        return this.myInstance;
    }

    createWidget = (topicId, courseId) => {

        var newWidget = {
            "title":"Widget1",
            "type":"HEADING"
        };

        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(newWidget)

        };
        let self = this;
        let updatedCourse = self.courseService.findCourseById(courseId);
        let updatedTopic;
        console.log(courseId)
        for(let module of updatedCourse.modules) {
            for(let lesson of module.lessons){
                for(let topic of lesson.topics){
                    if(topic.id == topicId){
                        updatedTopic =  topic
                    }
                }
            }
        }
        return fetch(this.apiUrl+'/api/topic/'+topicId+'/widget', requestOptions)
            .then(this.handleResponse)
            .then(function(response) {
                // console.log(response);
                updatedTopic.widgets.push(response);
                self.courseService.findAllCourses();
                // console.log(updatedTopic.widgets.slice(0));
                return updatedTopic.widgets;
            });


    };

    findAllWidgets1 = (topicId) => {

        const requestOptions = {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json'}

        };

        return fetch(this.apiUrl+'/api/topic/'+topicId+'/widget', requestOptions)
            .then(this.handleResponse)
            .then(function(response) {
                console.log(response);
                return response;
            });

    };


    saveAllWidgets = (topicId, newWidgets) => {

        if(newWidgets.length > 0){
            for(let widget of newWidgets) {
                this.editWidget(widget)
            }
        }
    };

    editWidget = (widget) => {
        const requestOptions = {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(widget)

        };

        return fetch(this.apiUrl+'/api/widget/'+widget.id, requestOptions)
            .then(this.handleResponse)
            .then(function(response) {
                console.log(response);
                return response;
            });

    };



    deleteWidget = (widgetId) => {

        const requestOptions = {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json'}
        };

        let self = this;
        return fetch(this.apiUrl+'/api/widget/' + widgetId, requestOptions)
            .then(this.handleResponse)
            .then(function(response) {
                // console.log(response);
                self.courseService.findAllCourses();
                return response;
            });
    };

    editTopic = (topicId, topic) => {
        const requestOptions = {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(topic)
        };
        var self = this;
        console.log(topicId);
        return fetch(this.apiUrl+'/api/topic/' + topicId, requestOptions)
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
                    console.log("401 Error");
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        });
    }

}

export default WidgetService;