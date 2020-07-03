import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

@inject("ListStore")
@observer
class TotalResults extends Component {
    render() {
        return (
            <div className="mx-auto text-center h5">
                <span>{this.props.ListStore.totalRecords} total results.</span>
            </div>
        );
    }
}

export default TotalResults;