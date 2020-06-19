import {observable, computed} from "mobx";

export class Vehicles {
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
    @observable vehicleList = [
        {
            id: 0,
            modelId: 0,
            price: 27500,
            year: 2012,
            bodyId: 0,
            doorCount: 3,
            engineId: 0,
            transmissionId: 0,
            topSpeed: 210,
            fuelTank: 52,
            trunkCapacity: 360,
        },
        {
            id: 1,
            modelId: 0,
            price: 30000,
            year: 2007,
            bodyId: 0,
            doorCount: 3,
            engineId: 0,
            transmissionId: 2,
            topSpeed: 202,
            fuelTank: 53,
            trunkCapacity: 360
        },
        {
            id: 2,
            modelId: 0,
            price: 30000,
            year: 2009,
            bodyId: 0,
            doorCount: 3,
            engineId: 0,
            transmissionId: 2,
            topSpeed: 202,
            fuelTank: 53,
            trunkCapacity: 330
        },
        
    ]
    @observable filterList = []
    @computed get filters() {
        console.log(this.filterList.modelId)
        return this.vehicleList.filter(vehicle => {
                return ((!this.filterList.modelId || this.filterList.modelId == vehicle.modelId) && (!this.filterList.makeId || this.filterList.makeId == this.modelId[vehicle.modelId].makeId))
        })
    }
    filtersSet(inputList) {
        this.filterList = inputList
    }
}

export default new Vehicles;