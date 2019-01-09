const SHA1 = require('sha1')
const { apiCloud } = require('../config')

var now = Date.now()
var appKey = SHA1(`${apiCloud.id}UZ${apiCloud.key}UZ${now}`) + '.' + now


