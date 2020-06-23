import {observable, computed, runInAction} from "mobx";

import VehicleService from './vehicleService';

class VehicleStore {
    constructor() {
        this.vehicleService = new VehicleService();
    }
    @observable vehicleMake = []
    @observable vehicleModel = []
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
        componentUpdated: false,
        newMake: false,
        newModel: false,
        newMakeVal: undefined,
        newModelVal: undefined
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

    @observable infoState = {
        vehicleObject: {}
    }

    @observable makeListState = {
        makeCount: 0,
        pageNum: 1,
        pageCount: 1
    }
    
    @observable modelListState = {
        modelCount: 0,
        pageNum: 1,
        pageCount: 1
    }

    @observable newMakeState = {
        nameVal: undefined
    }

    @observable newModelState = {
        nameVal: undefined,
        makeId: 0
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

    getVehicleMake = async () => {
        try {
            let params = {
                rpp: 10
            }
            if (this.sortBy) {
                params.sort = this.sortBy
            }
            if (this.searchQuery) {
                params.searchQuery = this.searchQuery
            }
            let urlParams = new URLSearchParams(Object.entries(params))
            let data = await this.vehicleService.get(urlParams, "vehicleMake")
            if (data.totalRecords > params.rpp) {
                params.rpp = data.totalRecords
                urlParams = new URLSearchParams(Object.entries(params))
                data = await this.vehicleService.get(urlParams, "vehicleMake")
            }
            runInAction(() => {
                this.vehicleMake = data.item
            })
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    }

    postVehicleMake = async (object) => {
        try {
            let data = await this.vehicleService.post(object, "vehicleMake")
            runInAction(() => {
                this.vehicleMake.push(data)
            })
        } catch (error) {
            runInAction(() => {
                this.status = "error"
            })
        }
    }

    getVehicleModel = async () => {
        try {
            let params = {
                rpp: 10
            }
            if (this.sortBy) {
                params.sort = this.sortBy
            }
            if (this.searchQuery) {
                params.searchQuery = this.searchQuery
            }
            let urlParams = new URLSearchParams(Object.entries(params))
            let data = await this.vehicleService.get(urlParams, "vehicleModel")
            if (data.totalRecords > params.rpp) {
                params.rpp = data.totalRecords
                urlParams = new URLSearchParams(Object.entries(params))
                data = await this.vehicleService.get(urlParams, "vehicleModel")
            }
            runInAction(() => {
                this.vehicleModel = data.item
            })
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    }

    postVehicleModel = async (object) => {
        try {
            let data = await this.vehicleService.post(object, "vehicleModel")
            runInAction(() => {
                this.vehicleModel.push(data)
            })
        } catch (error) {
            runInAction(() => {
                this.status = "error"
            })
        }
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
            let data = await this.vehicleService.get(urlParams, "vehicleList")
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

    getVehicleById = async (id) => {
        try {
            let params = {
            }
            let urlParams = new URLSearchParams(Object.entries(params))
            let data = await this.vehicleService.getId(urlParams, id, "vehicleList")
            runInAction(() => {
                this.infoState.vehicleObject = data
            })
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    }

    postVehicleList = async (object) => {
        try {
            let data = await this.vehicleService.post(object, "vehicleList")
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
            let data = await this.vehicleService.put(object, "vehicleList")
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