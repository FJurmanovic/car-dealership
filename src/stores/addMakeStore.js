import {VehicleStore} from './';

class AddMakeStore {
    constructor() {
        this.postVehicleMake = VehicleStore.postVehicleMake;
    }
    
    saveMake(nameVal, history) {
        let makeObject = 
        {
            name: nameVal
        }

        this.postVehicleMake(makeObject);
        history.push("/manufacturers");
    }

    
}

export default new AddMakeStore();