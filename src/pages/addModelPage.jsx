import React, { Component } from 'react';

import AddModel from '../components/AddModel'

import Forms from '../stores/forms/forms';
const forms = new Forms();

class AddModelPage extends Component {
    render() {
        return (
            <div>
                <AddModel form={forms} />
            </div>
        );
    }
}

export default AddModelPage;