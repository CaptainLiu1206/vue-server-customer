module.exports = {
    validateUser: async (ctx, next) => {
        if (!ctx.session.user) {
            ctx.status = 401
            ctx.body = 'need login'
        } else {
            await next()
        }
    },
    successResponse: (data) => {
        return {
            success: true,
            data
        }
    }
}