import React, { Component } from 'react';

import Add from '../components/Add'

import Forms from '../stores/forms/forms';
const forms = new Forms();

class AddPage extends Component {
    render() {
        return (
            <Add form={forms} />
        );
    }
}

export default AddPage;