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
Object.defineProperty(exports, "__esModule", { value: true });
var electron = require("electron");
var inversify_1 = require("inversify");
var common_1 = require("../../common");
var browser_1 = require("../../browser");
var electron_main_menu_factory_1 = require("./electron-main-menu-factory");
var ElectronCommands;
(function (ElectronCommands) {
    ElectronCommands.TOGGLE_DEVELOPER_TOOLS = {
        id: 'theia.toggleDevTools',
        label: 'Toggle Developer Tools'
    };
    ElectronCommands.RELOAD = {
        id: 'view.reload',
        label: 'Reload Window'
    };
    ElectronCommands.ZOOM_IN = {
        id: 'view.zoomIn',
        label: 'Zoom In'
    };
    ElectronCommands.ZOOM_OUT = {
        id: 'view.zoomOut',
        label: 'Zoom Out'
    };
    ElectronCommands.RESET_ZOOM = {
        id: 'view.resetZoom',
        label: 'Reset Zoom'
    };
})(ElectronCommands = exports.ElectronCommands || (exports.ElectronCommands = {}));
var ElectronMenus;
(function (ElectronMenus) {
    ElectronMenus.VIEW_WINDOW = __spread(browser_1.CommonMenus.VIEW, ['window']);
    ElectronMenus.VIEW_ZOOM = __spread(browser_1.CommonMenus.VIEW, ['zoom']);
})(ElectronMenus = exports.ElectronMenus || (exports.ElectronMenus = {}));
(function (ElectronMenus) {
    ElectronMenus.HELP_TOGGLE = __spread(browser_1.CommonMenus.HELP, ['z_toggle']);
})(ElectronMenus = exports.ElectronMenus || (exports.ElectronMenus = {}));
var ElectronMenuContribution = /** @class */ (function () {
    function ElectronMenuContribution(factory) {
        this.factory = factory;
    }
    ElectronMenuContribution.prototype.onStart = function (app) {
        var itr = app.shell.children();
        var child = itr.next();
        while (child) {
            // Top panel for the menu contribution is not required for Electron.
            // TODO: Make sure this is the case on Windows too.
            if (child.id === 'theia-top-panel') {
                child.setHidden(true);
                child = undefined;
            }
            else {
                child = itr.next();
            }
        }
        electron.remote.Menu.setApplicationMenu(this.factory.createMenuBar());
    };
    ElectronMenuContribution.prototype.registerCommands = function (registry) {
        registry.registerCommand(ElectronCommands.TOGGLE_DEVELOPER_TOOLS, {
            execute: function () {
                var webContent = electron.remote.getCurrentWebContents();
                if (!webContent.isDevToolsOpened()) {
                    webContent.openDevTools();
                }
                else {
                    webContent.closeDevTools();
                }
            }
        });
        registry.registerCommand(ElectronCommands.RELOAD, {
            execute: function () {
                var focusedWindow = electron.remote.getCurrentWindow();
                if (focusedWindow) {
                    focusedWindow.reload();
                }
            }
        });
        registry.registerCommand(ElectronCommands.ZOOM_IN, {
            execute: function () {
                var focusedWindow = electron.remote.getCurrentWindow();
                if (focusedWindow) {
                    var webContents_1 = focusedWindow.webContents;
                    webContents_1.getZoomLevel(function (zoomLevel) {
                        return webContents_1.setZoomLevel(zoomLevel + 0.5);
                    });
                }
            }
        });
        registry.registerCommand(ElectronCommands.ZOOM_OUT, {
            execute: function () {
                var focusedWindow = electron.remote.getCurrentWindow();
                if (focusedWindow) {
                    var webContents_2 = focusedWindow.webContents;
                    webContents_2.getZoomLevel(function (zoomLevel) {
                        return webContents_2.setZoomLevel(zoomLevel - 0.5);
                    });
                }
            }
        });
        registry.registerCommand(ElectronCommands.RESET_ZOOM, {
            execute: function () {
                var focusedWindow = electron.remote.getCurrentWindow();
                if (focusedWindow) {
                    focusedWindow.webContents.setZoomLevel(0);
                }
            }
        });
    };
    ElectronMenuContribution.prototype.registerKeybindings = function (registry) {
        registry.registerKeybinding({
            commandId: ElectronCommands.TOGGLE_DEVELOPER_TOOLS.id,
            keyCode: common_1.KeyCode.createKeyCode({ first: common_1.Key.KEY_I, modifiers: [common_1.Modifier.M1, common_1.Modifier.M2] })
        });
        registry.registerKeybinding({
            commandId: ElectronCommands.RELOAD.id,
            keyCode: common_1.KeyCode.createKeyCode({ first: common_1.Key.KEY_R, modifiers: [common_1.Modifier.M1] })
        });
        registry.registerKeybinding({
            commandId: ElectronCommands.ZOOM_IN.id,
            keyCode: common_1.KeyCode.createKeyCode({ first: common_1.Key.EQUAL, modifiers: [common_1.Modifier.M1] })
        });
        registry.registerKeybinding({
            commandId: ElectronCommands.ZOOM_OUT.id,
            keyCode: common_1.KeyCode.createKeyCode({ first: common_1.Key.MINUS, modifiers: [common_1.Modifier.M1] })
        });
        registry.registerKeybinding({
            commandId: ElectronCommands.RESET_ZOOM.id,
            keyCode: common_1.KeyCode.createKeyCode({ first: common_1.Key.DIGIT0, modifiers: [common_1.Modifier.M1] })
        });
    };
    ElectronMenuContribution.prototype.registerMenus = function (registry) {
        registry.registerMenuAction(ElectronMenus.HELP_TOGGLE, {
            commandId: ElectronCommands.TOGGLE_DEVELOPER_TOOLS.id
        });
        registry.registerMenuAction(ElectronMenus.VIEW_WINDOW, {
            commandId: ElectronCommands.RELOAD.id,
            order: 'z0'
        });
        registry.registerMenuAction(ElectronMenus.VIEW_ZOOM, {
            commandId: ElectronCommands.ZOOM_IN.id,
            order: 'z1'
        });
        registry.registerMenuAction(ElectronMenus.VIEW_ZOOM, {
            commandId: ElectronCommands.ZOOM_OUT.id,
            order: 'z2'
        });
        registry.registerMenuAction(ElectronMenus.VIEW_ZOOM, {
            commandId: ElectronCommands.RESET_ZOOM.id,
            order: 'z3'
        });
    };
    ElectronMenuContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(electron_main_menu_factory_1.ElectronMainMenuFactory)),
        __metadata("design:paramtypes", [electron_main_menu_factory_1.ElectronMainMenuFactory])
    ], ElectronMenuContribution);
    return ElectronMenuContribution;
}());
exports.ElectronMenuContribution = ElectronMenuContribution;
//# sourceMappingURL=electron-menu-contribution.js.map