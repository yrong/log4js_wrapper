const path = require('path')
const fs = require('fs')
const log4js = require('log4js')
const config = require('config')
let logger_config

module.exports = {
    initialize: (options) => {
        const logDir = options.logpath||path.join('./logs')
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir)
        }
        log4js.configure(options, {cwd: logDir})
        logger_config = options
    },
    getLogger: (name,level) => {
        let category
        try{
            category =  name||logger_config.defaultCategory||config.get('name')
        }catch(error){
            category = 'default'
        }
        logger = log4js.getLogger(category)
        logger.setLevel(level||logger_config.defaultLevel||'INFO')
        return logger
    }
}
