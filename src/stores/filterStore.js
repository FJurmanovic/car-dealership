import {observable, computed} from "mobx";
import VehicleStore from './vehicleStore';

class FilterStore {
    @observable makeVal = null;
    @observable modelVal = null;
    @observable minPriceVal = null;
    @observable maxPriceVal = null;
    @observable minYearVal = null;
    @observable maxYearVal = null;
    @observable bodyVal = null;
    @observable engineVal = null;
    @observable transmissionVal = null;
    @observable doorVal = null;
    @observable minFuelVal = 0;
    @observable maxFuelVal = 150;
    @observable minSpeedVal = 100;
    @observable maxSpeedVal = 400;
    @observable minTrunkVal = 100;
    @observable maxTrunkVal = 1000; 

    @computed get showFilters() {
        return VehicleStore.showFilters;
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
    
    @computed get vehicleInfo(){
        return this.vehicleObject;
    }

    makeChange(value) {
        if (value != "any") {
            this.makeVal = value;
        } else {
            this.makeVal = null;
        }
    } 

    modelChange(value) {
        if (value != "any") {
            this.modelVal = value;
        } else {
            this.modelVal = null;
        }
    } 

    minPriceChange(value) {
        if (value != "any") {
            this.minPriceVal = value;
        } else {
            this.minPriceVal = null;
        }
    } 

    maxPriceChange(value) {
        if (value != "any") {
            this.maxPriceVal = value;
        } else {
            this.maxPriceVal = null;
        }
    } 

    minYearChange(value) {
        if (value != "any") {
            this.minYearVal = value;
        } else {
            this.minYearVal = null;
        }
    } 

    maxYearChange(value) {
        if (value != "any") {
            this.maxYearVal = value;
        } else {
            this.maxYearVal = null;
        }
    } 

    bodyChange(value) {
        if (value != "any") {
            this.bodyVal = value;
        } else {
            this.bodyVal = null;
        }
    } 

    engineChange(value) {
        if (value != "any") {
            this.engineVal = value;
        } else {
            this.engineVal = null;
        }
    } 

    transmissionChange(value) {
        if (value != "any") {
            this.transmissionVal = value;
        } else {
            this.transmissionVal = null;
        }
    } 

    doorChange(value) {
        if (value != "any") {
            this.doorVal = value;
        } else {
            this.doorVal = null;
        }
    } 

    minFuelChange(value) {
        this.minFuelVal = value;
    }

    maxFuelChange(value) {
        this.maxFuelVal = value;
    }

    minSpeedChange(value) {
        this.minSpeedVal = value;
    }

    maxSpeedChange(value) {
        this.maxSpeedVal = value;
    }

    minTrunkChange(value) {
        this.minTrunkVal = value;
    }

    maxTrunkChange(value) {
        this.maxTrunkVal = value;
    }

    toggleFilters() {
        VehicleStore.showFilters = !this.showFilters;
    }

    filterVehicles() {
        let filterList = [];
        const {makeVal, modelVal, bodyVal, engineVal, transmissionVal, doorVal, minPriceVal, maxPriceVal, minYearVal, maxYearVal, minFuelVal, maxFuelVal, minSpeedVal, maxSpeedVal, minTrunkVal, maxTrunkVal} = this;
        
        makeVal && !modelVal && filterList.push(`"makeId" = '${makeVal}'`);
        modelVal && filterList.push(`"modelId" = '${modelVal}'`);
        bodyVal && filterList.push(`"bodyId" = ${bodyVal}`);
        engineVal && filterList.push(`"engineId" = ${engineVal}`);
        transmissionVal && filterList.push(`"transmissionId" = ${transmissionVal}`);
        doorVal && filterList.push(`"doorCount" = ${doorVal}`);
        minPriceVal && filterList.push(`"price" > ${minPriceVal}`);
        maxPriceVal && filterList.push(`"price" < ${maxPriceVal}`);
        minYearVal && filterList.push(`"year" > ${minYearVal}`);
        maxYearVal && filterList.push(`"year" < ${maxYearVal}`);
        minFuelVal && filterList.push(`"fuelTank" > ${minFuelVal}`);
        maxFuelVal && filterList.push(`"fuelTank" < ${maxFuelVal}`);
        minSpeedVal && filterList.push(`"topSpeed" > ${minSpeedVal}`);
        maxSpeedVal && filterList.push(`"topSpeed" < ${maxSpeedVal}`);
        minTrunkVal && filterList.push(`"trunkCapacity" > ${minTrunkVal}`);
        maxTrunkVal && filterList.push(`"trunkCapacity" < ${maxTrunkVal}`);

        this.filtersSet(filterList);
    }

    filtersSet(inputList) {
        return VehicleStore.filtersSet(inputList);
    }

    
}

export default new FilterStore();