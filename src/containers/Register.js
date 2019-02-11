import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import UserService from "../services/UserService";


class Register extends Component {

    constructor(props){
        super(props);

        this.state = {
            username : "",
            password: "",
            vpassword: ""
        };

        this.userService = new UserService();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    registerUser = (e) => {
        e.preventDefault();
        const { username, password, vpassword } = this.state;

        if(password == vpassword){
            this.userService
                .register(username, password)
                .then(function(res){
                    console.log(res)
                });
        }

    };

    render() {
        const {username, password, vpassword } = this.state;
        return (
            <div className="container">

                <h1>Sign Up</h1>

                <form onSubmit={this.registerUser}>
                    <div className="form-group row">
                        <label htmlFor="usernameFld" className="col-sm-2 col-form-label">
                            Username </label>
                        <div className="col-sm-10">
                            <input className="form-control" id="usernameFld" placeholder="johndoe"
                                   name={"username"}
                                   value={username}
                                   onChange={this.handleChange}
                                   required="required"/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="passwordFld" className="col-sm-2 col-form-label">
                            Password </label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control password-fld"
                                   id="passwordFld"
                                   placeholder="mypassword123$"
                                   required="required"
                                   name={"password"}
                                   value={password}
                                   onChange={this.handleChange}/>

                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="verifyPasswordFld" className="col-sm-2 col-form-label">
                            Verify Password </label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control verify-password-fld"
                                   id="verifyPasswordFld" placeholder="mypassword123$"
                                   name={"vpassword"}
                                   value={vpassword}
                                   onChange={this.handleChange}
                                   required="required"/>

                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"></label>
                        <div className="col-sm-10">
                            <button id="signUpBtn" className="btn btn-primary btn-block" type={"submit"}>Sign up</button>
                            <div className="row">
                                <div className="col-6">
                                    <Link to="/login">Login</Link>
                                </div>
                                <div className="col-6" >
                                    <a href="../home/home.template.client.html" style={{float:"right"}}>Cancel</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            </div>

        )
    }
}

export default Register;

