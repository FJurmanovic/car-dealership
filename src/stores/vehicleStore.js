import {observable} from "mobx";

export class Vehicles {
    @observable vehicleMake = ["Toyota"]
}

export default new Vehicles;