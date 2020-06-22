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
                <select onChange={this.handleChange}>
                    <option value="nameAsc">Name (Asc.)</option>
                    <option value="nameDesc">Name (Desc.)</option>
                    <option value="yearAsc">Year (Asc.)</option>
                    <option value="yearDesc">Year (Desc.)</option>
                    <option value="priceAsc">Price (Asc.)</option>
                    <option value="priceDesc">Price (Desc.)</option>
                </select>
            </div>
        );
    }
}

export default SortList;