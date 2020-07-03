const url = "https://api.baasic.com/v1/car-dealership-assignment/resources/vehicleMake";
import {HttpClient} from './';

class VehicleMakeService {
    get = async (urlParams) => {
        return await HttpClient.get(url, urlParams);
    } 
    post = async (object) => {
        return await HttpClient.post(url, object);
    }
    put = async (object) => {
        return await HttpClient.put(url + `/${object.id}`, object);
    }
}

export default VehicleMakeService;