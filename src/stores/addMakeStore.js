import {observable} from "mobx";
import VehicleStore from './vehicleStore';


class AddMakeStore {
    constructor() {
        this.postVehicleMake = VehicleStore.postVehicleMake;
    }
    
    @observable nameVal = null;

    setName(value) {
        this.nameVal = value;
    }

    saveMake(history) {
        const {nameVal} = this;
        if(!!nameVal){
            let makeObject = 
            {
               name: nameVal
            }

            this.postVehicleMake(makeObject);

            history.push("/manufacturers");
        } else {
            alert("All boxes need to be filled");
        }
    }

    
}

export default new AddMakeStore();