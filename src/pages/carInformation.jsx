import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom'

import { observer, inject } from 'mobx-react';

@inject("VehicleStore")
@observer
class CarInformation extends Component {

    render() {
        const {vehicleBody, vehicleEngine, vehicleList, vehicleMake, vehicleModel, vehicleTransmission} = this.props.VehicleStore
        const {vehicleId} = this.props.match.params

        const vehicle = vehicleList.filter(vehicle => vehicle.id == vehicleId)[0]

        let title, bodyType, doorCount, engineType, fuelCapacity, topSpeed, transmissionType, trunkCapacity, price = ''

        if(!vehicleList.length > 0) {
            this.props.VehicleStore.getVehicleList()
        }

        if(vehicleList.length > 0 && !vehicle) {
            this.props.history.push("/explore")
        }
        
        if((vehicleList.length > 0 && !vehicle) || !vehicleList.length > 0){
        }else {
            title = `${vehicleMake[vehicleModel[vehicle.modelId].makeId].name} ${vehicleModel[vehicle.modelId].name} ${vehicle.year}`
            price = vehicle.price
            bodyType = vehicleBody[vehicle.bodyId].name || ''
            doorCount = vehicle.doorCount || ''
            engineType = vehicleEngine[vehicle.engineId].name || ''
            fuelCapacity = vehicle.fuelTank || ''
            topSpeed = vehicle.topSpeed || ''
            transmissionType = vehicleTransmission[vehicle.transmissionId].name || ''
            trunkCapacity = vehicle.trunkCapacity || ''
        }
        
        return (
            <div className="info-page container">
                <Link to="/explore" className="back-btn btn btn-blue">Go back</Link>
                <div className="car-image"></div>
                <div className="d-flex upper-info h2">
                    <span className="--full">{title}</span>
                    <span className="h1">{price.toLocaleString()}€</span>
                </div>
                <div className="lower-info my-4">
                    <div className="f4"><span className="text-bold">Body type:</span> {bodyType}</div>
                    <div className="f4"><span className="text-bold">Door count:</span> {doorCount}</div>
                    <div className="f4"><span className="text-bold">Engine type:</span> {engineType}</div>
                    <div className="f4"><span className="text-bold">Fuel tank capacity:</span> {fuelCapacity} l</div>
                    <div className="f4"><span className="text-bold">Top speed:</span> {topSpeed} km/h</div>
                    <div className="f4"><span className="text-bold">Transmission type:</span> {transmissionType}</div>
                    <div className="f4"><span className="text-bold">Trunk capacity:</span> {trunkCapacity} l</div>
                </div>
            </div>
        );
    }
}

export default withRouter(CarInformation);