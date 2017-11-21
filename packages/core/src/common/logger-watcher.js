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
var event_1 = require("./event");
var LoggerWatcher = /** @class */ (function () {
    function LoggerWatcher() {
        this.onLogLevelChangedEmitter = new event_1.Emitter();
    }
    LoggerWatcher.prototype.getLoggerClient = function () {
        var emitter = this.onLogLevelChangedEmitter;
        return {
            onLogLevelChanged: function (event) {
                emitter.fire(event);
            }
        };
    };
    Object.defineProperty(LoggerWatcher.prototype, "onLogLevelChanged", {
        get: function () {
            return this.onLogLevelChangedEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    LoggerWatcher = __decorate([
        inversify_1.injectable()
    ], LoggerWatcher);
    return LoggerWatcher;
}());
exports.LoggerWatcher = LoggerWatcher;
//# sourceMappingURL=logger-watcher.js.map