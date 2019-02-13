import React, {Component} from 'react'
import CourseTable from "./CourseTable";
import CourseService from "../services/CourseService";
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import CourseGrid from "./CourseGrid";
import '../assets/courseList.css'
import CourseEditor from "./CourseEditor";

class CourseList extends Component {
    constructor(props) {
        super(props);
        this.courseService = CourseService.getInstance()
        var self = this;
        // console.log(this.courseService.findAllCourses());

        this.courseService
            .findAllCourses()
            .then(courses => {
                self.setState({
                    courses: courses
                });
            });

        this.state = {
            // courses: this.courseService.findAllCourses(),
            courseTitle: '',
            courseOwner: '',
            shouldHide: false,
            tableView: true
        };



    }

    deleteCourse = course => {
        var self = this;

        this.courseService
            .deleteCourse(course)
            .then(function(courses){
                self.setState({
                    courses: courses,
                    courseTitle: '',
                    courseOwner: ''
                });
            });


    };

    addCourse = () => {
        var self = this;
        this.courseService
            .addCourse({title : this.state.courseTitle})
            .then(function(courses){
                console.log(courses);
                self.setState({
                    courses: courses,
                    courseTitle: '',
                    courseOwner: ''
                });
            })
    };

    shouldHide = (page) => {

        if(page == "ce"){
            this.setState({
                shouldHide: true
            });
        }else{
            var shouldHide = this.state.shouldHide;
            this.setState({
                shouldHide: !shouldHide
            });
        }

    };

    toggleView = () => {

        if(this.state.shouldHide == true){
            this.setState({
                shouldHide: false
            });
        }
        {
            this.setState({
                tableView: !this.state.tableView
            });
        }
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
                <div style={{paddingRight: '15px'}}>
                    <Link to={this.state.tableView? '/table' : '/grid'} >
                        <button className="btn btn-primary" onClick={() => this.toggleView()}>Toggle View</button>
                    </Link>


                    <table id="newCourseForm" className={this.state.shouldHide ? 'hidden' : ''}>
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
                                       courses={this.state.courses}
                                       shouldHide={this.shouldHide}/>}/>
                        <Route path="/course/:id"
                               exact
                               render={(props) => <CourseEditor {...props} courses={this.state.courses} shouldHide={this.shouldHide} />} />
                        <Route path='/table'
                               render={() => <CourseTable addCourse={this.addCourse}
                                                          deleteCourse={this.deleteCourse}
                                                          courses={this.state.courses}
                                                          shouldHide={this.shouldHide}/>}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default CourseList;

