"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
var browser_1 = require("@theia/languages/lib/browser");
var common_2 = require("../common");
var java_protocol_1 = require("./java-protocol");
var JavaClientContribution = /** @class */ (function (_super) {
    __extends(JavaClientContribution, _super);
    function JavaClientContribution(workspace, languages, languageClientFactory, window, commandService) {
        var _this = _super.call(this, workspace, languages, languageClientFactory) || this;
        _this.workspace = workspace;
        _this.languages = languages;
        _this.languageClientFactory = languageClientFactory;
        _this.window = window;
        _this.commandService = commandService;
        _this.id = common_2.JAVA_LANGUAGE_ID;
        _this.name = common_2.JAVA_LANGUAGE_NAME;
        return _this;
    }
    Object.defineProperty(JavaClientContribution.prototype, "globPatterns", {
        get: function () {
            return ['**/*.java', '**/pom.xml', '**/*.gradle'];
        },
        enumerable: true,
        configurable: true
    });
    JavaClientContribution.prototype.onReady = function (languageClient) {
        languageClient.onNotification(java_protocol_1.ActionableNotification.type, this.showActionableMessage.bind(this));
        _super.prototype.onReady.call(this, languageClient);
    };
    JavaClientContribution.prototype.showActionableMessage = function (message) {
        var _this = this;
        var items = message.commands || [];
        (_a = this.window).showMessage.apply(_a, __spread([message.severity, message.message], items)).then(function (command) {
            if (command) {
                var args = command.arguments || [];
                (_a = _this.commandService).executeCommand.apply(_a, __spread([command.command], args));
            }
            var _a;
        });
        var _a;
    };
    JavaClientContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(browser_1.Workspace)),
        __param(1, inversify_1.inject(browser_1.Languages)),
        __param(2, inversify_1.inject(browser_1.LanguageClientFactory)),
        __param(3, inversify_1.inject(browser_1.Window)),
        __param(4, inversify_1.inject(common_1.CommandService)),
        __metadata("design:paramtypes", [Object, Object, browser_1.LanguageClientFactory, Object, Object])
    ], JavaClientContribution);
    return JavaClientContribution;
}(browser_1.BaseLanguageClientContribution));
exports.JavaClientContribution = JavaClientContribution;
//# sourceMappingURL=java-client-contribution.js.map