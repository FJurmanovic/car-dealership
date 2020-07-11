import {observable, computed, runInAction} from "mobx";
import {VehicleStore, ToastStore} from './';
import {VehicleService} from './services';

class EditModelStore {
    constructor() {
        this.vehicleService = new VehicleService();
    }

    @observable model = {};
    @observable formName = null;
    @observable showAlert = false;

    @observable vehicleExists = false;

    @computed get actionName() {
        if (this.formName.value == this.model.name || this.formName.value == ""){
            return "Cancel";
        }
            return "Save";
    }

    saveClick(value, history) {
        const {makeId, id} = this.model;
        const {name} = value;

        const modelObject = {
            id: id,
            name: name,
            makeId: makeId
        }

        if (this.model.name != modelObject.name) {
            VehicleStore.putVehicleModel(modelObject);
            history.push(`/manufacturers/${makeId}`);
        } else {
            history.push(`/manufacturers/${makeId}`);
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
        if(!this.vehicleExists){
            VehicleStore.deleteVehicleModel(id);
        } else {
            ToastStore.push("ERROR: Model is being used", "#ffac45");
        }
        history.push(`/manufacturers/${this.model.makeId}`);
    }

    getVehicleById = async (id) => {
        try {
            let params = {
                searchQuery: `Where "modelId" = '${id}'`
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
}

export default new EditModelStore();

