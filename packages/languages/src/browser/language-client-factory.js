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
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
var common_1 = require("../common");
var LanguageClientFactory = /** @class */ (function () {
    function LanguageClientFactory(workspace, languages, commands, window, connectionProvider) {
        this.workspace = workspace;
        this.languages = languages;
        this.commands = commands;
        this.window = window;
        this.connectionProvider = connectionProvider;
    }
    LanguageClientFactory.prototype.get = function (contribution, clientOptions) {
        var _this = this;
        var _a = this, workspace = _a.workspace, languages = _a.languages, commands = _a.commands, window = _a.window;
        var services = { workspace: workspace, languages: languages, commands: commands, window: window };
        return new common_1.BaseLanguageClient({
            name: contribution.name,
            clientOptions: clientOptions,
            services: services,
            connectionProvider: {
                get: function (errorHandler, closeHandler) {
                    return new Promise(function (resolve) {
                        _this.connectionProvider.listen({
                            path: common_1.LanguageContribution.getPath(contribution),
                            onConnection: function (messageConnection) {
                                var connection = common_1.createConnection(messageConnection, errorHandler, closeHandler);
                                resolve(connection);
                            }
                        }, { reconnecting: false });
                    });
                }
            }
        });
    };
    LanguageClientFactory = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_1.Workspace)),
        __param(1, inversify_1.inject(common_1.Languages)),
        __param(2, inversify_1.inject(common_1.Commands)),
        __param(3, inversify_1.inject(common_1.Window)),
        __param(4, inversify_1.inject(browser_1.WebSocketConnectionProvider)),
        __metadata("design:paramtypes", [Object, Object, Object, Object, browser_1.WebSocketConnectionProvider])
    ], LanguageClientFactory);
    return LanguageClientFactory;
}());
exports.LanguageClientFactory = LanguageClientFactory;
//# sourceMappingURL=language-client-factory.js.map