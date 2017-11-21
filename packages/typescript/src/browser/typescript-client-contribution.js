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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var browser_1 = require("@theia/languages/lib/browser");
var common_1 = require("../common");
var index_1 = require("../common/index");
var TypeScriptClientContribution = /** @class */ (function (_super) {
    __extends(TypeScriptClientContribution, _super);
    function TypeScriptClientContribution(workspace, languages, languageClientFactory) {
        var _this = _super.call(this, workspace, languages, languageClientFactory) || this;
        _this.workspace = workspace;
        _this.languages = languages;
        _this.languageClientFactory = languageClientFactory;
        _this.id = common_1.TYPESCRIPT_LANGUAGE_ID;
        _this.name = common_1.TYPESCRIPT_LANGUAGE_NAME;
        return _this;
    }
    Object.defineProperty(TypeScriptClientContribution.prototype, "globPatterns", {
        get: function () {
            return [
                '**/*.ts',
                '**/*.tsx'
            ];
        },
        enumerable: true,
        configurable: true
    });
    TypeScriptClientContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(browser_1.Workspace)),
        __param(1, inversify_1.inject(browser_1.Languages)),
        __param(2, inversify_1.inject(browser_1.LanguageClientFactory)),
        __metadata("design:paramtypes", [Object, Object, browser_1.LanguageClientFactory])
    ], TypeScriptClientContribution);
    return TypeScriptClientContribution;
}(browser_1.BaseLanguageClientContribution));
exports.TypeScriptClientContribution = TypeScriptClientContribution;
var JavaScriptClientContribution = /** @class */ (function (_super) {
    __extends(JavaScriptClientContribution, _super);
    function JavaScriptClientContribution(workspace, languages, languageClientFactory) {
        var _this = _super.call(this, workspace, languages, languageClientFactory) || this;
        _this.workspace = workspace;
        _this.languages = languages;
        _this.languageClientFactory = languageClientFactory;
        _this.id = index_1.JAVASCRIPT_LANGUAGE_ID;
        _this.name = index_1.JAVASCRIPT_LANGUAGE_NAME;
        return _this;
    }
    Object.defineProperty(JavaScriptClientContribution.prototype, "globPatterns", {
        get: function () {
            return [
                '**/*.js',
                '**/*.jsx',
            ];
        },
        enumerable: true,
        configurable: true
    });
    JavaScriptClientContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(browser_1.Workspace)),
        __param(1, inversify_1.inject(browser_1.Languages)),
        __param(2, inversify_1.inject(browser_1.LanguageClientFactory)),
        __metadata("design:paramtypes", [Object, Object, browser_1.LanguageClientFactory])
    ], JavaScriptClientContribution);
    return JavaScriptClientContribution;
}(browser_1.BaseLanguageClientContribution));
exports.JavaScriptClientContribution = JavaScriptClientContribution;
//# sourceMappingURL=typescript-client-contribution.js.map