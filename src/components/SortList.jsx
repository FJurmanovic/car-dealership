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
    }

    render() {

        return (
            <div className="sort">
                <span>Sort By: </span>
                <select onChange={this.handleChange} value={this.props.VehicleStore.sortBy}>
                    <option value="nameAsc">Name (A-Z)</option>
                    <option value="nameDesc">Name (Z-A)</option>
                    <option value="yearAsc">Year (Low to High)</option>
                    <option value="yearDesc">Year (High to Low)</option>
                    <option value="priceAsc">Price (Low to High)</option>
                    <option value="priceDesc">Price (High to Low)</option>
                </select>
            </div>
        );
    }
}

export default SortList;