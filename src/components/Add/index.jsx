import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom'

import {firstUpper, range} from '../../common/js/functions'

import { observer, inject } from 'mobx-react';

@inject("VehicleStore")
@observer
class Add extends Component {
    constructor(props) {
        super (props);

        this.state = {
            makeVal: 0,
            modelVal: 0,
            yearVal: 2000,
            priceVal: 0,
            bodyVal: 0,
            doorVal: 2,
            engineVal: 0,
            fuelVal: undefined,
            speedVal: undefined,
            transmissionVal: 0,
            trunkVal: undefined
        }

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

        const firstModelVal = this.props.VehicleStore.vehicleModel.filter(model => model.makeId == event.target.value)[0].id

        this.setState({
            makeVal: event.target.value, 
            modelVal: firstModelVal
        })
    }

    modelChange(event) {
        event.preventDefault();

        this.setState({modelVal: event.target.value})
    }

    yearChange(event) {
        event.preventDefault();

        this.setState({yearVal: event.target.value})
    }

    priceChange(event) {
        event.preventDefault();

        this.setState({priceVal: event.target.value})
    }

    bodyChange(event) {
        event.preventDefault();

        this.setState({bodyVal: event.target.value})
    }

    doorChange(event) {
        event.preventDefault();

        this.setState({doorVal: event.target.value})
    }

    engineChange(event) {
        event.preventDefault();

        this.setState({engineVal: event.target.value})
    }

    fuelChange(event) {
        event.preventDefault();

        this.setState({fuelVal: event.target.value})
    }

    speedChange(event) {
        event.preventDefault();

        this.setState({speedVal: event.target.value})
    }

    transmissionChange(event) {
        event.preventDefault();

        this.setState({transmissionVal: event.target.value})
    }

    trunkChange(event) {
        event.preventDefault();

        this.setState({trunkVal: event.target.value})
    }

    saveClick(event) {
        event.preventDefault();

        const {bodyVal, doorVal, engineVal, fuelVal, modelVal, priceVal, speedVal, transmissionVal, trunkVal, yearVal} = this.state

        let allEmpty = false

        for (const [item, value] of Object.entries(this.state)) {
            if(value === undefined) {
                allEmpty = true
            }
        }

        if(!allEmpty){
            let vehicleObject = 
            {
                modelId: Number(modelVal),
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

            this.props.VehicleStore.postVehicleList(vehicleObject)
            this.props.history.push("/explore")
        } else {
            alert("All boxes need to be filled")
        }

        
    }

    render() {
        const {vehicleBody, vehicleEngine, vehicleList, vehicleMake, vehicleModel, vehicleTransmission} = this.props.VehicleStore
        const {vehicleId} = this.props.match.params
        
        return (
            <div className="container info-page">
                <button onClick={() => this.props.history.goBack()} className="back-btn btn btn-blue">Cancel</button>
                <button className="back-btn btn btn-blue float-right" onClick={this.saveClick}>Save</button>

                <div className="car-image"></div>
                <div className="d-flex upper-info h4 my-1">
                    <span className="--full">
                        <select className="mr-1" value={this.state.makeVal} onChange={this.makeChange}>
                            {vehicleMake.map(make => {
                                return <option key={make.id} value={make.id}>{firstUpper(make.name)}</option>
                            })}
                        </select>
                        <select className="mr-1" value={this.state.modelVal} onChange={this.modelChange}>
                            {vehicleModel.filter(model => model.makeId == this.state.makeVal).map(model => {
                                return <option key={model.id} value={model.id}>{firstUpper(model.name)}</option>
                            })}
                        </select>
                        <select className="mr-1" value={this.state.yearVal} onChange={this.yearChange}>
                            {[...range(1900, new Date().getFullYear())].map(year => {
                                return <option key={year} value={year}>{year}</option>
                            })}
                        </select>
                    </span>
                    <span className="h3"><input type="number" value={this.state.priceVal} onChange={this.priceChange} /> €</span>
                </div>
                <div className="lower-info my-4">
                    <div className="f4">
                        <span className="text-bold">Body type: </span> 
                        <select value={this.state.bodyVal} onChange={this.bodyChange}> 
                            {vehicleBody.map(body => {
                                return <option key={body.id} value={body.id}>{firstUpper(body.name)}</option>
                            })}
                        </select>
                    </div>
                    <div className="f4">
                        <span className="text-bold">Door count: </span>
                        <select value={this.state.doorVal} onChange={this.doorChange}>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div className="f4">
                        <span className="text-bold">Engine type: </span>
                        <select value={this.state.engineVal} onChange={this.engineChange}>
                            {vehicleEngine.map(engine => {
                                return <option key={engine.id} value={engine.id}>{firstUpper(engine.name)}</option>
                            })}
                        </select>
                    </div>
                    <div className="f4">
                        <span className="text-bold">Fuel tank capacity: </span>
                        <input type="number" value={this.state.fuelVal} onChange={this.fuelChange} /> l
                    </div>
                    <div className="f4">
                        <span className="text-bold">Top speed: </span>
                        <input type="number" value={this.state.speedVal} onChange={this.speedChange} /> km/h
                    </div>
                    <div className="f4">
                        <span className="text-bold">Transmission type: </span>
                        <select value={this.state.transmissionVal} onChange={this.transmissionChange}>
                            {vehicleTransmission.map(transmission => {
                                return <option key={transmission.id} value={transmission.id}>{firstUpper(transmission.name)}</option>
                            })}
                        </select>
                    </div>
                    <div className="f4">
                        <span className="text-bold">Trunk capacity: </span>
                        <input type="number" value={this.state.trunkVal} onChange={this.trunkChange} /> l
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Add);