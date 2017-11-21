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
var widgets_1 = require("@phosphor/widgets");
var commands_1 = require("@phosphor/commands");
var common_1 = require("../../common");
var BrowserMainMenuFactory = /** @class */ (function () {
    function BrowserMainMenuFactory(commandRegistry, keybindingRegistry, menuProvider) {
        this.commandRegistry = commandRegistry;
        this.keybindingRegistry = keybindingRegistry;
        this.menuProvider = menuProvider;
    }
    BrowserMainMenuFactory.prototype.createMenuBar = function () {
        var menuBar = new DynamicMenuBarWidget();
        menuBar.id = 'theia:menubar';
        var menuModel = this.menuProvider.getMenu(common_1.MAIN_MENU_BAR);
        var phosphorCommands = this.createPhosporCommands(menuModel);
        // for the main menu we want all items to be visible.
        phosphorCommands.isVisible = function () { return true; };
        try {
            for (var _a = __values(menuModel.children), _b = _a.next(); !_b.done; _b = _a.next()) {
                var menu = _b.value;
                if (menu instanceof common_1.CompositeMenuNode) {
                    var menuWidget = new DynamicMenuWidget(menu, { commands: phosphorCommands });
                    menuBar.addMenu(menuWidget);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return menuBar;
        var e_1, _c;
    };
    BrowserMainMenuFactory.prototype.createContextMenu = function (path) {
        var menuModel = this.menuProvider.getMenu(path);
        var phosphorCommands = this.createPhosporCommands(menuModel);
        var contextMenu = new DynamicMenuWidget(menuModel, { commands: phosphorCommands });
        return contextMenu;
    };
    BrowserMainMenuFactory.prototype.createPhosporCommands = function (menu) {
        var commands = new commands_1.CommandRegistry();
        this.addPhosphorCommands(commands, menu);
        return commands;
    };
    BrowserMainMenuFactory.prototype.addPhosphorCommands = function (commands, menu) {
        try {
            for (var _a = __values(menu.children), _b = _a.next(); !_b.done; _b = _a.next()) {
                var child = _b.value;
                if (child instanceof common_1.ActionMenuNode) {
                    this.addPhosphorCommand(commands, child);
                }
                else if (child instanceof common_1.CompositeMenuNode) {
                    this.addPhosphorCommands(commands, child);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var e_2, _c;
    };
    BrowserMainMenuFactory.prototype.addPhosphorCommand = function (commands, menu) {
        var _this = this;
        var command = this.commandRegistry.getCommand(menu.action.commandId);
        if (!command) {
            return;
        }
        commands.addCommand(command.id, {
            execute: function () { return _this.commandRegistry.executeCommand(command.id); },
            label: menu.label,
            icon: command.iconClass,
            isEnabled: function () { return _this.commandRegistry.isEnabled(command.id); },
            isVisible: function () { return _this.commandRegistry.isVisible(command.id); }
        });
        var binding = this.keybindingRegistry.getKeybindingForCommand(command.id, { active: false });
        if (binding) {
            var keys = binding.accelerator || [];
            commands.addKeyBinding({
                command: command.id,
                keys: keys,
                selector: '.p-Widget' // We have the Phosphor.JS dependency anyway.
            });
        }
    };
    BrowserMainMenuFactory = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_1.CommandRegistry)),
        __param(1, inversify_1.inject(common_1.KeybindingRegistry)),
        __param(2, inversify_1.inject(common_1.MenuModelRegistry)),
        __metadata("design:paramtypes", [common_1.CommandRegistry,
            common_1.KeybindingRegistry,
            common_1.MenuModelRegistry])
    ], BrowserMainMenuFactory);
    return BrowserMainMenuFactory;
}());
exports.BrowserMainMenuFactory = BrowserMainMenuFactory;
var DynamicMenuBarWidget = /** @class */ (function (_super) {
    __extends(DynamicMenuBarWidget, _super);
    function DynamicMenuBarWidget() {
        var _this = _super.call(this) || this;
        // HACK we need to hook in on private method _openChildMenu. Don't do this at home!
        DynamicMenuBarWidget.prototype['_openChildMenu'] = function () {
            if (_this.activeMenu instanceof DynamicMenuWidget) {
                _this.activeMenu.aboutToShow();
            }
            _super.prototype['_openChildMenu'].call(_this);
        };
        return _this;
    }
    return DynamicMenuBarWidget;
}(widgets_1.MenuBar));
/**
 * A menu widget that would recompute its items on update
 */
var DynamicMenuWidget = /** @class */ (function (_super) {
    __extends(DynamicMenuWidget, _super);
    function DynamicMenuWidget(menu, options) {
        var _this = _super.call(this, options) || this;
        _this.menu = menu;
        _this.options = options;
        if (menu.label) {
            _this.title.label = menu.label;
        }
        _this.updateSubMenus(_this, _this.menu, _this.options.commands);
        return _this;
    }
    DynamicMenuWidget.prototype.aboutToShow = function () {
        this.clearItems();
        this.updateSubMenus(this, this.menu, this.options.commands);
    };
    DynamicMenuWidget.prototype.open = function (x, y, options) {
        var _this = this;
        // we want to restore the focus after the menu closes.
        var previouslyActive = window.document.activeElement;
        var cb = function () {
            previouslyActive.focus();
            _this.aboutToClose.disconnect(cb);
        };
        this.aboutToClose.connect(cb);
        _super.prototype.open.call(this, x, y, options);
    };
    DynamicMenuWidget.prototype.updateSubMenus = function (parent, menu, commands) {
        try {
            for (var _a = __values(menu.children), _b = _a.next(); !_b.done; _b = _a.next()) {
                var item = _b.value;
                if (item instanceof common_1.CompositeMenuNode) {
                    if (item.label) {
                        parent.addItem({
                            type: 'submenu',
                            submenu: new DynamicMenuWidget(item, this.options)
                        });
                    }
                    else {
                        if (item.children.length > 0) {
                            if (parent.items.length > 0) {
                                parent.addItem({
                                    type: 'separator'
                                });
                            }
                            this.updateSubMenus(parent, item, commands);
                        }
                    }
                }
                else if (item instanceof common_1.ActionMenuNode) {
                    parent.addItem({
                        command: item.action.commandId,
                        type: 'command'
                    });
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_3) throw e_3.error; }
        }
        var e_3, _c;
    };
    return DynamicMenuWidget;
}(widgets_1.Menu));
var BrowserMenuBarContribution = /** @class */ (function () {
    function BrowserMenuBarContribution(factory) {
        this.factory = factory;
    }
    BrowserMenuBarContribution.prototype.onStart = function (app) {
        var logo = this.createLogo();
        app.shell.addToTopArea(logo);
        var menu = this.factory.createMenuBar();
        app.shell.addToTopArea(menu);
    };
    BrowserMenuBarContribution.prototype.createLogo = function () {
        var logo = new widgets_1.Widget();
        logo.id = 'theia:icon';
        logo.addClass('theia-icon');
        return logo;
    };
    BrowserMenuBarContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(BrowserMainMenuFactory)),
        __metadata("design:paramtypes", [BrowserMainMenuFactory])
    ], BrowserMenuBarContribution);
    return BrowserMenuBarContribution;
}());
exports.BrowserMenuBarContribution = BrowserMenuBarContribution;
//# sourceMappingURL=browser-menu-plugin.js.map