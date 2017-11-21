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
var browser_1 = require("@theia/editor/lib/browser");
var common_1 = require("@theia/core/lib/common");
var CppKeybindingContext = /** @class */ (function () {
    function CppKeybindingContext(editorService) {
        this.editorService = editorService;
        this.id = 'cpp.keybinding.context';
    }
    CppKeybindingContext.prototype.isEnabled = function (arg) {
        return this.editorService && !!this.editorService.activeEditor &&
            (this.editorService.activeEditor.editor.document.uri.endsWith(".cpp") || this.editorService.activeEditor.editor.document.uri.endsWith(".h"));
    };
    CppKeybindingContext = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(browser_1.EditorManager)),
        __metadata("design:paramtypes", [Object])
    ], CppKeybindingContext);
    return CppKeybindingContext;
}());
exports.CppKeybindingContext = CppKeybindingContext;
var CppKeybindingContribution = /** @class */ (function () {
    function CppKeybindingContribution(cppKeybindingContext) {
        this.cppKeybindingContext = cppKeybindingContext;
    }
    CppKeybindingContribution.prototype.registerKeybindings = function (registry) {
        [
            {
                commandId: 'switch_source_header',
                context: this.cppKeybindingContext,
                keyCode: common_1.KeyCode.createKeyCode({ first: common_1.Key.KEY_O, modifiers: [common_1.Modifier.M3] })
            }
        ].forEach(function (binding) {
            registry.registerKeybinding(binding);
        });
    };
    CppKeybindingContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(CppKeybindingContext)),
        __metadata("design:paramtypes", [CppKeybindingContext])
    ], CppKeybindingContribution);
    return CppKeybindingContribution;
}());
exports.CppKeybindingContribution = CppKeybindingContribution;
//# sourceMappingURL=cpp-keybinding.js.map