import VehicleStore from './vehicleStore';


class AddMakeStore {
    constructor() {
        this.postVehicleMake = VehicleStore.postVehicleMake;
    }
    
    saveMake(nameVal, history) {

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