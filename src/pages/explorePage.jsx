import React, { Component } from 'react'

import VehicleList from '../components/VehicleList'
import FilterBar from '../components/FilterBar'
import Pagination from '../components/Pagination'
import SortList from '../components/SortList'

class ExplorePage extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <>
                <FilterBar />
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
