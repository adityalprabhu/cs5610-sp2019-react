import React from 'react'
import {Link} from 'react-router-dom'

const ModuleListItem = ({module, selectModule, deleteModule, selectedModuleId, editTitle}) =>
    <li onClick={() => selectModule(module)}
        className={['list-group-item', module.id == selectedModuleId ? 'active' : ''].join(" ")}>
        <div className="row">
            <div className="col-8">{module.title}</div>
            <div className="col-4" >
                <button className="btn btn-warning" onClick={() => editTitle()}>
                    <i className="fas fa-pencil-alt"></i>
                </button>
                <span>       </span>
                <button className="btn btn-danger" onClick={(e) => deleteModule(e, module.id)}>
                    <i className="fas fa-trash"></i>
                </button>
            </div>

        </div>
    </li>;

export default ModuleListItem;