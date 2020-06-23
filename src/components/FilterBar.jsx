import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import {range, firstUpper} from '../common/js/functions';

@inject("VehicleStore")
@observer
class FilterBar extends Component {
    constructor(props) {
        super(props);

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
        this.toggleFilters = this.toggleFilters.bind(this)
    }

    componentDidMount() {
        this.props.VehicleStore.filtersSet({})
    }

    filterVehicles () {
        this.props.VehicleStore.filtersSet({
            makeId: this.props.VehicleStore.filterState.makeVal,
            modelId: this.props.VehicleStore.filterState.modelVal,
            bodyId: this.props.VehicleStore.filterState.bodyVal,
            engineId: this.props.VehicleStore.filterState.engineVal,
            transmissionId: this.props.VehicleStore.filterState.transmissionVal,
            doorCount: this.props.VehicleStore.filterState.doorVal,
            minPrice: this.props.VehicleStore.filterState.minPriceVal,
            maxPrice: this.props.VehicleStore.filterState.maxPriceVal,
            minYear: this.props.VehicleStore.filterState.minYearVal,
            maxYear: this.props.VehicleStore.filterState.maxYearVal,
            minFuel: this.props.VehicleStore.filterState.minFuelVal,
            maxFuel: this.props.VehicleStore.filterState.maxFuelVal,
            minSpeed: this.props.VehicleStore.filterState.minSpeedVal,
            maxSpeed: this.props.VehicleStore.filterState.maxSpeedVal,
            minTrunk: this.props.VehicleStore.filterState.minTrunkVal,
            maxTrunk: this.props.VehicleStore.filterState.maxTrunkVal
        })

        this.props.VehicleStore.pageSet(1)
    }

    modelChange(event) {
        event.preventDefault();

        if (event.target.value != "any"){
            this.props.VehicleStore.filterState.modelVal = event.target.value
        } else {
            this.props.VehicleStore.filterState.modelVal =  null
        }
    }

    makeChange(event) {
        event.preventDefault();

        if (event.target.value != "any"){
            this.props.VehicleStore.filterState.makeVal =  event.target.value
        } else {
            this.props.VehicleStore.filterState.makeVal = null
        }
    }

    minPriceChange(event) {
        event.preventDefault();

        if (event.target.value != "any"){
            this.props.VehicleStore.filterState.minPriceVal = event.target.value
        } else {
            this.props.VehicleStore.filterState.minPriceVal = null
        }
    }

    maxPriceChange(event) {
        event.preventDefault();

        if (event.target.value != "any"){
            this.props.VehicleStore.filterState.maxPriceVal = event.target.value
        } else {
            this.props.VehicleStore.filterState.maxPriceVal = null
        }
    }

    minYearChange(event) {
        event.preventDefault();

        if (event.target.value != "any"){
            this.props.VehicleStore.filterState.minYearVal = event.target.value
        } else {
            this.props.VehicleStore.filterState.minYearVal = null
        }
    }

    maxYearChange(event) {
        event.preventDefault();

        if (event.target.value != "any"){
            this.props.VehicleStore.filterState.maxYearVal = event.target.value
        } else {
            this.props.VehicleStore.filterState.maxYearVal = null
        }
    }

    bodyChange(event) {
        event.preventDefault();

        if (event.target.value != "any"){
            this.props.VehicleStore.filterState.bodyVal = event.target.value
        } else {
            this.props.VehicleStore.filterState.bodyVal = null
        }
    }

    engineChange(event) {
        event.preventDefault();

        if (event.target.value != "any"){
            this.props.VehicleStore.filterState.engineVal = event.target.value
        } else {
            this.props.VehicleStore.filterState.engineVal = null
        }
    }

    transmissionChange(event) {
        event.preventDefault();

        if (event.target.value != "any"){
            this.props.VehicleStore.filterState.transmissionVal = event.target.value
        } else {
            this.props.VehicleStore.filterState.transmissionVal = null
        }
    }

    doorChange(event) {
        event.preventDefault();

        if (event.target.value != "any"){
            this.props.VehicleStore.filterState.doorVal = event.target.value
        } else {
            this.props.VehicleStore.filterState.doorVal = null
        }
    }

