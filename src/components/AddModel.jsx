import React, { Component } from 'react';

import {withRouter} from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject("AddModelStore")
@observer
class AddModel extends Component {
    constructor(props) {
        super(props);
        this.hooks = {
            onSuccess(form) {
                props.AddModelStore.saveModel(props.match.params.makeId, form.values().name, props.history)
            }
        }
    }

    render() {
        const {makeId} = this.props.match.params;
        const makeName = this.props.AddModelStore.makeName(makeId);

        const  {form} = this.props
 
        return (
            <>
                <button onClick={() => this.props.history.goBack()} className="back-btn btn btn-blue">Cancel</button>
                <div className="container my-10 text-center">
                    <h1 className="my-5 text-underline">{makeName}</h1>
                    <label htmlFor={form.$("name").id} className="h4 my-2">Enter new model name</label>
                    <input className="width-full" {...form.$("name").bind()} />
                    <small className="h5 text-red">{form.$("name").error && "Error: Field must have value"}</small>
                    <button 
                        className="btn btn-blue width-full my-4" 
                        onClick={e => form.onSubmit(e, {
                            onSuccess: this.hooks.onSuccess
                        })}
                    >Save</button>
                </div>
            </>
        );
    }
}

export default withRouter(AddModel);