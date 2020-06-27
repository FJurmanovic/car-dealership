import React, { Component } from 'react';

import {withRouter} from 'react-router-dom'
import { inject, observer } from 'mobx-react';

@inject("AddMakeStore")
@observer
class AddMake extends Component {

    render() {
        const {nameVal} = this.props.AddMakeStore

        return (
            <>
                <button onClick={() => this.props.history.goBack()} className="back-btn btn btn-blue">Cancel</button>
                <div className="container col-4 my-10 text-center">
                    <div className="h4 my-2">Enter new manufacturer name</div>
                    <input type="text" className="width-full" value={nameVal} onChange={(e) => this.props.AddMakeStore.setName(e.target.value)} />
                    <button className="btn btn-blue width-full my-4" onClick={() => this.props.AddMakeStore.saveMake(this.props.history)}>Save</button>
                </div>
            </>
        );
    }
}

export default withRouter(AddMake);