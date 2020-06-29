import {observable, computed, runInAction} from "mobx";
import VehicleStore from './vehicleStore';

import VehicleService from './services/vehicleService';

class ViewStore {
    constructor() {
        this.vehicleService = new VehicleService();
    }

    @observable status = 'initial';
    @observable vehicleObject = null;
    @observable showContact = false;

    clickContact() {
        this.showContact = true;
    }
    
    @computed get showImage() {
        if(this.vehicleObject.imgUrl && this.vehicleObject.imgUrl.match(/\.(jpeg|jpg|gif|png|webm)$/)){
            return this.vehicleObject.imgUrl;
        }
        return null;
    }

    @computed get vehicleBody() {
        return VehicleStore.vehicleBody;
    }

    @computed get vehicleEngine() {
        return VehicleStore.vehicleEngine;
    }

    @computed get vehicleTransmission() {
        return VehicleStore.vehicleTransmission;
    }

    @computed get vehicleInfo(){
        let vehicle = this.vehicleObject || null;

        let bodyId =  0;
        let engineId = 0;
        let transmissionId = 0;

        if(vehicle !== null) {
            bodyId = vehicle.bodyId || 0;
            engineId = vehicle.engineId || 0;
            transmissionId = vehicle.transmissionId || 0;
        } 
        
        let infoObject = null;

        if (vehicle !== null) {
            infoObject = {
                name: vehicle.name || '',
                price: vehicle.price || 0,
                bodyType: this.vehicleBody[bodyId].name || '',
                doorCount: vehicle.doorCount || '',
                engineType: this.vehicleEngine[engineId].name || '',
                engineId: engineId,
                fuelCapacity: vehicle.fuelTank || '',
                topSpeed: vehicle.topSpeed || '',
                transmissionType: this.vehicleTransmission[transmissionId].name || '',
                trunkCapacity: vehicle.trunkCapacity || ''
            }
        }
        

        return infoObject;
    }

    getVehicleById = async (id) => {
        try {
            let data = await this.vehicleService.getId(id);
            runInAction(() => {
                if(data.id){
                    this.vehicleObject = data;
                }
            })
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    }


}

export default new ViewStore();