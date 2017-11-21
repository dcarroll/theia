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
Object.defineProperty(exports, "__esModule", { value: true });
var stream = require("stream");
var inversify_1 = require("inversify");
var uri_1 = require("@theia/core/lib/common/uri");
var common_1 = require("@theia/core/lib/common");
var node_1 = require("@theia/process/lib/node");
var node_2 = require("@theia/core/lib/node");
var TerminalBackendContribution = /** @class */ (function () {
    function TerminalBackendContribution(processManager, logger) {
        this.processManager = processManager;
        this.logger = logger;
    }
    TerminalBackendContribution.prototype.onStart = function (server) {
        var _this = this;
        node_2.openSocket({
            server: server,
            matches: function (request) {
                var uri = new uri_1.default(request.url);
                return uri.path.toString().startsWith('/services/terminals/');
            }
        }, function (ws, request) {
            var uri = new uri_1.default(request.url);
            var id = parseInt(uri.path.base, 10);
            var term = _this.processManager.get(id);
            if (!term) {
                return;
            }
            var termStream = new stream.PassThrough();
            termStream.on('data', function (data) {
                try {
                    ws.send(data.toString());
                }
                catch (ex) {
                    console.error(ex);
                }
            });
            term.output.pipe(termStream);
            ws.on('message', function (msg) {
                if (term instanceof node_1.TerminalProcess) {
                    term.write(msg);
                }
            });
            ws.on('close', function (msg) {
                if (term !== undefined) {
                    _this.processManager.delete(term);
                    term = undefined;
                }
            });
        });
    };
    TerminalBackendContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(node_1.ProcessManager)),
        __param(1, inversify_1.inject(common_1.ILogger)),
        __metadata("design:paramtypes", [node_1.ProcessManager, Object])
    ], TerminalBackendContribution);
    return TerminalBackendContribution;
}());
exports.TerminalBackendContribution = TerminalBackendContribution;
//# sourceMappingURL=terminal-backend-contribution.js.map