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
var common_1 = require("../../common");
var backend_application_1 = require("../backend-application");
var connection_1 = require("./connection");
exports.messagingBackendModule = new inversify_1.ContainerModule(function (bind) {
    bind(backend_application_1.BackendApplicationContribution).to(MessagingContribution);
    common_1.bindContributionProvider(bind, common_1.ConnectionHandler);
});
var MessagingContribution = /** @class */ (function () {
    function MessagingContribution(handlers) {
        this.handlers = handlers;
    }
    MessagingContribution.prototype.onStart = function (server) {
        var _loop_1 = function (handler) {
            var path = handler.path;
            try {
                connection_1.createServerWebSocketConnection({
                    server: server,
                    path: path
                }, function (connection) { return handler.onConnection(connection); });
            }
            catch (error) {
                console.error(error);
            }
        };
        try {
            for (var _a = __values(this.handlers.getContributions()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var handler = _b.value;
                _loop_1(handler);
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
    MessagingContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_1.ContributionProvider)), __param(0, inversify_1.named(common_1.ConnectionHandler)),
        __metadata("design:paramtypes", [Object])
    ], MessagingContribution);
    return MessagingContribution;
}());
exports.MessagingContribution = MessagingContribution;
//# sourceMappingURL=messaging-backend-module.js.map