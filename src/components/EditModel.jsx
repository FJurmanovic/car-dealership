import React, { Component } from 'react';

import {withRouter} from 'react-router-dom'
import {inject, observer} from 'mobx-react'

@inject("VehicleStore")
@observer
class EditModel extends Component {
    constructor(props) {
        super(props);

        this.nameRef = React.createRef();
        this.iconRef = React.createRef();
        this.saveClick = this.saveClick.bind(this);
        this.inputChange = this.inputChange.bind(this);
    }

    saveClick(event) {
        event.preventDefault();
        const {makeId, modelId} = this.props.match.params
        const {model} = this.props

        const modelObject = {
            id: modelId,
            name: this.nameRef.current.value,
            makeId: makeId
        }

        if (model.name != modelObject.name) {
            this.props.VehicleStore.putVehicleModel(modelObject);
        }

        this.props.history.push(`/manufacturers/${makeId}`);
    }

    inputChange(event) {
        event.preventDefault();
        const {model} = this.props

        if (this.nameRef.current.value == model.name){
            this.iconRef.current.className = "gg-close"
        } else {
            this.iconRef.current.className = "gg-arrow-down-r"
        }
    }

    render() {
        const {model} = this.props;

        return (
            <>
            <input type="text" defaultValue={model.name} ref={this.nameRef} onChange={this.inputChange} />
            <button onClick={this.saveClick} className="btn btn-icon"><div className="gg-close" ref={this.iconRef}></div></button>
            </>
        );
    }
}

export default withRouter(EditModel);