    minFuelChange(event) {
        event.preventDefault();

        if (event.target.value != "any"){
            this.props.VehicleStore.filterState.minFuelVal= event.target.value
        } else {
            this.props.VehicleStore.filterState.minFuelVal = null
        }
    }

    maxFuelChange(event) {
        event.preventDefault();

        if (event.target.value != "any"){
            this.props.VehicleStore.filterState.maxFuelVal = event.target.value
        } else {
            this.props.VehicleStore.filterState.maxFuelVal = null
        }
    }

    minSpeedChange(event) {
        event.preventDefault();

        if (event.target.value != "any"){
            this.props.VehicleStore.filterState.minSpeedVal = event.target.value
        } else {
            this.props.VehicleStore.filterState.minSpeedVal = null
        }
    }

    maxSpeedChange(event) {
        event.preventDefault();

        if (event.target.value != "any"){
            this.props.VehicleStore.filterState.maxSpeedVal = event.target.value
        } else {
            this.props.VehicleStore.filterState.maxSpeedVal = null
        }
    }

    minTrunkChange(event) {
        event.preventDefault();

        if (event.target.value != "any"){
            this.props.VehicleStore.filterState.minTrunkVal = event.target.value
        } else {
            this.props.VehicleStore.filterState.minTrunkVal = null
        }
    }

    maxTrunkChange(event) {
        event.preventDefault();

        if (event.target.value != "any"){
            this.props.VehicleStore.filterState.maxTrunkVal = event.target.value
        } else {
            this.props.VehicleStore.filterState.maxTrunkVal = null
        }
    }

    toggleFilters(event) {
        event.preventDefault();

        this.props.VehicleStore.showFilters = !this.props.VehicleStore.showFilters
    }

