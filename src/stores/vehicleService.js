const webApiUrl = "https://api.baasic.com/v1/car-dealership-assignment/resources"

class VehicleService {
    get = async (urlParams, scheme) => {
        const options = {
            method: "GET"
        }
        const req = new Request(webApiUrl + "/" + scheme + "?" + urlParams, options);
        const res = await fetch(req);
        return res.json();
    } 
    getId = async (urlParams, id, scheme) => {
        const options = {
            method: "GET"
        }
        const req = new Request(webApiUrl + "/" + scheme + "/" + id + "?" + urlParams, options);
        const res = await fetch(req);
        return res.json();
    }
    post = async (object, scheme) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
 
        const options = {
            method: "POST",
            headers,
            body: JSON.stringify(object)
        }
        const req = new Request(webApiUrl + "/" + scheme, options);
        const res = await fetch(req);
        return res.json();
    }
    put = async (object, scheme) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
 
        const options = {
            method: "PUT",
            headers,
            body: JSON.stringify(object)
        }
        const req = new Request(webApiUrl + "/" + scheme + `/${object.id}`, options);
        const res = await fetch(req);
        return res;
    }
}

export default VehicleService;