import React, { Component } from 'react';

import {withRouter} from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject("AddModelStore")
@observer
class AddModel extends Component {

    render() {
        const {makeId} = this.props.match.params;
        const makeName = this.props.AddModelStore.makeName(makeId);
        const {nameVal} = this.props.AddModelStore;

        return (
            <>
                <button onClick={() => this.props.history.goBack()} className="back-btn btn btn-blue">Cancel</button>
                <div className="container my-10 text-center">
                    <h1 className="my-5 text-underline">{makeName}</h1>
                    <div className="h4 my-2">Enter new model name</div>
                    <input type="text" className="width-full" value={nameVal} onChange={(e) => this.props.AddModelStore.setName(e.target.value)} />
                    <button className="btn btn-blue width-full my-4" onClick={() => this.props.AddModelStore.saveModel(makeId, this.props.history)}>Save</button>
                </div>
            </>
        );
    }
}

export default withRouter(AddModel);