import React, { Component } from 'react'

import VehicleList from '../components/VehicleList'
import FilterBar from '../components/FilterBar'
import Pagination from '../components/Pagination'
import SortList from '../components/SortList'

class ExplorePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            showFilters: false
        }
    }

    render() {
        const {showFilters} = this.state;

        return (
            <>
                <FilterBar 
                    className={!showFilters ? "hidden" : ""}
                    hideFilters={() => this.setState({showFilters: false})}
                />
                {!showFilters && <button className="btn btn-blue btn-rounder m-5" onClick={() => this.setState({showFilters: true})}>Filters</button>}
                <SortList />
                <Pagination />
                <div className="explore">
                    <VehicleList />
                </div>
                <Pagination />
            </>
        )}
}

export default ExplorePage;
