import React from 'react'
import {Link} from 'react-router-dom'

const ModuleListItem = ({module, selectModule, deleteModule, selectedModuleId}) =>
    <li onClick={() => selectModule(module)}
        className={['list-group-item', module.id == selectedModuleId ? 'active' : ''].join(" ")}>
        <div className="row">
            <div className="col-8">{module.title}</div>
            <div className="col-4" >
                <Link className="btn btn-warning" to={``}>
                    <i className="fas fa-pencil-alt"></i>
                </Link>
                <span>       </span>
                <button className="btn btn-danger" onClick={() => deleteModule(module.id)}>
                    <i className="fas fa-times"></i>
                </button>
            </div>

        </div>
    </li>;

export default ModuleListItem;