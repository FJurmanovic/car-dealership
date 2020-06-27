import {observable} from "mobx";
import VehicleStore from './vehicleStore'


class MakeListStore {

    @observable makeCount = 0
    @observable pageNum = 1
    @observable pageCount = 1

    
    
    setPage(page) {
        this.pageNum = page
    }

    makeByPage() {
        const {pageNum} = this
        return (VehicleStore.vehicleMake.filter((_, index) => (index < pageNum * 15) && (index > (pageNum * 15) - 16)))
    }

    
}

export default new MakeListStore();