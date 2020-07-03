import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom';

import { observer, inject } from 'mobx-react';
import {Contact} from './';

import {Forms} from '../stores/forms';

const fields = [
    {
        name: "first_name",
        placeholder: "First name*",
        type: "text",
        rules: "required|string|between:1,25",
    },
    {
        name: "last_name",
        placeholder: "Last name*",
        type: "text",
        rules: "required|string|between:1,25",
    },
    {
        name: "phone",
        placeholder: "Personal phone*",
        type: "text",
        rules: "required|numeric"
    },
    {
        name: "email",
        placeholder: "E-mail*",
        type: "email",
        rules: "required|email"
    },
    {
        name: "address",
        placeholder: "Street address*",
        type: "text",
        rules: "required|string"
    },
    {
        name: "country",
        rules: "required"
    },
    {
        name: "state",
        placeholder: "State*",
        type: "text",
        rules: "required|string"
    },
    {
        name: "city",
        placeholder: "City*",
        type: "text",
        rules: "required|string"
    },
    {
        name: "zip",
        placeholder: "Zip code*",
        type: "text",
        rules: "required|numeric"
    },
    {
        name: "questions",
        rules: "string"
    }
]

const forms = new Forms({fields});

@inject("ViewStore")
@observer
class VehicleInformation extends Component {
    componentWillMount() {
        this.props.ViewStore.getVehicleById(this.props.match.params.vehicleId);
    }

    componentWillUnmount(){
        this.props.ViewStore.showContact = false;
        forms.reset();
    }

    renderInfo() {
        const {vehicleId} = this.props.match.params;
        let {name, price, bodyType, doorCount, engineType, engineId, fuelCapacity, topSpeed, transmissionType, trunkCapacity} = this.props.ViewStore.vehicleInfo;

        return <>
            <Link to="/explore" className="back-btn btn btn-blue">Go back</Link>
            <Link to={`/vehicle/${vehicleId}/edit`} className="back-btn btn btn-blue float-right">Edit</Link>
            <div className="car-image">
                {this.props.ViewStore.showImage && <img alt={`${name}`} src={this.props.ViewStore.showImage} />}
            </div>
            <div className="d-flex upper-info h2">
                <span className="--full">{name}</span>
                <span className="h1">{price.toLocaleString()}€</span>
            </div>
            <div className="lower-info my-4">
                <div className="f4"><span className="text-bold">Body type:</span> {bodyType}</div>
                <div className="f4"><span className="text-bold">Door count:</span> {doorCount}</div>
                <div className="f4"><span className="text-bold">Engine type:</span> {engineType}</div>
                <div className="f4"><span className="text-bold">{engineId == 2 ? "Battery capacity: " : "Fuel tank capacity: " }</span> {fuelCapacity} {engineId == 2 ? "kWh" : "l" }</div>
                <div className="f4"><span className="text-bold">Top speed:</span> {topSpeed} km/h</div>
                <div className="f4"><span className="text-bold">Transmission type:</span> {transmissionType}</div>
                <div className="f4"><span className="text-bold">Trunk capacity:</span> {trunkCapacity} l</div>
            </div>
            <Contact store={this.props.ViewStore} form={forms} />
        </>
    }

    render() {
        return (
            <div className="info-page container">
                {this.props.ViewStore.vehicleInfo 
                ? this.renderInfo()
                : <div>Vehicle ID could not been found. Please go <Link to="/explore">back</Link></div>
                }
            </div>
        )
    }
}

export default withRouter(VehicleInformation);