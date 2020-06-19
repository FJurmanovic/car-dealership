import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';

@inject("VehicleStore")
@observer
class FilterBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modelVal: null
        }

        this.filterVehicles = this.filterVehicles.bind(this);
        this.modelChange = this.modelChange.bind(this);
    }

    filterVehicles () {
        this.props.VehicleStore.filtersSet({
            modelId: this.state.modelVal
        })

        console.log(this.props.VehicleStore.filters)
    }

    modelChange(event) {
        event.preventDefault();

        this.setState({modelVal: event.target.value})
    }

    render() {
        const {hideFilters} = this.props
        const {vehicleBody, vehicleEngine, vehicleList, vehicleMake, vehicleModel, vehicleTransmission} = this.props.VehicleStore
        
        return (
            <div className="filters d-flex">
                <button className="btn btn-default btn-squared" onClick={hideFilters}>Hide</button>
                <div>
                    <input type="range" name="minPrice" min="0" max="100000" />
                    <input type="range" name="maxPrice" min="0" max="100000" />
                    <input type="range" name="minYear" min="1900" max="2020" />
                    <input type="range" name="maxYear" min="1900" max="2020" />
                </div>
                <div>
                    <select name="makeFilter">
                        <option>any</option>
                        {vehicleMake.map(make => {
                            return <option value={make.id}>{make.name}</option>
                        })}
                    </select>
                    <select name="modelFilter" onChange={this.modelChange}>
                        <option>any</option>
                        {vehicleModel.map(model => {
                            return <option value={model.id}>{model.name}</option>
                        })}
                    </select>
                    <select name="bodyFilter">
                        <option>any</option>
                        {vehicleBody.map(body => {
                            return <option value={body.id}>{body.name}</option>
                        })}
                    </select>
                    <select name="engineFilter">
                        <option>any</option>
                        {vehicleEngine.map(engine => {
                            return <option value={engine.id}>{engine.name}</option>
                        })}
                    </select>
                    <select name="transmissionFilter">
                        <option>any</option>
                        {vehicleTransmission.map(transmission => {
                            return <option value={transmission.id}>{transmission.name}</option>
                        })}
                    </select>
                    <select name="doorCount">
                        <option>any</option>
                        <option value="3">3</option>
                        <option value="5">5</option>
                    </select>
                    <br />
                    <input type="range" name="minFuelTank" min="0" max="150" />
                    <input type="range" name="maxFuelTank" min="0" max="150" />
                </div>
                <div>
                    <input type="range" name="minTopSpeed" min="100" max="300" />
                    <input type="range" name="maxTopSpeed" min="100" max="300" />
                    <input type="range" name="minTrunkCapacity" min="100" max="1000" />
                    <input type="range" name="maxTrunkCapacity" min="100" max="1000" />
                </div>
                <button className="btn btn-blue btn-squared" onClick={this.filterVehicles}>Filter</button>
            </div>
        );
    }
}

export default FilterBar;