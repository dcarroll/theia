"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
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
var protocol_1 = require("vscode-base-languageclient/lib/protocol");
var ConsoleWindow = /** @class */ (function () {
    function ConsoleWindow() {
        this.channels = new Map();
    }
    ConsoleWindow.prototype.showMessage = function (type, message) {
        var actions = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            actions[_i - 2] = arguments[_i];
        }
        if (type === protocol_1.MessageType.Error) {
            console.error(message);
        }
        if (type === protocol_1.MessageType.Warning) {
            console.warn(message);
        }
        if (type === protocol_1.MessageType.Info) {
            console.info(message);
        }
        if (type === protocol_1.MessageType.Log) {
            console.log(message);
        }
        return Promise.resolve(undefined);
    };
    ConsoleWindow.prototype.createOutputChannel = function (name) {
        var existing = this.channels.get(name);
        if (existing) {
            return existing;
        }
        var channel = {
            append: function (value) {
                console.log(name + ': ' + value);
            },
            appendLine: function (line) {
                console.log(name + ': ' + line);
            },
            show: function () {
                // no-op
            }
        };
        this.channels.set(name, channel);
        return channel;
    };
    ConsoleWindow = __decorate([
        inversify_1.injectable()
    ], ConsoleWindow);
    return ConsoleWindow;
}());
exports.ConsoleWindow = ConsoleWindow;
//# sourceMappingURL=console-window.js.map