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
    getId = async (urlParams, id) => {
        const options = {
            method: "GET"
        }
        const req = new Request(webApiUrl + "/" + id + "?" + urlParams, options);
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
        const req = new Request(webApiUrl, options);
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
        const req = new Request(webApiUrl + `/${object.id}`, options);
        const res = await fetch(req);
        return res;
    }
}

export default VehicleService;