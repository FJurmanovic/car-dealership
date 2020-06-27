import {observable, computed, runInAction} from "mobx";
import VehicleStore from './vehicleStore'
 
import VehicleService from './services/vehicleService'

class AddStore {
    constructor() {
        this.postVehicleList = VehicleStore.postVehicleList
        this.vehicleService = new VehicleService()
    }

    @observable vehicleObject = undefined
    @observable isFetched = false
    @observable nameVal = undefined
    @observable makeVal = undefined
    @observable modelVal = undefined
    @observable yearVal = 2000
    @observable priceVal = 0
    @observable bodyVal = 0
    @observable engineVal = 0
    @observable fuelVal = undefined
    @observable speedVal = undefined
    @observable transmissionVal = 0
    @observable trunkVal = undefined
    @observable doorVal = 2

    @computed get vehicleEngine() {
        return VehicleStore.vehicleEngine
    }

    @computed get vehicleTransmission() {
        return VehicleStore.vehicleTransmission
    }

    @computed get vehicleBody() {
        return VehicleStore.vehicleBody
    }

    @computed get vehicleMake() {
        return VehicleStore.vehicleMake
    }

    @computed get vehicleModel() {
        return VehicleStore.vehicleModel
    }
    
    @computed get vehicleInfo(){
        return this.vehicleObject;
    }
}

export default new AddStore();