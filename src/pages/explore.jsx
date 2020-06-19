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

    render() {
        const {showFilters} = this.state;

        return (
            <>
                {showFilters 
                ?<FilterBar 
                    store={this.props.store} 
                    hideFilters={() => this.setState({showFilters: false})}
                 />
                :<button onClick={() => this.setState({showFilters: true})}>Filters</button>
                }
                <div className="explore">
                    <VehicleList store={this.props.store} />
                </div>
            </>
        )}
}

export default Explore;
