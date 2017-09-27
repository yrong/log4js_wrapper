const path = require('path')
const fs = require('fs')
const log4js = require('log4js')
const config = require('config')

module.exports = {
    initialize: (options) => {
        options = options || config.get('logger')
        const logDir = options.logpath||path.join('./logs')
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir)
        }
        log4js.configure(options, {cwd: logDir})
    },
    getLogger: (name,level) => {
        let options = config.get('logger'),category
        try{
            category =  name||options.defaultCategory||config.get('name')
        }catch(error){
            category = 'default'
        }
        logger = log4js.getLogger(category)
        logger.setLevel(level||options?options.defaultLevel:'INFO')
        return logger
    }
}
