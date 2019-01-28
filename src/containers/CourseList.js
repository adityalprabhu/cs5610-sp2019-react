import React, {Component} from 'react'
import CourseTable from "./CourseTable";
import CourseService from "../services/CourseService";
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import CourseGrid from "./CourseGrid";
import '../assets/courseList.css'
import CourseEditor from "./CourseEditor";

class CourseList extends Component {
    constructor() {
        super();
        this.courseService = new CourseService();
        this.state = {
            courses: this.courseService.findAllCourses(),
            courseTitle: '',
            courseOwner: '',
            shouldHide: false,
            tableView: true
        };
    }

    deleteCourse = course =>
        this.setState({
            courses: this.courseService.deleteCourse(course)
        });

    addCourse = () =>
        this.setState({
            courses: this.courseService.addCourse({title : this.state.courseTitle}),
            courseTitle: '',
            courseOwner: ''
        });

    shouldHide = () => {
        this.setState({
            shouldHide: !this.state.shouldHide
        });
    };

    toggleView = () => {
        this.setState({
            tableView: !this.state.tableView
        });
    };

    handleNewCourseTitle = (e) =>
    {
        this.setState({courseTitle: e.target.value});
    };

    handleNewCourseOwner = (e) =>
    {
        this.setState({courseOwner: e.target.value});
    };


    render() {
        return (
            <Router>
                <div>
                    <Link to={this.state.tableView? '/table' : '/grid'}>
                        <button className="btn btn-primary" onClick={() => this.toggleView()}>Toggle View</button>
                    </Link>


                    <table id="newCourseForm">
                        <tbody>
                        <tr id="userForm" className="row newCourse">

                            <th className="col-10">
                                <input id="courseTitle" className="form-control"
                                       placeholder="new course title" value={this.state.courseTitle} onChange={this.handleNewCourseTitle} required="required" />
                            </th>
                            <th className="col-2">
                                <button className="btn btn-success" onClick={() => this.addCourse()}>
                                    <i className="fas fa-plus"></i>
                                </button>
                            </th>
                        </tr>
                        </tbody>
                    </table>

                    <Switch>
                        <Route path='/grid' exact
                               render={() =>
                                   <CourseGrid
                                       addCourse={this.addCourse}
                                       deleteCourse={this.deleteCourse}
                                       courses={this.state.courses}/>}/>
                        <Route path="/course/:id"
                               exact
                               render={(props) => <CourseEditor {...props} courses={this.state.courses} />} />
                        <Route path='/table'
                               render={() => <CourseTable addCourse={this.addCourse}
                                                          deleteCourse={this.deleteCourse}
                                                          courses={this.state.courses}/>}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default CourseList;

