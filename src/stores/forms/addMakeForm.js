import { Form } from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";

import AddMakeStore from '../addMakeStore';

class AddMakeForm extends Form {
  plugins() {
    return {
      dvr: dvr(validatorjs)
    };
  }

  setup() {
    return {
      fields: [
        {
          name: "name",
          type: "text",
          rules: "required|string|between:1,25",
        }
      ]
    };
  }
}

export default AddMakeForm;
