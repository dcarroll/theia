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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var logger_1 = require("./logger");
var ConsoleLoggerServer = /** @class */ (function () {
    function ConsoleLoggerServer() {
    }
    ConsoleLoggerServer.prototype.setLogLevel = function (id, logLevel) {
        return Promise.resolve();
    };
    ConsoleLoggerServer.prototype.getLogLevel = function (id) {
        return Promise.resolve(logger_1.LogLevel.DEBUG);
    };
    ConsoleLoggerServer.prototype.log = function (id, logLevel, message, params) {
        console.log(message + " " + params.map(function (p) { return p.toString(); }).join(' '));
        return Promise.resolve();
    };
    ConsoleLoggerServer.prototype.child = function (obj) {
        return Promise.resolve(1);
    };
    ConsoleLoggerServer.prototype.dispose = function () {
    };
    ConsoleLoggerServer.prototype.setClient = function (client) {
    };
    ConsoleLoggerServer = __decorate([
        inversify_1.injectable()
    ], ConsoleLoggerServer);
    return ConsoleLoggerServer;
}());
exports.ConsoleLoggerServer = ConsoleLoggerServer;
//# sourceMappingURL=console-logger-server.js.map