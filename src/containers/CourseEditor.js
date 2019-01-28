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
            deleted: false
        }
    }

    selectModule = module => {

        console.log("select");
        if(this.state.deleted) {
            this.setState({
                module: this.state.course.modules[0]
            });
            this.state.deleted =  false;
        }else{

            this.setState({
                module: module
            });
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
                            lessons={this.state.module.lessons}/>
                        <TopicPills/>
                        <WidgetList/>
                    </div>
                </div>
            </div>
        )
    }
}
export default CourseEditor