import {observable, computed} from "mobx";
import {VehicleStore} from './';

class EditModelStore {
    @observable model = {};
    @observable formName = null;

    @computed get iconClass() {
        if (this.formName.value == this.model.name || this.formName.value == ""){
            return "gg-close";
        }
            return "gg-arrow-down-r";
    }

    saveClick(value, history) {
        const {makeId, id} = this.model;
        const {name} = value;

        const modelObject = {
            id: id,
            name: name,
            makeId: makeId
        }

        if (this.model.name != modelObject.name) {
            VehicleStore.putVehicleModel(modelObject);
            history.push(`/manufacturers/${makeId}`);
        } else {
            history.push(`/manufacturers/${makeId}`);
        }
    }
}

export default new EditModelStore();

