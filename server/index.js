const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const createError = require('http-errors');
const routes = require('./routes');

// Modules (files) are cached in node: so any subsequent require('./models') (like in the services)
// will just call the existing Class instantiated here
// const db = require('./models');

module.exports = (config) => {
    const app = express();
    app.use(helmet());
    app.use(compression());
    const log = config.log();

    app.get('/favicon.ico', (req, res) => res.sendStatus(204));

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    if (app.get('env') === 'production') {
        // Serve built React app in production
        app.use(express.static('client/build'));
        /**
         * If true, the client’s IP address is understood as the left-most entry
         * in the X-Forwarded-For header
         * Additionally, an IP address, subnet, or an array of IP addresses and subnets
         * that are trusted to be a reverse proxy are set
         * loopback is the pre-configured subnet name for: 127.0.0.1/8, ::1/128
         */
        app.set('trust proxy', 'loopback');
    }

    // Mount api routes - @TODO to be replaced with GraphQL server
    app.use('/api/', routes());

    // Catch non-existing routes (404s) and forward to error handler
    // eslint-disable-next-line no-unused-vars
    app.use((req, res, next) => {
        next(createError(404));
    });

    // Custom error handler to extend default Express error handler
    app.use(async (err, req, res, next) => {
        // Enable last
        // If the error occurs after the response headers have been sent,
        // let the default Express error handler catch it
        // if (res.headersSent) {
        //     return next(err);
        // }

        const status = err.status || 500;
        const errOptions = req.app.get('env') === 'development'
            ? { msg: err.message || '', stack: err.stack || '' }
            : {};
        if (req.xhr) {
            log.error(err);
            try {
                return res.status(status).json(errOptions);
            } catch (e) {
                return next(e);
            }
        } else {
            log.error(err);
            try {
                return res.status(status).json(errOptions);
            } catch (e) {
                return next(e);
            }
        }
    });

    return app;
};
