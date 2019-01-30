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
            topic: course.modules[0].lessons[0].topics[0]
        }
    }

    selectModule = module => {

        console.log(module);
        // console.log(module.lessons[0]);
        // console.log(module.lessons[0].topics[0]);
        if(this.state.deleted) {
            console.log("Inside delete")
            this.setState({
                module: this.state.course.modules[0]
            });
            this.state.deleted =  false;
        }else{
            console.log("inside else?");
            this.setState({
                module: module,
                lesson: module.lessons[0],
                topic: module.lessons[0].topics[0]
            });

            console.log(this.state)
        }

    };

    deleteModule = moduleId => {
        console.log("delete");
        this.state.deleted = true;
        this.setState({
            course: this.courseService.updateCourse({
                id: this.state.course.id,
                title: this.state.course.title,
                modules: this.state.course.modules.filter(
                    module => module.id !== moduleId
                )
            })
        });

        console.log("next read this");
        console.log(this.state.course);
    };

    deleteLesson = lesson => {
        console.log("In delete lesson");
    };

    selectLesson = lesson => {
        console.log("In select lesson" + lesson.id);
        if(this.state.deleted) {
            this.setState({
                lesson: this.state.module[0]
            });
            this.state.deleted =  false;
        }else{

            this.setState({
                lesson: lesson,
                topic: lesson.topics[0]
            });
        }

    };

    deleteTopic = topic => {
        console.log("In delete topic");
    };

    selectTopic = topic => {
        console.log("In select topic" + topic.id);
        if(this.state.deleted) {
            this.setState({
                topic: this.state.lesson[0]
            });
            this.state.deleted =  false;
        }else{

            this.setState({
                topic: topic,
            });
        }
    };

    render() {
        return (
            <div>
                <h2>Course Editor: {this.state.course.title}</h2>
                <div className="row">
                    <div className="col-md-4">
                        <ModuleList
                            selectModule={this.selectModule}
                            deleteModule={this.deleteModule}
                            modules={this.state.course.modules}
                            selectedModuleId={this.state.module.id}
                            course={this.state.course}
                        />
                    </div>
                    <div className="col-md">
                        <LessonTabs
                            lessons={this.state.module.lessons}
                            deleteLesson = {this.deleteLesson}
                            selectLesson={this.selectLesson}
                            selectedLessonId={this.state.lesson.id}
                            course={this.state.course}/>
                        <div>      </div>
                        <TopicPills
                            topics={this.state.lesson.topics}
                            deleteTopic= {this.deleteTopic}
                            selectTopic={this.selectTopic}
                            selectedTopicId={this.state.topic.id}
                            course={this.state.course}/>
                        <WidgetList/>
                    </div>
                </div>
            </div>
        )
    }
}
export default CourseEditor