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
var inversify_1 = require("inversify");
var process_manager_1 = require("./process-manager");
var common_1 = require("@theia/core/lib/common");
var Process = /** @class */ (function () {
    function Process(processManager, logger) {
        this.processManager = processManager;
        this.logger = logger;
        this.exitEmitter = new common_1.Emitter();
        this.errorEmitter = new common_1.Emitter();
        this._killed = false;
        this.id = this.processManager.register(this);
    }
    Object.defineProperty(Process.prototype, "killed", {
        get: function () {
            return this._killed;
        },
        set: function (killed) {
            /* readonly public property */
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Process.prototype, "onExit", {
        get: function () {
            return this.exitEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Process.prototype, "onError", {
        get: function () {
            return this.errorEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    Process.prototype.emitOnExit = function (code, signal) {
        var exitEvent = { 'code': code, 'signal': signal };
        this.handleOnExit(exitEvent);
        this.exitEmitter.fire(exitEvent);
    };
    Process.prototype.handleOnExit = function (event) {
        this._killed = true;
        var logMsg = "Process " + this.pid + " has exited with code " + event.code;
        if (event.signal !== undefined) {
            logMsg += ", signal : " + event.signal + ".";
        }
        this.logger.info(logMsg);
    };
    Process.prototype.emitOnError = function (err) {
        this.handleOnError(err);
        this.errorEmitter.fire(err);
    };
    Process.prototype.handleOnError = function (error) {
        this._killed = true;
        this.logger.error(error.toString());
    };
    Process = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(process_manager_1.ProcessManager)),
        __metadata("design:paramtypes", [process_manager_1.ProcessManager, Object])
    ], Process);
    return Process;
}());
exports.Process = Process;
//# sourceMappingURL=process.js.map