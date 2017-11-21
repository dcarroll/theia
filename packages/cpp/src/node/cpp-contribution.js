"use strict";
/*
 * Copyright (C) 2017 Ericsson and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var node_1 = require("@theia/languages/lib/node");
var common_1 = require("../common");
var common_2 = require("../common");
var vscode_ws_jsonrpc_1 = require("vscode-ws-jsonrpc");
var vscode_languageserver_protocol_1 = require("vscode-languageserver-protocol");
var CppContribution = /** @class */ (function (_super) {
    __extends(CppContribution, _super);
    function CppContribution(cppPreferences) {
        var _this = _super.call(this) || this;
        _this.cppPreferences = cppPreferences;
        _this.id = common_1.CPP_LANGUAGE_ID;
        _this.name = common_1.CPP_LANGUAGE_NAME;
        return _this;
    }
    CppContribution.prototype.map = function (message) {
        if (vscode_ws_jsonrpc_1.isRequestMessage(message)) {
            if (message.method === vscode_languageserver_protocol_1.InitializeRequest.type.method) {
                var initializeParams = message.params;
                initializeParams.processId = process.pid;
            }
        }
        return message;
    };
    CppContribution.prototype.forward = function (clientConnection, serverConnection) {
        _super.prototype.forward.call(this, clientConnection, serverConnection);
    };
    CppContribution.prototype.start = function (clientConnection) {
        var command = '';
        var args = [];
        if (this.cppPreferences["cpp.clangdPath"] === "") {
            command = (this.cppPreferences["cpp.clangdPath"] + '/clangd');
            args = [];
        }
        else {
            command = 'clangd';
            args = []; // [this.cppPreferences["cpp.clangdCompileCommandsPath"]];
        }
        var serverConnection = this.createProcessStreamConnection(command, args);
        this.forward(clientConnection, serverConnection);
    };
    CppContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_2.CppPreferences)),
        __metadata("design:paramtypes", [Object])
    ], CppContribution);
    return CppContribution;
}(node_1.BaseLanguageServerContribution));
exports.CppContribution = CppContribution;
//# sourceMappingURL=cpp-contribution.js.map