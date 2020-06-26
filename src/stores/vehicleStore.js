import {observable, computed, runInAction} from "mobx";

import VehicleService from './vehicleService';
import VehicleModelService from './vehicleModelService';
import VehicleMakeService from './vehicleMakeService';

class VehicleStore {
    constructor() {
        this.vehicleService = new VehicleService();
        this.vehicleModelService = new VehicleModelService();
        this.vehicleMakeService = new VehicleMakeService();
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

    @observable addState = {
        nameVal: undefined,
        makeVal: undefined,
        modelVal: undefined,
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

    @observable makeListState = {
        makeCount: 0,
        pageNum: 1,
        pageCount: 1
    }
    
    @observable modelListState = {
        modelCount: 0,
        pageNum: 1,
        pageCount: 1,
        makeId: undefined
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
    
    makeCount() {
        this.makeListState.makeCount = this.vehicleMake.length
        this.makeListState.pageCount = Math.ceil(this.makeListState.makeCount / 15)
    }

    modelCount() {
        console.log("nice")
        this.modelListState.modelCount = this.vehicleModel.filter(x => x.makeId == this.modelListState.makeId).length
        this.modelListState.pageCount = Math.ceil(this.modelListState.modelCount / 15)
    }


    filtersSet(inputList) {
        this.searchQuery = "WHERE ";
        if (inputList.length > 0) {
            for (const [i, filter] of Array.entries(inputList)){
                (inputList.length > (i + 1)) ? this.searchQuery += filter + " AND " : this.searchQuery += filter
            }
        } else {
            this.searchQuery = undefined
        }
        
        this.pageNumber = 1
        
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
            let data = await this.vehicleMakeService.get(params)
            if (data.totalRecords > params.rpp) {
                params.rpp = data.totalRecords
                data = await this.vehicleMakeService.get(params)
            }
            runInAction(() => {
                this.vehicleMake = data.item
                this.makeCount();
            })
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    }

    postVehicleMake = async (object) => {
        try {
            let data = await this.vehicleMakeService.post(object)
            runInAction(() => {
                this.vehicleMake.push(data)
            })
        } catch (error) {
            runInAction(() => {
                this.status = "error"
            })
        }
    }

    putVehicleMake = async (object) => {
        try {
            let data = await this.vehicleMakeService.put(object)
            if (data.status == 204){
                runInAction(() => {
                    this.status = "update"
                    this.updateMake(object)
                }
            )}
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
            let data = await this.vehicleModelService.get(params)
            if (data.totalRecords > params.rpp) {
                params.rpp = data.totalRecords
                data = await this.vehicleModelService.get(params)
            }
            runInAction(() => {
                this.vehicleModel = data.item
                this.modelListState.makeId && this.modelCount();
            })
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    }

    postVehicleModel = async (object) => {
        try {
            let data = await this.vehicleModelService.post(object)
            runInAction(() => {
                this.vehicleModel.push(data)
            })
        } catch (error) {
            runInAction(() => {
                this.status = "error"
            })
        }
    }

    putVehicleModel = async (object) => {
        try {
            let data = await this.vehicleModelService.put(object)
            if (data.status == 204){
                runInAction(() => {
                    this.status = "update"
                    this.updateModel(object)
                }
            )}
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
            let data = await this.vehicleService.get(params)
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
    
    updateModel = (modelObject) => {
        let index = this.vehicleModel.findIndex(x => x.id === modelObject.id)
        this.vehicleModel[index] = modelObject
    }
    
    updateMake = (makeObject) => {
        let index = this.vehicleMake.findIndex(x => x.id === makeObject.id)
        this.vehicleMake[index] = makeObject
    }

}

export default new VehicleStore();