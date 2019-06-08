const path = require('path')
const fs = require('fs')
const log4js = require('log4js')

let options = {}

module.exports = {
    initialize: (log_options) => {
        options = log_options
        let logDir = options.logpath||process.env['LOG_PATH']||path.join('./logs')
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir)
        }
        let logName = (process.env['NODE_NAME']||'api') + ".log"
        options.appenders = {file:{type: "file", filename: `${logDir}/${logName}`, maxLogSize: 20480, numBackups: 5},out:{type:"console"}}
        options.categories = {
            default: { appenders: [ 'file','out' ], level: options.defaultLevel }
        }
        log4js.configure(options)
    },
    getLogger: (name,level) => {
        const logger = log4js.getLogger(name||process.env['NODE_NAME']||'api')
        logger.level = (level||options.defaultLevel)
        return logger
    }
}
