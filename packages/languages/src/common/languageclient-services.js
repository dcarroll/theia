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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
__export(require("vscode-base-languageclient/lib/services"));
__export(require("vscode-base-languageclient/lib/connection"));
var base_1 = require("vscode-base-languageclient/lib/base");
exports.BaseLanguageClient = base_1.BaseLanguageClient;
exports.Languages = Symbol('Languages');
exports.Workspace = Symbol('Workspace');
exports.Commands = Symbol('Commands');
var DefaultCommands = /** @class */ (function () {
    function DefaultCommands(registry) {
        this.registry = registry;
    }
    DefaultCommands.prototype.registerCommand = function (id, callback, thisArg) {
        var execute = callback.bind(thisArg);
        return this.registry.registerCommand({ id: id }, { execute: execute });
    };
    DefaultCommands = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_1.CommandRegistry)),
        __metadata("design:paramtypes", [common_1.CommandRegistry])
    ], DefaultCommands);
    return DefaultCommands;
}());
exports.DefaultCommands = DefaultCommands;
exports.Window = Symbol('Window');
exports.IConnectionProvider = Symbol('IConnectionProvider');
exports.ILanguageClient = Symbol('ILanguageClient');
//# sourceMappingURL=languageclient-services.js.map