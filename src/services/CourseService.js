import courses from './courses.json'

class CourseService {

    constructor() {
        this.courses = courses;
    }

    createWidget = (topicId, widget) => {

        for(let course of this.courses) {
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

    findAllWidgets = (course1, module1, lesson1, topic1) => {
        let courseIndex= this.courses.findIndex(
            course => course.id === course1.id
        );

        let moduleIndex = this.courses[courseIndex].modules.findIndex(
            module => module.id === module1.id
        );

        let lessonIndex = this.courses[courseIndex].modules[moduleIndex].lessons.findIndex(
            lesson => lesson.id === lesson1.id
        );

        let topicIndex = this.courses[courseIndex].modules[moduleIndex].lessons[lessonIndex].topics.findIndex(
            topic => topic.id === topic1.id
        );

        return this.courses[courseIndex].modules[moduleIndex].lessons[lessonIndex].topics[topicIndex].widgets

    }

}
export default CourseService