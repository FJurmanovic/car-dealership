import React, { Component } from 'react';

import {withRouter} from 'react-router-dom'
import { inject, observer } from 'mobx-react';

@inject("VehicleStore")
@observer
class AddModel extends Component {
    constructor(props) {
        super(props);
        
        this.saveClick = this.saveClick.bind(this)
    }

    saveClick(event) {
        event.preventDefault();

        const {makeId} = this.props.match.params
        const {nameVal} = this.props.VehicleStore.newModelState

        if(!!nameVal){
            let makeObject = 
            {
               name: nameVal,
               makeId: makeId
            }

            this.props.VehicleStore.postVehicleModel(makeObject)
            //this.props.history.push("/manufacturers")
        } else {
            alert("All boxes need to be filled")
        }
    }

    render() {
        const {makeId} = this.props.match.params
        const makeName = this.props.VehicleStore.vehicleMake.filter(x => x.id == makeId)[0].name
        const {nameVal} = this.props.VehicleStore.newModelState

        return (
            <>
                <button onClick={() => this.props.history.goBack()} className="back-btn btn btn-blue">Cancel</button>
                <div className="container col-4 my-10 text-center">
                    <h1 className="my-5 text-underline">{makeName}</h1>
                    <div className="h4 my-2">Enter new model name</div>
                    <input type="text" className="width-full" value={nameVal} onChange={(e) => this.props.VehicleStore.newModelState.nameVal = e.target.value} />
                    <button className="btn btn-blue width-full my-4" onClick={this.saveClick}>Save</button>
                </div>
            </>
        );
    }
}

export default withRouter(AddModel);