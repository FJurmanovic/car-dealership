import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import {range, firstUpper} from '../../common/js/functions';

@inject("VehicleStore")
@observer
class FilterBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            makeVal: null,
            modelVal: null,
            minPriceVal: null,
            maxPriceVal: null,
            minYearVal: null,
            maxYearVal: null,
            bodyVal: null,
            engineVal: null,
            transmissionVal: null,
            doorVal: null,
            minFuelVal: 0,
            maxFuelVal: 150,
            minSpeedVal: 100,
            maxSpeedVal: 400,
            minTrunkVal: 100,
            maxTrunkVal: 1000
        }

        this.filterVehicles = this.filterVehicles.bind(this);
        this.makeChange = this.makeChange.bind(this);
        this.modelChange = this.modelChange.bind(this);
        this.minPriceChange = this.minPriceChange.bind(this);
        this.maxPriceChange = this.maxPriceChange.bind(this);
        this.minYearChange = this.minYearChange.bind(this);
        this.maxYearChange = this.maxYearChange.bind(this);
        this.bodyChange = this.bodyChange.bind(this);
        this.engineChange = this.engineChange.bind(this);
        this.transmissionChange = this.transmissionChange.bind(this);
        this.doorChange = this.doorChange.bind(this);
        this.minFuelChange = this.minFuelChange.bind(this);
        this.maxFuelChange = this.maxFuelChange.bind(this);
        this.minSpeedChange = this.minSpeedChange.bind(this);
        this.maxSpeedChange = this.maxSpeedChange.bind(this);
        this.minTrunkChange = this.minTrunkChange.bind(this);
        this.maxTrunkChange = this.maxTrunkChange.bind(this);
    }

    componentDidMount() {
        this.props.VehicleStore.filtersSet({})
    }

    filterVehicles () {
        this.props.VehicleStore.filtersSet({
            makeId: this.state.makeVal,
            modelId: this.state.modelVal,
            bodyId: this.state.bodyVal,
            engineId: this.state.engineVal,
            transmissionId: this.state.transmissionVal,
            doorCount: this.state.doorVal,
            minPrice: this.state.minPriceVal,
            maxPrice: this.state.maxPriceVal,
            minYear: this.state.minYearVal,
            maxYear: this.state.maxYearVal,
            minFuel: this.state.minFuelVal,
            maxFuel: this.state.maxFuelVal,
            minSpeed: this.state.minSpeedVal,
            maxSpeed: this.state.maxSpeedVal,
            minTrunk: this.state.minTrunkVal,
            maxTrunk: this.state.maxTrunkVal
        })

        console.log(this.props.VehicleStore.filters)
    }

    modelChange(event) {
        event.preventDefault();

        if (event.target.value != "any"){
            this.setState({modelVal: event.target.value})
        } else {
            this.setState({modelVal: null})
        }
    }

    makeChange(event) {
        event.preventDefault();

        if (event.target.value != "any"){
            this.setState({makeVal: event.target.value})
        } else {
            this.setState({makeVal: null})
        }
    }

    minPriceChange(event) {
        event.preventDefault();

        if (event.target.value != "any"){
            this.setState({minPriceVal: event.target.value})
        } else {
            this.setState({minPriceVal: null})
        }
    }

    maxPriceChange(event) {
        event.preventDefault();

        if (event.target.value != "any"){
            this.setState({maxPriceVal: event.target.value})
        } else {
            this.setState({maxPriceVal: null})
        }
    }

    minYearChange(event) {
        event.preventDefault();

        if (event.target.value != "any"){
            this.setState({minYearVal: event.target.value})
        } else {
            this.setState({minYearVal: null})
        }
    }

    maxYearChange(event) {
        event.preventDefault();

        if (event.target.value != "any"){
            this.setState({maxYearVal: event.target.value})
        } else {
            this.setState({maxYearVal: null})
        }
    }

    bodyChange(event) {
        event.preventDefault();

        if (event.target.value != "any"){
            this.setState({bodyVal: event.target.value})
        } else {
            this.setState({bodyVal: null})
        }
    }

    engineChange(event) {
        event.preventDefault();

        if (event.target.value != "any"){
            this.setState({engineVal: event.target.value})
        } else {
            this.setState({engineVal: null})
        }
    }

    transmissionChange(event) {
        event.preventDefault();

        if (event.target.value != "any"){
            this.setState({transmissionVal: event.target.value})
        } else {
            this.setState({transmissionVal: null})
        }
    }

    doorChange(event) {
        event.preventDefault();

        if (event.target.value != "any"){
            this.setState({doorVal: event.target.value})
        } else {
            this.setState({doorVal: null})
        }
    }

    minFuelChange(event) {
        event.preventDefault();

        if (event.target.value != "any"){
            this.setState({minFuelVal: event.target.value})
        } else {
            this.setState({minFuelVal: null})
        }
    }

    maxFuelChange(event) {
        event.preventDefault();

        if (event.target.value != "any"){
            this.setState({maxFuelVal: event.target.value})
        } else {
            this.setState({maxFuelVal: null})
        }
    }

    minSpeedChange(event) {
        event.preventDefault();

        if (event.target.value != "any"){
            this.setState({minSpeedVal: event.target.value})
        } else {
            this.setState({minSpeedVal: null})
        }
    }

    maxSpeedChange(event) {
        event.preventDefault();

        if (event.target.value != "any"){
            this.setState({maxSpeedVal: event.target.value})
        } else {
            this.setState({maxSpeedVal: null})
        }
    }

    minTrunkChange(event) {
        event.preventDefault();

        if (event.target.value != "any"){
            this.setState({minTrunkVal: event.target.value})
        } else {
            this.setState({minTrunkVal: null})
        }
    }

    maxTrunkChange(event) {
        event.preventDefault();

        if (event.target.value != "any"){
            this.setState({maxTrunkVal: event.target.value})
        } else {
            this.setState({maxTrunkVal: null})
        }
    }

    render() {
        const {hideFilters, className} = this.props
        const {vehicleBody, vehicleEngine, vehicleList, vehicleMake, vehicleModel, vehicleTransmission} = this.props.VehicleStore
        const {makeVal, modelVal, minPriceVal, maxPriceVal, minYearVal, maxYearVal, bodyVal, engineVal, transmissionVal, doorVal, minFuelVal, maxFuelVal, minSpeedVal, maxSpeedVal, minTrunkVal, maxTrunkVal} = this.state
        
        return (
            <div className={`filters d-flex ${className}`}>
                <button className="hide-btn btn btn-squared" onClick={hideFilters}></button>
                <div className="filter-row">
                    <div className="range">
                        <label>Price</label><br />
                        <select name="minPrice" onChange={this.minPriceChange}>
                            <option>any</option>
                            {[...range(1, 30)].map(price => {
                                price = price * 25000
                                if(maxPriceVal == null || price < maxPriceVal)
                                return <option value={price}>{price}</option>
                            })}
                        </select>
                        <span>-</span>
                        <select name="maxPrice" onChange={this.maxPriceChange}>
                            <option>any</option>
                            {[...range(1, 30)].map(price => {
                                price = price * 25000
                                if(minPriceVal == null || price > minPriceVal)
                                return <option value={price}>{price}</option>
                            })}
                        </select>
                    </div>
                    <div className="range">
                        <label>Year</label><br />
                        <select name="minYear" onChange={this.minYearChange}>
                            <option>any</option>
                            {[...range(1900, new Date().getFullYear())].map(year => {
                                if(maxYearVal == null || year < maxYearVal)
                                return <option value={year}>{year}</option>
                            })}
                        </select>
                        <span>-</span>
                        <select name="maxYear" onChange={this.maxYearChange}>
                            <option>any</option>
                            {[...range(1900, new Date().getFullYear())].map(year => {
                                if(minYearVal == null || year > minYearVal)
                                return <option value={year}>{year}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="filter-row">
                    <div>
                        <label>Manufacturer</label><br />
                        <select name="makeFilter" onChange={this.makeChange}>
                            <option>any</option>
                            {vehicleMake.map(make => {
                                return <option value={make.id}>{firstUpper(make.name)}</option>
                            })}
                        </select>
                        <br />
                        <label>Model</label><br />
                        <select name="modelFilter" onChange={this.modelChange}>
                            <option>any</option>
                            {vehicleModel.filter(model => model.makeId == this.state.makeVal).map(model => {
                                return <option value={model.id}>{firstUpper(model.name)}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="filter-row">
                    <label>Body type</label><br />
                    <select name="bodyFilter" onChange={this.bodyChange}>
                        <option>any</option>
                        {vehicleBody.map(body => {
                            return <option value={body.id}>{firstUpper(body.name)}</option>
                        })}
                    </select>
                    <br />
                    <label>Engine type</label><br />
                    <select name="engineFilter" onChange={this.engineChange}>
                        <option>any</option>
                        {vehicleEngine.map(engine => {
                            return <option value={engine.id}>{firstUpper(engine.name)}</option>
                        })}
                    </select>
                </div>
                <div className="filter-row">
                    <label>Transmission type</label><br />
                     <select name="transmissionFilter" onChange={this.transmissionChange}>
                        <option>any</option>
                        {vehicleTransmission.map(transmission => {
                            return <option value={transmission.id}>{firstUpper(transmission.name)}</option>
                        })}
                    </select>
                    <br />
                    <label>Door count</label><br />
                    <select name="doorCount" onChange={this.doorChange}>
                        <option>any</option>
                        <option value="3">3</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div className="filter-row">
                    <div>
                        <label>Fuel tank capacity(l)</label><br />
                        <input type="number" name="minFuelTank" min="0" max={maxFuelVal} value={minFuelVal} onChange={this.minFuelChange} />
                        <span>-</span>
                        <input type="number" name="maxFuelTank" min={minFuelVal} max="150" value={maxFuelVal} onChange={this.maxFuelChange} />
                    </div>
                    <div>
                        <label>Top speed(km/h)</label><br />
                        <input type="number" name="minTopSpeed" min="100" max="400" value={minSpeedVal} onChange={this.minSpeedChange} />
                        <span>-</span>
                        <input type="number" name="maxTopSpeed" min="100" max="400" value={maxSpeedVal} onChange={this.maxSpeedChange} />
                    </div>
                </div>
                <div className="filter-row">
                    <label>Trunk capacity(l)</label><br />
                    <input type="number" name="minTrunkCapacity" min="100" max="1000" value={minTrunkVal} onChange={this.minTrunkChange} />
                    <span>-</span>
                    <input type="number" name="maxTrunkCapacity" min="100" max="1000" value={maxTrunkVal} onChange={this.maxTrunkChange} />
                </div>
                <button className="filter-btn btn btn-blue btn-squared" onClick={this.filterVehicles}>Filter</button>
            </div>
        );
    }
}

export default FilterBar;