import React, { Component } from 'react';

import AddMake from '../components/AddMake'

import Forms from '../stores/forms/forms';
const forms = new Forms();

class AddMakePage extends Component {
    render() {
        return (
            <div>
                <AddMake form={forms} />
            </div>
        );
    }
}

export default AddMakePage;