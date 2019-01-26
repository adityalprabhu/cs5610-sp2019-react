import React from 'react'
import ReactDOM from 'react-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import CourseList from "./containers/CourseList";
// import CourseTable from "./containers/CourseTable";

ReactDOM.render(
    <div className="container-fluid">
        <CourseList/>
    </div>,
    document.getElementById("root")
);