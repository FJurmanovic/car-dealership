import React, { Component, Fragment } from 'react';
import {Link, withRouter} from 'react-router-dom'

import {range} from '../common/js/functions'

import { observer, inject } from 'mobx-react';

import EditModel from '../components/EditModel';

@inject("VehicleStore")
@observer
class ModelList extends Component {
    constructor(props) {
        super (props);

        this.setPage = this.setPage.bind(this);
    }

    componentDidMount() {
        this.props.VehicleStore.modelListState.makeId = this.props.match.params.makeId
    }


    setPage(page) {
        this.props.VehicleStore.makeListState.pageNum = page
    }

    modelById() {
        const {makeId} = this.props.match.params
        return (this.props.VehicleStore.vehicleModel.filter(x => x.makeId == makeId))
    }

    render() {
        const {makeId} = this.props.match.params
        let makeName = ""

        if(this.props.VehicleStore.vehicleMake.filter(x => x.id == makeId)[0]) {
            makeName = this.props.VehicleStore.vehicleMake.filter(x => x.id == makeId)[0].name || ""
        }
        const {pageNum, pageCount} = this.props.VehicleStore.modelListState

        return (
            <>
                <Link to={`/manufacturers`} className="back-btn btn btn-blue">Go back</Link>
                <Link to={`/manufacturers/${makeId}/new`} className="back-btn btn btn-blue float-right">New</Link>
                <div className="container col-5 my-5">
                    <h1 className="my-5 text-underline text-center">{makeName}</h1>
                    <div className="pagination btn-group d-flex">
                    {range(1, pageCount).map(page => {
                        return <button key={page} className={`page-num btn btn-group-item btn-blue ${(pageNum === page) ? "current": ""}`} onClick={() => this.setPage(page)}>{page}</button>
                    }) }
                    </div>
                    {this.modelById().filter((_, index) => (index < pageNum * 15) && (index > (pageNum * 15) - 16)).map(model => {
                            const name = model.name;
                            return (
                                <Fragment key={model.id}>
                                    {this.props.match.params.modelId == model.id && this.props.match.path == "/manufacturers/:makeId/:modelId/edit"
                                    ? <div className="make-info btn btn-squared">
                                        <EditModel model={model} />
                                      </div>
                                    : <div className="make-info btn btn-squared">
                                        <Link to={`/manufacturers/${makeId}/${model.id}/edit`} className="btn btn-icon"><div className="gg-pen"></div></Link>
                                        <Link to="/explore"><div className="text-white" onClick={() => this.props.VehicleStore.filtersSet([`"modelId" = '${model.id}'`])}>{name}</div></Link>
                                      </div>
                                    }
                                </Fragment>
                            )
                    })}
                </div>
            </>
        );
    }
}

export default withRouter(ModelList);