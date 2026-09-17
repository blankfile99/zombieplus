"use strict";

require('./bootstrap');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const http = require('http');
const Sentry = require('@sentry/node');

require('express-async-errors');

const routes = require('./routes');
const sentryConfig = require('./config/sentry');

class App {
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);

        Sentry.init(sentryConfig.default || sentryConfig);

        this.middlewares();
        this.routes();
        this.exceptionHandler();
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    }

    routes() {
        this.app.use(routes);
    }

    exceptionHandler() {
        this.app.use((err, req, res, next) => {
            console.error('GLOBAL ERROR CAPTURED:', err);
            return res.status(500).json({
                error: err.message,
                stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
            });
        });
    }
}

module.exports = new App().server;
