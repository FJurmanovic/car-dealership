import {observable, computed} from "mobx";
import {VehicleStore, ListStore} from './';

class ModelListStore {

    @observable pageNum = 1;
    @observable makeId = null;

    @computed get modelCount() {
        return VehicleStore.vehicleModel.filter(x => x.makeId == this.makeId).length;
    }

    @computed get pageCount() {
        return Math.ceil(this.modelCount / 15);
    }
    
    @computed get makeName() {
        if (VehicleStore.vehicleMake.filter(x => x.id == this.makeId)[0]){
            return (VehicleStore.vehicleMake.filter(x => x.id == this.makeId)[0].name);
        }
        return '';
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
    }

    setPage(page) {
        this.pageNum = page;
    }

    modelById() {
        const {makeId} = this;
        return (VehicleStore.vehicleModel.filter(x => x.makeId == makeId));
    }
    
}

export default new ModelListStore();