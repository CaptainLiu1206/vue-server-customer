const Axios = require('axios')
const SHA1 = require('sha1')

const request = Axios.create({
    baseURL: 'https://d.apicloud.com/mcm/api/user'
})

const handleRequest = resp => {
    return resp
}

module.exports = (appId, appKey) => {
    const getHeaders = () => {
        const now = Date.now()
        return {
            'X-APICloud-AppId': appId,
            'X-APICloud-AppKey': `${SHA1(`${appId}UZ${appKey}UZ${now}`)}.${now}`
        }
    }
    return {
        async register (data) {
            return handleRequest(await request.post(
                '/',
                data,
                { headers: getHeaders() }
            ))
        },
        async login (data) {
            return handleRequest(await request.post(
                '/login',
                data,
                { headers: getHeaders() }
            ))
        },
        async queryUserInfo (id, userId) {
            return handleRequest(await request.get(
                `/${userId}`,
                { headers: { 'authorization': id, ...getHeaders() } }
            ))
        }
    }
}
