import {observable, computed} from "mobx";
import VehicleStore from './vehicleStore';


class EditMakeStore {
    @observable make = {};
    @observable nameVal = "";

    @computed get iconClass() {
        if (this.nameVal == this.make.name){
            return "gg-close";
        }
            return "gg-arrow-down-r";
    }

    saveClick(history) {
        const {make} = this;

        const makeObject = {
            id: make.id,
            name: this.nameVal
        }

        if (make.name != makeObject.name) {
            VehicleStore.putVehicleMake(makeObject);
            history.push(`/manufacturers`);
        } else {
            history.push(`/manufacturers`);
        }
    }

    inputChange(value) {
        this.nameVal = value;
    }
}

export default new EditMakeStore();

