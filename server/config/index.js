require('dotenv').config();
const bunyan = require('bunyan');

const loggers = {
    development: () => bunyan.createLogger({
        name: 'development-perrng-app',
        level: 'debug',
        serializers: {
            err: bunyan.stdSerializers.err,
        },
    }),
    production: () => bunyan.createLogger({
        name: 'production-perrng-app',
        level: 'info',
        serializers: {
            err: bunyan.stdSerializers.err,
        },
    }),
};

module.exports = {
    development: {
        log: loggers.development,
        database: {
            hostName: process.env.HOST_NAME_DEV,
            portNumber: process.env.PORT_DEV,
            username: process.env.USERNAME_DEV,
            password: process.env.PASSWORD_DEV,
            database: process.env.DB_DSN_DEV,
            dialect: 'postgres',
            // dialectOptions: {
            //   useUTC: false,
            //   dateStrings: true,
            //   typeCast: true
            // },
            // timezone: 'America/Los_Angeles'
        },
    },
    production: {
        log: loggers.production,
        database: {
            hostName: process.env.RDS_HOSTNAME,
            portNumber: process.env.RDS_PORT,
            username: process.env.RDS_USERNAME,
            password: process.env.RDS_PASSWORD,
            database: process.env.RDS_DB_NAME,
            dialect: 'postgres',
            // dialectOptions: {
            //   useUTC: true,
            //   dateStrings: true,
            //   typeCast: true
            // },
            // timezone: 'America/Los_Angeles'
        },
    },
};
