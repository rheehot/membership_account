const Utils = { 
    parseRequestURL : () => {
        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/")
        let request = {
            resource : null,
            userId : null,
        }
        request.resource  = r[1],
        request.userId  = r[2]

        return request
    }
}

export default Utils;