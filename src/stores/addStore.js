import {observable, computed} from "mobx";
import VehicleStore from './vehicleStore';
 
import VehicleService from './services/vehicleService';

class AddStore {
    constructor() {
        this.postVehicleList = VehicleStore.postVehicleList;
        this.vehicleService = new VehicleService();
    }

    @observable imgVal = "";

    @computed get showImage() {
        if(this.imgVal.match(/\.(jpeg|jpg|gif|png|webm)$/)){
            return this.imgVal;
        }
        return "";
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

    imageChange(value) {
        this.imgVal = value;
    }

    saveClick(values, history) {
        const {make, body, door, engine, fuel, model, price, speed, transmission, trunk, year} = values;

        let name = `${this.vehicleMake.filter(x => x.id == make)[0].name} ${this.vehicleModel.filter(x => x.id == model)[0].name} ${year}.`;


        let vehicleObject = 
        {
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

        this.postVehicleList(vehicleObject);
        history.push("/explore");

        
    }
}

export default new AddStore();