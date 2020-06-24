import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom'

import {firstUpper, range} from '../common/js/functions'

import { observer, inject } from 'mobx-react';

@inject("VehicleStore")
@observer
class Edit extends Component {
    constructor(props) {
        super (props);

        this.makeChange = this.makeChange.bind(this)
        this.modelChange = this.modelChange.bind(this)
        this.yearChange = this.yearChange.bind(this)
        this.priceChange = this.priceChange.bind(this)
        this.bodyChange = this.bodyChange.bind(this)
        this.doorChange = this.doorChange.bind(this)
        this.engineChange = this.engineChange.bind(this)
        this.fuelChange = this.fuelChange.bind(this)
        this.speedChange = this.speedChange.bind(this)
        this.transmissionChange = this.transmissionChange.bind(this)
        this.trunkChange = this.trunkChange.bind(this)
        this.saveClick = this.saveClick.bind(this)
    }

    componentDidMount() {
        const {vehicleList} = this.props.VehicleStore
        const {vehicleId} = this.props.match.params

        const vehicle = vehicleList.filter(vehicle => vehicle.id == vehicleId)[0]
        if (!!vehicle) {
            this.props.VehicleStore.editState = {
                nameVal: vehicle.name || '',
                modelVal: vehicle.modelId || 0,
                makeVal: vehicle.makeId || 0,
                yearVal: vehicle.year || 0,
                priceVal: vehicle.price || 0,
                bodyVal: vehicle.bodyId || 0,
                doorVal: vehicle.doorCount || 2,
                engineVal: vehicle.engineId || 0,
                fuelVal: vehicle.fuelTank || 0,
                speedVal: vehicle.topSpeed || 100,
                transmissionVal: vehicle.transmissionId || 0,
                trunkVal: vehicle.trunkCapacity || 0,
            }
        }
    }

    componentDidUpdate() {
        const {vehicleList} = this.props.VehicleStore
        const {vehicleId} = this.props.match.params

        const vehicle = vehicleList.filter(vehicle => vehicle.id == vehicleId)[0]
        if (!!vehicle && !this.props.VehicleStore.editState.componentUpdated) {
            this.props.VehicleStore.editState = {
                nameVal:  vehicle.name || '',
                modelVal: vehicle.modelId || 0,
                makeVal: vehicle.makeId || 0,
                yearVal: vehicle.year || 0,
                priceVal: vehicle.price || 0,
                bodyVal: vehicle.bodyId || 0,
                doorVal: vehicle.doorCount || 2,
                engineVal: vehicle.engineId || 0,
                fuelVal: vehicle.fuelTank || 0,
                speedVal: vehicle.topSpeed || 100,
                transmissionVal: vehicle.transmissionId || 0,
                trunkVal: vehicle.trunkCapacity || 0,
                componentUpdated: true
            }
        }
    }

    makeChange(event) {
        event.preventDefault();

        const firstModelVal = this.props.VehicleStore.vehicleModel.filter(model => model.makeId == event.target.value)[0].id

        this.props.VehicleStore.editState.makeVal = event.target.value
        this.props.VehicleStore.editState.modelVal = firstModelVal

        const {makeVal, modelVal, yearVal} = this.props.VehicleStore.editState
        const {vehicleMake, vehicleModel} = this.props.VehicleStore

        this.props.VehicleStore.editState.nameVal = `${vehicleMake.filter(x => x.id == makeVal)[0].name} ${vehicleModel.filter(x => x.id == modelVal)[0].name} ${yearVal}.`
    }

    modelChange(event) {
        event.preventDefault();

        this.props.VehicleStore.editState.modelVal = event.target.value

        const {makeVal, modelVal, yearVal} = this.props.VehicleStore.editState
        const {vehicleMake, vehicleModel} = this.props.VehicleStore

        this.props.VehicleStore.editState.nameVal = `${vehicleMake.filter(x => x.id == makeVal)[0].name} ${vehicleModel.filter(x => x.id == modelVal)[0].name} ${yearVal}.`
    }

    yearChange(event) {
        event.preventDefault();

        this.props.VehicleStore.editState.yearVal = event.target.value

        const {makeVal, modelVal, yearVal} = this.props.VehicleStore.editState
        const {vehicleMake, vehicleModel} = this.props.VehicleStore

        this.props.VehicleStore.editState.nameVal = `${vehicleMake.filter(x => x.id == makeVal)[0].name} ${vehicleModel.filter(x => x.id == modelVal)[0].name} ${yearVal}.`
    }

    priceChange(event) {
        event.preventDefault();

        this.props.VehicleStore.editState.priceVal = event.target.value
    }

    bodyChange(event) {
        event.preventDefault();

        this.props.VehicleStore.editState.bodyVal = event.target.value
    }

    doorChange(event) {
        event.preventDefault();

        this.props.VehicleStore.editState.doorVal = event.target.value
    }

    engineChange(event) {
        event.preventDefault();

        this.props.VehicleStore.editState.engineVal = event.target.value
    }

    fuelChange(event) {
        event.preventDefault();

        this.props.VehicleStore.editState.fuelVal = event.target.value
    }

    speedChange(event) {
        event.preventDefault();

        this.props.VehicleStore.editState.speedVal = event.target.value
    }

