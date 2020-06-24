import React, { Component, Fragment } from 'react';
import {Link, withRouter} from 'react-router-dom'

import {range} from '../common/js/functions'

import { observer, inject } from 'mobx-react';

@inject("VehicleStore")
@observer
class MakeList extends Component {
    constructor(props) {
        super (props);

        this.setPage = this.setPage.bind(this);
    }
    
    componentDidMount() {
        this.props.VehicleStore.makeListState.makeCount = this.props.VehicleStore.vehicleMake.length
        this.props.VehicleStore.makeListState.pageCount = Math.ceil(this.props.VehicleStore.makeListState.makeCount / 15)
    }

    setPage(page) {
        this.props.VehicleStore.makeListState.pageNum = page
    }

    makeByPage(page) {
        const {pageNum} = this.props.VehicleStore.makeListState
        return (this.props.VehicleStore.vehicleMake.filter((_, index) => (index < pageNum * 15) && (index > (pageNum * 15) - 16)))
    }

    render() {
        const {pageNum, pageCount} = this.props.VehicleStore.makeListState


        return (
            <>
                <button className="back-btn btn btn-blue" onClick={() => this.props.history.goBack()}>Go back</button>
                <Link to={`/manufacturers/new`} className="back-btn btn btn-blue float-right">New</Link>
                <div className="container col-5 my-5">
                    <div className="pagination btn-group d-flex">
                    {range(1, pageCount).map(page => {
                        return <button key={page} className={`page-num btn btn-group-item btn-blue ${(pageNum === page) ? "current": ""}`} onClick={() => this.setPage(page)}>{page}</button>
                    }) }
                    </div>
                    {this.makeByPage().map(make => {
                            const name = make.name;
                            return (
                                <Fragment key={make.id}>
                                <Link to={`/manufacturers/${make.id}`} className="make-info">
                                        <span>{name}</span>
                                    </Link>
                                </Fragment>
                            )
                    })}
                </div>
            </>
        );
    }
}

export default withRouter(MakeList);