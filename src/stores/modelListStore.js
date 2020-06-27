import {observable, computed} from "mobx";
import VehicleStore from './vehicleStore'


class ModelListStore {

    @observable modelCount = 0
    @observable pageNum = 1
    @observable pageCount = 1
    @observable makeId = undefined
    
    @computed get makeName() {
        if (VehicleStore.vehicleMake.filter(x => x.id == this.makeId)[0]){
            return (VehicleStore.vehicleMake.filter(x => x.id == this.makeId)[0].name)
        }
        return ''
    }

    filtersSet(inputList) {
        return VehicleStore.filtersSet(inputList)
    }

    setPage(page) {
        this.pageNum = page
    }

    modelById() {
        const {makeId} = this
        return (VehicleStore.vehicleModel.filter(x => x.makeId == makeId))
    }
    
}

export default new ModelListStore();