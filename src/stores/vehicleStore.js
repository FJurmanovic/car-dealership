import {observable, computed, runInAction} from "mobx";

import VehicleService from './vehicleService';

class VehicleStore {
    constructor() {
        this.vehicleService = new VehicleService();
    }
    @observable vehicleMake = require("../common/data/vehicleMake.json")
    @observable vehicleModel = require("../common/data/vehicleModel.json")
    @observable vehicleBody = require("../common/data/vehicleBody.json")
    @observable vehicleEngine = require("../common/data/vehicleEngine.json")
    @observable vehicleTransmission = require("../common/data/vehicleTransmission.json")
    @observable vehicleList = []
    @observable vehicleData = {
        
    };
    @observable searchQuery = ""
    @observable filterList = {}
    @observable status = "initial"

    @computed get filters() {
        let count = 0;
        return this.vehicleList.filter(vehicle => {
            count ++
            if (count < 11){
                return (
                    (!this.filterList.modelId || this.filterList.modelId == vehicle.modelId)
                 && (!this.filterList.makeId || this.filterList.makeId == this.vehicleModel[vehicle.modelId].makeId)
                 && (!this.filterList.bodyId || this.filterList.bodyId == vehicle.bodyId)
                 && (!this.filterList.engineId || this.filterList.engineId == vehicle.engineId)
                 && (!this.filterList.transmissionId || this.filterList.transmissionId == vehicle.transmissionId)
                 && (!this.filterList.doorCount || this.filterList.doorCount == vehicle.doorCount)
                 && (!this.filterList.minPrice || this.filterList.minPrice <= vehicle.price)
                 && (!this.filterList.maxPrice || this.filterList.maxPrice >= vehicle.price)
                 && (!this.filterList.minYear || this.filterList.minYear <= vehicle.year)
                 && (!this.filterList.maxYear || this.filterList.maxYear >= vehicle.year)
                 && (!this.filterList.minFuel || this.filterList.minFuel <= vehicle.fuelTank)
                 && (!this.filterList.maxFuel || this.filterList.maxFuel >= vehicle.fuelTank)
                 && (!this.filterList.minSpeed || this.filterList.minSpeed <= vehicle.topSpeed)
                 && (!this.filterList.maxSpeed || this.filterList.maxSpeed >= vehicle.topSpeed)
                 && (!this.filterList.minTrunk || this.filterList.minTrunk <= vehicle.trunkCapacity)
                 && (!this.filterList.maxTrunk || this.filterList.maxTrunk >= vehicle.trunkCapacity)
                 )
            }   
        })
    }

    filtersSet(inputList) {
        this.filterList = inputList
    }
    

    getVehicleList = async () => {
        try {
            const data = await this.vehicleService.get()
            runInAction(() => {
                this.vehicleList = data.item
            })
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    }
}

export default new VehicleStore();