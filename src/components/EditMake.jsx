import React, { Component } from 'react';

import {withRouter} from 'react-router-dom'
import {inject, observer} from 'mobx-react'

@inject("VehicleStore")
@observer
class EditMake extends Component {
    constructor(props) {
        super(props);

        this.nameRef = React.createRef();
        this.iconRef = React.createRef();
        this.saveClick = this.saveClick.bind(this);
        this.inputChange = this.inputChange.bind(this);
    }

    saveClick(event) {
        event.preventDefault();
        const {makeId} = this.props.match.params
        const {make} = this.props

        const makeObject = {
            id: makeId,
            name: this.nameRef.current.value
        }

        if (make.name != makeObject.name) {
            this.props.VehicleStore.putVehicleMake(makeObject);
        }

        this.props.history.push(`/manufacturers`);
    }

    inputChange(event) {
        event.preventDefault();
        const {make} = this.props

        if (this.nameRef.current.value == make.name){
            this.iconRef.current.className = "gg-close"
        } else {
            this.iconRef.current.className = "gg-arrow-down-r"
        }
    }

    render() {
        const {make} = this.props;
        return (
            <>
            <input type="text" defaultValue={make.name} ref={this.nameRef} onChange={this.inputChange} />
            <button onClick={this.saveClick} className="btn btn-icon"><div className="gg-close" ref={this.iconRef}></div></button>
            </>
        );
    }
}

export default withRouter(EditMake);