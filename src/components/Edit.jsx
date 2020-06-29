import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom';

import {firstUpper, range} from '../common/js/functions';

import { observer, inject } from 'mobx-react';

import RemoveAlert from './RemoveAlert';

@inject("EditStore")
@observer
class Edit extends Component {

    componentWillMount() {
        this.props.EditStore.getVehicleById(this.props.match.params.vehicleId);
    }

    renderEdit() {
        const {vehicleBody, vehicleEngine, vehicleMake, vehicleModel, vehicleTransmission} = this.props.EditStore;
        const {vehicleId} = this.props.match.params;
        
        return (
            <div className="info-page container">
                <Link to={`/vehicle/${vehicleId}`} className="back-btn btn btn-blue">Cancel</Link>
                <button className="back-btn btn btn-blue float-right" onClick={() => this.props.EditStore.saveClick(vehicleId, this.props.history)}>Save</button>
                <button className="back-btn btn btn-link float-right" onClick={() => this.props.EditStore.removeClick()}>Remove</button>
                {this.props.EditStore.showAlert &&
                    <RemoveAlert store={this.props.EditStore} vehicleId={vehicleId} history={this.props.history} />
                }
                <div className="car-image">
                    {this.props.EditStore.showImage && 
                        <img alt={`${this.props.EditStore.nameVal}`} src={`${this.props.EditStore.showImage}`} />
                    }
                </div>
                <div className="d-flex upper-info h4 my-1">
                    <span className="--full">
                        <span className="make-group btn-group mr-2">
                            <select className="btn-group-item" value={this.props.EditStore.makeVal} onChange={(e) => this.props.EditStore.makeChange(e.target.value)}>
                                {vehicleMake.map(make => {
                                    return <option key={make.id} value={make.id}>{firstUpper(make.name)}</option>
                                })}
                            </select>
                            <Link to="/manufacturers" className="btn-group-item btn btn-blue edit-btn">Edit</Link>
                        </span>
                        <select className="btn-group-item" value={this.props.EditStore.modelVal} onChange={(e) => this.props.EditStore.modelChange(e.target.value)}>
                            {vehicleModel.filter(model => model.makeId == this.props.EditStore.makeVal).map(model => {
                                return <option key={model.id} value={model.id}>{firstUpper(model.name)}</option>
                            })}
                        </select>
                        <select className="mr-1" value={this.props.EditStore.yearVal} onChange={(e) => this.props.EditStore.yearChange(e.target.value)}>
                            {[...range(1900, new Date().getFullYear())].map(year => {
                                return <option key={year} value={year}>{year}</option>
                            })}
                        </select>
                    </span>
                    <span className="h3"><input type="number" value={this.props.EditStore.priceVal} onChange={(e) => this.props.EditStore.priceChange(e.target.value)} /> €</span>
                </div>
                <div className="lower-info my-4">
                    <div className="f4">
                        <span className="text-bold">Body type: </span> 
                        <select value={this.props.EditStore.bodyVal} onChange={(e) => this.props.EditStore.bodyChange(e.target.value)}> 
                            {vehicleBody.map(body => {
                                return <option key={body.id} value={body.id}>{firstUpper(body.name)}</option>
                            })}
                        </select>
                    </div>
                    <div className="f4">
                        <span className="text-bold">Door count: </span>
                        <select value={this.props.EditStore.doorVal} onChange={(e) => this.props.EditStore.doorChange(e.target.value)}>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                    </div>
                    <div className="f4">
                        <span className="text-bold">Engine type: </span>
                        <select value={this.props.EditStore.engineVal} onChange={(e) => this.props.EditStore.engineChange(e.target.value)}>
                            {vehicleEngine.map(engine => {
                                return <option key={engine.id} value={engine.id}>{firstUpper(engine.name)}</option>
                            })}
                        </select>
                    </div>
                    <div className="f4">
                        <span className="text-bold">{this.props.EditStore.engineVal == 2 ? "Battery capacity: " : "Fuel tank capacity: " }</span>
                        <input type="number" value={this.props.EditStore.fuelVal} onChange={(e) => this.props.EditStore.fuelChange(e.target.value)} /> {this.props.EditStore.engineVal == 2 ? "kWh" : "l"}
                    </div>
                    <div className="f4">
                        <span className="text-bold">Top speed: </span>
                        <input type="number" value={this.props.EditStore.speedVal} onChange={(e) => this.props.EditStore.speedChange(e.target.value)} /> km/h
                    </div>
                    <div className="f4">
                        <span className="text-bold">Transmission type: </span>
                        <select value={this.props.EditStore.transmissionVal} onChange={(e) => this.props.EditStore.transmissionChange(e.target.value)}>
                            {vehicleTransmission.map(transmission => {
                                return <option key={transmission.id} value={transmission.id}>{firstUpper(transmission.name)}</option>
                            })}
                        </select>
                    </div>
                    <div className="f4">
                        <span className="text-bold">Trunk capacity: </span>
                        <input type="number" value={this.props.EditStore.trunkVal} onChange={(e) => this.props.EditStore.trunkChange(e.target.value)} /> l
                    </div>
                    <div className="f4">
                        <span className="text-bold">Image url: </span>
                        <input type="text" value={this.props.EditStore.imgVal} onChange={(e) => this.props.EditStore.imageChange(e.target.value)} />
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