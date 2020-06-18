import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'

class CarInformation extends Component {
    render() {
        const {vehicleBody, vehicleEngine, vehicleList, vehicleMake, vehicleModel, vehicleTransmission} = this.props.store
        const {vehicleId} = this.props.match.params
        const vehicle = vehicleList[vehicleId]
        const title = `${vehicleMake[vehicleModel[vehicle.modelId].makeId].name} ${vehicleModel[vehicle.modelId].name} ${vehicle.year}`
        
        return (
            <div className="info-page container">
                <div className="car-image"></div>
                <div className="d-flex upper-info h2">
                    <span className="--full">{title}</span>
                    <span className="h1">{vehicle.price}€</span>
                </div>
                <div className="lower-info my-4">
                    <div className="f4"><span className="text-bold">Body make:</span> {vehicleBody[vehicle.bodyId].name}</div>
                    <div className="f4"><span className="text-bold">Door count:</span> {vehicle.doorCount}</div>
                    <div className="f4"><span className="text-bold">Engine type:</span> {vehicleEngine[vehicle.engineId].name}</div>
                    <div className="f4"><span className="text-bold">Fuel tank capacity:</span> {vehicle.fuelTank} l</div>
                    <div className="f4"><span className="text-bold">Top speed:</span> {vehicle.topSpeed} km/h</div>
                    <div className="f4"><span className="text-bold">Transmission type:</span> {vehicleTransmission[vehicle.transmissionId].name}</div>
                    <div className="f4"><span className="text-bold">Trunk capacity:</span> {vehicle.trunkCapacity} l</div>
                </div>
            </div>
        );
    }
}

export default withRouter(CarInformation);