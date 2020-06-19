import React, { Component } from 'react'

import VehicleList from '../components/VehicleList'
import FilterBar from '../components/FilterBar'

class Explore extends Component {
    constructor(props){
        super(props);
        this.state = {
            showFilters: false
        }
    }

    componentDidMount() {
    }

    render() {
        const {showFilters} = this.state;

        return (
            <>
                {showFilters 
                ?<FilterBar 
                    hideFilters={() => this.setState({showFilters: false})}
                 />
                :<button className="btn btn-blue btn-rounder m-5" onClick={() => this.setState({showFilters: true})}>Filters</button>
                }
                <div className="explore">
                    <VehicleList />
                </div>
            </>
        )}
}

export default Explore;
