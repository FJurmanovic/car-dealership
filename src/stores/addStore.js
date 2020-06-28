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
    @observable imgVal = ""

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

    saveClick(history) {
        const {nameVal, makeVal, bodyVal, doorVal, engineVal, fuelVal, modelVal, priceVal, speedVal, transmissionVal, trunkVal, yearVal, imgVal} = this

        let allEmpty = false

        for (const [name, value] of Object.entries(this)) {
            if(value === undefined && name.includes("Val")) {
                allEmpty = true
            }
        }

        if(!allEmpty){
            let vehicleObject = 
            {
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

            this.postVehicleList(vehicleObject).then(
                history.push("/explore")
            )
        } else {
            alert("All boxes need to be filled")
        }

        
    }
}

export default new AddStore();