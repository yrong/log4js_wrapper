const path = require('path')
const fs = require('fs')
const log4js = require('log4js')

let options = {}

module.exports = {
    initialize: (log_options) => {
        options = log_options
        let logDir = options.logpath||path.join('./logs')
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir)
        }
        let logName = (process.env['NODE_NAME']||'api') + ".log"
        options.appenders = [{"type": "file", "filename": logName, "maxLogSize": 20480, "numBackups": 5},{type:"console"}]
        log4js.configure(options, {cwd: logDir})
    },
    getLogger: (name,level) => {
        logger = log4js.getLogger(name||process.env['NODE_NAME'])
        logger.setLevel(level||options.defaultLevel)
        return logger
    }
}
