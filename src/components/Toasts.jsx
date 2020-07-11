import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject("ToastStore")
@observer
class Toasts extends Component {

    render() {
        return (
            <div className="toasts">
                {this.props.ToastStore.toasts.map((toast, key) => {
                    return <div key={key} className="toast" style={{background: toast.color}}>{toast.text}</div>
                })}
            </div>
        );
    }
}

export default Toasts;