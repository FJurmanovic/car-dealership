import React, { Component, Fragment } from 'react';
import {Link, withRouter} from 'react-router-dom';

import {range} from '../common/js/functions';

import { observer, inject } from 'mobx-react';

import EditMake from '../components/EditMake';

import Forms from '../stores/forms/forms';

const fields = [
    {
        name: "name",
        type: "text",
        rules: "required|string|between:1,25",
    }
]

const forms = new Forms({fields});

@inject("MakeListStore")
@observer
class MakeList extends Component {

    componentWillUnmount() {
        this.props.MakeListStore.pageNum = 1;
    }

    render() {
        const {pageNum, pageCount} = this.props.MakeListStore;


        return (
            <>
                <Link to="/explore" className="back-btn btn btn-blue">Go back</Link>
                <Link to={`/manufacturers/new`} className="back-btn btn btn-blue float-right">New</Link>
                <div className="container my-5">
                    <div className="pagination btn-group d-flex">
                    {range(1, pageCount).map(page => {
                        return <button key={page} className={`page-num btn btn-group-item btn-blue ${(pageNum === page) ? "current": ""}`} onClick={() => this.props.MakeListStore.setPage(page)}>{page}</button>
                    }) }
                    </div>
                    {this.props.MakeListStore.makeByPage().map(make => {
                            const name = make.name;
                            return (
                                <Fragment key={make.id}>
                                    {this.props.match.params.makeId == make.id && this.props.match.path == "/manufacturers/:makeId/edit"
                                    ? <div className="make-info btn btn-squared">
                                        <EditMake make={make} form={forms} />
                                      </div>
                                    : <div className="make-info btn btn-squared">
                                        <Link to={`/manufacturers/${make.id}/edit`} className="abs-right btn btn-icon"><div className="gg-pen"></div></Link>
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