import React, { Component } from 'react';

import {withRouter} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import {RemoveAlert} from './';

@inject("EditMakeStore")
@observer
class EditMake extends Component {
    constructor(props){
        super(props);
        this.hooks = {
            onSuccess(form){
                props.EditMakeStore.saveClick(form.values(), props.history);
            },
            onError(){
                props.history.push(`/manufacturers`);
            }
        }
    }
    componentWillMount() {
        const {make} = this.props;
        const {makeId} = this.props.match.params
        this.props.form.$("name").set(make.name);
        this.props.EditMakeStore.make = make;
        this.props.EditMakeStore.formName = this.props.form.$("name");
        this.props.EditMakeStore.getVehicleById(makeId);
        this.props.EditMakeStore.getModelById(makeId);
    }
    
    componentWillUnmount() {
        this.props.form.reset();
    }

    render() {
        const {form} = this.props
        const {makeId} = this.props.match.params

        return (
            <>
                <button
                    onClick={() => this.props.EditMakeStore.removeClick()}
                    className="btn btn-white btn-rounder abs-left"
                >
                    Remove
                </button>
                <input type="text" {...form.$("name").bind()} />
                <button 
                    onClick={e => form.onSubmit(e, {
                        onSuccess: this.hooks.onSuccess,
                        onError: this.hooks.onError
                    })} 
                    className="btn btn-white btn-rounder abs-right"
                >
                    {this.props.EditMakeStore.actionName}
                </button>
                {this.props.EditMakeStore.showAlert && 
                    <RemoveAlert store={this.props.EditMakeStore} removeId={makeId} history={this.props.history}>
                        Are you sure you want to delete manufacturer {form.$("name").value}
                    </RemoveAlert>
                }
            </>
        );
    }
}

export default withRouter(EditMake);