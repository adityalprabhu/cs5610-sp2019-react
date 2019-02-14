import CourseService from "./CourseService";

class TopicService {
    static myInstance = null;
    static courses;

    constructor() {
        this.apiUrl = "http://localhost:8080";
        this.courseService = CourseService.getInstance();

    }

    static getInstance() {
        if (TopicService.myInstance == null) {
            TopicService.myInstance = new TopicService();
        }
        return this.myInstance;
    }

    createTopic = (courseId, moduleId, lessonId) => {

        var newTopic = {
            "id": parseInt((new Date()).getTime()/1000),
            "title": "New Topic",
            "widgets" : [{
                "id": parseInt((new Date()).getTime()/1000),
                "title": "New Widget",
                "text":"This is a Heading",
                "size":1,
                "type":"HEADING"
            }]
        };

        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(newTopic)

        };
        let self = this;
        let updatedCourse = self.courseService.findCourseById(courseId);
        let updatedLesson;
        for(let module of updatedCourse.modules) {
            if(module.id == moduleId){
                for(let lesson of module.lessons){
                    if(lesson.id == lessonId){
                        updatedLesson = lesson;
                    }
                }
            }
        }
        return fetch(this.apiUrl+'/api/lesson/'+lessonId+'/topic', requestOptions)
            .then(this.handleResponse)
            .then(function(response) {
                // console.log(response);
                updatedLesson.topics.push(response);
                self.courseService.findAllCourses();
                // console.log(updatedLesson);
                return updatedLesson.topics;
            });


    };


    deleteTopic = (topicId, topics) => {

        const requestOptions = {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json'}
        };

        var self = this;
        console.log(topicId);
        let updatedTopics = topics.filter(topic => topic.id !== topicId);
        return fetch(this.apiUrl+'/api/topic/' + topicId, requestOptions)
            .then(this.handleResponse)
            .then(function(response) {
                // console.log(response);
                self.courseService.findAllCourses();
                // console.log(updatedTopics);
                return updatedTopics;
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

export default TopicService;