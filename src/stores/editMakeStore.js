import {observable, computed, runInAction} from "mobx";
import {VehicleStore} from './';
import {VehicleService, VehicleModelService} from './services';

class EditMakeStore {
    constructor() {
        this.vehicleService = new VehicleService();
        this.vehicleModelService = new VehicleModelService();
    }

    @observable make = {};
    @observable formName = null;
    @observable showAlert = false;

    @observable vehicleExists = false;
    @observable modelExists = false;

    @computed get actionName() {
        if (this.formName.value == this.make.name || this.formName.value == ""){
            return "Cancel";
        }
            return "Save";
    }

    saveClick(value, history) {
        const {name} = value;

        const makeObject = {
            id: this.make.id,
            name: name
        }

        if (this.make.name != makeObject.name) {
            VehicleStore.putVehicleMake(makeObject);
            history.push(`/manufacturers`);
        } else {
            history.push(`/manufacturers`);
        }
    }

    removeClick() {
        this.showAlert = true;
    }

    alertCancelClick() {
        this.showAlert = false;
    }

    alertDeleteClick(id, history) {
        this.showAlert = false;
        if(!this.vehicleExists && !this.modelExists){
            VehicleStore.deleteVehicleMake(id);
        } else {
            alert("ERROR: This manufacturer is being used.");
        }
        history.push("/manufacturers");
    }

    getVehicleById = async (id) => {
        try {
            let params = {
                searchQuery: `Where "makeId" = '${id}'`
            }
            let data = await this.vehicleService.get(params);
            runInAction(() => {
                this.vehicleExists = !!data.item[0]
            })
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    }

    getModelById = async (id) => {
        try {
            let params = {
                searchQuery: `Where "makeId" = '${id}'`
            }
            let data = await this.vehicleModelService.get(params);
            runInAction(() => {
                this.modelExists = !!data.item[0]
            })
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    }
}

export default new EditMakeStore();

