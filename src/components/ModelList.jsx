import React, { Component, Fragment } from 'react';
import {Link, withRouter} from 'react-router-dom';

import {range} from '../common/js/functions';

import { observer, inject } from 'mobx-react';

import EditModel from '../components/EditModel';

import Forms from '../stores/forms/forms';

const fields = [
    {
        name: "name",
        type: "text",
        rules: "required|string|between:1,25",
    }
]

const forms = new Forms({fields});

@inject("ModelListStore")
@observer
class ModelList extends Component {
    componentDidMount() {
        this.props.ModelListStore.makeId = this.props.match.params.makeId;
    }

    render() {
        const {makeId} = this.props.match.params;
        
        const {pageNum, pageCount, makeName} = this.props.ModelListStore;

        return (
            <>
                <Link to={`/manufacturers`} className="back-btn btn btn-blue">Go back</Link>
                <Link to={`/manufacturers/${makeId}/new`} className="back-btn btn btn-blue float-right">New</Link>
                <div className="container my-5">
                    <h1 className="my-5 text-underline text-center">{makeName}</h1>
                    <div className="pagination btn-group d-flex">
                    {range(1, pageCount).map(page => {
                        return <button key={page} className={`page-num btn btn-group-item btn-blue ${(pageNum === page) ? "current": ""}`} onClick={() => this.props.ModelListStore.setPage(page)}>{page}</button>
                    }) }
                    </div>
                    {this.props.ModelListStore.modelById().filter((_, index) => (index < pageNum * 15) && (index > (pageNum * 15) - 16)).map(model => {
                            const name = model.name;
                            return (
                                <Fragment key={model.id}>
                                    {this.props.match.params.modelId == model.id && this.props.match.path == "/manufacturers/:makeId/:modelId/edit"
                                    ? <div className="make-info btn btn-squared">
                                        <EditModel model={model} form={forms} />
                                      </div>
                                    : <div className="make-info btn btn-squared">
                                        <Link to={`/manufacturers/${makeId}/${model.id}/edit`} className="abs-right btn btn-icon"><div className="gg-pen"></div></Link>
                                        <Link to="/explore"><div className="text-white" onClick={() => this.props.ModelListStore.filtersSet([`"modelId" = '${model.id}'`])}>{name}</div></Link>
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