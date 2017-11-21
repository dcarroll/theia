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
var net = require("net");
var cp = require("child_process");
var inversify_1 = require("inversify");
var vscode_ws_jsonrpc_1 = require("vscode-ws-jsonrpc");
var vscode_languageserver_protocol_1 = require("vscode-languageserver-protocol");
var server_1 = require("vscode-ws-jsonrpc/lib/server");
var common_1 = require("../common");
exports.LanguageContribution = common_1.LanguageContribution;
exports.LanguageServerContribution = Symbol('LanguageServerContribution');
var BaseLanguageServerContribution = /** @class */ (function () {
    function BaseLanguageServerContribution() {
    }
    BaseLanguageServerContribution.prototype.forward = function (clientConnection, serverConnection) {
        server_1.forward(clientConnection, serverConnection, this.map.bind(this));
    };
    BaseLanguageServerContribution.prototype.map = function (message) {
        if (vscode_ws_jsonrpc_1.isRequestMessage(message)) {
            if (message.method === vscode_languageserver_protocol_1.InitializeRequest.type.method) {
                var initializeParams = message.params;
                initializeParams.processId = process.pid;
            }
        }
        return message;
    };
    BaseLanguageServerContribution.prototype.createProcessSocketConnection = function (outSocket, inSocket, command, args, options) {
        var process = this.spawnProcess(command, args, options);
        return Promise.all([
            Promise.resolve(outSocket),
            Promise.resolve(inSocket)
        ]).then(function (result) { return server_1.createProcessSocketConnection(process, result[0], result[1]); });
    };
    BaseLanguageServerContribution.prototype.createProcessStreamConnection = function (command, args, options) {
        var process = this.spawnProcess(command, args, options);
        return server_1.createProcessStreamConnection(process);
    };
    BaseLanguageServerContribution.prototype.spawnProcess = function (command, args, options) {
        var serverProcess = cp.spawn(command, args, options);
        serverProcess.once('error', this.onDidFailSpawnProcess.bind(this));
        serverProcess.stderr.on('data', this.logError.bind(this));
        return serverProcess;
    };
    BaseLanguageServerContribution.prototype.onDidFailSpawnProcess = function (error) {
        console.error(error);
    };
    BaseLanguageServerContribution.prototype.logError = function (data) {
        if (data) {
            console.error(this.name + ": " + data);
        }
    };
    BaseLanguageServerContribution.prototype.logInfo = function (data) {
        if (data) {
            console.info(this.name + ": " + data);
        }
    };
    BaseLanguageServerContribution.prototype.startSocketServer = function () {
        return new Promise(function (resolve) {
            var server = net.createServer();
            server.addListener('listening', function () {
                return resolve(server);
            });
            // allocate ports dynamically
            server.listen(0, '127.0.0.1');
        });
    };
    BaseLanguageServerContribution.prototype.accept = function (server) {
        return new Promise(function (resolve, reject) {
            server.on('error', reject);
            server.on('connection', function (socket) {
                // stop accepting new connections
                server.close();
                resolve(socket);
            });
        });
    };
    BaseLanguageServerContribution = __decorate([
        inversify_1.injectable()
    ], BaseLanguageServerContribution);
    return BaseLanguageServerContribution;
}());
exports.BaseLanguageServerContribution = BaseLanguageServerContribution;
//# sourceMappingURL=language-server-contribution.js.map