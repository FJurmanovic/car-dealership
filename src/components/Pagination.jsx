import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {range} from '../common/js/functions'


@inject("VehicleStore")
@observer
class Pagination extends Component {
    constructor(props) {
        super(props);
        
        this.setPage = this.setPage.bind(this);
    }

    setPage(page) {
        this.props.VehicleStore.pageSet(page)
    }

    render() {
        const {pageNumber, pageCount, pageSet, filters} = this.props.VehicleStore

        return (
            <div className="pagination btn-group d-flex">
                {[...range(1, pageCount)].map(page => {
                    return <button key={page} className={`page-num btn btn-group-item btn-blue ${pageNumber === page ? "current": ""}`} onClick={() => this.setPage(page)}>{page}</button>
                }) }
            </div>
        );
    }
}

export default Pagination;