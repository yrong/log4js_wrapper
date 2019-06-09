const should = require('should')
const log4js_wrapper = require('./index')

describe("log4js-wrapper", () => {

    describe("init", () => {

        log4js_wrapper.initialize({"defaultLevel":"DEBUG"})

        it("log", () => {
            const logger = log4js_wrapper.getLogger()
            should(logger.category).be.exactly(process.env['NODE_NAME']||'api')
            logger.info('test')
        });
    });
})
