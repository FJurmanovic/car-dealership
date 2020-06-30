import React, { Component } from 'react';

import {withRouter} from 'react-router-dom';
import {inject, observer} from 'mobx-react';

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
        this.props.form.$("name").set(model.name);
        this.props.EditModelStore.model = model;
        this.props.EditModelStore.formName = this.props.form.$("name");
    }
    render() {

        const {form} = this.props;
        return (
            <>
                <input type="text" {...form.$("name").bind()} />
                <button  
                    onClick={e => form.onSubmit(e, {
                        onSuccess: this.hooks.onSuccess,
                        onError: this.hooks.onError
                    })} 
                    className="abs-right btn btn-icon"
                >
                    <div className={`${this.props.EditModelStore.iconClass}`}></div>
                </button>
            </>
        );
    }
}

export default withRouter(EditModel);