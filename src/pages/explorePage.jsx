import React, { Component } from 'react'

import {VehicleList, FilterBar, Pagination, SortList, TotalResults} from '../components';

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
                <TotalResults />
                <div className="explore">
                    <VehicleList />
                </div>
                <Pagination />
            </>
        )}
}

export default ExplorePage;
