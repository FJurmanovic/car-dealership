import { Form } from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";

class Forms extends Form {
  plugins() {
    return {
      dvr: dvr(validatorjs)
    };
  }
}

export {Forms};