    transmissionChange(event) {
        event.preventDefault();

        this.props.VehicleStore.editState.transmissionVal = event.target.value
    }

    trunkChange(event) {
        event.preventDefault();

        this.props.VehicleStore.editState.trunkVal = event.target.value
    }

    saveClick(event) {
        event.preventDefault();

        const {makeVal, bodyVal, doorVal, engineVal, fuelVal, modelVal, priceVal, speedVal, transmissionVal, trunkVal, yearVal, nameVal} = this.props.VehicleStore.editState

        const {vehicleId} = this.props.match.params

        let vehicleObject = 
            {
                id: vehicleId,
                name: nameVal,
                makeId: makeVal,
                modelId: modelVal,
                bodyId: Number(bodyVal),
                doorCount: Number(doorVal),
                engineId: Number(engineVal),
                fuelTank: Number(fuelVal),
                price: Number(priceVal),
                topSpeed: Number(speedVal),
                transmissionId: Number(transmissionVal),
                trunkCapacity: Number(trunkVal),
                year: Number(yearVal)
            }

            this.props.VehicleStore.putVehicleList(vehicleObject)
            this.props.history.push(`/vehicle/${vehicleId}`)
    }

    render() {
        const {vehicleBody, vehicleEngine, vehicleList, vehicleMake, vehicleModel, vehicleTransmission} = this.props.VehicleStore
        const {vehicleId} = this.props.match.params
        let vehicle = vehicleList.filter(vehicle => vehicle.id == vehicleId)[0]
        if(!vehicle) {
            this.props.VehicleStore.getVehicleById(vehicleId)
        }

        if(!this.props.VehicleStore.infoState.vehicleObject && !vehicle) {
            this.props.history.push("/explore")
        }
        
        return (
            <div className="info-page container">
                <Link to={`/vehicle/${vehicleId}`} className="back-btn btn btn-blue">Cancel</Link>
                <button className="back-btn btn btn-blue float-right" onClick={this.saveClick}>Save</button>
                <div className="car-image"></div>
                <div className="d-flex upper-info h4 my-1">
                    <span className="--full">
                        <span className="make-group btn-group mr-2">
                            <select className="btn-group-item" value={this.props.VehicleStore.editState.makeVal} onChange={this.makeChange}>
                                {vehicleMake.map(make => {
                                    return <option key={make.id} value={make.id}>{firstUpper(make.name)}</option>
                                })}
                            </select>
                            <Link to="/manufacturers" className="btn-group-item btn btn-blue edit-btn">Edit</Link>
                        </span>
                        <select className="btn-group-item" value={this.props.VehicleStore.editState.modelVal} onChange={this.modelChange}>
                            {vehicleModel.filter(model => model.makeId == this.props.VehicleStore.editState.makeVal).map(model => {
                                return <option key={model.id} value={model.id}>{firstUpper(model.name)}</option>
                            })}
                        </select>
                        <select className="mr-1" value={this.props.VehicleStore.editState.yearVal} onChange={this.yearChange}>
                            {[...range(1900, new Date().getFullYear())].map(year => {
                                return <option key={year} value={year}>{year}</option>
                            })}
                        </select>
                    </span>
                    <span className="h3"><input type="number" value={this.props.VehicleStore.editState.priceVal} onChange={this.priceChange} /> €</span>
                </div>
                <div className="lower-info my-4">
                    <div className="f4">
                        <span className="text-bold">Body type: </span> 
                        <select value={this.props.VehicleStore.editState.bodyVal} onChange={this.bodyChange}> 
                            {vehicleBody.map(body => {
                                return <option key={body.id} value={body.id}>{firstUpper(body.name)}</option>
                            })}
                        </select>
                    </div>
                    <div className="f4">
                        <span className="text-bold">Door count: </span>
                        <select value={this.props.VehicleStore.editState.doorVal} onChange={this.doorChange}>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div className="f4">
                        <span className="text-bold">Engine type: </span>
                        <select value={this.props.VehicleStore.editState.engineVal} onChange={this.engineChange}>
                            {vehicleEngine.map(engine => {
                                return <option key={engine.id} value={engine.id}>{firstUpper(engine.name)}</option>
                            })}
                        </select>
                    </div>
                    <div className="f4">
                        <span className="text-bold">Fuel tank capacity: </span>
                        <input type="number" value={this.props.VehicleStore.editState.fuelVal} onChange={this.fuelChange} /> l
                    </div>
                    <div className="f4">
                        <span className="text-bold">Top speed: </span>
                        <input type="number" value={this.props.VehicleStore.editState.speedVal} onChange={this.speedChange} /> km/h
                    </div>
                    <div className="f4">
                        <span className="text-bold">Transmission type: </span>
                        <select value={this.props.VehicleStore.editState.transmissionVal} onChange={this.transmissionChange}>
                            {vehicleTransmission.map(transmission => {
                                return <option key={transmission.id} value={transmission.id}>{firstUpper(transmission.name)}</option>
                            })}
                        </select>
                    </div>
                    <div className="f4">
                        <span className="text-bold">Trunk capacity: </span>
                        <input type="number" value={this.props.VehicleStore.editState.trunkVal} onChange={this.trunkChange} /> l
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Edit);