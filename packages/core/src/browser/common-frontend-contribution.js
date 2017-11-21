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
var inversify_1 = require("inversify");
var menu_1 = require("../common/menu");
var keys_1 = require("../common/keys");
var message_service_1 = require("../common/message-service");
var shell_1 = require("./shell");
var browser = require("./browser");
var shell_2 = require("./shell");
var CommonMenus;
(function (CommonMenus) {
    CommonMenus.FILE = __spread(menu_1.MAIN_MENU_BAR, ['1_file']);
    CommonMenus.FILE_NEW = __spread(CommonMenus.FILE, ['1_new']);
    CommonMenus.FILE_OPEN = __spread(CommonMenus.FILE, ['2_open']);
    CommonMenus.FILE_SAVE = __spread(CommonMenus.FILE, ['3_save']);
    CommonMenus.EDIT = __spread(menu_1.MAIN_MENU_BAR, ['2_edit']);
    CommonMenus.EDIT_UNDO = __spread(CommonMenus.EDIT, ['1_undo']);
    CommonMenus.EDIT_CLIPBOARD = __spread(CommonMenus.EDIT, ['2_clipboard']);
    CommonMenus.EDIT_FIND = __spread(CommonMenus.EDIT, ['3_find']);
    CommonMenus.VIEW = __spread(menu_1.MAIN_MENU_BAR, ['3_view']);
    CommonMenus.HELP = __spread(menu_1.MAIN_MENU_BAR, ["4_help"]);
})(CommonMenus = exports.CommonMenus || (exports.CommonMenus = {}));
var CommonCommands;
(function (CommonCommands) {
    CommonCommands.CUT = {
        id: 'core.cut',
        label: 'Cut'
    };
    CommonCommands.COPY = {
        id: 'core.copy',
        label: 'Copy'
    };
    CommonCommands.PASTE = {
        id: 'core.paste',
        label: 'Paste'
    };
    CommonCommands.UNDO = {
        id: 'core.undo',
        label: 'Undo'
    };
    CommonCommands.REDO = {
        id: 'core.redo',
        label: 'Redo'
    };
    CommonCommands.FIND = {
        id: 'core.find',
        label: 'Find'
    };
    CommonCommands.REPLACE = {
        id: 'core.replace',
        label: 'Replace'
    };
    CommonCommands.NEXT_TAB = {
        id: 'core.nextTab',
        label: 'Switch to next tab'
    };
    CommonCommands.PREVIOUS_TAB = {
        id: 'core.previousTab',
        label: 'Switch to previous tab'
    };
    CommonCommands.CLOSE_TAB = {
        id: 'core.close.tab',
        label: 'Close'
    };
    CommonCommands.CLOSE_OTHER_TABS = {
        id: 'core.close.other.tabs',
        label: 'Close Others'
    };
    CommonCommands.CLOSE_RIGHT_TABS = {
        id: 'core.close.right.tabs',
        label: 'Close to the Right'
    };
    CommonCommands.CLOSE_ALL_TABS = {
        id: 'core.close.all.tabs',
        label: 'Close All'
    };
    CommonCommands.SAVE = {
        id: 'core.save',
        label: 'Save'
    };
    CommonCommands.SAVE_ALL = {
        id: 'core.saveAll',
        label: 'Save All'
    };
})(CommonCommands = exports.CommonCommands || (exports.CommonCommands = {}));
exports.supportCut = browser.isNative || document.queryCommandSupported('cut');
exports.supportCopy = browser.isNative || document.queryCommandSupported('copy');
// Chrome incorrectly returns true for document.queryCommandSupported('paste')
// when the paste feature is available but the calling script has insufficient
// privileges to actually perform the action
exports.supportPaste = browser.isNative || (!browser.isChrome && document.queryCommandSupported('paste'));
var CommonFrontendContribution = /** @class */ (function () {
    function CommonFrontendContribution(shell, messageService) {
        this.shell = shell;
        this.messageService = messageService;
    }
    CommonFrontendContribution.prototype.registerMenus = function (registry) {
        registry.registerSubmenu(CommonMenus.FILE, 'File');
        registry.registerSubmenu(CommonMenus.EDIT, 'Edit');
        registry.registerSubmenu(CommonMenus.VIEW, 'View');
        registry.registerSubmenu(CommonMenus.HELP, 'Help');
        registry.registerMenuAction(CommonMenus.EDIT_UNDO, {
            commandId: CommonCommands.UNDO.id,
            order: '0'
        });
        registry.registerMenuAction(CommonMenus.EDIT_UNDO, {
            commandId: CommonCommands.REDO.id,
            order: '1'
        });
        registry.registerMenuAction(CommonMenus.EDIT_FIND, {
            commandId: CommonCommands.FIND.id,
            order: '0'
        });
        registry.registerMenuAction(CommonMenus.EDIT_FIND, {
            commandId: CommonCommands.REPLACE.id,
            order: '1'
        });
        registry.registerMenuAction(CommonMenus.EDIT_CLIPBOARD, {
            commandId: CommonCommands.CUT.id,
            order: '0'
        });
        registry.registerMenuAction(CommonMenus.EDIT_CLIPBOARD, {
            commandId: CommonCommands.COPY.id,
            order: '1'
        });
        registry.registerMenuAction(CommonMenus.EDIT_CLIPBOARD, {
            commandId: CommonCommands.PASTE.id,
            order: '2'
        });
        registry.registerMenuAction(shell_2.MAINAREA_TABBAR_CONTEXT_MENU, {
            commandId: CommonCommands.CLOSE_TAB.id,
            order: '0'
        });
        registry.registerMenuAction(shell_2.MAINAREA_TABBAR_CONTEXT_MENU, {
            commandId: CommonCommands.CLOSE_OTHER_TABS.id,
            order: '1'
        });
        registry.registerMenuAction(shell_2.MAINAREA_TABBAR_CONTEXT_MENU, {
            commandId: CommonCommands.CLOSE_RIGHT_TABS.id,
            order: '2'
        });
        registry.registerMenuAction(shell_2.MAINAREA_TABBAR_CONTEXT_MENU, {
            commandId: CommonCommands.CLOSE_ALL_TABS.id,
            order: '3'
        });
        registry.registerMenuAction(CommonMenus.FILE_SAVE, {
            commandId: CommonCommands.SAVE.id
        });
        registry.registerMenuAction(CommonMenus.FILE_SAVE, {
            commandId: CommonCommands.SAVE_ALL.id
        });
    };
    CommonFrontendContribution.prototype.registerCommands = function (commandRegistry) {
        var _this = this;
        commandRegistry.registerCommand(CommonCommands.CUT, {
            execute: function () {
                if (exports.supportCut) {
                    document.execCommand('cut');
                }
                else {
                    _this.messageService.warn("Please use the browser's cut command or shortcut.");
                }
            }
        });
        commandRegistry.registerCommand(CommonCommands.COPY, {
            execute: function () {
                if (exports.supportCopy) {
                    document.execCommand('copy');
                }
                else {
                    _this.messageService.warn("Please use the browser's copy command or shortcut.");
                }
            }
        });
        commandRegistry.registerCommand(CommonCommands.PASTE, {
            execute: function () {
                if (exports.supportPaste) {
                    document.execCommand('paste');
                }
                else {
                    _this.messageService.warn("Please use the browser's paste command or shortcut.");
                }
            }
        });
        commandRegistry.registerCommand(CommonCommands.UNDO);
        commandRegistry.registerCommand(CommonCommands.REDO);
        commandRegistry.registerCommand(CommonCommands.FIND);
        commandRegistry.registerCommand(CommonCommands.REPLACE);
        commandRegistry.registerCommand(CommonCommands.NEXT_TAB, {
            isEnabled: function () { return _this.shell.hasSelectedTab(); },
            execute: function () { return _this.shell.activateNextTab(); }
        });
        commandRegistry.registerCommand(CommonCommands.PREVIOUS_TAB, {
            isEnabled: function () { return _this.shell.hasSelectedTab(); },
            execute: function () { return _this.shell.activatePreviousTab(); }
        });
        commandRegistry.registerCommand(CommonCommands.CLOSE_TAB, {
            isEnabled: function () { return _this.shell.hasSelectedTab(); },
            execute: function () { return _this.shell.closeTab(); }
        });
        commandRegistry.registerCommand(CommonCommands.CLOSE_OTHER_TABS, {
            isEnabled: function () { return _this.shell.hasSelectedTab(); },
            execute: function () { return _this.shell.closeOtherTabs(); }
        });
        commandRegistry.registerCommand(CommonCommands.CLOSE_RIGHT_TABS, {
            isEnabled: function () { return _this.shell.hasSelectedTab(); },
            execute: function () { return _this.shell.closeRightTabs(); }
        });
        commandRegistry.registerCommand(CommonCommands.CLOSE_ALL_TABS, {
            isEnabled: function () { return _this.shell.hasSelectedTab(); },
            execute: function () { return _this.shell.closeAllTabs(); }
        });
        commandRegistry.registerCommand(CommonCommands.SAVE, {
            execute: function () { return _this.shell.save(); }
        });
        commandRegistry.registerCommand(CommonCommands.SAVE_ALL, {
            execute: function () { return _this.shell.saveAll(); }
        });
    };
    CommonFrontendContribution.prototype.registerKeybindings = function (registry) {
        if (exports.supportCut) {
            registry.registerKeybinding({
                commandId: CommonCommands.CUT.id,
                keyCode: keys_1.KeyCode.createKeyCode({ first: keys_1.Key.KEY_X, modifiers: [keys_1.Modifier.M1] })
            });
        }
        if (exports.supportCopy) {
            registry.registerKeybinding({
                commandId: CommonCommands.COPY.id,
                keyCode: keys_1.KeyCode.createKeyCode({ first: keys_1.Key.KEY_C, modifiers: [keys_1.Modifier.M1] })
            });
        }
        if (exports.supportPaste) {
            registry.registerKeybinding({
                commandId: CommonCommands.PASTE.id,
                keyCode: keys_1.KeyCode.createKeyCode({ first: keys_1.Key.KEY_V, modifiers: [keys_1.Modifier.M1] })
            });
        }
        registry.registerKeybindings({
            commandId: CommonCommands.UNDO.id,
            keyCode: keys_1.KeyCode.createKeyCode({ first: keys_1.Key.KEY_Z, modifiers: [keys_1.Modifier.M1] })
        }, {
            commandId: CommonCommands.REDO.id,
            keyCode: keys_1.KeyCode.createKeyCode({ first: keys_1.Key.KEY_Z, modifiers: [keys_1.Modifier.M2, keys_1.Modifier.M1] })
        }, {
            commandId: CommonCommands.FIND.id,
            keyCode: keys_1.KeyCode.createKeyCode({ first: keys_1.Key.KEY_F, modifiers: [keys_1.Modifier.M1] })
        }, {
            commandId: CommonCommands.REPLACE.id,
            keyCode: keys_1.KeyCode.createKeyCode({ first: keys_1.Key.KEY_F, modifiers: [keys_1.Modifier.M3, keys_1.Modifier.M1] })
        }, {
            commandId: CommonCommands.NEXT_TAB.id,
            keyCode: keys_1.KeyCode.createKeyCode({ first: keys_1.Key.TAB, modifiers: [keys_1.Modifier.M1] })
        }, {
            commandId: CommonCommands.PREVIOUS_TAB.id,
            keyCode: keys_1.KeyCode.createKeyCode({ first: keys_1.Key.TAB, modifiers: [keys_1.Modifier.M1, keys_1.Modifier.M2] })
        }, {
            commandId: CommonCommands.CLOSE_TAB.id,
            keyCode: keys_1.KeyCode.createKeyCode({ first: keys_1.Key.KEY_W, modifiers: [keys_1.Modifier.M3] })
        }, {
            commandId: CommonCommands.CLOSE_OTHER_TABS.id,
            keyCode: keys_1.KeyCode.createKeyCode({ first: keys_1.Key.KEY_T, modifiers: [keys_1.Modifier.M3, keys_1.Modifier.M1] })
        }, {
            commandId: CommonCommands.CLOSE_ALL_TABS.id,
            keyCode: keys_1.KeyCode.createKeyCode({ first: keys_1.Key.KEY_W, modifiers: [keys_1.Modifier.M2, keys_1.Modifier.M3] })
        }, {
            commandId: CommonCommands.SAVE.id,
            keyCode: keys_1.KeyCode.createKeyCode({ first: keys_1.Key.KEY_S, modifiers: [keys_1.Modifier.M1] })
        }, {
            commandId: CommonCommands.SAVE_ALL.id,
            keyCode: keys_1.KeyCode.createKeyCode({ first: keys_1.Key.KEY_S, modifiers: [keys_1.Modifier.M3, keys_1.Modifier.M1] })
        });
    };
    CommonFrontendContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(shell_1.ApplicationShell)),
        __param(1, inversify_1.inject(message_service_1.MessageService)),
        __metadata("design:paramtypes", [shell_1.ApplicationShell,
            message_service_1.MessageService])
    ], CommonFrontendContribution);
    return CommonFrontendContribution;
}());
exports.CommonFrontendContribution = CommonFrontendContribution;
//# sourceMappingURL=common-frontend-contribution.js.map