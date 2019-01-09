module.exports = {
    port: 3000,
    apiCloud: {
        id: 'A6091468211701',
        key: '609E8C3F-7AB2-F5E4-0519-C4FF0C6A8197'
    },
    session: {
        key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
        maxAge: 86400000,
        autoCommit: true, /** (boolean) automatically commit headers (default true) */
        overwrite: true, /** (boolean) can overwrite or not (default true) */
        httpOnly: true, /** (boolean) httpOnly or not (default true) */
        signed: true, /** (boolean) signed or not (default true) */
        rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
        renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
    }
}
