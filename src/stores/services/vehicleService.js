const scheme = "vehicleList"

import HttpClient from './httpClient'

class VehicleService {
    get = async (urlParams) => {
        const get = new HttpClient()
        get.setMethod("GET")
        get.setScheme(scheme)
        get.urlParams(urlParams)
        
        return await get.fetch()
    } 
    getId = async (id) => {
        const getId = new HttpClient()
        getId.setMethod("GET")
        getId.setScheme(scheme)
        getId.paths().add(id)

        return await getId.fetch()
    }
    post = async (object) => {
        const post = new HttpClient()
        post.changeHeaders().add("Content-Type", "application/json")
        post.setBody(JSON.stringify(object))
        post.setScheme(scheme)
        post.setMethod("POST")

        return await post.fetch()
    }
    put = async (object) => {
        const put = new HttpClient()
        put.changeHeaders().add("Content-Type", "application/json")
        put.setBody(JSON.stringify(object))
        put.setScheme(scheme)
        put.paths().add(object.id)
        put.setMethod("PUT")
        
        return await put.fetch()
    }
    delete = async (id) => {
        const del = new HttpClient()
        del.setMethod("DELETE")
        del.setScheme(scheme)
        del.paths().add(id)

        return await del.fetch()
    }
}

export default VehicleService;