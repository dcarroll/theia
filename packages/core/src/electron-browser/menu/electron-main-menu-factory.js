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
var electron = require("electron");
var inversify_1 = require("inversify");
var common_1 = require("../../common");
var ElectronMainMenuFactory = /** @class */ (function () {
    function ElectronMainMenuFactory(commandRegistry, menuProvider) {
        this.commandRegistry = commandRegistry;
        this.menuProvider = menuProvider;
    }
    ElectronMainMenuFactory.prototype.createMenuBar = function () {
        var menuModel = this.menuProvider.getMenu(common_1.MAIN_MENU_BAR);
        var template = this.fillMenuTemplate([], menuModel);
        if (common_1.isOSX) {
            template.unshift(this.createOSXMenu());
        }
        return electron.remote.Menu.buildFromTemplate(template);
    };
    ElectronMainMenuFactory.prototype.createContextMenu = function (menuPath) {
        var menuModel = this.menuProvider.getMenu(menuPath);
        var template = this.fillMenuTemplate([], menuModel);
        return electron.remote.Menu.buildFromTemplate(template);
    };
    ElectronMainMenuFactory.prototype.fillMenuTemplate = function (items, menuModel) {
        var _this = this;
        var _loop_1 = function (menu) {
            if (menu instanceof common_1.CompositeMenuNode) {
                if (menu.label) {
                    // should we create a submenu?
                    items.push({
                        label: menu.label,
                        submenu: this_1.fillMenuTemplate([], menu)
                    });
                }
                else {
                    // or just a separator?
                    items.push({
                        type: 'separator'
                    });
                    // followed by the elements
                    this_1.fillMenuTemplate(items, menu);
                }
            }
            else if (menu instanceof common_1.ActionMenuNode) {
                // That is only a sanity check at application startup.
                if (!this_1.commandRegistry.getCommand(menu.action.commandId)) {
                    throw new Error("Unknown command with ID: " + menu.action.commandId + ".");
                }
                items.push({
                    label: menu.label,
                    icon: menu.icon,
                    enabled: true,
                    visible: true,
                    click: function () { return _this.execute(menu.action.commandId); }
                });
            }
        };
        var this_1 = this;
        try {
            for (var _a = __values(menuModel.children), _b = _a.next(); !_b.done; _b = _a.next()) {
                var menu = _b.value;
                _loop_1(menu);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return items;
        var e_1, _c;
    };
    ElectronMainMenuFactory.prototype.execute = function (command) {
        this.commandRegistry.executeCommand(command).catch(function () { });
    };
    ElectronMainMenuFactory.prototype.createOSXMenu = function () {
        return {
            label: 'Theia',
            submenu: [
                {
                    role: 'about'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'services',
                    submenu: []
                },
                {
                    type: 'separator'
                },
                {
                    role: 'hide'
                },
                {
                    role: 'hideothers'
                },
                {
                    role: 'unhide'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'quit'
                }
            ]
        };
    };
    ElectronMainMenuFactory = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_1.CommandRegistry)),
        __param(1, inversify_1.inject(common_1.MenuModelRegistry)),
        __metadata("design:paramtypes", [common_1.CommandRegistry,
            common_1.MenuModelRegistry])
    ], ElectronMainMenuFactory);
    return ElectronMainMenuFactory;
}());
exports.ElectronMainMenuFactory = ElectronMainMenuFactory;
//# sourceMappingURL=electron-main-menu-factory.js.map