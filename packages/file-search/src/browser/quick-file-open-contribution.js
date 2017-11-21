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
var quick_file_open_1 = require("./quick-file-open");
var common_1 = require("@theia/core/lib/common");
exports.quickFileOpen = {
    id: 'file-search.openFile',
    label: 'Open File ...'
};
var QuickFileOpenFrontendContribution = /** @class */ (function () {
    function QuickFileOpenFrontendContribution(quickFileOpenService) {
        this.quickFileOpenService = quickFileOpenService;
    }
    QuickFileOpenFrontendContribution.prototype.registerCommands = function (commands) {
        var _this = this;
        commands.registerCommand(exports.quickFileOpen, {
            execute: function () { return _this.quickFileOpenService.open(); },
            isEnabled: function () { return _this.quickFileOpenService.isEnabled(); }
        });
    };
    QuickFileOpenFrontendContribution.prototype.registerKeybindings = function (keybindings) {
        keybindings.registerKeybinding({
            commandId: exports.quickFileOpen.id,
            keyCode: common_1.KeyCode.createKeyCode({ first: common_1.Key.KEY_P, modifiers: [common_1.Modifier.M1] })
        });
    };
    QuickFileOpenFrontendContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(quick_file_open_1.QuickFileOpenService)),
        __metadata("design:paramtypes", [quick_file_open_1.QuickFileOpenService])
    ], QuickFileOpenFrontendContribution);
    return QuickFileOpenFrontendContribution;
}());
exports.QuickFileOpenFrontendContribution = QuickFileOpenFrontendContribution;
//# sourceMappingURL=quick-file-open-contribution.js.map