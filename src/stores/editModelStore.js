import {observable, computed} from "mobx";
import VehicleStore from './vehicleStore'


class EditModelStore {
    @observable model = {}
    @observable nameVal = ""

    @computed get iconClass() {
        if (this.nameVal == this.model.name){
            return "gg-close"
        }
            return "gg-arrow-down-r"
    }

    saveClick(history) {
        const {makeId, id} = this.model
        const {model} = this

        const modelObject = {
            id: id,
            name: this.nameVal,
            makeId: makeId
        }

        if (model.name != modelObject.name) {
            VehicleStore.putVehicleModel(modelObject).then(
                history.push(`/manufacturers/${makeId}`)
            )
        } else {
            history.push(`/manufacturers/${makeId}`)
        }
    }

    inputChange(value) {
        this.nameVal = value
    }
}

export default new EditModelStore();

