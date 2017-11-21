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
var event_1 = require("@theia/core/lib/common/event");
var TerminalWatcher = /** @class */ (function () {
    function TerminalWatcher() {
        this.onTerminalExitEmitter = new event_1.Emitter();
        this.onTerminalErrorEmitter = new event_1.Emitter();
    }
    TerminalWatcher.prototype.getTerminalClient = function () {
        var exitEmitter = this.onTerminalExitEmitter;
        var errorEmitter = this.onTerminalErrorEmitter;
        return {
            onTerminalExitChanged: function (event) {
                exitEmitter.fire(event);
            },
            onTerminalError: function (event) {
                errorEmitter.fire(event);
            }
        };
    };
    Object.defineProperty(TerminalWatcher.prototype, "onTerminalExit", {
        get: function () {
            return this.onTerminalExitEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TerminalWatcher.prototype, "onTerminalError", {
        get: function () {
            return this.onTerminalErrorEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    TerminalWatcher = __decorate([
        inversify_1.injectable()
    ], TerminalWatcher);
    return TerminalWatcher;
}());
exports.TerminalWatcher = TerminalWatcher;
//# sourceMappingURL=terminal-watcher.js.map