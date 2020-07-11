import {observable, runInAction} from "mobx";

import {VehicleService, VehicleModelService, VehicleMakeService} from './services';

import {ToastStore} from './';

class VehicleStore {
    constructor() {
        this.vehicleService = new VehicleService();
        this.vehicleModelService = new VehicleModelService();
        this.vehicleMakeService = new VehicleMakeService();
    }
    @observable vehicleMake = [];
    @observable vehicleModel = [];
    @observable vehicleBody = require("../common/data/vehicleBody.json");
    @observable vehicleEngine = require("../common/data/vehicleEngine.json");
    @observable vehicleTransmission = require("../common/data/vehicleTransmission.json");
    @observable vehicleList = [];
    @observable pageNumber = 1;
    @observable searchQuery = null;
    @observable sortBy = "name|asc";
    @observable makePage = 0;
    @observable modelPage = 0;
    @observable totalRecords = 0;
    
    getVehicleMake = async () => {
        try {
            let params = {
                rpp: 25,
                page: ++this.makePage
            }
            if (this.sortBy) {
                params.sort = this.sortBy;
            }
            if (this.searchQuery) {
                params.searchQuery = this.searchQuery;
            }
            let data = await this.vehicleMakeService.get(params);
            if(this.makePage == 1) {
                this.vehicleMake = [];
            }
            if (data.totalRecords > (this.makePage * 25)) {
                this.getVehicleMake()
            }
            runInAction(() => {
                for (const item of data.item){
                    this.vehicleMake.push(item);
                }
            })
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    }

    postVehicleMake = async (object) => {
        try {
            let data = await this.vehicleMakeService.post(object);
            runInAction(() => {
                data;
                this.makePage = 0;
                this.getVehicleMake();
                ToastStore.push("Succesfully created make", "#00ad75");
            })
        } catch (error) {
            runInAction(() => {
                this.status = "error";
                ToastStore.push("Error creating make", "#ff4545");
            })
        }
    }

    putVehicleMake = async (object) => {
        try {
            let data = await this.vehicleMakeService.put(object);
            if (data.status == 204){
                runInAction(() => {
                    this.status = "update";
                    this.updateMake(object);
                    ToastStore.push("Succesfully updated make", "#00ad75");
                }
            )}
        } catch (error) {
            runInAction(() => {
                this.status = "error";
                ToastStore.push("Error updating make", "#ff4545");
            })
        }
    }

    deleteVehicleMake = async (id) => {
        try {
            let data = await this.vehicleMakeService.delete(id);
            runInAction(() => {
                data;
                this.removeMake(id);
                ToastStore.push("Succesfully deleted make", "#00ad75");
            })
        } catch (error) {
            runInAction(() => {
                this.status = "error";
                ToastStore.push("Error deleting make", "#ff4545");
            })
        }
    }

    getVehicleModel = async () => {
        try {
            let params = {
                rpp: 25,
                page: ++this.modelPage
            }
            if (this.sortBy) {
                params.sort = this.sortBy;
            }
            if (this.searchQuery) {
                params.searchQuery = this.searchQuery;
            }
            let data = await this.vehicleModelService.get(params);
            if(this.modelPage == 1) {
                this.vehicleModel = [];
            }
            if (data.totalRecords > (this.modelPage * 25)) {
                this.getVehicleModel()
            }
            runInAction(() => {
                for (const item of data.item){
                    this.vehicleModel.push(item);
                }
            })
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    }

    postVehicleModel = async (object) => {
        try {
            let data = await this.vehicleModelService.post(object);
            runInAction(() => {
                data;
                this.modelPage = 0;
                this.getVehicleModel();
                ToastStore.push("Succesfully created model", "#00ad75");
            })
        } catch (error) {
            runInAction(() => {
                this.status = "error";
                ToastStore.push("Error creating model", "#ff4545");
            })
        }
    }

    putVehicleModel = async (object) => {
        try {
            let data = await this.vehicleModelService.put(object);
            if (data.status == 204){
                runInAction(() => {
                    this.status = "update";
                    this.updateModel(object);
                    ToastStore.push("Succesfully updated model", "#00ad75");
                }
            )}
        } catch (error) {
            runInAction(() => {
                this.status = "error";
                ToastStore.push("Error updating model", "#ff4545");
            })
        }
    }
    
    deleteVehicleModel = async (id) => {
        try {
            let data = await this.vehicleModelService.delete(id);
            runInAction(() => {
                data;
                this.removeModel(id);
                ToastStore.push("Succesfully deleted model", "#00ad75");
            })
        } catch (error) {
            runInAction(() => {
                this.status = "error";
                ToastStore.push("Error deleting model", "#ff4545");
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
                params.sort = this.sortBy;
            }
            if (this.searchQuery) {
                params.searchQuery = this.searchQuery;
            }
            let data = await this.vehicleService.get(params);
            runInAction(() => {
                this.vehicleList = data.item;
                this.totalRecords = data.totalRecords;
            })
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    }

    postVehicleList = async (object) => {
        try {
            let data = await this.vehicleService.post(object);
            runInAction(() => {
                data;
                this.getVehicleList();
                ToastStore.push("Succesfully created vehicle", "#00ad75");
            })
        } catch (error) {
            runInAction(() => {
                this.status = "error";
                ToastStore.push("Error creating vehicle", "#ff4545");
            })
        }
    }

    putVehicleList = async (object) => {
        try {
            let data = await this.vehicleService.put(object);
            if (data.status == 204){
                runInAction(() => {
                    this.status = "update";
                    this.updateVehicle(object);
                    ToastStore.push("Succesfully updated vehicle", "#00ad75")
                }
            )}
        } catch (error) {
            runInAction(() => {
                this.status = "error";
                ToastStore.push("Error updating vehicle", "#ff4545");
            })
        }
    }

    deleteVehicleById = async (id) => {
        try {
            let data = await this.vehicleService.delete(id);
            runInAction(() => {
                data;
                ToastStore.push("Succesfully deleted vehicle", "#00ad75");
            })
        } catch (error) {
            runInAction(() => {
                this.status = "error";
                ToastStore.push("Error deleting vehicle", "#ff4545");
            });
        }
    }

    updateVehicle = (vehicleObject) => {
        let index = this.vehicleList.findIndex(x => x.id === vehicleObject.id);
        this.vehicleList[index] = vehicleObject;
    }
    
    updateModel = (modelObject) => {
        let index = this.vehicleModel.findIndex(x => x.id === modelObject.id);
        this.vehicleModel[index] = modelObject;
    }
    
    updateMake = (makeObject) => {
        let index = this.vehicleMake.findIndex(x => x.id === makeObject.id);
        this.vehicleMake[index] = makeObject;
    }

    removeModel = (modelId) => {
        let index = this.vehicleModel.findIndex(x => x.id === modelId);
        this.vehicleModel.splice(index, 1);
    }

    removeMake = (makeId) => {
        let index = this.vehicleMake.findIndex(x => x.id === makeId);
        this.vehicleMake.splice(index, 1);
    }

}

export default new VehicleStore();