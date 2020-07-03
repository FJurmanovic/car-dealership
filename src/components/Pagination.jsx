import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {range} from '../common/js/functions';


@inject("ListStore")
@observer
class Pagination extends Component {
    render() {
        const {pageNumber, pageCount} = this.props.ListStore;

        return (
            <div className="pagination btn-group d-flex">
                {range(1, pageCount).map(page => {
                    return <button key={page} className={`page-num btn btn-group-item btn-blue ${pageNumber === page ? "current": ""}`} onClick={() => {this.props.ListStore.pageSet(page)}}>{page}</button>
                }) }
            </div>
        );
    }
}

export default Pagination;