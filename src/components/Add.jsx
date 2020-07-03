import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom';

import {firstUpper, range} from '../common/js/functions';

import { observer, inject } from 'mobx-react';

@inject("AddStore")
@observer
class Add extends Component {
    constructor(props) {
        super(props);
        this.hooks = {
            onSuccess(form) {
                props.AddStore.saveClick(form.values(), props.history);
            }
        }
    }

    componentWillUnmount() {
        this.props.form.reset();
        this.props.AddStore.imgVal = "";
    }

    render() {
        const {vehicleBody, vehicleEngine, vehicleMake, vehicleModel, vehicleTransmission} = this.props.AddStore;

        const {form} = this.props;
        
        return (
            <div className="container info-page">
                <button onClick={() => this.props.history.goBack()} className="back-btn btn btn-blue">Cancel</button>
                <button 
                    className="back-btn btn btn-blue float-right" 
                    onClick={e => form.onSubmit(e, {
                        onSuccess: this.hooks.onSuccess
                    })}
                >Save</button>

                <div className="car-image">
                    {this.props.AddStore.showImage && 
                        <img alt="Car Image" src={`${this.props.AddStore.showImage}`} />
                    }
                </div>
                <div className="d-flex upper-info h4 my-1">
                    <span className="--full mt-2">
                        <span className="make-group btn-group mr-2">
                            <select className="btn-group-item" {...form.$("make").bind()}>
                                <option value={null}>Select</option>
                                {vehicleMake.map(make => {
                                    return <option key={make.id} value={make.id}>{firstUpper(make.name)}</option>
                                })}
                            </select>
                            <Link to="/manufacturers" className="btn-group-item btn btn-blue edit-btn">Edit</Link>
                        </span>
                        <select className="mr-1" {...form.$("model").bind()}>
                            <option value={null}>Select</option>
                            {vehicleModel.filter(model => model.makeId == form.$("make").value).map(model => {
                                return <option key={model.id} value={model.id}>{firstUpper(model.name)}</option>
                            })}
                        </select>
                        <select className="mr-1" {...form.$("year").bind()}>
                            <option value={null}>Select</option>
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
                            <option value={null}>Select</option>
                            {vehicleBody.map(body => {
                                return <option key={body.id} value={body.id}>{firstUpper(body.name)}</option>
                            })}
                        </select>
                        {form.$("body").error && <small className="ml-3 h5 text-red">Please select vehicle body</small>}
                    </div>
                    <div className="f4">
                        <span className="text-bold">Door count: </span>
                        <select {...form.$("door").bind()}>
                            <option value={null}>Select</option>
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
                            <option value={null}>Select</option>
                            {vehicleEngine.map(engine => {
                                return <option key={engine.id} value={engine.id}>{firstUpper(engine.name)}</option>
                            })}
                        </select>
                        {form.$("engine").error && <small className="ml-3 h5 text-red">Please select engine type</small>}
                    </div>
                    <div className="f4">
                        <span className="text-bold">{form.values().engine == 2 ? "Battery capacity: " : "Fuel tank capacity: " }</span>
                        <input type="number" {...form.$("fuel").bind()} /> {form.values().engine == 2 ? "kWh" : "l"} 
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
                            <option value={null}>Select</option>
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
                        <input type="text" value={this.props.AddStore.imgVal} onChange={(e) => this.props.AddStore.imageChange(e.target.value)} />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Add);