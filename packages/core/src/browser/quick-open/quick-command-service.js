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
var quick_open_model_1 = require("./quick-open-model");
var quick_open_service_1 = require("./quick-open-service");
var QuickCommandService = /** @class */ (function () {
    function QuickCommandService(commands, keybindings, quickOpenService) {
        this.commands = commands;
        this.keybindings = keybindings;
        this.quickOpenService = quickOpenService;
    }
    QuickCommandService.prototype.open = function () {
        // let's compute the items here to do it in the context of the currently activeElement
        this.items = [];
        var filteredAndSortedCommands = this.commands.commands.filter(function (a) { return a.label; }).sort(function (a, b) { return a.label.localeCompare(b.label); });
        try {
            for (var filteredAndSortedCommands_1 = __values(filteredAndSortedCommands), filteredAndSortedCommands_1_1 = filteredAndSortedCommands_1.next(); !filteredAndSortedCommands_1_1.done; filteredAndSortedCommands_1_1 = filteredAndSortedCommands_1.next()) {
                var command = filteredAndSortedCommands_1_1.value;
                if (command.label) {
                    this.items.push(new CommandQuickOpenItem(command, this.commands, this.keybindings));
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (filteredAndSortedCommands_1_1 && !filteredAndSortedCommands_1_1.done && (_a = filteredAndSortedCommands_1.return)) _a.call(filteredAndSortedCommands_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.quickOpenService.open(this, {
            placeholder: 'Type the name of a command you want to execute',
            fuzzyMatchLabel: true,
            fuzzySort: false
        });
        var e_1, _a;
    };
    QuickCommandService.prototype.onType = function (lookFor, acceptor) {
        acceptor(this.items);
    };
    QuickCommandService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_1.CommandRegistry)),
        __param(1, inversify_1.inject(common_1.KeybindingRegistry)),
        __param(2, inversify_1.inject(quick_open_service_1.QuickOpenService)),
        __metadata("design:paramtypes", [common_1.CommandRegistry,
            common_1.KeybindingRegistry,
            quick_open_service_1.QuickOpenService])
    ], QuickCommandService);
    return QuickCommandService;
}());
exports.QuickCommandService = QuickCommandService;
var CommandQuickOpenItem = /** @class */ (function (_super) {
    __extends(CommandQuickOpenItem, _super);
    function CommandQuickOpenItem(command, commands, keybindings) {
        var _this = _super.call(this) || this;
        _this.command = command;
        _this.commands = commands;
        _this.keybindings = keybindings;
        _this.activeElement = window.document.activeElement;
        _this.hidden = !_this.commands.getActiveHandler(_this.command.id);
        return _this;
    }
    CommandQuickOpenItem.prototype.getLabel = function () {
        return this.command.label;
    };
    CommandQuickOpenItem.prototype.isHidden = function () {
        return this.hidden;
    };
    CommandQuickOpenItem.prototype.getKeybinding = function () {
        return this.keybindings.getKeybindingForCommand(this.command.id);
    };
    CommandQuickOpenItem.prototype.run = function (mode) {
        var _this = this;
        if (mode !== quick_open_model_1.QuickOpenMode.OPEN) {
            return false;
        }
        // allow the quick open widget to close itself
        setTimeout(function () {
            // reset focus on the previously active element.
            _this.activeElement.focus();
            _this.commands.executeCommand(_this.command.id);
        }, 50);
        return true;
    };
    return CommandQuickOpenItem;
}(quick_open_model_1.QuickOpenItem));
exports.CommandQuickOpenItem = CommandQuickOpenItem;
//# sourceMappingURL=quick-command-service.js.map