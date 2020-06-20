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
                return ((!this.filterList.modelId || this.filterList.modelId == vehicle.modelId) && (!this.filterList.makeId || this.filterList.makeId == this.vehicleModel[vehicle.modelId].makeId))
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