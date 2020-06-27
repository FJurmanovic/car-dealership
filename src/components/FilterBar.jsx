import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import {range, firstUpper} from '../common/js/functions';

@inject("FilterStore")
@observer
class FilterBar extends Component {
    
    render() {
        const className = !this.props.FilterStore.showFilters ? "hidden" : ""
        const {vehicleBody, vehicleEngine, vehicleMake, vehicleModel, vehicleTransmission} = this.props.FilterStore
        const {minPriceVal, maxPriceVal, minYearVal, maxYearVal, minFuelVal, maxFuelVal} = this.props.FilterStore
        
        return (
            <>
                {!this.props.FilterStore.showFilters && <>
                    <button className="btn btn-blue btn-rounder m-5" onClick={() => this.props.FilterStore.toggleFilters()}>Filters</button>
                    <button className="btn btn-blue-transparent btn-rounder m-5" onClick={() => this.props.FilterStore.filtersSet([])}>Reset</button>
                </>}
                <div className={`filters d-flex ${className}`}>
                    <button className="hide-btn btn btn-squared" onClick={() => this.props.FilterStore.toggleFilters()}></button>
                    <div className="filter-row">
                        <div className="range">
                            <label>Price (€)</label><br />
                            <select name="minPrice" onChange={(e) => this.props.FilterStore.minPriceChange(e.target.value)} value={this.props.FilterStore.minPriceVal}>
                                <option>any</option>
                                {[...range(1, 30)].map(price => {
                                    price = price * 25000
                                    if(maxPriceVal == null || price < maxPriceVal)
                                    return <option key={price} value={price}>{price.toLocaleString()}€</option>
                                })}
                            </select>
                            <span>-</span>
                            <select name="maxPrice" onChange={(e) => this.props.FilterStore.maxPriceChange(e.target.value)} value={this.props.FilterStore.maxPriceVal}>
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
                            <select name="minYear" onChange={(e) => this.props.FilterStore.minYearChange(e.target.value)} value={this.props.FilterStore.minYearVal}>
                                <option>any</option>
                                {[...range(1900, new Date().getFullYear())].map(year => {
                                    if(maxYearVal == null || year < maxYearVal)
                                    return <option key={year} value={year}>{year}</option>
                                })}
                            </select>
                            <span>-</span>
                            <select name="maxYear" onChange={(e) => this.props.FilterStore.maxYearChange(e.target.value)} value={this.props.FilterStore.maxYearVal}>
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
                            <select name="makeFilter" onChange={(e) => this.props.FilterStore.makeChange(e.target.value)} value={this.props.FilterStore.makeVal}>
                                <option>any</option>
                                {vehicleMake.map(make => {
                                    return <option key={make.id} value={make.id}>{firstUpper(make.name)}</option>
                                })}
                            </select>
                            <br />
                            <label>Model</label><br />
                            <select name="modelFilter" onChange={(e) => this.props.FilterStore.modelChange(e.target.value)} value={this.props.FilterStore.modelVal}>
                                <option>any</option>
                                {vehicleModel.filter(model => model.makeId == this.props.FilterStore.makeVal).map(model => {
                                    return <option key={model.id} value={model.id}>{firstUpper(model.name)}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="filter-row">
                        <label>Body type</label><br />
                        <select name="bodyFilter" onChange={(e) => this.props.FilterStore.bodyChange(e.target.value)} value={this.props.FilterStore.bodyVal}>
                            <option>any</option>
                            {vehicleBody.map(body => {
                                return <option key={body.id} value={body.id}>{firstUpper(body.name)}</option>
                            })}
                        </select>
                        <br />
                        <label>Engine type</label><br />
                        <select name="engineFilter" onChange={(e) => this.props.FilterStore.engineChange(e.target.value)} value={this.props.FilterStore.engineVal}>
                            <option>any</option>
                            {vehicleEngine.map(engine => {
                                return <option key={engine.id} value={engine.id}>{firstUpper(engine.name)}</option>
                            })}
                        </select>
                    </div>
                    <div className="filter-row">
                        <label>Transmission type</label><br />
                        <select name="transmissionFilter" onChange={(e) => this.props.FilterStore.transmissionChange(e.target.value)} value={this.props.FilterStore.transmissionVal}>
                            <option>any</option>
                            {vehicleTransmission.map(transmission => {
                                return <option key={transmission.id} value={transmission.id}>{firstUpper(transmission.name)}</option>
                            })}
                        </select>
                        <br />
                        <label>Door count</label><br />
                        <select name="doorCount" onChange={(e) => this.props.FilterStore.doorChange(e.target.value)} value={this.props.FilterStore.doorVal}>
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
                            <input type="number" name="minFuelTank" min="0" max={maxFuelVal} value={this.props.FilterStore.minFuelVal} onChange={(e) => this.props.FilterStore.minFuelChange(e.target.value)} />
                            <span>-</span>
                            <input type="number" name="maxFuelTank" min={minFuelVal} max="150" value={this.props.FilterStore.maxFuelVal} onChange={(e) => this.props.FilterStore.maxFuelChange(e.target.value)} />
                        </div>
                        <div>
                            <label>Top speed (km/h)</label><br />
                            <input type="number" name="minTopSpeed" min="100" max="400" value={this.props.FilterStore.minSpeedVal} onChange={(e) => this.props.FilterStore.minSpeedChange(e.target.value)} />
                            <span>-</span>
                            <input type="number" name="maxTopSpeed" min="100" max="400" value={this.props.FilterStore.maxSpeedVal} onChange={(e) => this.props.FilterStore.maxSpeedChange(e.target.value)} />
                        </div>
                    </div>
                    <div className="filter-row">
                        <label>Trunk capacity (l)</label><br />
                        <input type="number" name="minTrunkCapacity" min="100" max="1000" value={this.props.FilterStore.minTrunkVal} onChange={(e) => this.props.FilterStore.minTrunkChange(e.target.value)} />
                        <span>-</span>
                        <input type="number" name="maxTrunkCapacity" min="100" max="1000" value={this.props.FilterStore.maxTrunkVal} onChange={(e) => this.props.FilterStore.maxTrunkChange(e.target.value)} />
                    </div>
                    <button className="filter-btn btn btn-blue btn-squared" onClick={() => this.props.FilterStore.filterVehicles()}>Filter</button>
                </div>
            </>
        );
    }
}

export default FilterBar;