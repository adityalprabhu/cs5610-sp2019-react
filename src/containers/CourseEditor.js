import React from 'react'
import CourseService from "../services/CourseService";
import ModuleList from "../components/ModuleList";
import LessonTabs from "../components/LessonTabs";
import TopicPills from "../components/TopicPills";
import WidgetList from "../components/WidgetList";


class CourseEditor extends React.Component {

    constructor(props) {
        super(props);
        this.courseService = new CourseService();
        const courseId = parseInt(props.match.params.id);
        const course = this.courseService.findCourseById(courseId);
        this.state = {
            course: course,
            module: course.modules[0],
            deleted: false,
            lesson: course.modules[0].lessons[0],
            topic: course.modules[0].lessons[0].topics[0],
            moduleDeleted: false
        };

        this.props.shouldHide("ce");
    }

    selectModule = module => {

        console.log("in select module: " + module.id);

        this.setState({
            module: module,
            lesson: module.lessons[0],
            topic: module.lessons[0].topics[0]
        });

    };

    resetAllOnDelete = () =>{
        console.log("in reset all");

        let thisCourse = this.courseService.findCourseById(this.state.course.id);

        this.setState({
            module: thisCourse.modules[0],
            lesson: thisCourse.modules[0].lessons[0],
            topics: thisCourse.modules[0].lessons[0].topics
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
                            selectedModuleId={this.state.module.id}
                            course={this.state.course}/>
                    </div>
                    <div className="col-md">
                        <LessonTabs
                            module={this.state.module}
                            resetAllLessonsOnDelete = {this.resetAllLessonsOnDelete}
                            selectLesson={this.selectLesson}
                            selectedLessonId={this.state.lesson.id}
                            course={this.state.course}/>
                        <div>      </div>
                        <TopicPills
                            lesson={this.state.lesson}
                            module={this.state.module}
                            selectTopic={this.selectTopic}
                            selectedTopicId={this.state.topic.id}
                            course={this.state.course}
                            resetAllTopicsOnDelete={this.resetAllTopicsOnDelete}/>
                        <WidgetList/>
                    </div>
                </div>
            </div>
        )
    }
}

export default CourseEditor;