export default class HttpClient {
    constructor() {
        this.options = {
            method: "GET",
            headers: new Headers(),
            body: undefined
        }
        this.params = undefined
        this.webApiUrl = "https://api.baasic.com/v1/car-dealership-assignment/resources"
        this.urlPath = []
        this.scheme = undefined
    }

    paths() {
        return {
            set: (urlPath) => {
                this.urlPath = urlPath
            },
            add: (value) => {
                if(Array.isArray(this.urlPath)){
                    this.urlPath.push(value)
                }
            },
            unset: () => {
                this.urlPath = []
            }
        }
    }

    setBody(body) {
        this.options.body = body
    }

    setScheme(scheme) {
        this.scheme = scheme
    }

    setUrl(url) {
        this.webApiUrl = url
    }

    setMethod(method) {
        this.options.method = method;
    }

    changeHeaders() {
        return {
            set: (headers) => {
                this.options.headers = headers
            },
            add: (name, value) => {
                this.options.headers.append(name, value)
            }
        }
    }

    urlParams(pars) {
        this.params = pars
    }

    fetch() {
            let urlPath = ""
            if(this.urlPath !== undefined){
                for (const x of this.urlPath){
                    urlPath += `/${x}`
                }
            }
            
            let paramsPath = ""
            if(this.params) {
                let urlParams = new URLSearchParams(Object.entries(this.params))
                paramsPath = "?" + urlParams
            }
            const req = new Request(this.webApiUrl + `${this.scheme && "/" + this.scheme}` + urlPath + paramsPath, this.options)
            return new Promise(function(res, reject) {
                fetch(req).then(resp => {
                    if(resp.headers.get('Content-Type') !== null){
                        createResponse(resp).then(result => {
                            res(result)
                        })
                    }else{
                        res(resp)
                    }
            })
        })
    }

}

function createResponse(response) {
    const type = response.headers.get('Content-Type')
    const body = () => {
        if (type.indexOf('application/json') !== -1){
            return response.json();
        }
        return response.text();
    }
    return new Promise(function (res, rej) {
        body().then(function (result) {
            response.data = result;
            res(result);
        }, function (error) {
            res(error)
        })
    })
}