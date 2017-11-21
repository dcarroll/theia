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
var MockLogger = /** @class */ (function () {
    function MockLogger() {
    }
    MockLogger.prototype.setLogLevel = function (logLevel) {
        return Promise.resolve();
    };
    MockLogger.prototype.getLogLevel = function () {
        return Promise.resolve(0);
    };
    MockLogger.prototype.isEnabled = function (logLevel) {
        return Promise.resolve(true);
    };
    MockLogger.prototype.ifEnabled = function (logLevel) {
        return Promise.resolve();
    };
    MockLogger.prototype.log = function (logLevel, arg2) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        return;
    };
    MockLogger.prototype.isTrace = function () {
        return Promise.resolve(true);
    };
    MockLogger.prototype.ifTrace = function () {
        return Promise.resolve();
    };
    MockLogger.prototype.trace = function (arg) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return;
    };
    MockLogger.prototype.isDebug = function () {
        return Promise.resolve(true);
    };
    MockLogger.prototype.ifDebug = function () {
        return Promise.resolve();
    };
    MockLogger.prototype.debug = function (arg) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return;
    };
    MockLogger.prototype.isInfo = function () {
        return Promise.resolve(true);
    };
    MockLogger.prototype.ifInfo = function () {
        return Promise.resolve();
    };
    MockLogger.prototype.info = function (arg) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return;
    };
    MockLogger.prototype.isWarn = function () {
        return Promise.resolve(true);
    };
    MockLogger.prototype.ifWarn = function () {
        return Promise.resolve();
    };
    MockLogger.prototype.warn = function (arg) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return;
    };
    MockLogger.prototype.isError = function () {
        return Promise.resolve(true);
    };
    MockLogger.prototype.ifError = function () {
        return Promise.resolve();
    };
    MockLogger.prototype.error = function (arg) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return;
    };
    MockLogger.prototype.isFatal = function () {
        return Promise.resolve(true);
    };
    MockLogger.prototype.ifFatal = function () {
        return Promise.resolve();
    };
    MockLogger.prototype.fatal = function (arg) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return;
    };
    MockLogger.prototype.child = function (obj) {
        return this;
    };
    MockLogger = __decorate([
        inversify_1.injectable()
    ], MockLogger);
    return MockLogger;
}());
exports.MockLogger = MockLogger;
//# sourceMappingURL=mock-logger.js.map