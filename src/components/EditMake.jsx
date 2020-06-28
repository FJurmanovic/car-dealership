import React, { Component } from 'react';

import {withRouter} from 'react-router-dom'
import {inject, observer} from 'mobx-react'

@inject("EditMakeStore")
@observer
class EditMake extends Component {
    componentWillMount() {
        const {make} = this.props;
        this.props.EditMakeStore.nameVal = make.name
        this.props.EditMakeStore.make = make
    }

    render() {

        return (
            <>
                <input type="text" value={this.props.EditMakeStore.nameVal} onChange={(e) => this.props.EditMakeStore.inputChange(e.target.value)} />
                <button onClick={() => this.props.EditMakeStore.saveClick(this.props.history)} className="abs-right btn btn-icon">
                    <div className={`${this.props.EditMakeStore.iconClass}`}></div>
                </button>
            </>
        );
    }
}

export default withRouter(EditMake);