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
var logger_1 = require("@theia/core/lib/common/logger");
var base_terminal_server_1 = require("../node/base-terminal-server");
var shell_process_1 = require("../node/shell-process");
var node_1 = require("@theia/process/lib/node");
var ShellTerminalServer = /** @class */ (function (_super) {
    __extends(ShellTerminalServer, _super);
    function ShellTerminalServer(shellFactory, processManager, logger) {
        var _this = _super.call(this, processManager, logger) || this;
        _this.shellFactory = shellFactory;
        return _this;
    }
    ShellTerminalServer.prototype.create = function (options) {
        try {
            var term = this.shellFactory(options);
            this.postCreate(term);
            return Promise.resolve(term.id);
        }
        catch (error) {
            this.logger.error("Error while creating terminal: " + error);
            return Promise.resolve(-1);
        }
    };
    ShellTerminalServer = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(shell_process_1.ShellProcessFactory)),
        __param(1, inversify_1.inject(node_1.ProcessManager)),
        __param(2, inversify_1.inject(logger_1.ILogger)),
        __metadata("design:paramtypes", [Function, node_1.ProcessManager, Object])
    ], ShellTerminalServer);
    return ShellTerminalServer;
}(base_terminal_server_1.BaseTerminalServer));
exports.ShellTerminalServer = ShellTerminalServer;
//# sourceMappingURL=shell-terminal-server.js.map