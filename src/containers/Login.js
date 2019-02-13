import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Route, Switch, Redirect} from 'react-router-dom'
import UserService from "../services/UserService";


class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            username : "",
            password: "",
            loggedIn: false,
            courses: []
        };
        this.userService = new UserService();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    logUserIn = (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        var self = this;
        this.userService
            .login(username, password)
            .then(function(res){
                console.log(res);
                self.setState({
                    loggedIn : true,
                });
            });
    };

    render() {
        const { username, password, loggedIn, courses } = this.state;
        if (loggedIn === true) {
            return <Redirect to='/courseList' />
        }
        return (

            <div className="container">

                <h1>Sign In</h1>

                <form onSubmit={this.logUserIn}>
                    <div className="form-group row">
                        <label htmlFor="usernameFld" className="col-sm-2 col-form-label">
                            Username </label>
                        <div className="col-sm-10">
                            <input className="form-control" id="usernameFld" placeholder="johndoe"
                                   required="required" name="username" value={username} onChange={this.handleChange}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="passwordFld" className="col-sm-2 col-form-label">
                            Password </label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control password-fld"
                                   id="passwordFld" placeholder="mypassword123$" name="password" required="required" value={password} onChange={this.handleChange}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"></label>
                        <div className="col-sm-10">
                            <button id="signInBtn" className="btn btn-primary btn-block" type={"submit"}>Sign
                                in</button>
                            <div className="row">
                                <div className="col-6">
                                    <a href="#dummylink">Forgot Password?</a>
                                </div>
                                <div className="col-6">
                                    <Link className="float-right" to="/register">Sign Up</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            </div>

        )
    }
}

export default Login;

