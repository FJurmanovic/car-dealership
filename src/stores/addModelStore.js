import {observable} from "mobx";
import VehicleStore from './vehicleStore'


class AddModelStore {
    constructor() {
        this.postVehicleModel = VehicleStore.postVehicleModel
    }
    
    @observable nameVal = undefined

    makeName(makeId) {
        let makeName = ''
        
        if(VehicleStore.vehicleMake.filter(x => x.id == makeId)[0]){
            makeName = VehicleStore.vehicleMake.filter(x => x.id == makeId)[0].name
        }

        return makeName
    }

    setName(value) {
        this.nameVal = value
    }

    saveModel(makeId, history) {
        const {nameVal} = this

        if(!!nameVal){
            let makeObject = 
            {
               name: nameVal,
               makeId: makeId
            }

            this.postVehicleModel(makeObject).then(
                history.push(`/manufacturers/${makeId}`)
            )
        } else {
            alert("All boxes need to be filled")
        }
    }

    
}

export default new AddModelStore();