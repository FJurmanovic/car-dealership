import {observable, computed, runInAction} from "mobx";

import VehicleService from './vehicleService';

class VehicleStore {
    constructor() {
        this.vehicleService = new VehicleService();
    }
    @observable vehicleMake = [
        {
            id: 0,
            name: "BMW"
        },
        {
            id: 1,
            name: "Test"
        }
    ]
    @observable vehicleModel = [
        {
            id: 0,
            name: "116i",
            makeId: 0
        },
        {
            id: 1,
            name: "Test",
            makeId: 1
        }
    ]
    @observable vehicleBody = [
        {
            id: 0,
            name: "hatchback",
        },
        {
            id: 1,
            name: "SUV"
        },
        {
            id: 2,
            name: "convertible"
        },
        {
            id: 3,
            name: "coupe"
        },
        {
            id: 4,
            name: "sedan"
        },
        {
            id: 5,
            name: "wagon"
        },
        {
            id: 6,
            name: "minivan"
        },
        {
            id: 7,
            name: "luxury"
        }
    ]
    @observable vehicleEngine = [
        {
            id: 0,
            name: "gasoline"
        },
        {
            id: 1,
            name: "diesel"
        },
        {
            id: 2,
            name: "electric"
        },
        {
            id: 3,
            name: "gasoline-hybrid"
        },
        {
            id: 4,
            name: "compressed-natural-gas"
        }
    ]
    @observable vehicleTransmission = [
        {
            id: 0,
            name: "manual"
        },
        {
            id: 1,
            name: "automatic" 
        },
        {
            id: 2,
            name: "semi-automatic"
        },
        {
            id: 3,
            name: "CVT"
        }
    ]
    @observable vehicleList = []
    @observable vehicleData = {
        
    };
    @observable searchQuery = ""
    @observable filterList = {}
    @observable status = "initial"

    @computed get filters() {
        return this.vehicleList.filter(vehicle => {
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