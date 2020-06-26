const webApiUrl = "https://api.baasic.com/v1/car-dealership-assignment/resources"

class VehicleMakeService {
    get = async (urlParams) => {
        const options = {
            method: "GET"
        }
        const req = new Request(webApiUrl + "/vehicleMake" + "?" + urlParams, options);
        const res = await fetch(req);
        return res.json();
    } 
    post = async (object) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
 
        const options = {
            method: "POST",
            headers,
            body: JSON.stringify(object)
        }
        const req = new Request(webApiUrl + "/vehicleMake" , options);
        const res = await fetch(req);
        return res.json();
    }
    put = async (object) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
 
        const options = {
            method: "PUT",
            headers,
            body: JSON.stringify(object)
        }
        const req = new Request(webApiUrl + "/vehicleMake"  + `/${object.id}`, options);
        const res = await fetch(req);
        return res;
    }
}

export default VehicleMakeService;