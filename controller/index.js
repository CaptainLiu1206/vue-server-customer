const Router = require('koa-router')
const router = new Router({prefix: '/api'})

// user controller
const userControllers = require('./user')
userControllers.forEach(({method, url, fn}) => {
    router[method](url, fn)
})

const userList = [
    { id: 1, name: '张三1', age: 41, address: '北京1' },
    { id: 2, name: '张三2', age: 42, address: '北京2' },
    { id: 3, name: '张三3', age: 43, address: '北京3' },
    { id: 4, name: '张三4', age: 44, address: '北京4' },
    { id: 5, name: '张三5', age: 45, address: '北京5' },
    { id: 6, name: '张三6', age: 46, address: '北京6' },
    { id: 7, name: '张三7', age: 47, address: '北京7' }
]


// 用户信息
router.get('/user/:id', (ctx, next) => {
    console.log(ctx.params)
    const id = parseInt(ctx.params.id)
    let user = null
    userList.filter(_user => {
        if (_user.id === id) {
            user = _user
        }
    })
    if (user) {
        ctx.status = 200
        ctx.body = { user }
    } else {
        ctx.status = 404
    }
})

module.exports = router
