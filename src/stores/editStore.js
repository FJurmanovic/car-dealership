import {observable, computed, runInAction} from "mobx";
import VehicleStore from './vehicleStore'
 
import VehicleService from './vehicleService'

class EditStore {
    constructor() {
        this.putVehicleList = VehicleStore.putVehicleList
        this.vehicleService = new VehicleService()
    }

    @observable vehicleObject = undefined
    @observable isFetched = false
    @observable nameVal = undefined
    @observable makeVal = undefined
    @observable modelVal = undefined
    @observable yearVal = undefined
    @observable priceVal = undefined
    @observable bodyVal = undefined
    @observable engineVal = undefined
    @observable fuelVal = undefined
    @observable speedVal = undefined
    @observable transmissionVal = undefined
    @observable trunkVal = undefined
    @observable doorVal = undefined

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

    loadValues = (object) => {
        this.nameVal = object.name
        this.makeVal = object.makeId
        this.modelVal = object.modelId
        this.yearVal = object.year
        this.priceVal = object.price
        this.bodyVal = object.bodyId
        this.engineVal = object.engineId
        this.fuelVal = object.fuelTank
        this.speedVal = object.topSpeed
        this.transmissionVal = object.transmissionId
        this.trunkVal = object.trunkCapacity
        this.doorVal = object.doorCount
    }
    
    getVehicleById = async (id) => {
        try {
            let data = await this.vehicleService.getId(id)
            runInAction(() => {
                if(data.id){
                    this.vehicleObject = data
                    this.loadValues(data)
                }
            })
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    }
}

export default new EditStore();