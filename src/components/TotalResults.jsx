import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

@inject("VehicleStore")
@observer
class TotalResults extends Component {
    render() {
        return (
            <div className="mx-auto text-center h5">
                <span>{this.props.VehicleStore.totalRecords} total results.</span>
            </div>
        );
    }
}

export default TotalResults;