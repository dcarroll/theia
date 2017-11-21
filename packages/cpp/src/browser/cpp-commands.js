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
var common_1 = require("@theia/core/lib/common");
var uri_1 = require("@theia/core/lib/common/uri");
var browser_1 = require("@theia/core/lib/browser");
var cpp_client_contribution_1 = require("./cpp-client-contribution");
var cpp_protocol_1 = require("./cpp-protocol");
var common_2 = require("@theia/languages/lib/common");
var browser_2 = require("@theia/editor/lib/browser");
/**
 * Switch between source/header file
 */
exports.SWITCH_SOURCE_HEADER = {
    id: 'switch_source_header',
    label: 'Switch between source/header file'
};
exports.FILE_OPEN_PATH = function (path) { return ({
    id: "file:openPath"
}); };
var CppCommandContribution = /** @class */ (function () {
    function CppCommandContribution(clientContribution, openerService, editorService, selectionService) {
        this.clientContribution = clientContribution;
        this.openerService = openerService;
        this.editorService = editorService;
        this.selectionService = selectionService;
    }
    CppCommandContribution.prototype.registerCommands = function (commands) {
        var _this = this;
        commands.registerCommand(exports.SWITCH_SOURCE_HEADER, {
            isEnabled: function () { return (_this.editorService && !!_this.editorService.activeEditor &&
                (_this.editorService.activeEditor.editor.document.uri.endsWith(".cpp") || _this.editorService.activeEditor.editor.document.uri.endsWith(".h"))); },
            execute: function () {
                _this.switchSourceHeader();
            }
        });
    };
    CppCommandContribution.prototype.switchSourceHeader = function () {
        var _this = this;
        var docIdentifier = common_2.TextDocumentIdentifier.create(this.selectionService.selection.uri.toString());
        this.clientContribution.languageClient.then(function (languageClient) {
            languageClient.sendRequest(cpp_protocol_1.TextDocumentItemRequest.type, docIdentifier).then(function (sourceUri) {
                if (sourceUri !== undefined) {
                    browser_1.open(_this.openerService, new uri_1.default(sourceUri.toString()));
                }
            });
        });
    };
    CppCommandContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(cpp_client_contribution_1.CppClientContribution)),
        __param(1, inversify_1.inject(browser_1.OpenerService)),
        __param(2, inversify_1.inject(browser_2.EditorManager)),
        __metadata("design:paramtypes", [cpp_client_contribution_1.CppClientContribution, Object, Object, common_1.SelectionService])
    ], CppCommandContribution);
    return CppCommandContribution;
}());
exports.CppCommandContribution = CppCommandContribution;
//# sourceMappingURL=cpp-commands.js.map