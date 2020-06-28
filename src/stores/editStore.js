import {observable, computed, runInAction} from "mobx";
import VehicleStore from './vehicleStore'
 
import VehicleService from './services/vehicleService'

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
    @observable imgVal = ""
    @observable showAlert = false

    @computed get showImage() {
        if(this.imgVal.match(/\.(jpeg|jpg|gif|png|webm)$/)){
            return this.imgVal
        }
        return undefined
    }

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

    alertCancelClick() {
        this.showAlert = false
    }

    alertDeleteClick(vehicleId, history) {
        this.showAlert = false
        this.deleteVehicleById(vehicleId).then(
            history.push("/explore")
        )
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
        this.imgVal = object.imgUrl || ""
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

    deleteVehicleById = async (id) => {
        try {
            let data = await this.vehicleService.delete(id)
            runInAction(() => {
                data
            })
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    }

    makeChange(value) {
        const firstModelVal = this.vehicleModel.filter(model => model.makeId == value)[0].id

        this.makeVal = value
        this.modelVal = firstModelVal

        const {makeVal, modelVal, yearVal} = this
        const {vehicleMake, vehicleModel} = this

        this.nameVal = `${vehicleMake.filter(x => x.id == makeVal)[0].name} ${vehicleModel.filter(x => x.id == modelVal)[0].name} ${yearVal}.`
    }

    modelChange(value) {
        this.modelVal = value

        const {makeVal, modelVal, yearVal} = this
        const {vehicleMake, vehicleModel} = this

        this.nameVal = `${vehicleMake.filter(x => x.id == makeVal)[0].name} ${vehicleModel.filter(x => x.id == modelVal)[0].name} ${yearVal}.`
    }

    yearChange(value) {
        this.yearVal = value

        const {makeVal, modelVal, yearVal} = this
        const {vehicleMake, vehicleModel} = this

        this.nameVal = `${vehicleMake.filter(x => x.id == makeVal)[0].name} ${vehicleModel.filter(x => x.id == modelVal)[0].name} ${yearVal}.`
    }

    priceChange(value) {
        this.priceVal = value
    }

    bodyChange(value) {
        this.bodyVal = value
    }

    doorChange(value) {
        this.doorVal = value
    }

    engineChange(value) {
        this.engineVal = value
    }

    fuelChange(value) {
        this.fuelVal = value
    }

    speedChange(value) {
        this.speedVal = value
    }

    transmissionChange(value) {
        this.transmissionVal = value
    }

    trunkChange(value) {
        this.trunkVal = value
    }

    imageChange(value) {
        this.imgVal = value
    }

    saveClick(vehicleId, history) {
        const {makeVal, bodyVal, doorVal, engineVal, fuelVal, modelVal, priceVal, speedVal, transmissionVal, trunkVal, yearVal, nameVal, imgVal} = this

        let vehicleObject = 
        {
            id: vehicleId,
            name: nameVal,
            makeId: makeVal,
            modelId: modelVal,
            bodyId: Number(bodyVal),
            doorCount: Number(doorVal),
            engineId: Number(engineVal),
            fuelTank: Number(fuelVal),
            price: Number(priceVal),
            topSpeed: Number(speedVal),
            transmissionId: Number(transmissionVal),
            trunkCapacity: Number(trunkVal),
            year: Number(yearVal),
            imgUrl: imgVal
        }

        this.putVehicleList(vehicleObject).then(() => 
            {
                history.push(`/vehicle/${vehicleId}`);
            }
        )
    }
    
    removeClick() {
        this.showAlert = true
    }
}

export default new EditStore();