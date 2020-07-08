import React, { Component } from 'react';

import {withRouter} from 'react-router-dom';
import {inject, observer} from 'mobx-react';

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
        this.props.form.$("name").set(make.name);
        this.props.EditMakeStore.make = make;
        this.props.EditMakeStore.formName = this.props.form.$("name");
    }
    
    componentWillUnmount() {
        this.props.form.reset();
    }

    render() {
        const {form} = this.props

        return (
            <>
                <input type="text" {...form.$("name").bind()} />
                <button 
                    onClick={e => form.onSubmit(e, {
                        onSuccess: this.hooks.onSuccess,
                        onError: this.hooks.onError
                    })} 
                    className="btn btn-white btn-rounder abs-right">
                    {this.props.EditMakeStore.actionName}
                </button>
            </>
        );
    }
}

export default withRouter(EditMake);