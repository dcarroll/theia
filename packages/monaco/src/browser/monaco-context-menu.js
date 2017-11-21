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
var browser_1 = require("@theia/editor/lib/browser");
var browser_2 = require("@theia/core/lib/browser");
var widgets_1 = require("@phosphor/widgets");
var commands_1 = require("@phosphor/commands");
var MonacoContextMenuService = /** @class */ (function () {
    function MonacoContextMenuService(contextMenuRenderer) {
        this.contextMenuRenderer = contextMenuRenderer;
    }
    MonacoContextMenuService.prototype.showContextMenu = function (delegate) {
        var anchor = browser_2.toAnchor(delegate.getAnchor());
        // If it is the general context menu, we want to delegate to our menu registry entirely and ignore the actually passed actions.
        // Unfortunately checking the existence of certain properties seems to be the best way to tell, what kind of context menu is requested.
        if (delegate.hasOwnProperty("getKeyBinding")) {
            this.contextMenuRenderer.render(browser_1.EDITOR_CONTEXT_MENU, anchor, function () { return delegate.onHide(false); });
        }
        else {
            delegate.getActions().then(function (actions) {
                var commands = new commands_1.CommandRegistry();
                var menu = new widgets_1.Menu({
                    commands: commands
                });
                var _loop_1 = function (action) {
                    var commandId = 'quickfix_' + actions.indexOf(action);
                    commands.addCommand(commandId, {
                        label: action.label,
                        className: action.class,
                        isToggled: function () { return action.checked; },
                        isEnabled: function () { return action.enabled; },
                        execute: function () { return action.run(); }
                    });
                    menu.addItem({
                        type: 'command',
                        command: commandId
                    });
                };
                try {
                    for (var actions_1 = __values(actions), actions_1_1 = actions_1.next(); !actions_1_1.done; actions_1_1 = actions_1.next()) {
                        var action = actions_1_1.value;
                        _loop_1(action);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (actions_1_1 && !actions_1_1.done && (_a = actions_1.return)) _a.call(actions_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                menu.aboutToClose.connect(function () { return delegate.onHide(false); });
                menu.open(anchor.x, anchor.y);
                var e_1, _a;
            });
        }
    };
    MonacoContextMenuService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(browser_2.ContextMenuRenderer)),
        __metadata("design:paramtypes", [Object])
    ], MonacoContextMenuService);
    return MonacoContextMenuService;
}());
exports.MonacoContextMenuService = MonacoContextMenuService;
//# sourceMappingURL=monaco-context-menu.js.map