import React, { Component } from 'react';

class RemoveAlert extends Component {

    render() {
        return (
            <div className="remove-alert">
                <div className="alert">
                    <span className="text text-center">{this.props.children}</span>
                    <div className="buttons">
                        <button className="btn btn-blue" onClick={() => this.props.store.alertDeleteClick(this.props.removeId, this.props.history)}>Delete</button>
                        <button className="btn btn-link" onClick={() => this.props.store.alertCancelClick()}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default RemoveAlert;