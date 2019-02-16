import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Route, Switch, Redirect} from 'react-router-dom'
import UserService from "../services/UserService";


class Profile extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: "",
            phone: "",
            email: "",
            role: "",
            dob: "",
            updated: false
        };

        this.userService = UserService.getInstance();
        this.handleChange = this.handleChange.bind(this);
        var self = this
        this.userService
            .getProfile()
            .then(function(res){
                if(res == null || res == "" || res == undefined) {
                    alert("Login before trying to update user!");
                    self.props.history.push("/Login");
                }else{
                    self.setState({
                        username: res.username,
                        phone: res.phone,
                        email: res.email,
                        role: res.role,
                        dob: res.dob,
                        updated: false
                    });
                }
            })
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        this.setState({
            updated:false
        });
    };

    logout = () => {
        var self = this;
        this.userService
            .logout()
            .then(function(res){
                localStorage.removeItem("user");
                self.props.history.push('/login')
            })
    };


    update = (e) => {
        e.preventDefault();

        const { username, phone, email, role, dob, updated } = this.state;

        let user = {
            username: username,
            phone: phone,
            email: email,
            role: role,
            dob: dob
        };

        var self = this;
        this.userService
            .updateProfile(user)
            .then(function(res){
               if(res != null || res != "" || res != undefined){
                   self.setState({
                       updated:true
                   });
               }
            });

    };


    render() {
        const { username, phone, email, role, dob, updated } = this.state;

        return (

            <div className="container">

                <h1>Profile</h1>


                    <div hidden={!updated} className="alert alert-success" role="alert">Profile
                        successfully saved!</div>

                    <div className="form-group row">
                        <label htmlFor="usernameFld" className="col-sm-2 col-form-label">
                            Username</label>
                        <div className="col-sm-10">
                            <input className="form-control" id="usernameFld" placeholder="john doe"
                                   required="required" name={"username"} value={username}
                                    onChange={this.handleChange}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="phoneNumberFld" className="col-sm-2 col-form-label">
                            Phone</label>
                        <div className="col-sm-10">
                            <input type="tel" className="form-control" id="phoneNumberFld"
                                   placeholder="(897) 123-4567" required="required"
                                   name={"phone"} value={phone}
                                   onChange={this.handleChange}/>
                        </div>
                    </div>


                    <div className="form-group row">
                        <label htmlFor="emailFld" className="col-sm-2 col-form-label"> Email</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="emailFld"
                                   placeholder="johndoe@email.com" required="required"
                                   name={"email"} value={email}
                                   onChange={this.handleChange}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="roleDropdown" className="col-sm-2 col-form-label">
                            Role</label>
                        <div className="col-sm-10">
                            <select className="form-control" id="roleDropdown" required="required"
                                    name={"role"} value={role}
                                    onChange={this.handleChange}>
                                <option value="faculty">Faculty</option>
                                <option value="student">Student</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="dobFld" className="col-sm-2 col-form-label"> Date of
                            Birth</label>
                        <div className="col-sm-10">
                            <input type="date" className="form-control" id="dobFld"
                                   placeholder="dd/mm/yyyy" required="required"
                                   name={"dob"} value={dob}
                                   onChange={this.handleChange}/>
                        </div>
                    </div>


                    <div className="form-group row">
                        <label htmlFor="updateBtn" className="col-sm-2 col-form-label"></label>
                        <div className="col-sm-10">
                            <button id="updateBtn" className="btn btn-success btn-block" onClick={this.update}>Update</button>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="logoutBtn" className="col-sm-2 col-form-label"></label>
                        <div className="col-sm-10">
                            <button id="logoutBtn" className="btn btn-danger btn-block"
                                    onClick={this.logout}>Logout</button>
                        </div>
                    </div>


            </div>
        )
    }
}

export default Profile;

