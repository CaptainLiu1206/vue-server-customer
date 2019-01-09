const Koa = require('koa')
const koaSession = require('koa-session')
const bodyParser = require('koa-bodyparser')

// 配置
const config = require('./config')

// router
const userRouter = require('./router/user')

// 操作数据库
const createDB = require('./db/index')
const db = createDB(config.apiCloud.id, config.apiCloud.key)

const app = new Koa()

// session
app.keys = ['vue ssr tech']
app.use(koaSession({
    key: 'v-ssr-id',
    maxAge: 2 * 60 * 60 * 1000
}, app))

// 处理body
app.use(bodyParser())

// 跨域
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', ctx.header.origin)
    ctx.set('Access-Control-Allow-Credentials', true)
    ctx.set('Access-Control-Allow-Headers', 'content-type,Authorization,session')
    ctx.set('Access-Control-Allow-Methods', 'OPTIONS,GET,HEAD,PUT,POST,DELETE,PATCH')
    await next()
})

// 数据库中间件
app.use(async (ctx, next) => {
    ctx.db = db
    await next()
})

// router绑定
app.use(userRouter.routes())
    .use(userRouter.allowedMethods())

// 服务监听
app.listen(config.port, () => {
    console.log(`Server is running at localhost:${config.port}`)
})
