import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom'

import {firstUpper, range} from '../common/js/functions'

import { observer, inject } from 'mobx-react';

@inject("AddStore")
@observer
class Add extends Component {
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
    makeChange(event) {
        event.preventDefault();

        const firstModelVal = this.props.AddStore.vehicleModel.filter(model => model.makeId == event.target.value)[0].id

        this.props.AddStore.makeVal = event.target.value 
        this.props.AddStore.modelVal = firstModelVal

        const {makeVal, modelVal, yearVal} = this.props.AddStore
        const {vehicleMake, vehicleModel} = this.props.AddStore

        this.props.AddStore.nameVal = `${vehicleMake.filter(x => x.id == makeVal)[0].name} ${vehicleModel.filter(x => x.id == modelVal)[0].name} ${yearVal}.`
    }

    modelChange(event) {
        event.preventDefault();

        this.props.AddStore.modelVal = event.target.value 

        const {makeVal, modelVal, yearVal} = this.props.AddStore
        const {vehicleMake, vehicleModel} = this.props.AddStore

        this.props.AddStore.nameVal = `${vehicleMake.filter(x => x.id == makeVal)[0].name} ${vehicleModel.filter(x => x.id == modelVal)[0].name} ${yearVal}.`
    }

    yearChange(event) {
        event.preventDefault();

        this.props.AddStore.yearVal = event.target.value 
    
        const {makeVal, modelVal, yearVal} = this.props.AddStore
        const {vehicleMake, vehicleModel} = this.props.AddStore

        this.props.AddStore.nameVal = `${vehicleMake.filter(x => x.id == makeVal)[0].name} ${vehicleModel.filter(x => x.id == modelVal)[0].name} ${yearVal}.`
    }

    priceChange(event) {
        event.preventDefault();

        this.props.AddStore.priceVal = event.target.value 
    }

    bodyChange(event) {
        event.preventDefault();

        this.props.AddStore.bodyVal = event.target.value 
    }

    doorChange(event) {
        event.preventDefault();

        this.props.AddStore.doorVal = event.target.value 
    }

    engineChange(event) {
        event.preventDefault();

        this.props.AddStore.engineVal = event.target.value 
    }

    fuelChange(event) {
        event.preventDefault();

        this.props.AddStore.fuelVal = event.target.value 
    }

    speedChange(event) {
        event.preventDefault();

        this.props.AddStore.speedVal = event.target.value 
    }

    transmissionChange(event) {
        event.preventDefault();

        this.props.AddStore.transmissionVal = event.target.value 
    }

    trunkChange(event) {
        event.preventDefault();

        this.props.AddStore.trunkVal = event.target.value 
    }

    saveClick(event) {
        event.preventDefault();

        const {nameVal, makeVal, bodyVal, doorVal, engineVal, fuelVal, modelVal, priceVal, speedVal, transmissionVal, trunkVal, yearVal} = this.props.AddStore

        let allEmpty = false

        for (const [name, value] of Object.entries(this.props.AddStore)) {
            if(value === undefined && name.includes("Val")) {
                allEmpty = true
            }
        }

        if(!allEmpty){
            let vehicleObject = 
            {
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

            this.props.AddStore.postVehicleList(vehicleObject)
            this.props.history.push("/explore")
        } else {
            alert("All boxes need to be filled")
        }

        
    }

    render() {
        const {vehicleBody, vehicleEngine, vehicleMake, vehicleModel, vehicleTransmission} = this.props.AddStore
        
        return (
            <div className="container info-page">
                <button onClick={() => this.props.history.goBack()} className="back-btn btn btn-blue">Cancel</button>
                <button className="back-btn btn btn-blue float-right" onClick={this.saveClick}>Save</button>

                <div className="car-image"></div>
                <div className="d-flex upper-info h4 my-1">
                    <span className="--full">
                        <span className="make-group btn-group mr-2">
                            <select className="btn-group-item" value={this.props.AddStore.makeVal} onChange={this.makeChange}>
                                <option>Select</option>
                                {vehicleMake.map(make => {
                                    return <option key={make.id} value={make.id}>{firstUpper(make.name)}</option>
                                })}
                            </select>
                            <Link to="/manufacturers" className="btn-group-item btn btn-blue edit-btn">Edit</Link>
                        </span>
                        <select className="mr-1" value={this.props.AddStore.modelVal} onChange={this.modelChange}>
                            <option>Select</option>
                            {vehicleModel.filter(model => model.makeId == this.props.AddStore.makeVal).map(model => {
                                return <option key={model.id} value={model.id}>{firstUpper(model.name)}</option>
                            })}
                        </select>
                        <select className="mr-1" value={this.props.AddStore.yearVal} onChange={this.yearChange}>
                            {[...range(1900, new Date().getFullYear())].map(year => {
                                return <option key={year} value={year}>{year}</option>
                            })}
                        </select>
                    </span>
                    <span className="h3"><input type="number" value={this.props.AddStore.priceVal} onChange={this.priceChange} /> €</span>
                </div>
                <div className="lower-info my-4">
                    <div className="f4">
                        <span className="text-bold">Body type: </span> 
                        <select value={this.props.AddStore.bodyVal} onChange={this.bodyChange}> 
                            {vehicleBody.map(body => {
                                return <option key={body.id} value={body.id}>{firstUpper(body.name)}</option>
                            })}
                        </select>
                    </div>
                    <div className="f4">
                        <span className="text-bold">Door count: </span>
                        <select value={this.props.AddStore.doorVal} onChange={this.doorChange}>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div className="f4">
                        <span className="text-bold">Engine type: </span>
                        <select value={this.props.AddStore.engineVal} onChange={this.engineChange}>
                            {vehicleEngine.map(engine => {
                                return <option key={engine.id} value={engine.id}>{firstUpper(engine.name)}</option>
                            })}
                        </select>
                    </div>
                    <div className="f4">
                        <span className="text-bold">{this.props.AddStore.engineVal == 2 ? "Battery capacity: " : "Fuel tank capacity: " }</span>
                        <input type="number" value={this.props.AddStore.fuelVal} onChange={this.fuelChange} /> {this.props.AddStore.engineVal == 2 ? "kWh" : "l"} 
                    </div>
                    <div className="f4">
                        <span className="text-bold">Top speed: </span>
                        <input type="number" value={this.props.AddStore.speedVal} onChange={this.speedChange} /> km/h
                    </div>
                    <div className="f4">
                        <span className="text-bold">Transmission type: </span>
                        <select value={this.props.AddStore.transmissionVal} onChange={this.transmissionChange}>
                            {vehicleTransmission.map(transmission => {
                                return <option key={transmission.id} value={transmission.id}>{firstUpper(transmission.name)}</option>
                            })}
                        </select>
                    </div>
                    <div className="f4">
                        <span className="text-bold">Trunk capacity: </span>
                        <input type="number" value={this.props.AddStore.trunkVal} onChange={this.trunkChange} /> l
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Add);