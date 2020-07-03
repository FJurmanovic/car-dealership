import React, { Component } from 'react';

import {Edit} from '../components';
import {Forms} from '../stores/forms';

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

class EditPage extends Component {
    render() {
        return (
            <Edit form={forms} />
        );
    }
}

export default EditPage;