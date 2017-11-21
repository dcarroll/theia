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
var browser_1 = require("@theia/core/lib/browser");
var workspace_commands_1 = require("@theia/workspace/lib/browser/workspace-commands");
exports.NAVIGATOR_CONTEXT_MENU = ['navigator-context-menu'];
var NavigatorContextMenu;
(function (NavigatorContextMenu) {
    NavigatorContextMenu.OPEN = __spread(exports.NAVIGATOR_CONTEXT_MENU, ['1_open']);
    NavigatorContextMenu.OPEN_WITH = __spread(NavigatorContextMenu.OPEN, ['open_with']);
    NavigatorContextMenu.CLIPBOARD = __spread(exports.NAVIGATOR_CONTEXT_MENU, ['2_clipboard']);
    NavigatorContextMenu.MOVE = __spread(exports.NAVIGATOR_CONTEXT_MENU, ['3_move']);
    NavigatorContextMenu.NEW = __spread(exports.NAVIGATOR_CONTEXT_MENU, ['4_new']);
})(NavigatorContextMenu = exports.NavigatorContextMenu || (exports.NavigatorContextMenu = {}));
var NavigatorMenuContribution = /** @class */ (function () {
    function NavigatorMenuContribution(openerService) {
        this.openerService = openerService;
    }
    NavigatorMenuContribution.prototype.registerMenus = function (registry) {
        registry.registerMenuAction(NavigatorContextMenu.OPEN, {
            commandId: workspace_commands_1.WorkspaceCommands.FILE_OPEN.id
        });
        registry.registerSubmenu(NavigatorContextMenu.OPEN_WITH, 'Open With');
        this.openerService.getOpeners().then(function (openers) {
            try {
                for (var openers_1 = __values(openers), openers_1_1 = openers_1.next(); !openers_1_1.done; openers_1_1 = openers_1.next()) {
                    var opener_1 = openers_1_1.value;
                    var openWithCommand = workspace_commands_1.WorkspaceCommands.FILE_OPEN_WITH(opener_1);
                    registry.registerMenuAction(NavigatorContextMenu.OPEN_WITH, {
                        commandId: openWithCommand.id
                    });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (openers_1_1 && !openers_1_1.done && (_a = openers_1.return)) _a.call(openers_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var e_1, _a;
        });
        // registry.registerMenuAction([CONTEXT_MENU_PATH, CUT_MENU_GROUP], {
        //     commandId: Commands.FILE_CUT
        // });
        registry.registerMenuAction(NavigatorContextMenu.CLIPBOARD, {
            commandId: browser_1.CommonCommands.COPY.id
        });
        registry.registerMenuAction(NavigatorContextMenu.CLIPBOARD, {
            commandId: browser_1.CommonCommands.PASTE.id
        });
        registry.registerMenuAction(NavigatorContextMenu.MOVE, {
            commandId: workspace_commands_1.WorkspaceCommands.FILE_RENAME.id
        });
        registry.registerMenuAction(NavigatorContextMenu.MOVE, {
            commandId: workspace_commands_1.WorkspaceCommands.FILE_DELETE.id
        });
        registry.registerMenuAction(NavigatorContextMenu.NEW, {
            commandId: workspace_commands_1.WorkspaceCommands.NEW_FILE.id
        });
        registry.registerMenuAction(NavigatorContextMenu.NEW, {
            commandId: workspace_commands_1.WorkspaceCommands.NEW_FOLDER.id
        });
    };
    NavigatorMenuContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(browser_1.OpenerService)),
        __metadata("design:paramtypes", [Object])
    ], NavigatorMenuContribution);
    return NavigatorMenuContribution;
}());
exports.NavigatorMenuContribution = NavigatorMenuContribution;
//# sourceMappingURL=navigator-menu.js.map