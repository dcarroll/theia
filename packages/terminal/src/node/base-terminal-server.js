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
var common_1 = require("@theia/core/lib/common");
var node_1 = require("@theia/process/lib/node");
var BaseTerminalServer = /** @class */ (function () {
    function BaseTerminalServer(processManager, logger) {
        var _this = this;
        this.processManager = processManager;
        this.logger = logger;
        this.client = undefined;
        this.terminalToDispose = new Map();
        processManager.onDelete(function (id) {
            var toDispose = _this.terminalToDispose.get(id);
            if (toDispose !== undefined) {
                toDispose.dispose();
                _this.terminalToDispose.delete(id);
            }
        });
    }
    BaseTerminalServer.prototype.attach = function (id) {
        var term = this.processManager.get(id);
        if (term && term instanceof node_1.TerminalProcess) {
            return Promise.resolve(term.id);
        }
        else {
            this.logger.error("Couldn't attach - can't find terminal with id: " + id + " ");
            return Promise.resolve(-1);
        }
    };
    BaseTerminalServer.prototype.dispose = function () {
        // noop
    };
    BaseTerminalServer.prototype.resize = function (id, cols, rows) {
        var term = this.processManager.get(id);
        if (term && term instanceof node_1.TerminalProcess) {
            term.resize(cols, rows);
        }
        else {
            console.error("Couldn't resize terminal " + id + ", because it doesn't exist.");
        }
        return Promise.resolve();
    };
    /* Set the client to receive notifications on.  */
    BaseTerminalServer.prototype.setClient = function (client) {
        this.client = client;
    };
    BaseTerminalServer.prototype.postCreate = function (term) {
        var _this = this;
        var toDispose = new common_1.DisposableCollection();
        toDispose.push(term.onError(function (error) {
            _this.logger.error("Terminal pid: " + term.pid + " error: " + error + ", closing it.");
            if (_this.client !== undefined) {
                _this.client.onTerminalError({
                    'terminalId': term.id,
                    'error': error
                });
            }
        }));
        toDispose.push(term.onExit(function (event) {
            if (_this.client !== undefined) {
                _this.client.onTerminalExitChanged({
                    'terminalId': term.id,
                    'code': event.code,
                    'signal': event.signal
                });
            }
        }));
        this.terminalToDispose.set(term.id, toDispose);
    };
    BaseTerminalServer = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(node_1.ProcessManager)),
        __param(1, inversify_1.inject(common_1.ILogger)),
        __metadata("design:paramtypes", [node_1.ProcessManager, Object])
    ], BaseTerminalServer);
    return BaseTerminalServer;
}());
exports.BaseTerminalServer = BaseTerminalServer;
//# sourceMappingURL=base-terminal-server.js.map