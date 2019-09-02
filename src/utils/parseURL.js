const Utils = { 
    parseRequestURL : () => {
        //#해쉬이용
        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/")
        let request = {
            resource    : null,
        }
        request.resource    = r[1]

        return request
    }
}

export default Utils;