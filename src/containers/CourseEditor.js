import React from 'react'
import CourseService from "../services/CourseService";
import ModuleList from "../components/ModuleList";
import LessonTabs from "../components/LessonTabs";
import TopicPills from "../components/TopicPills";
import WidgetList from "../components/WidgetList";
import WidgetListContainer from '../containers/WidgetListContainer'
import widgetReducer from '../reducers/WidgetReducer'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

const store = createStore(widgetReducer);


class CourseEditor extends React.Component {

    constructor(props) {
        super(props);
        this.courseService = CourseService.getInstance();
        const courseId = parseInt(props.match.params.id);
        console.log(this.courseService)
        const course = this.courseService.findCourseById(courseId);


        this.state = {
            course: course,
            module: course.modules[0],
            deleted: false,
            lesson: course.modules[0] == null ? null : course.modules[0].lessons[0],
            topic: course.modules[0] == null || course.modules[0].lessons[0] == null ? null : course.modules[0].lessons[0].topics[0],
            moduleDeleted: false
        };

        try{
            this.state.topic = course.modules[0].lessons[0].topics[0]
        }catch(e){
            this.state.topic = null

        }


        this.props.shouldHide("ce");
    }



    selectModule = module => {

        console.log("in select module: " + module.id);
        var self = this;
        self.setState({
            module: module,
            lesson: module.lessons == null ?  null : module.lessons[0]
        });

        if(module.lessons != null & module.lessons[0] != null && module.lessons[0].topics != null){
            self.setState({
                topic:module.lessons[0].topics[0]
            })
    }

};

resetAllOnDelete = () =>{
    console.log("in reset all");

    let thisCourse = this.courseService.findCourseById(this.state.course.id);

    this.setState({
        module: thisCourse.modules[0],
        lesson: thisCourse.modules[0].lessons[0],
        topics: thisCourse.modules[0].lessons[0] == null ? null : thisCourse.modules[0].lessons[0].topics
    });
};

resetAllLessonsOnDelete = () =>{
    console.log("in reset lessons");

    let thisCourse = this.courseService.findCourseById(this.state.course.id);

    let thisModule = thisCourse.modules.find(
        module => module.id == this.state.module.id
    );

    this.setState({
        lesson: thisModule.lessons[0],
        topics: thisModule.lessons[0].topics
    });
};

resetAllTopicsOnDelete = () =>{
    console.log("in reset topics");

    let thisCourse = this.courseService.findCourseById(this.state.course.id);

    let thisModule = thisCourse.modules.find(
        module => module.id == this.state.module.id
    );

    let thisLesson = thisModule.lessons.find(
        lesson => lesson.id == this.state.lesson.id
    );

    this.setState({
        topics: thisLesson.topics
    });
};


selectLesson = lesson => {
    console.log("In select lesson" + lesson.id);
    this.setState({
        lesson: lesson,
        topic: lesson.topics[0]
    });
};

selectTopic = topic => {
    console.log("In select topic" + topic.id);
    this.setState({
        topic: topic,
    });
};

render() {
    return (
        <div>
            <h2>Course Editor: {this.state.course.title}</h2>
            <div className="row">
                <div className="col-md-4">
                    <ModuleList
                        selectModule={this.selectModule}
                        resetAllOnDelete={this.resetAllOnDelete}
                        modules={this.state.course.modules}
                        selectedModuleId={this.state.module == null ? null : this.state.module.id}
                        course={this.state.course}/>
                </div>

                <div className="col-md">
                    {(this.state.module !=null) &&
                    <LessonTabs
                        module={this.state.module}
                        resetAllLessonsOnDelete = {this.resetAllLessonsOnDelete}
                        selectLesson={this.selectLesson}
                        selectedLessonId={this.state.lesson == null ? null : this.state.lesson.id}
                        course={this.state.course}/>}
                    <div>      </div>
                    {(this.state.lesson !=null) &&
                    <TopicPills
                        lesson={this.state.lesson}
                        module={this.state.module}
                        selectTopic={this.selectTopic}
                        selectedTopicId={this.state.topic == null ? null : this.state.topic.id}
                        course={this.state.course}
                        resetAllTopicsOnDelete={this.resetAllTopicsOnDelete}/>}
                    <Provider store={store}>
                        {(this.state.topic !=null) &&
                        <WidgetListContainer
                            course={this.state.course}
                            lesson={this.state.lesson}
                            module={this.state.module}
                            topic={this.state.topic}
                            widgets={this.state.topic == null? null : this.state.topic.widgets}/>}
                    </Provider>
                </div>
            </div>
        </div>
    )
}
}

export default CourseEditor;