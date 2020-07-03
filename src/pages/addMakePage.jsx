import React, { Component } from 'react';

import {AddMake} from '../components'

import {Forms} from '../stores/forms';

const fields = [
    {
        name: "name",
        type: "text",
        rules: "required|string|between:1,25",
    }
]

const forms = new Forms({fields});

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