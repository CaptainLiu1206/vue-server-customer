const axios = require('axios')
const { apiCloud } = require('../config')

const UserServer = {
    register: (data) => {
        return axios({
            method: 'post',
            url: 'https://d.apicloud.com/mcm/api/user/',
            headers: {
                "X-APICloud-AppId": apiCloud.id,
                "X-APICloud-AppKey": apiCloud.appkey
            },
            data
        })
    },
    login: (data) => {
        return axios({
            method: 'post',
            url: 'https://d.apicloud.com/mcm/api/user/login',
            headers: {
                "X-APICloud-AppId": apiCloud.id,
                "X-APICloud-AppKey": apiCloud.appkey
            },
            data
        })
    },
    queryUser: () => {
        return axios({
            method: 'get',
            url: 'https://d.apicloud.com/mcm/api/user/5c3474cf0daa17de57847758',
            headers: {
                "X-APICloud-AppId": apiCloud.id,
                "X-APICloud-AppKey": apiCloud.appkey
            }
        })
    }
}

module.exports = UserServer