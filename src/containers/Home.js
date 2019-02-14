import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import Login from "./Login";
import CourseList from "./CourseList";
import Register from "./Register";
import '../assets/index.css';
import UserService from "../services/UserService";
import Profile from "./Profile";


class Home extends Component {

    constructor(props){
        super();
        this.userService = UserService.getInstance();
    }

    logout = () => {

        this.userService
            .logout()
            .then(function(res){
                localStorage.removeItem("user");
            })
    };

    render() {
        return (

            <Router>
                <div>
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarNav" aria-controls="navbarNav"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" style={{flexGrow:'0'}} id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register">Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/profile">Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/"} onClick={this.logout}>Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <Route path='/login'
                           exact
                           component={Login}/>
                    <Route path='/register'
                           exact
                           component={Register}/>
                    <Route path='/courseList'
                           exact
                           component={CourseList}/>
                    <Route path='/profile'
                           exact
                           component={Profile}/>
                </div>
            </Router>
        )
    }
}

export default Home;

