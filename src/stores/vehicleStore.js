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
    @observable sortBy = "name|asc"
    @observable searchQuery = undefined
    @observable filterList = {}
    @observable status = "initial"
    @observable pageNumber = 1
    @observable showFilters = false
    @observable totalRecords = 0

    @observable filterState = {
        makeVal: null,
        modelVal: null,
        minPriceVal: null,
        maxPriceVal: null,
        minYearVal: null,
        maxYearVal: null,
        bodyVal: null,
        engineVal: null,
        transmissionVal: null,
        doorVal: null,
        minFuelVal: 0,
        maxFuelVal: 150,
        minSpeedVal: 100,
        maxSpeedVal: 400,
        minTrunkVal: 100,
        maxTrunkVal: 1000
    }

    @observable editState = {
        nameVal: undefined,
        makeVal: undefined,
        modelVal: undefined,
        yearVal: undefined,
        priceVal: undefined,
        bodyVal: undefined,
        doorVal: undefined,
        engineVal: undefined,
        fuelVal: undefined,
        speedVal: undefined,
        transmissionVal: undefined,
        trunkVal: undefined,
        componentUpdated: false
    }

    @observable addState = {
        makeVal: 0,
        modelVal: 0,
        yearVal: 2000,
        priceVal: 0,
        bodyVal: 0,
        doorVal: 2,
        engineVal: 0,
        fuelVal: undefined,
        speedVal: undefined,
        transmissionVal: 0,
        trunkVal: undefined
    }

    @computed get pageCount() {
        return Math.ceil(this.totalRecords / 10)
    }


    filtersSet(inputList) {
        this.searchQuery = "";
        if (inputList.length > 0) {
            this.searchQuery += "WHERE "
            for (const [i, filter] of Array.entries(inputList)){
                (inputList.length > (i + 1)) ? this.searchQuery += filter + " and " : this.searchQuery += filter
            }
        } else {
            this.searchQuery = undefined
        }
        
        this.getVehicleList()
    }

    pageSet(page) {
        this.pageNumber = page

        this.getVehicleList()
    }
    

    getVehicleList = async () => {
        try {
            let params = {
                page: this.pageNumber,
                rpp: 10
            }
            if (this.sortBy) {
                params.sort = this.sortBy
            }
            if (this.searchQuery) {
                params.searchQuery = this.searchQuery
            }
            let urlParams = new URLSearchParams(Object.entries(params))
            let data = await this.vehicleService.get(urlParams)
            runInAction(() => {
                this.vehicleList = data.item
                this.totalRecords = data.totalRecords
            })
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    }

    postVehicleList = async (object) => {
        try {
            let data = await this.vehicleService.post(object)
            runInAction(() => {
                this.vehicleList.push(data)
            })
        } catch (error) {
            runInAction(() => {
                this.status = "error"
            })
        }
    }

    putVehicleList = async (object) => {
        try {
            let data = await this.vehicleService.put(object)
            if (data.status == 204){
                runInAction(() => {
                    this.status = "update"
                    this.updateVehicle(object)
                }
            )}
        } catch (error) {
            runInAction(() => {
                this.status = "error"
            })
        }
    }

    updateVehicle = (vehicleObject) => {
        let index = this.vehicleList.findIndex(x => x.id === vehicleObject.id)
        this.vehicleList[index] = vehicleObject
    }
}

export default new VehicleStore();