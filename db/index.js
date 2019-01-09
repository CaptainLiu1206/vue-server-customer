const createUserDB = require('./user')

module.exports = (appId, appKey) => {
    return {
        user: createUserDB(appId, appKey)
    }
}
