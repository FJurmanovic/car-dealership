import React, { Component, Fragment } from 'react';
import {Link, withRouter} from 'react-router-dom'

import {range} from '../common/js/functions'

import { observer, inject } from 'mobx-react';

import EditMake from '../components/EditMake';

@inject("VehicleStore")
@observer
class MakeList extends Component {
    constructor(props) {
        super (props);

        this.setPage = this.setPage.bind(this);
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
                <Link to="/explore" className="back-btn btn btn-blue">Go back</Link>
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
                                    {this.props.match.params.makeId == make.id && this.props.match.path == "/manufacturers/:makeId/edit"
                                    ? <div className="make-info btn btn-squared">
                                        <EditMake make={make} />
                                      </div>
                                    : <div className="make-info btn btn-squared">
                                        <Link to={`/manufacturers/${make.id}/edit`} className="btn btn-icon"><div className="gg-pen"></div></Link>
                                        <Link to={`/manufacturers/${make.id}`}><div className="text-white">{name}</div></Link>
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

export default withRouter(MakeList);