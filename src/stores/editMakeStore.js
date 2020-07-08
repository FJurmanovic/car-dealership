import {observable, computed} from "mobx";
import {VehicleStore} from './';

class EditMakeStore {
    @observable make = {};
    @observable formName = null;

    @computed get actionName() {
        if (this.formName.value == this.make.name || this.formName.value == ""){
            return "Cancel";
        }
            return "Save";
    }

    saveClick(value, history) {
        const {name} = value;

        const makeObject = {
            id: this.make.id,
            name: name
        }

        if (this.make.name != makeObject.name) {
            VehicleStore.putVehicleMake(makeObject);
            history.push(`/manufacturers`);
        } else {
            history.push(`/manufacturers`);
        }
    }
}

export default new EditMakeStore();

