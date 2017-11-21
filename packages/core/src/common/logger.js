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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var logger_watcher_1 = require("./logger-watcher");
var logger_protocol_1 = require("./logger-protocol");
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["FATAL"] = 60] = "FATAL";
    LogLevel[LogLevel["ERROR"] = 50] = "ERROR";
    LogLevel[LogLevel["WARN"] = 40] = "WARN";
    LogLevel[LogLevel["INFO"] = 30] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 20] = "DEBUG";
    LogLevel[LogLevel["TRACE"] = 10] = "TRACE";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
function setRootLogger(alogger) {
    exports.logger = alogger;
}
exports.setRootLogger = setRootLogger;
exports.LoggerFactory = Symbol('LoggerFactory');
exports.LoggerOptions = Symbol('LoggerOptions');
exports.ILogger = Symbol('ILogger');
var Logger = /** @class */ (function () {
    /**
     * Build a new Logger.
     *
     * @param options - The options to build the logger with, see the
     * bunyan child method documentation for more information.
     */
    function Logger(server, loggerWatcher, factory, options) {
        var _this = this;
        this.server = server;
        this.loggerWatcher = loggerWatcher;
        this.factory = factory;
        /* Root logger has id 0.  */
        this.rootLoggerId = 0;
        /* Default id is the root logger id.  */
        this.id = Promise.resolve(this.rootLoggerId);
        /* Creating a child logger.  */
        if (options !== undefined) {
            this.id = server.child(options);
        }
        /* Fetch the log level so it's cached in the frontend.  */
        this._logLevel = this.id.then(function (id) { return _this.server.getLogLevel(id); });
        /* Update the root logger log level if it changes in the backend. */
        loggerWatcher.onLogLevelChanged(function (event) {
            _this.id.then(function (id) {
                if (id === _this.rootLoggerId) {
                    _this._logLevel = Promise.resolve(event.newLogLevel);
                }
            });
        });
    }
    Logger.prototype.setLogLevel = function (logLevel) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.id.then(function (id) {
                _this._logLevel.then(function (oldLevel) {
                    _this.server.setLogLevel(id, logLevel).then(function () {
                        _this._logLevel = Promise.resolve(logLevel);
                        resolve();
                    });
                });
            });
        });
    };
    Logger.prototype.getLogLevel = function () {
        return this._logLevel;
    };
    Logger.prototype.isEnabled = function (logLevel) {
        return this._logLevel.then(function (level) {
            return logLevel >= level;
        });
    };
    Logger.prototype.ifEnabled = function (logLevel) {
        var _this = this;
        return new Promise(function (resolve) {
            return _this.isEnabled(logLevel).then(function (enabled) {
                if (enabled) {
                    resolve();
                }
            });
        });
    };
    Logger.prototype.log = function (logLevel, arg2) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        this.getLog(logLevel).then(function (log) {
            if (typeof arg2 === 'string') {
                var message = arg2;
                log.apply(void 0, __spread([message], params));
            }
            else {
                var loggable = arg2;
                loggable(log);
            }
        });
    };
    Logger.prototype.getLog = function (logLevel) {
        var _this = this;
        return this.ifEnabled(logLevel).then(function () {
            return _this.id.then(function (id) {
                return function (message) {
                    var params = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        params[_i - 1] = arguments[_i];
                    }
                    return _this.server.log(id, logLevel, message, params);
                };
            });
        });
    };
    Logger.prototype.isTrace = function () {
        return this.isEnabled(LogLevel.TRACE);
    };
    Logger.prototype.ifTrace = function () {
        return this.ifEnabled(LogLevel.TRACE);
    };
    Logger.prototype.trace = function (arg) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.log.apply(this, __spread([LogLevel.TRACE, arg], params));
    };
    Logger.prototype.isDebug = function () {
        return this.isEnabled(LogLevel.DEBUG);
    };
    Logger.prototype.ifDebug = function () {
        return this.ifEnabled(LogLevel.DEBUG);
    };
    Logger.prototype.debug = function (arg) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.log.apply(this, __spread([LogLevel.DEBUG, arg], params));
    };
    Logger.prototype.isInfo = function () {
        return this.isEnabled(LogLevel.INFO);
    };
    Logger.prototype.ifInfo = function () {
        return this.ifEnabled(LogLevel.INFO);
    };
    Logger.prototype.info = function (arg) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.log.apply(this, __spread([LogLevel.INFO, arg], params));
    };
    Logger.prototype.isWarn = function () {
        return this.isEnabled(LogLevel.WARN);
    };
    Logger.prototype.ifWarn = function () {
        return this.ifEnabled(LogLevel.WARN);
    };
    Logger.prototype.warn = function (arg) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.log.apply(this, __spread([LogLevel.WARN, arg], params));
    };
    Logger.prototype.isError = function () {
        return this.isEnabled(LogLevel.ERROR);
    };
    Logger.prototype.ifError = function () {
        return this.ifEnabled(LogLevel.ERROR);
    };
    Logger.prototype.error = function (arg) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.log.apply(this, __spread([LogLevel.ERROR, arg], params));
    };
    Logger.prototype.isFatal = function () {
        return this.isEnabled(LogLevel.FATAL);
    };
    Logger.prototype.ifFatal = function () {
        return this.ifEnabled(LogLevel.FATAL);
    };
    Logger.prototype.fatal = function (arg) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.log.apply(this, __spread([LogLevel.FATAL, arg], params));
    };
    Logger.prototype.child = function (obj) {
        return this.factory(obj);
    };
    Logger = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(logger_protocol_1.ILoggerServer)),
        __param(1, inversify_1.inject(logger_watcher_1.LoggerWatcher)),
        __param(2, inversify_1.inject(exports.LoggerFactory)),
        __param(3, inversify_1.inject(exports.LoggerOptions)), __param(3, inversify_1.optional()),
        __metadata("design:paramtypes", [Object, logger_watcher_1.LoggerWatcher, Function, Object])
    ], Logger);
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map