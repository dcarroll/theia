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
var editor_manager_1 = require("./editor-manager");
var EditorKeybindingContext = /** @class */ (function () {
    function EditorKeybindingContext(editorService) {
        this.editorService = editorService;
        this.id = 'editor.keybinding.context';
    }
    EditorKeybindingContext.prototype.isEnabled = function (arg) {
        return this.editorService && !!this.editorService.activeEditor;
    };
    EditorKeybindingContext = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(editor_manager_1.EditorManager)),
        __metadata("design:paramtypes", [Object])
    ], EditorKeybindingContext);
    return EditorKeybindingContext;
}());
exports.EditorKeybindingContext = EditorKeybindingContext;
var EditorKeybindingContribution = /** @class */ (function () {
    function EditorKeybindingContribution(editorKeybindingContext) {
        this.editorKeybindingContext = editorKeybindingContext;
    }
    EditorKeybindingContribution.prototype.registerKeybindings = function (registry) {
    };
    EditorKeybindingContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(EditorKeybindingContext)),
        __metadata("design:paramtypes", [EditorKeybindingContext])
    ], EditorKeybindingContribution);
    return EditorKeybindingContribution;
}());
exports.EditorKeybindingContribution = EditorKeybindingContribution;
//# sourceMappingURL=editor-keybinding.js.map