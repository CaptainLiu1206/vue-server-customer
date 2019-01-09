
const { register, queryUser, login } = require('../server/user')

const userController = [
    // 注册
    {
        method: 'post',
        url: '/user/register',
        fn: async function (ctx, next) {
            const user = ctx.request.body
            const requireKeys = [
                { key: 'username', errMsg: '用户名必填' },
                { key: 'password', errMsg: '密码必填' },
                { key: 'email', errMsg: '邮箱必填' }
            ]
            let status = 200
            let message = 'success'
            // 校验必填
            for (let i = 0; i < requireKeys.length; i++) {
                let item = requireKeys[i]
                if (!user[item.key]) {
                    status = 400
                    message = item.errMsg
                    break
                }
            }
            let userData = null
            // 创建新用户
            if (status === 200) {
                let { data } = await register(user)
                if (data.error) {
                    status = data.error.status
                    message = data.error.message
                } else {
                    status = 200
                    userData = data
                }
            }
            if (!userData) {
                ctx.response.body = { status, message }
            } else {
                ctx.response.body = { status, message, data: userData }
            }
        }
    },
    // 登录
    {
        method: 'post',
        url: '/user/login',
        fn: async function (ctx, next) {
            const user = ctx.request.body
            const requireKeys = [
                { key: 'username', errMsg: '用户名必填' },
                { key: 'password', errMsg: '密码必填' }
            ]
            let status = 200
            let message = 'success'
            let userData = null
            // 校验必填
            for (let i = 0; i < requireKeys.length; i++) {
                let item = requireKeys[i]
                if (!user[item.key]) {
                    status = 400
                    message = item.errMsg
                    break
                }
            }
            // 登录
            if (status === 200) {
                let { data } = await login(user)
                if (data.error) {
                    status = data.error.status
                    message = data.error.message
                } else {
                    status = 200
                    userData = data
                }
            }
            if (!userData) {
                ctx.response.body = { status, message }
            } else {
                ctx.response.body = { status, message, data: userData }
            }
        }
    },
    {
        method: 'get',
        url: '/user/:id',
        fn: async function (ctx, next) {
            const id = ctx.params.id
            let status = 200
            let message = 'success'
            let { data } = await queryUser(id)
            if (data.error) {
                status = data.error.status
                message = data.error.message
                ctx.response.body = { status, message }
            } else {
                status = 200
                ctx.response.body = { status, message, data }
            }
        }
    }
]

module.exports = userController