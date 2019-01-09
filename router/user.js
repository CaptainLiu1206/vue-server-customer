
const Router = require('koa-router')
const userRouter = new Router({ prefix: '/api/user' })

const { validateUser, successResponse } = require('./util')

// 登录
userRouter.post('/login', async ctx => {
    const user = ctx.request.body
    const requireKeys = [
        { key: 'username', errMsg: '用户名必填' },
        { key: 'password', errMsg: '密码必填' }
    ]
    let status = 200,
        message = 'success',
        success = true
    // 校验必填
    for (let i = 0; i < requireKeys.length; i++) {
        let item = requireKeys[i]
        if (!user[item.key]) {
            status = 400
            message = item.errMsg
            success = false
            break
        }
    }
    let userData = null
    // 登录
    if (status === 200) {
        let data = null
        try {
            data = (await ctx.db.user.login(user)).data
        } catch (err) {
            data = err.response.data
        }
        if (data.error) {
            status = data.error.status
            message = data.error.message
            success = false
        } else {
            status = 200
            userData = data
        }
    }
    if (userData && userData.id) {
        ctx.session.user = { id: userData.id }
        ctx.response.body = { status, message, success, data: userData }
    } else {
        ctx.response.body = { status, message, success }
    }
})

// 注册
userRouter.post('/', async ctx => {
    const user = ctx.request.body
    const requireKeys = [
        { key: 'username', errMsg: '用户名必填' },
        { key: 'password', errMsg: '密码必填' },
        { key: 'email', errMsg: '邮箱必填' }
    ]
    let status = 200,
        message = 'success',
        success = true
    // 校验必填
    for (let i = 0; i < requireKeys.length; i++) {
        let item = requireKeys[i]
        if (!user[item.key]) {
            status = 400
            message = item.errMsg
            success = false
            break
        }
    }
    let userData = null
    // 创建新用户
    if (status === 200) {
        let data = null
        try {
            data = (await ctx.db.user.register(user)).data
        } catch (err) {
            data = err.response.data
        }
        if (data.error) {
            status = data.error.status
            message = data.error.message
            success = false
        } else {
            status = 200
            let respData = null
            try {
                respData = (await ctx.db.user.login({username: user.username, password: user.password})).data
            } catch (err) {
                respData = err.response.data
            }
            if (respData && respData.id) {
                userData = { ...data, ...respData }
            } else {
                status = respData.code
                message = '注册失败'
                success = false
            }
        }
    }
    if (userData && userData.id) {
        ctx.session.user = { id: userData.id }
        ctx.response.body = { status, message, success, data: userData }
    } else {
        ctx.response.body = { status, message, success }
    }
})

// 获取用户信息
userRouter.get('/:id', validateUser, async ctx => {
    const userId = ctx.params.id,
        id = ctx.request.header.authorization

    let status = 200,
        success = true
    let data = null
    try {
        data = (await ctx.db.user.queryUserInfo(id, userId)).data
    } catch (err) {
        console.log(err)
        data = err.response.data
    }
    if (data && data.id) {
        ctx.response.body = { status, success, data }
    } else {
        ctx.response.body = { status: data.error.status, success: false, message: data.error.message }
    }
})

module.exports = userRouter