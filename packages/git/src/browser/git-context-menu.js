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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var git_command_1 = require("./git-command");
exports.GIT_CONTEXT_MENU = ['git-context-menu'];
var GitContextMenu = /** @class */ (function () {
    function GitContextMenu() {
    }
    GitContextMenu.prototype.registerMenus = function (menus) {
        var commands = [git_command_1.GIT_COMMANDS.FETCH, git_command_1.GIT_COMMANDS.PULL, git_command_1.GIT_COMMANDS.PUSH, git_command_1.GIT_COMMANDS.MERGE];
        commands.forEach(function (command) {
            return menus.registerMenuAction(exports.GIT_CONTEXT_MENU, {
                commandId: command.id,
                label: command.label.slice('Git '.length) + '...'
            });
        });
    };
    GitContextMenu = __decorate([
        inversify_1.injectable()
    ], GitContextMenu);
    return GitContextMenu;
}());
exports.GitContextMenu = GitContextMenu;
//# sourceMappingURL=git-context-menu.js.map