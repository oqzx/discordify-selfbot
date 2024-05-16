const createLogger = require('@oqzx/logger-utils');

const logger = createLogger({
    info: true,
    warn: true,
    debug: true,
    error: true
});

module.exports = logger;
