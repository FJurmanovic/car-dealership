import {observable} from "mobx";
import VehicleStore from './vehicleStore';
import ModelListStore from './modelListStore';


class AddModelStore {
    constructor() {
        this.postVehicleModel = VehicleStore.postVehicleModel;
    }

    makeName(makeId) {
        let makeName = '';
        
        if(VehicleStore.vehicleMake.filter(x => x.id == makeId)[0]){
            makeName = VehicleStore.vehicleMake.filter(x => x.id == makeId)[0].name;
        }

        return makeName;
    }

    saveModel(makeId, nameVal, history) {
        let makeObject = 
        {
            name: nameVal,
            makeId: makeId
        }

        this.postVehicleModel(makeObject);
        history.push(`/manufacturers/${makeId}`);
    }

    
}

export default new AddModelStore();