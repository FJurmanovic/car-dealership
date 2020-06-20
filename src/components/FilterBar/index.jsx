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
            modelVal: null
        }

        this.filterVehicles = this.filterVehicles.bind(this);
        this.makeChange = this.makeChange.bind(this);
        this.modelChange = this.modelChange.bind(this);
    }

    filterVehicles () {
        this.props.VehicleStore.filtersSet({
            makeId: this.state.makeVal,
            modelId: this.state.modelVal
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

    render() {
        const {hideFilters} = this.props
        const {vehicleBody, vehicleEngine, vehicleList, vehicleMake, vehicleModel, vehicleTransmission} = this.props.VehicleStore
        
        return (
            <div className="filters d-flex">
                <button className="hide-btn btn btn-squared" onClick={hideFilters}></button>
                <div className="filter-row">
                    <div className="range">
                        <label>Price</label><br />
                        <select name="minPrice">
                            <option>any</option>
                            {[...range(1, 30)].map(price => {
                                price = price * 25000
                                return <option value={price}>{price}</option>
                            })}
                        </select>
                        <span>-</span>
                        <select name="maxPrice">
                            <option>any</option>
                            {[...range(1, 30)].map(price => {
                                price = price * 25000
                                return <option value={price}>{price}</option>
                            })}
                        </select>
                    </div>
                    <div className="range">
                        <label>Year</label><br />
                        <select name="minYear">
                            <option>any</option>
                            {[...range(1990, new Date().getFullYear())].map(year => {
                                return <option value={year}>{year}</option>
                            })}
                        </select>
                        <span>-</span>
                        <select name="maxYear">
                            <option>any</option>
                            {[...range(1990, new Date().getFullYear())].map(year => {
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
                    <select name="bodyFilter">
                        <option>any</option>
                        {vehicleBody.map(body => {
                            return <option value={body.id}>{firstUpper(body.name)}</option>
                        })}
                    </select>
                    <br />
                    <label>Engine type</label><br />
                    <select name="engineFilter">
                        <option>any</option>
                        {vehicleEngine.map(engine => {
                            return <option value={engine.id}>{firstUpper(engine.name)}</option>
                        })}
                    </select>
                </div>
                <div className="filter-row">
                    <label>Transmission type</label><br />
                     <select name="transmissionFilter">
                        <option>any</option>
                        {vehicleTransmission.map(transmission => {
                            return <option value={transmission.id}>{firstUpper(transmission.name)}</option>
                        })}
                    </select>
                    <br />
                    <label>Door count</label><br />
                    <select name="doorCount">
                        <option>any</option>
                        <option value="3">3</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div className="filter-row">
                    <div>
                        <label>Fuel tank capacity</label><br />
                        <input type="number" name="minFuelTank" min="0" max="150" />
                        <span>-</span>
                        <input type="number" name="maxFuelTank" min="0" max="150" />
                    </div>
                    <div>
                        <label>Top speed</label><br />
                        <input type="number" name="minTopSpeed" min="100" max="300" />
                        <span>-</span>
                        <input type="number" name="maxTopSpeed" min="100" max="300" />
                    </div>
                </div>
                <div className="filter-row">
                    <label>Trunk capacity</label><br />
                    <input type="number" name="minTrunkCapacity" min="100" max="1000" />
                    <span>-</span>
                    <input type="number" name="maxTrunkCapacity" min="100" max="1000" />
                </div>
                <button className="filter-btn btn btn-blue btn-squared" onClick={this.filterVehicles}>Filter</button>
            </div>
        );
    }
}

export default FilterBar;