    render() {
        const showFilters = this.props.VehicleStore.showFilters

        const className = !showFilters ? "hidden" : ""
        const {vehicleBody, vehicleEngine, vehicleList, vehicleMake, vehicleModel, vehicleTransmission} = this.props.VehicleStore
        const {makeVal, modelVal, minPriceVal, maxPriceVal, minYearVal, maxYearVal, bodyVal, engineVal, transmissionVal, doorVal, minFuelVal, maxFuelVal, minSpeedVal, maxSpeedVal, minTrunkVal, maxTrunkVal} = this.props.VehicleStore.filterState
        
        return (
            <>
                {!showFilters && <button className="btn btn-blue btn-rounder m-5" onClick={this.toggleFilters}>Filters</button>}
                <div className={`filters d-flex ${className}`}>
                    <button className="hide-btn btn btn-squared" onClick={this.toggleFilters}></button>
                    <div className="filter-row">
                        <div className="range">
                            <label>Price (€)</label><br />
                            <select name="minPrice" onChange={this.minPriceChange} value={this.props.VehicleStore.filterState.minPriceVal}>
                                <option>any</option>
                                {[...range(1, 30)].map(price => {
                                    price = price * 25000
                                    if(maxPriceVal == null || price < maxPriceVal)
                                    return <option key={price} value={price}>{price.toLocaleString()}€</option>
                                })}
                            </select>
                            <span>-</span>
                            <select name="maxPrice" onChange={this.maxPriceChange} value={this.props.VehicleStore.filterState.maxPriceVal}>
                                <option>any</option>
                                {[...range(1, 30)].map(price => {
                                    price = price * 25000
                                    if(minPriceVal == null || price > minPriceVal)
                                    return <option key={price} value={price}>{price.toLocaleString()}€</option>
                                })}
                            </select>
                        </div>
                        <div className="range">
                            <label>Year</label><br />
                            <select name="minYear" onChange={this.minYearChange} value={this.props.VehicleStore.filterState.minYearVal}>
                                <option>any</option>
                                {[...range(1900, new Date().getFullYear())].map(year => {
                                    if(maxYearVal == null || year < maxYearVal)
                                    return <option key={year} value={year}>{year}</option>
                                })}
                            </select>
                            <span>-</span>
                            <select name="maxYear" onChange={this.maxYearChange} value={this.props.VehicleStore.filterState.maxYearVal}>
                                <option>any</option>
                                {[...range(1900, new Date().getFullYear())].map(year => {
                                    if(minYearVal == null || year > minYearVal)
                                    return <option key={year} value={year}>{year}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="filter-row">
                        <div>
                            <label>Manufacturer</label><br />
                            <select name="makeFilter" onChange={this.makeChange} value={this.props.VehicleStore.filterState.makeVal}>
                                <option>any</option>
                                {vehicleMake.map(make => {
                                    return <option key={make.id} value={make.id}>{firstUpper(make.name)}</option>
                                })}
                            </select>
                            <br />
                            <label>Model</label><br />
                            <select name="modelFilter" onChange={this.modelChange} value={this.props.VehicleStore.filterState.modelVal}>
                                <option>any</option>
                                {vehicleModel.filter(model => model.makeId == this.props.VehicleStore.filterState.makeVal).map(model => {
                                    return <option key={model.id} value={model.id}>{firstUpper(model.name)}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="filter-row">
                        <label>Body type</label><br />
                        <select name="bodyFilter" onChange={this.bodyChange} value={this.props.VehicleStore.filterState.bodyVal}>
                            <option>any</option>
                            {vehicleBody.map(body => {
                                return <option key={body.id} value={body.id}>{firstUpper(body.name)}</option>
                            })}
                        </select>
                        <br />
                        <label>Engine type</label><br />
                        <select name="engineFilter" onChange={this.engineChange} value={this.props.VehicleStore.filterState.engineVal}>
                            <option>any</option>
                            {vehicleEngine.map(engine => {
                                return <option key={engine.id} value={engine.id}>{firstUpper(engine.name)}</option>
                            })}
                        </select>
                    </div>
                    <div className="filter-row">
                        <label>Transmission type</label><br />
                        <select name="transmissionFilter" onChange={this.transmissionChange} value={this.props.VehicleStore.filterState.transmissionVal}>
                            <option>any</option>
                            {vehicleTransmission.map(transmission => {
                                return <option key={transmission.id} value={transmission.id}>{firstUpper(transmission.name)}</option>
                            })}
                        </select>
                        <br />
                        <label>Door count</label><br />
                        <select name="doorCount" onChange={this.doorChange} value={this.props.VehicleStore.filterState.doorVal}>
                            <option>any</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className="filter-row">
                        <div>
                            <label>Fuel tank capacity (l)</label><br />
                            <input type="number" name="minFuelTank" min="0" max={maxFuelVal} value={this.props.VehicleStore.filterState.minFuelVal} onChange={this.minFuelChange} />
                            <span>-</span>
                            <input type="number" name="maxFuelTank" min={minFuelVal} max="150" value={this.props.VehicleStore.filterState.maxFuelVal} onChange={this.maxFuelChange} />
                        </div>
                        <div>
                            <label>Top speed (km/h)</label><br />
                            <input type="number" name="minTopSpeed" min="100" max="400" value={this.props.VehicleStore.filterState.minSpeedVal} onChange={this.minSpeedChange} />
                            <span>-</span>
                            <input type="number" name="maxTopSpeed" min="100" max="400" value={this.props.VehicleStore.filterState.maxSpeedVal} onChange={this.maxSpeedChange} />
                        </div>
                    </div>
                    <div className="filter-row">
                        <label>Trunk capacity (l)</label><br />
                        <input type="number" name="minTrunkCapacity" min="100" max="1000" value={this.props.VehicleStore.filterState.minTrunkVal} onChange={this.minTrunkChange} />
                        <span>-</span>
                        <input type="number" name="maxTrunkCapacity" min="100" max="1000" value={this.props.VehicleStore.filterState.maxTrunkVal} onChange={this.maxTrunkChange} />
                    </div>
                    <button className="filter-btn btn btn-blue btn-squared" onClick={this.filterVehicles}>Filter</button>
                </div>
            </>
        );
    }
}

export default FilterBar;