import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

@inject("VehicleStore")
@observer
class SortList extends Component {
    render() {

        return (
            <div className="sort">
                <span>Sort By: </span>
                <select onChange={(e) => this.props.VehicleStore.handleSort(e.target.value)} value={this.props.VehicleStore.sortBy}>
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