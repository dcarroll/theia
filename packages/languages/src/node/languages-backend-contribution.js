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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var server_1 = require("vscode-ws-jsonrpc/lib/server");
var common_1 = require("@theia/core/lib/common");
var node_1 = require("@theia/core/lib/node");
var language_server_contribution_1 = require("./language-server-contribution");
var LanguagesBackendContribution = /** @class */ (function () {
    function LanguagesBackendContribution(contributors) {
        this.contributors = contributors;
    }
    LanguagesBackendContribution.prototype.onStart = function (server) {
        var _loop_1 = function (contribution) {
            var path = language_server_contribution_1.LanguageContribution.getPath(contribution);
            node_1.openJsonRpcSocket({ server: server, path: path }, function (socket) {
                try {
                    var connection = server_1.createWebSocketConnection(socket);
                    contribution.start(connection);
                }
                catch (e) {
                    socket.dispose();
                    throw e;
                }
            });
        };
        try {
            for (var _a = __values(this.contributors.getContributions()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var contribution = _b.value;
                _loop_1(contribution);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _c;
    };
    LanguagesBackendContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_1.ContributionProvider)), __param(0, inversify_1.named(language_server_contribution_1.LanguageServerContribution)),
        __metadata("design:paramtypes", [Object])
    ], LanguagesBackendContribution);
    return LanguagesBackendContribution;
}());
exports.LanguagesBackendContribution = LanguagesBackendContribution;
//# sourceMappingURL=languages-backend-contribution.js.map