import {observable, computed, runInAction} from "mobx";
import {VehicleStore} from './';

import {VehicleService} from './services';

class EditStore {
    constructor() {
        this.putVehicleList = VehicleStore.putVehicleList;
        this.vehicleService = new VehicleService();
    }

    @observable vehicleObject = null;
    @observable imgVal = "";
    @observable showAlert = false;

    @computed get showImage() {
        if(this.imgVal.match(/\.(jpeg|jpg|gif|png|webm)$/)){
            return this.imgVal;
        }
        return null;
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

    alertCancelClick() {
        this.showAlert = false;
    }

    alertDeleteClick(vehicleId, history) {
        this.showAlert = false;
        this.deleteVehicleById(vehicleId);
        history.push("/explore");
    }

    loadValues = (form, object) => {
        form.$("make").set(object.makeId);
        form.$("model").set(object.modelId);
        form.$("year").set(object.year);
        form.$("price").set(object.price);
        form.$("body").set(object.bodyId);
        form.$("engine").set(object.engineId);
        form.$("fuel").set(object.fuelTank);
        form.$("speed").set(object.topSpeed);
        form.$("transmission").set(object.transmissionId);
        form.$("trunk").set(object.trunkCapacity);
        form.$("door").set(object.doorCount);
        this.imgVal = object.imgUrl || "";
    }
    
    getVehicleById = async (form, id) => {
        try {
            let data = await this.vehicleService.getId(id);
            runInAction(() => {
                if(data.id){
                    this.vehicleObject = data;
                    this.loadValues(form, data);
                }
            })
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    }

    deleteVehicleById = async (id) => {
        try {
            let data = await this.vehicleService.delete(id);
            runInAction(() => {
                data;
            })
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    }

    imageChange(value) {
        this.imgVal = value;
    }

    saveClick(values, vehicleId, history) {
        const {make, body, door, engine, fuel, model, price, speed, transmission, trunk, year} = values;

        let name = `${this.vehicleMake.filter(x => x.id == make)[0].name} ${this.vehicleModel.filter(x => x.id == model)[0].name} ${year}.`;


        let vehicleObject = 
        {
            id: vehicleId,
            name: name,
            makeId: make,
            modelId: model,
            bodyId: Number(body),
            doorCount: Number(door),
            engineId: Number(engine),
            fuelTank: Number(fuel),
            price: Number(price),
            topSpeed: Number(speed),
            transmissionId: Number(transmission),
            trunkCapacity: Number(trunk),
            year: Number(year),
            imgUrl: this.showImage
        }

        this.putVehicleList(vehicleObject);
        history.push(`/vehicle/${vehicleId}`);
    }
    
    removeClick() {
        this.showAlert = true;
    }
}

export default new EditStore();