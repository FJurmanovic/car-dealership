import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom'

import {firstUpper, range} from '../common/js/functions'

import { observer, inject } from 'mobx-react';

@inject("EditStore")
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

    componentWillMount() {
        this.props.EditStore.getVehicleById(this.props.match.params.vehicleId)
    }
    
    makeChange(event) {
        event.preventDefault();

        const firstModelVal = this.props.EditStore.vehicleModel.filter(model => model.makeId == event.target.value)[0].id

        this.props.EditStore.makeVal = event.target.value
        this.props.EditStore.modelVal = firstModelVal

        const {makeVal, modelVal, yearVal} = this.props.EditStore
        const {vehicleMake, vehicleModel} = this.props.EditStore

        this.props.EditStore.nameVal = `${vehicleMake.filter(x => x.id == makeVal)[0].name} ${vehicleModel.filter(x => x.id == modelVal)[0].name} ${yearVal}.`
    }

    modelChange(event) {
        event.preventDefault();

        this.props.EditStore.modelVal = event.target.value

        const {makeVal, modelVal, yearVal} = this.props.EditStore
        const {vehicleMake, vehicleModel} = this.props.EditStore

        this.props.EditStore.nameVal = `${vehicleMake.filter(x => x.id == makeVal)[0].name} ${vehicleModel.filter(x => x.id == modelVal)[0].name} ${yearVal}.`
    }

    yearChange(event) {
        event.preventDefault();

        this.props.EditStore.yearVal = event.target.value

        const {makeVal, modelVal, yearVal} = this.props.EditStore
        const {vehicleMake, vehicleModel} = this.props.EditStore

        this.props.EditStore.nameVal = `${vehicleMake.filter(x => x.id == makeVal)[0].name} ${vehicleModel.filter(x => x.id == modelVal)[0].name} ${yearVal}.`
    }

    priceChange(event) {
        event.preventDefault();

        this.props.EditStore.priceVal = event.target.value
    }

    bodyChange(event) {
        event.preventDefault();

        this.props.EditStore.bodyVal = event.target.value
    }

    doorChange(event) {
        event.preventDefault();

        this.props.EditStore.doorVal = event.target.value
    }

    engineChange(event) {
        event.preventDefault();

        this.props.EditStore.engineVal = event.target.value
    }

    fuelChange(event) {
        event.preventDefault();

        this.props.EditStore.fuelVal = event.target.value
    }

    speedChange(event) {
        event.preventDefault();

        this.props.EditStore.speedVal = event.target.value
    }

    transmissionChange(event) {
        event.preventDefault();

        this.props.EditStore.transmissionVal = event.target.value
    }

    trunkChange(event) {
        event.preventDefault();

        this.props.EditStore.trunkVal = event.target.value
    }

    saveClick(event) {
        event.preventDefault();

        const {makeVal, bodyVal, doorVal, engineVal, fuelVal, modelVal, priceVal, speedVal, transmissionVal, trunkVal, yearVal, nameVal} = this.props.EditStore

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

        this.props.EditStore.putVehicleList(vehicleObject)
        this.props.history.push(`/vehicle/${vehicleId}`)
}

    renderEdit() {
        const {vehicleBody, vehicleEngine, vehicleMake, vehicleModel, vehicleTransmission} = this.props.EditStore
        const {vehicleId} = this.props.match.params
        
        return (
            <div className="info-page container">
                <Link to={`/vehicle/${vehicleId}`} className="back-btn btn btn-blue">Cancel</Link>
                <button className="back-btn btn btn-blue float-right" onClick={this.saveClick}>Save</button>
                <div className="car-image"></div>
                <div className="d-flex upper-info h4 my-1">
                    <span className="--full">
                        <span className="make-group btn-group mr-2">
                            <select className="btn-group-item" value={this.props.EditStore.makeVal} onChange={this.makeChange}>
                                {vehicleMake.map(make => {
                                    return <option key={make.id} value={make.id}>{firstUpper(make.name)}</option>
                                })}
                            </select>
                            <Link to="/manufacturers" className="btn-group-item btn btn-blue edit-btn">Edit</Link>
                        </span>
                        <select className="btn-group-item" value={this.props.EditStore.modelVal} onChange={this.modelChange}>
                            {vehicleModel.filter(model => model.makeId == this.props.EditStore.makeVal).map(model => {
                                return <option key={model.id} value={model.id}>{firstUpper(model.name)}</option>
                            })}
                        </select>
                        <select className="mr-1" value={this.props.EditStore.yearVal} onChange={this.yearChange}>
                            {[...range(1900, new Date().getFullYear())].map(year => {
                                return <option key={year} value={year}>{year}</option>
                            })}
                        </select>
                    </span>
                    <span className="h3"><input type="number" value={this.props.EditStore.priceVal} onChange={this.priceChange} /> €</span>
                </div>
                <div className="lower-info my-4">
                    <div className="f4">
                        <span className="text-bold">Body type: </span> 
                        <select value={this.props.EditStore.bodyVal} onChange={this.bodyChange}> 
                            {vehicleBody.map(body => {
                                return <option key={body.id} value={body.id}>{firstUpper(body.name)}</option>
                            })}
                        </select>
                    </div>
                    <div className="f4">
                        <span className="text-bold">Door count: </span>
                        <select value={this.props.EditStore.doorVal} onChange={this.doorChange}>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                    </div>
                    <div className="f4">
                        <span className="text-bold">Engine type: </span>
                        <select value={this.props.EditStore.engineVal} onChange={this.engineChange}>
                            {vehicleEngine.map(engine => {
                                return <option key={engine.id} value={engine.id}>{firstUpper(engine.name)}</option>
                            })}
                        </select>
                    </div>
                    <div className="f4">
                        <span className="text-bold">{this.props.EditStore.engineVal == 2 ? "Battery capacity: " : "Fuel tank capacity: " }</span>
                        <input type="number" value={this.props.EditStore.fuelVal} onChange={this.fuelChange} /> {this.props.EditStore.engineVal == 2 ? "kWh" : "l"}
                    </div>
                    <div className="f4">
                        <span className="text-bold">Top speed: </span>
                        <input type="number" value={this.props.EditStore.speedVal} onChange={this.speedChange} /> km/h
                    </div>
                    <div className="f4">
                        <span className="text-bold">Transmission type: </span>
                        <select value={this.props.EditStore.transmissionVal} onChange={this.transmissionChange}>
                            {vehicleTransmission.map(transmission => {
                                return <option key={transmission.id} value={transmission.id}>{firstUpper(transmission.name)}</option>
                            })}
                        </select>
                    </div>
                    <div className="f4">
                        <span className="text-bold">Trunk capacity: </span>
                        <input type="number" value={this.props.EditStore.trunkVal} onChange={this.trunkChange} /> l
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="info-page container">
                {this.props.EditStore.vehicleInfo 
                ? this.renderEdit()
                : <div>Vehicle ID could not been found. Please go <Link to="/explore">back</Link></div>
                }
            </div>
        )
    }
}

export default withRouter(Edit);