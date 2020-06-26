const scheme = "vehicleMake"

import HttpClient from './httpClient'

class VehicleMakeService {
    get = async (urlParams) => {
        const get = new HttpClient()
        get.setMethod("GET")
        get.setScheme(scheme)
        get.urlParams(urlParams)

        return await get.fetch()
    } 
    post = async (object) => {
        const post = new HttpClient()
        post.setMethod("POST")
        post.setScheme(scheme)
        post.changeHeaders().add("Content-Type", "application/json")
        post.setBody(JSON.stringify(object))

        return await post.fetch()
    }
    put = async (object) => {
        const put = new HttpClient()
        put.setMethod("PUT")
        put.setScheme(scheme)
        put.changeHeaders().add("Content-Type", "application/json")
        put.setBody(JSON.stringify(object))
        put.paths().add(object.id)

        return await put.fetch()
    }
}

export default VehicleMakeService;