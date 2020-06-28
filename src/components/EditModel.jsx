import React, { Component } from 'react';

import {withRouter} from 'react-router-dom'
import {inject, observer} from 'mobx-react'

@inject("EditModelStore")
@observer
class EditModel extends Component {
    componentWillMount() {
        const {model} = this.props;
        this.props.EditModelStore.nameVal = model.name
        this.props.EditModelStore.model = model
    }
    render() {

        return (
            <>
            <input type="text" value={this.props.EditModelStore.nameVal} onChange={(e) => this.props.EditModelStore.inputChange(e.target.value)} />
            <button onClick={() => this.props.EditModelStore.saveClick(this.props.history)} className="abs-right btn btn-icon">
                <div className={`${this.props.EditModelStore.iconClass}`}></div>
                </button>
            </>
        );
    }
}

export default withRouter(EditModel);