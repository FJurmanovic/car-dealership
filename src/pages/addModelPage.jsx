import React, { Component } from 'react';

import AddModel from '../components/AddModel'

import Forms from '../stores/forms/forms';

const fields = [
    {
        name: "name",
        type: "text",
        rules: "required|string|between:1,25",
    }
]

const forms = new Forms({fields});

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