import React, { Component } from 'react';

import AddMake from '../components/AddMake'

import AddMakeForm from '../stores/forms/addMakeForm';

const addMakeForm = new AddMakeForm();

class AddMakePage extends Component {
    render() {
        return (
            <div>
                <AddMake form={addMakeForm} />
            </div>
        );
    }
}

export default AddMakePage;