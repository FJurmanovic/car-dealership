const url = "https://api.baasic.com/v1/car-dealership-assignment/resources/vehicleList";
import HttpClient from './httpClient';

class VehicleService {
    get = async (urlParams) => {
        return await HttpClient.get(url, urlParams);
    } 
    getId = async (id) => {
        return await HttpClient.get(url + `/${id}`);
    }
    post = async (object) => {
        return await HttpClient.post(url, object);
    }
    put = async (object) => {
        return await HttpClient.put(url + `/${object.id}`, object);
    }
    delete = async (id) => {
        return await HttpClient.delete(url + `/${id}`)
    }
}

export default VehicleService;