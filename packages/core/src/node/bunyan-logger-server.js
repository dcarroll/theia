"use strict";
/*
 * Copyright (C) 2017 Ericsson and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var bunyan = require("bunyan");
var inversify_1 = require("inversify");
var logger_1 = require("../common/logger");
var logger_protocol_1 = require("../common/logger-protocol");
var LogLevelCliContribution = /** @class */ (function () {
    function LogLevelCliContribution() {
    }
    LogLevelCliContribution.prototype.configure = function (conf) {
        conf.option('logLevel', {
            description: 'Sets the log level',
            default: 'info',
            choices: ['trace', 'debug', 'info', 'warn', 'error', 'fatal']
        });
    };
    LogLevelCliContribution.prototype.setArguments = function (args) {
        this.logLevel = args['logLevel'];
    };
    LogLevelCliContribution = __decorate([
        inversify_1.injectable()
    ], LogLevelCliContribution);
    return LogLevelCliContribution;
}());
exports.LogLevelCliContribution = LogLevelCliContribution;
var BunyanLoggerServer = /** @class */ (function () {
    function BunyanLoggerServer(options) {
        /* Root logger and all child logger array.  */
        this.loggers = new Map();
        /* ID counter for the children.  */
        this.currentId = 0;
        /* Logger client to send notifications to.  */
        this.client = undefined;
        /* Default log level.  */
        this.logLevel = logger_1.LogLevel.INFO;
        /* Root logger id.  */
        this.rootLoggerId = 0;
        this.loggers.set(this.currentId++, bunyan.createLogger(options));
    }
    BunyanLoggerServer.prototype.dispose = function () {
        // no-op
    };
    /* See the bunyan child documentation, this creates a child logger
     * with the added properties of object in param.  */
    BunyanLoggerServer.prototype.child = function (obj) {
        var rootLogger = this.loggers.get(this.rootLoggerId);
        if (rootLogger !== undefined) {
            var id = this.currentId;
            this.loggers.set(id, rootLogger.child(obj));
            this.currentId++;
            return Promise.resolve(id);
        }
        else {
            throw new Error('No root logger');
        }
    };
    /* Set the client to receive notifications on.  */
    BunyanLoggerServer.prototype.setClient = function (client) {
        this.client = client;
    };
    /* Set the log level for a logger.  */
    BunyanLoggerServer.prototype.setLogLevel = function (id, logLevel) {
        var oldLogLevel = this.logLevel;
        var logger = this.loggers.get(id);
        if (logger === undefined) {
            throw new Error("No logger for id: " + id);
        }
        logger.level(this.toBunyanLevel(logLevel));
        this.logLevel = logLevel;
        /* Only notify about the root logger level changes.  */
        if (this.client !== undefined && id === this.rootLoggerId) {
            this.client.onLogLevelChanged({ oldLogLevel: oldLogLevel, newLogLevel: this.logLevel });
        }
        return Promise.resolve();
    };
    /* Get the log level for a logger.  */
    BunyanLoggerServer.prototype.getLogLevel = function (id) {
        var logger = this.loggers.get(id);
        if (logger === undefined) {
            throw new Error("No logger for id: " + id);
        }
        return Promise.resolve(this.toLogLevel(logger.level()));
    };
    /* Log a message to a logger.  */
    BunyanLoggerServer.prototype.log = function (id, logLevel, message, params) {
        var logger = this.loggers.get(id);
        if (logger === undefined) {
            throw new Error("No logger for id: " + id);
        }
        switch (logLevel) {
            case logger_1.LogLevel.TRACE:
                logger.trace(message, params);
                break;
            case logger_1.LogLevel.DEBUG:
                logger.debug(message, params);
                break;
            case logger_1.LogLevel.INFO:
                logger.info(message, params);
                break;
            case logger_1.LogLevel.WARN:
                logger.warn(message, params);
                break;
            case logger_1.LogLevel.ERROR:
                logger.error(message, params);
                break;
            case logger_1.LogLevel.FATAL:
                logger.fatal(message, params);
                break;
            default:
                logger.info(message, params);
                break;
        }
        return Promise.resolve();
    };
    /* Convert Theia's log levels to bunyan's.  */
    BunyanLoggerServer.prototype.toBunyanLevel = function (logLevel) {
        switch (logLevel) {
            case logger_1.LogLevel.FATAL:
                return bunyan.FATAL;
            case logger_1.LogLevel.ERROR:
                return bunyan.ERROR;
            case logger_1.LogLevel.WARN:
                return bunyan.WARN;
            case logger_1.LogLevel.INFO:
                return bunyan.INFO;
            case logger_1.LogLevel.DEBUG:
                return bunyan.DEBUG;
            case logger_1.LogLevel.TRACE:
                return bunyan.TRACE;
            default:
                return bunyan.INFO;
        }
    };
    BunyanLoggerServer.prototype.toLogLevel = function (bunyanLogLevel) {
        switch (Number(bunyanLogLevel)) {
            case bunyan.FATAL:
                return logger_1.LogLevel.FATAL;
            case bunyan.ERROR:
                return logger_1.LogLevel.ERROR;
            case bunyan.WARN:
                return logger_1.LogLevel.WARN;
            case bunyan.INFO:
                return logger_1.LogLevel.INFO;
            case bunyan.DEBUG:
                return logger_1.LogLevel.DEBUG;
            case bunyan.TRACE:
                return logger_1.LogLevel.TRACE;
            default:
                return logger_1.LogLevel.INFO;
        }
    };
    BunyanLoggerServer = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(logger_protocol_1.LoggerServerOptions)),
        __metadata("design:paramtypes", [Object])
    ], BunyanLoggerServer);
    return BunyanLoggerServer;
}());
exports.BunyanLoggerServer = BunyanLoggerServer;
//# sourceMappingURL=bunyan-logger-server.js.map