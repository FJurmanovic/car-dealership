import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom';

import {firstUpper, range} from '../common/js/functions';

import { observer, inject } from 'mobx-react';

import {RemoveAlert} from './';

@inject("EditStore")
@observer
class Edit extends Component {
    constructor(props) {
        super (props);
        this.hooks = {
            onSuccess(form) {
                props.EditStore.saveClick(form.values(), props.match.params.vehicleId, props.history);
            }
        }
    }

    componentWillMount() {
        this.props.EditStore.getVehicleById(this.props.form, this.props.match.params.vehicleId);
    }

    componentWillUnmount() {
        this.props.form.reset();
        this.props.EditStore.imgVal = "";
    }

    renderEdit() {
        const {vehicleBody, vehicleEngine, vehicleMake, vehicleModel, vehicleTransmission} = this.props.EditStore;
        const {vehicleId} = this.props.match.params;

        const {form} = this.props
        
        return (
            <div className="info-page container">
                <Link to={`/vehicle/${vehicleId}`} className="back-btn btn btn-blue">Cancel</Link>
                <button 
                    className="back-btn btn btn-blue float-right" 
                    onClick={e => form.onSubmit(e, {
                        onSuccess: this.hooks.onSuccess
                    })}
                >Save</button>
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
                    <span className="--full mt-2">
                        <span className="make-group btn-group mr-2">
                            <select className="btn-group-item" {...form.$("make").bind()}>
                                {vehicleMake.map(make => {
                                    return <option key={make.id} value={make.id}>{firstUpper(make.name)}</option>
                                })}
                            </select>
                            <Link to="/manufacturers" className="btn-group-item btn btn-blue edit-btn">Edit</Link>
                        </span>
                        <select className="btn-group-item" {...form.$("model").bind()}>
                            {vehicleModel.filter(model => model.makeId == form.$("make").value).map(model => {
                                return <option key={model.id} value={model.id}>{firstUpper(model.name)}</option>
                            })}
                        </select>
                        <select className="mr-1" {...form.$("year").bind()}>
                            {[...range(1900, new Date().getFullYear())].map(year => {
                                return <option key={year} value={year}>{year}</option>
                            })}
                        </select>
                    </span>
                    <span className="h3"><input type="number" {...form.$("price").bind()} /> €</span>
                </div>
                {form.$("make").error && <small className="h5 text-red d-block">Please select vehicle manufacturer</small>}
                {form.$("model").error && <small className="h5 text-red d-block">Please select vehicle model</small>}
                {form.$("year").error && <small className="h5 text-red d-block">Please select year</small>}
                {form.$("price").error && <small className="h5 text-red d-block">Please enter price</small>}
                <div className="lower-info my-4">
                    <div className="f4">
                        <span className="text-bold">Body type: </span> 
                        <select {...form.$("body").bind()}> 
                            {vehicleBody.map(body => {
                                return <option key={body.id} value={body.id}>{firstUpper(body.name)}</option>
                            })}
                        </select>
                        {form.$("body").error && <small className="ml-3 h5 text-red">Please select vehicle body</small>}
                    </div>
                    <div className="f4">
                        <span className="text-bold">Door count: </span>
                        <select {...form.$("door").bind()}>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        {form.$("door").error && <small className="ml-3 h5 text-red">Please select number of car doors</small>}
                    </div>
                    <div className="f4">
                        <span className="text-bold">Engine type: </span>
                        <select {...form.$("engine").bind()}>
                            {vehicleEngine.map(engine => {
                                return <option key={engine.id} value={engine.id}>{firstUpper(engine.name)}</option>
                            })}
                        </select>
                        {form.$("engine").error && <small className="ml-3 h5 text-red">Please select engine type</small>}
                    </div>
                    <div className="f4">
                        <span className="text-bold">{form.$("engine").value == 2 ? "Battery capacity: " : "Fuel tank capacity: " }</span>
                        <input type="number" {...form.$("fuel").bind()} /> {form.$("engine").value == 2 ? "kWh" : "l"}
                        {form.$("fuel").error && <small className="ml-3 h5 text-red">Please enter {form.values().engine == 2 ? "battery capacity" : "fuel tank capacity" }</small>}
                    </div>
                    <div className="f4">
                        <span className="text-bold">Top speed: </span>
                        <input type="number" {...form.$("speed").bind()} /> km/h
                        {form.$("speed").error && <small className="ml-3 h5 text-red">Please enter vehicle top speed</small>}
                    </div>
                    <div className="f4">
                        <span className="text-bold">Transmission type: </span>
                        <select {...form.$("transmission").bind()}>
                            {vehicleTransmission.map(transmission => {
                                return <option key={transmission.id} value={transmission.id}>{firstUpper(transmission.name)}</option>
                            })}
                        </select>
                        {form.$("transmission").error && <small className="ml-3 h5 text-red">Please select transmission type</small>}
                    </div>
                    <div className="f4">
                        <span className="text-bold">Trunk capacity: </span>
                        <input type="number" {...form.$("trunk").bind()} /> l
                        {form.$("trunk").error && <small className="ml-3 h5 text-red">Please enter trunk capacity</small>}
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