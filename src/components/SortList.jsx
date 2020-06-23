import React, { Component } from 'react';
import {inject, observer} from 'mobx-react'

@inject("VehicleStore")
@observer
class SortList extends Component {
    constructor(props) {
        super (props);

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        event.preventDefault()

        this.props.VehicleStore.sortBy = event.target.value
        this.props.VehicleStore.getVehicleList()
    }

    render() {

        return (
            <div className="sort">
                <span>Sort By: </span>
                <select onChange={this.handleChange} value={this.props.VehicleStore.sortBy}>
                    <option value="name|asc">Name (A-Z)</option>
                    <option value="name|desc">Name (Z-A)</option>
                    <option value="year|asc">Year (Low to High)</option>
                    <option value="year|desc">Year (High to Low)</option>
                    <option value="price|asc">Price (Low to High)</option>
                    <option value="price|desc">Price (High to Low)</option>
                </select>
            </div>
        );
    }
}

export default SortList;