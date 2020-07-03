import {observable, computed} from "mobx";
import VehicleStore from './vehicleStore';


class EditMakeStore {
    @observable make = {};
    @observable formName = null;

    @computed get iconClass() {
        if (this.formName.value == this.make.name || this.formName.value == ""){
            return "gg-close";
        }
            return "gg-arrow-down-r";
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

