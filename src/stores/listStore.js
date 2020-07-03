import {observable, computed} from "mobx";

import {VehicleStore} from './'

class ListStore {
    constructor() {
        this.getVehicleList = VehicleStore.getVehicleList;
    }
    @observable filterList = {};
    @observable status = "initial";
    @observable showFilters = false;

    setDefaults() {
        VehicleStore.searchQuery = null;
        VehicleStore.pageNumber = 1;
        this.showFilters = false;
        VehicleStore.sortBy = "name|asc";
    }

    @computed get sortBy() {
        return VehicleStore.sortBy;
    }

    @computed get totalRecords() {
        return VehicleStore.totalRecords;
    }

    @computed get pageCount() {
        return Math.ceil(this.totalRecords / 10);
    }

    @computed get pageNumber() {
        return VehicleStore.pageNumber;
    }
    
    @computed get vehicleEngine() {
        return VehicleStore.vehicleEngine;
    }

    @computed get vehicleTransmission() {
        return VehicleStore.vehicleTransmission;
    }

    @computed get vehicleBody() {
        return VehicleStore.vehicleBody;
    }

    @computed get vehicleMake() {
        return VehicleStore.vehicleMake;
    }

    @computed get vehicleModel() {
        return VehicleStore.vehicleModel;
    }

    @computed get vehicleList() {
        return VehicleStore.vehicleList;
    }

    handleSort(value) {
        VehicleStore.sortBy = value;
        this.getVehicleList();
    }


    filtersSet(inputList) {
        VehicleStore.searchQuery = "WHERE ";
        if (inputList.length > 0) {
            for (const [i, filter] of Array.entries(inputList)){
                (inputList.length > (i + 1)) ? VehicleStore.searchQuery += filter + " AND " : VehicleStore.searchQuery += filter;
            }
        } else {
            VehicleStore.searchQuery = null;
        }
        
        VehicleStore.pageNumber = 1;
        
        this.getVehicleList();
    }

    pageSet(page) {
        VehicleStore.pageNumber = page;

        this.getVehicleList();
    }

}

export default new ListStore();