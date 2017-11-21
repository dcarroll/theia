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
var monaco_languageclient_1 = require("monaco-languageclient");
var uri_1 = require("@theia/core/lib/common/uri");
var browser_1 = require("@theia/core/lib/browser");
var browser_2 = require("@theia/editor/lib/browser");
var monaco_editor_1 = require("./monaco-editor");
var MonacoEditorService = /** @class */ (function () {
    function MonacoEditorService(openerService, m2p) {
        this.openerService = openerService;
        this.m2p = m2p;
    }
    MonacoEditorService.prototype.openEditor = function (input, sideBySide) {
        var uri = new uri_1.default(input.resource.toString());
        var editorInput = this.createEditorInput(input);
        return monaco.Promise.wrap(browser_1.open(this.openerService, uri, editorInput).then(function (widget) {
            if (widget instanceof browser_2.EditorWidget && widget.editor instanceof monaco_editor_1.MonacoEditor) {
                return widget.editor;
            }
            return undefined;
        }));
    };
    MonacoEditorService.prototype.createEditorInput = function (input, sideBySide) {
        var revealIfVisible = !input.options || input.options.revealIfVisible === undefined || input.options.revealIfVisible;
        var selection = !input.options ? undefined : this.m2p.asRange(input.options.selection);
        return {
            revealIfVisible: revealIfVisible,
            selection: selection
        };
    };
    MonacoEditorService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(browser_1.OpenerService)),
        __param(1, inversify_1.inject(monaco_languageclient_1.MonacoToProtocolConverter)),
        __metadata("design:paramtypes", [Object, monaco_languageclient_1.MonacoToProtocolConverter])
    ], MonacoEditorService);
    return MonacoEditorService;
}());
exports.MonacoEditorService = MonacoEditorService;
//# sourceMappingURL=monaco-editor-service.js.map