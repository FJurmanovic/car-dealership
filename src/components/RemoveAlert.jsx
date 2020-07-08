import React, { Component } from 'react';

class RemoveAlert extends Component {

    render() {
        return (
            <div className="remove-alert">
                <div className="alert">
                    <span className="text text-center">Are you sure you want to delete {this.props.store.vehicleObject.name}</span>
                    <div className="buttons">
                        <button className="btn btn-blue" onClick={() => this.props.store.alertDeleteClick(this.props.vehicleId, this.props.history)}>Delete</button>
                        <button className="btn btn-link" onClick={() => this.props.store.alertCancelClick()}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default RemoveAlert;