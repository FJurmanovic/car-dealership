import React, { Component } from 'react';

import {withRouter} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import {RemoveAlert} from './';

@inject("EditModelStore")
@observer
class EditModel extends Component {
    constructor(props){
        super(props);
        this.hooks = {
            onSuccess(form){
                props.EditModelStore.saveClick(form.values(), props.history);
            },
            onError(){
                props.history.push(`/manufacturers/${props.match.params.makeId}`);
            }
        }
    }

    componentWillMount() {
        const {model} = this.props;
        const {modelId} = this.props.match.params;
        this.props.form.$("name").set(model.name);
        this.props.EditModelStore.model = model;
        this.props.EditModelStore.formName = this.props.form.$("name");
        this.props.EditModelStore.getVehicleById(modelId);
    }
    
    componentWillUnmount() {
        this.props.form.reset();
    }

    render() {
        const {modelId} = this.props.match.params;
        const {form} = this.props;
        return (
            <>
                <button
                    onClick={() => this.props.EditModelStore.removeClick()}
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
                {this.props.EditModelStore.actionName}
                </button>
                {this.props.EditModelStore.showAlert && 
                    <RemoveAlert store={this.props.EditModelStore} removeId={modelId} history={this.props.history}>
                        Are you sure you want to delete manufacturer {form.$("name").value}
                    </RemoveAlert>
                }
            </>
        );
    }
}

export default withRouter(EditModel);