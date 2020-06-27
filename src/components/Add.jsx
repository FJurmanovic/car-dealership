import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom'

import {firstUpper, range} from '../common/js/functions'

import { observer, inject } from 'mobx-react';

@inject("AddStore")
@observer
class Add extends Component {

    render() {
        const {vehicleBody, vehicleEngine, vehicleMake, vehicleModel, vehicleTransmission} = this.props.AddStore
        
        return (
            <div className="container info-page">
                <button onClick={() => this.props.history.goBack()} className="back-btn btn btn-blue">Cancel</button>
                <button className="back-btn btn btn-blue float-right" onClick={() => this.props.AddStore.saveClick(this.props.history)}>Save</button>

                <div className="car-image"></div>
                <div className="d-flex upper-info h4 my-1">
                    <span className="--full">
                        <span className="make-group btn-group mr-2">
                            <select className="btn-group-item" value={this.props.AddStore.makeVal} onChange={(e) => this.props.AddStore.makeChange(e.target.value)}>
                                <option>Select</option>
                                {vehicleMake.map(make => {
                                    return <option key={make.id} value={make.id}>{firstUpper(make.name)}</option>
                                })}
                            </select>
                            <Link to="/manufacturers" className="btn-group-item btn btn-blue edit-btn">Edit</Link>
                        </span>
                        <select className="mr-1" value={this.props.AddStore.modelVal} onChange={(e) => this.props.AddStore.modelChange(e.target.value)}>
                            <option>Select</option>
                            {vehicleModel.filter(model => model.makeId == this.props.AddStore.makeVal).map(model => {
                                return <option key={model.id} value={model.id}>{firstUpper(model.name)}</option>
                            })}
                        </select>
                        <select className="mr-1" value={this.props.AddStore.yearVal} onChange={(e) => this.props.AddStore.yearChange(e.target.value)}>
                            {[...range(1900, new Date().getFullYear())].map(year => {
                                return <option key={year} value={year}>{year}</option>
                            })}
                        </select>
                    </span>
                    <span className="h3"><input type="number" value={this.props.AddStore.priceVal} onChange={(e) => this.props.AddStore.priceChange(e.target.value)} /> €</span>
                </div>
                <div className="lower-info my-4">
                    <div className="f4">
                        <span className="text-bold">Body type: </span> 
                        <select value={this.props.AddStore.bodyVal} onChange={(e) => this.props.AddStore.bodyChange(e.target.value)}> 
                            {vehicleBody.map(body => {
                                return <option key={body.id} value={body.id}>{firstUpper(body.name)}</option>
                            })}
                        </select>
                    </div>
                    <div className="f4">
                        <span className="text-bold">Door count: </span>
                        <select value={this.props.AddStore.doorVal} onChange={(e) => this.props.AddStore.doorChange(e.target.value)}>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div className="f4">
                        <span className="text-bold">Engine type: </span>
                        <select value={this.props.AddStore.engineVal} onChange={(e) => this.props.AddStore.engineChange(e.target.value)}>
                            {vehicleEngine.map(engine => {
                                return <option key={engine.id} value={engine.id}>{firstUpper(engine.name)}</option>
                            })}
                        </select>
                    </div>
                    <div className="f4">
                        <span className="text-bold">{this.props.AddStore.engineVal == 2 ? "Battery capacity: " : "Fuel tank capacity: " }</span>
                        <input type="number" value={this.props.AddStore.fuelVal} onChange={(e) => this.props.AddStore.fuelChange(e.target.value)} /> {this.props.AddStore.engineVal == 2 ? "kWh" : "l"} 
                    </div>
                    <div className="f4">
                        <span className="text-bold">Top speed: </span>
                        <input type="number" value={this.props.AddStore.speedVal} onChange={(e) => this.props.AddStore.speedChange(e.target.value)} /> km/h
                    </div>
                    <div className="f4">
                        <span className="text-bold">Transmission type: </span>
                        <select value={this.props.AddStore.transmissionVal} onChange={(e) => this.props.AddStore.transmissionChange(e.target.value)}>
                            {vehicleTransmission.map(transmission => {
                                return <option key={transmission.id} value={transmission.id}>{firstUpper(transmission.name)}</option>
                            })}
                        </select>
                    </div>
                    <div className="f4">
                        <span className="text-bold">Trunk capacity: </span>
                        <input type="number" value={this.props.AddStore.trunkVal} onChange={(e) => this.props.AddStore.trunkChange(e.target.value)} /> l
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Add);