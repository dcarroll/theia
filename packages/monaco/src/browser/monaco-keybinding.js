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
var keys_1 = require("@theia/core/lib/common/keys");
var monaco_command_1 = require("./monaco-command");
var monaco_command_registry_1 = require("./monaco-command-registry");
var monaco_keycode_map_1 = require("./monaco-keycode-map");
var KeybindingsRegistry = monaco.keybindings.KeybindingsRegistry;
var KeyCodeUtils = monaco.keybindings.KeyCodeUtils;
function monaco2BrowserKeyCode(keyCode) {
    for (var i = 0; i < monaco_keycode_map_1.KEY_CODE_MAP.length; i++) {
        if (monaco_keycode_map_1.KEY_CODE_MAP[i] === keyCode) {
            return i;
        }
    }
    return -1;
}
var MonacoKeybindingContribution = /** @class */ (function () {
    function MonacoKeybindingContribution(commands) {
        this.commands = commands;
    }
    MonacoKeybindingContribution.prototype.registerKeybindings = function (registry) {
        try {
            for (var _a = __values(KeybindingsRegistry.getDefaultKeybindings()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var item = _b.value;
                var commandId = this.commands.validate(item.command);
                if (commandId) {
                    var raw = item.keybinding;
                    if (raw.type === 1 /* Simple */) {
                        var keybinding = raw;
                        registry.registerKeybinding({
                            commandId: commandId,
                            keyCode: this.keyCode(keybinding),
                            accelerator: this.accelerator(keybinding)
                        });
                    }
                    else {
                        // FIXME support chord keybindings properly, KeyCode does not allow it right now
                    }
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
        // `Select All` is not an editor action just like everything else.
        var selectAllCommand = this.commands.validate(monaco_command_1.MonacoCommands.SELECTION_SELECT_ALL);
        if (selectAllCommand) {
            registry.registerKeybinding({
                commandId: selectAllCommand,
                keyCode: keys_1.KeyCode.createKeyCode({ first: keys_1.Key.KEY_A, modifiers: [keys_1.Modifier.M1] }),
                accelerator: ['Accel A']
            });
        }
        var e_1, _c;
    };
    MonacoKeybindingContribution.prototype.keyCode = function (keybinding) {
        var keyCode = keybinding.keyCode;
        var sequence = {
            first: keys_1.Key.getKey(monaco2BrowserKeyCode(keyCode & 255)),
            modifiers: []
        };
        if (keybinding.ctrlKey) {
            sequence.modifiers.push(keys_1.Modifier.M1);
        }
        if (keybinding.shiftKey) {
            sequence.modifiers.push(keys_1.Modifier.M2);
        }
        if (keybinding.altKey) {
            sequence.modifiers.push(keys_1.Modifier.M3);
        }
        if (keybinding.metaKey) {
            sequence.modifiers.push(keys_1.Modifier.M4);
        }
        return keys_1.KeyCode.createKeyCode(sequence);
    };
    MonacoKeybindingContribution.prototype.accelerator = function (keybinding) {
        var keyCode = keybinding.keyCode;
        var keys = [];
        if (keybinding.metaKey) {
            keys.push('Accel');
        }
        if (keybinding.altKey) {
            keys.push('Alt');
        }
        if (keybinding.ctrlKey) {
            keys.push('Accel');
        }
        if (keybinding.shiftKey) {
            keys.push('Shift');
        }
        keys.push(KeyCodeUtils.toString(keyCode & 255));
        return [keys.join(' ')];
    };
    MonacoKeybindingContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(monaco_command_registry_1.MonacoCommandRegistry)),
        __metadata("design:paramtypes", [monaco_command_registry_1.MonacoCommandRegistry])
    ], MonacoKeybindingContribution);
    return MonacoKeybindingContribution;
}());
exports.MonacoKeybindingContribution = MonacoKeybindingContribution;
//# sourceMappingURL=monaco-keybinding.js.map