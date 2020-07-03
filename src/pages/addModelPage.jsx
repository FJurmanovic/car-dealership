import React, { Component } from 'react';

import {AddModel} from '../components'

import {Forms} from '../stores/forms';

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