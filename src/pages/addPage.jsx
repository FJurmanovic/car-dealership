import React, { Component } from 'react';

import Add from '../components/Add'

import Forms from '../stores/forms/forms';

const fields = [
      {
        name: "make",
        rules: "required"
      },
      {
        name: "model",
        rules: "required"
      },
      {
        name: "year",
        rules: "required|digits:4"
      },
      {
        name: "price",
        type: "number",
        rules: "required|digits_between:3,8"
      },
      {
        name: "body",
        rules: "required"
      },
      {
        name: "engine",
        rules: "required"
      },
      {
        name: "fuel",
        type: "number",
        rules: "required"
      },
      {
        name: "door",
        rules: "required"
      },
      {
        name: "speed",
        type: "number",
        rules: "required"
      },
      {
        name: "transmission",
        rules: "required"
      },
      {
        name: "trunk",
        type: "number",
        rules: "required"
      }
];

const forms = new Forms({fields});
class AddPage extends Component {
    render() {
        return (
            <Add form={forms} />
        );
    }
}

export default AddPage;