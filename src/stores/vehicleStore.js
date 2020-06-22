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
    @observable sortBy = "alphabet"
    @observable searchQuery = ""
    @observable filterList = {}
    @observable status = "initial"
    @observable pageNumber = 1

    

    sortList(list) {
        let sortedList = list

        switch(this.sortBy){
            case "nameAsc":
                sortedList = list.sort((a, b) => {
                    if(this.vehicleMake[this.vehicleModel[a.modelId].makeId].name > this.vehicleMake[this.vehicleModel[b.modelId].makeId].name){
                        return 1
                    }
                    if(this.vehicleMake[this.vehicleModel[a.modelId].makeId].name < this.vehicleMake[this.vehicleModel[b.modelId].makeId].name){
                        return -1
                    }
                    return 0
                })
                break;
            case "nameDesc":
                sortedList = list.sort((a, b) => {
                    if(this.vehicleMake[this.vehicleModel[a.modelId].makeId].name < this.vehicleMake[this.vehicleModel[b.modelId].makeId].name){
                        return 1
                    }
                    if(this.vehicleMake[this.vehicleModel[a.modelId].makeId].name > this.vehicleMake[this.vehicleModel[b.modelId].makeId].name){
                        return -1
                    }
                    return 0
                })
                break;
            case "yearAsc":
                sortedList = list.sort((a, b) => {
                    if(a.year > b.year){
                        return 1
                    }
                    if(a.year < b.year){
                        return -1
                    }
                    return 0
                })
                break;
            case "yearDesc":
                sortedList = list.sort((a, b) => {
                    if(a.year < b.year){
                        return 1
                    }
                    if(a.year > b.year){
                        return -1
                    }
                    return 0
                })
                break;
            case "priceAsc":
                sortedList = list.sort((a, b) => {
                    if(a.price > b.price){
                        return 1
                    }
                    if(a.price < b.price){
                        return -1
                    }
                    return 0
                })
                break;
            case "priceDesc":
                sortedList = list.sort((a, b) => {
                    if(a.price < b.price){
                        return 1
                    }
                    if(a.price > b.price){
                        return -1
                    }
                    return 0
                })
                break;
            default:
                sortedList = list
        }

        return sortedList
    }

    @computed get filters() {
        let filtered = 
            this.vehicleList.filter(vehicle => {
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
            )})

            filtered = this.sortList(filtered)

        return filtered
    }

    @computed get pageList() {
        return this.filters.filter((vehicle, index) => {
            return (index < (this.pageNumber * 10) && index > (this.pageNumber * 10) - 11)
        })
    }

    @computed get pageCount() {
        return Math.ceil(this.filters.length / 10)
    }


    filtersSet(inputList) {
        this.filterList = inputList
    }

    pageSet(page) {
        this.pageNumber = page
    }
    

    getVehicleList = async () => {
        try {
            let params = {
                rpp: 200
            }
            let urlParams = new URLSearchParams(Object.entries(params))
            let data = await this.vehicleService.get(urlParams)
            if (data.recordsPerPage < data.totalRecords) { // Safety -- if total items count is bigger than 200
                params.rpp = data.totalRecords
                urlParams = new URLSearchParams(Object.entries(params))
                data = await this.vehicleService.get(urlParams)
            }
            runInAction(() => {
                this.vehicleList = data.item
            })
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    }

    updateVehicle = (vehicleObject) => {
        let index = this.vehicleList.findIndex(x => x.id === vehicleObject.id)
        this.vehicleList[index] = vehicleObject
    }
}

export default new VehicleStore();