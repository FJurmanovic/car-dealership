import {observable, computed} from "mobx";
import {VehicleStore} from './';

class MakeListStore {

    @observable pageNum = 1;

    @computed get makeCount() {
        return VehicleStore.vehicleMake.length;
    }
    
    @computed get pageCount() {
        return Math.ceil(this.makeCount / 15);
    }

    setPage(page) {
        this.pageNum = page;
    }

    makeByPage() {
        const {pageNum} = this;
        return (VehicleStore.vehicleMake.filter((_, index) => (index < pageNum * 15) && (index > (pageNum * 15) - 16)));
    }

    
}

export default new MakeListStore();