const webApiUrl = "https://api.baasic.com/v1/car-dealership-assignment/resources/vehicleList"

class VehicleService {
    get = async (urlParams) => {
        const options = {
            method: "GET"
        }
        const req = new Request(webApiUrl + "?" + urlParams, options);
        const res = await fetch(req);
        return res.json();
    } 
}

export default VehicleService;