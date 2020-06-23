import React, { Component, Fragment } from 'react';
import {Link, withRouter} from 'react-router-dom'

import {range} from '../common/js/functions'

import { observer, inject } from 'mobx-react';

@inject("VehicleStore")
@observer
class ModelList extends Component {
    constructor(props) {
        super (props);

        this.setPage = this.setPage.bind(this);
    }
    
    componentDidMount() {
        this.props.VehicleStore.modelListState.modelCount = this.props.VehicleStore.vehicleModel.filter(x => x.makeId == this.props.match.params.makeId).length
        this.props.VehicleStore.modelListState.pageCount = Math.ceil(this.props.VehicleStore.modelListState.modelCount / 15)
    }

    setPage(page) {
        this.props.VehicleStore.makeListState.pageNum = page
    }

    modelById() {
        const {pageNum, modelCount, pageCount} = this.props.VehicleStore.modelListState
        const {makeId} = this.props.match.params
        return (this.props.VehicleStore.vehicleModel.filter(x => x.makeId == makeId))
    }

    render() {
        const {vehicleMake, vehicleModel, vehicleList, vehicleTransmission, vehicleEngine, vehicleBody, makePageCount} = this.props.VehicleStore
        const {makeId} = this.props.match.params
        const {pageNum, modelCount, pageCount} = this.props.VehicleStore.modelListState

        console.log(this.modelById(), makeId)


        return (
            <>
                <button className="back-btn btn btn-blue" onClick={() => this.props.history.goBack()}>Go back</button>
                <Link to={`/manufacturers/${makeId}/new`} className="back-btn btn btn-blue float-right">New</Link>
                <div className="container col-5 my-5">
                    <div className="pagination btn-group d-flex">
                    {range(1, pageCount).map(page => {
                        return <button key={page} className={`page-num btn btn-group-item btn-blue ${(pageNum === page) ? "current": ""}`} onClick={() => this.setPage(page)}>{page}</button>
                    }) }
                    </div>
                    {this.modelById().filter((_, index) => (index < pageNum * 15) && (index > (pageNum * 15) - 16)).map(make => {
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

export default withRouter(ModelList);