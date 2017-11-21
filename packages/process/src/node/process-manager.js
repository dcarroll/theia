"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (C) 2017 Ericsson and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
var ProcessManager = /** @class */ (function () {
    function ProcessManager() {
        this.processes = new Map();
        this.id = 0;
        this.deleteEmitter = new common_1.Emitter();
    }
    ProcessManager.prototype.register = function (process) {
        var id = this.id;
        this.processes.set(id, process);
        this.id++;
        return id;
    };
    ProcessManager.prototype.get = function (id) {
        return this.processes.get(id);
    };
    ProcessManager.prototype.delete = function (process) {
        process.kill();
        this.processes.delete(process.id);
        this.deleteEmitter.fire(process.id);
    };
    Object.defineProperty(ProcessManager.prototype, "onDelete", {
        get: function () {
            return this.deleteEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    ProcessManager = __decorate([
        inversify_1.injectable()
    ], ProcessManager);
    return ProcessManager;
}());
exports.ProcessManager = ProcessManager;
//# sourceMappingURL=process-manager.js.map