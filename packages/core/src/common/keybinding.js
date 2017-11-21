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
var command_1 = require("./command");
var keys_1 = require("./keys");
var contribution_provider_1 = require("./contribution-provider");
var logger_1 = require("./logger");
exports.KeybindingContribution = Symbol("KeybindingContribution");
exports.KeybindingContext = Symbol("KeybindingContextExtension");
var KeybindingContexts;
(function (KeybindingContexts) {
    KeybindingContexts.NOOP_CONTEXT = {
        id: 'noop.keybinding.context',
        isEnabled: function () { return true; }
    };
    KeybindingContexts.DEFAULT_CONTEXT = {
        id: 'default.keybinding.context',
        isEnabled: function () { return false; }
    };
})(KeybindingContexts = exports.KeybindingContexts || (exports.KeybindingContexts = {}));
var KeybindingContextRegistry = /** @class */ (function () {
    function KeybindingContextRegistry(contextProvider) {
        this.contextProvider = contextProvider;
        this.contexts = {};
        this.registerContext(KeybindingContexts.NOOP_CONTEXT);
        this.registerContext(KeybindingContexts.DEFAULT_CONTEXT);
    }
    KeybindingContextRegistry.prototype.initialize = function () {
        var _this = this;
        this.contextProvider.getContributions().forEach(function (context) { return _this.registerContext(context); });
    };
    /**
     * Registers the keybinding context arguments into the application. Fails when an already registered
     * context is being registered.
     *
     * @param contexts the keybinding contexts to register into the application.
     */
    KeybindingContextRegistry.prototype.registerContext = function () {
        var contexts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            contexts[_i] = arguments[_i];
        }
        try {
            for (var contexts_1 = __values(contexts), contexts_1_1 = contexts_1.next(); !contexts_1_1.done; contexts_1_1 = contexts_1.next()) {
                var context_1 = contexts_1_1.value;
                var id = context_1.id;
                if (this.contexts[id]) {
                    throw new Error("A keybinding context with ID " + id + " is already registered.");
                }
                this.contexts[id] = context_1;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (contexts_1_1 && !contexts_1_1.done && (_a = contexts_1.return)) _a.call(contexts_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _a;
    };
    KeybindingContextRegistry.prototype.getContext = function (contextId) {
        return this.contexts[contextId];
    };
    KeybindingContextRegistry = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(contribution_provider_1.ContributionProvider)), __param(0, inversify_1.named(exports.KeybindingContext)),
        __metadata("design:paramtypes", [Object])
    ], KeybindingContextRegistry);
    return KeybindingContextRegistry;
}());
exports.KeybindingContextRegistry = KeybindingContextRegistry;
var KeybindingRegistry = /** @class */ (function () {
    function KeybindingRegistry(commandRegistry, contextRegistry, contributions, logger) {
        this.commandRegistry = commandRegistry;
        this.contextRegistry = contextRegistry;
        this.contributions = contributions;
        this.logger = logger;
        this.keybindings = {};
        this.commands = {};
    }
    KeybindingRegistry.prototype.onStart = function () {
        try {
            for (var _a = __values(this.contributions.getContributions()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var contribution = _b.value;
                contribution.registerKeybindings(this);
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
    KeybindingRegistry.prototype.registerKeybindings = function () {
        var bindings = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            bindings[_i] = arguments[_i];
        }
        try {
            for (var bindings_1 = __values(bindings), bindings_1_1 = bindings_1.next(); !bindings_1_1.done; bindings_1_1 = bindings_1.next()) {
                var binding = bindings_1_1.value;
                this.registerKeybinding(binding);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (bindings_1_1 && !bindings_1_1.done && (_a = bindings_1.return)) _a.call(bindings_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        var e_3, _a;
    };
    /**
     * Adds a keybinding to the registry.
     *
     * @param binding
     */
    KeybindingRegistry.prototype.registerKeybinding = function (binding) {
        var existing = this.keybindings[binding.keyCode.keystroke];
        if (existing) {
            var collided = existing.filter(function (b) { return b.context === binding.context; });
            if (collided.length > 0) {
                this.logger.warn("Collided keybinding is ignored; ", JSON.stringify(binding), ' collided with ', collided.map(function (b) { return JSON.stringify(b); }).join(', '));
                return;
            }
        }
        var keyCode = binding.keyCode, commandId = binding.commandId;
        var bindings = this.keybindings[keyCode.keystroke] || [];
        bindings.push(binding);
        this.keybindings[keyCode.keystroke] = bindings;
        var commands = this.commands[commandId] || [];
        commands.push(binding);
        this.commands[commandId] = bindings;
    };
    /**
     * The `active` flag with `false` could come handy when we do not want to check whether the command is currently active or not.
     * For instance, when building the main menu, it could easily happen that the command is not yet active (no active editors and so on)
     * but still, we have to build the key accelerator.
     *
     * @param commandId the unique ID of the command for we the associated ke binding are looking for.
     * @param options if `active` is false` then the availability of the command will not be checked. Default is `true`
     */
    KeybindingRegistry.prototype.getKeybindingForCommand = function (commandId, options) {
        if (options === void 0) { options = ({ active: true }); }
        var bindings = this.commands[commandId];
        if (!bindings) {
            return undefined;
        }
        if (!options.active) {
            return bindings[0];
        }
        return bindings.find(this.isActive.bind(this));
    };
    /**
     * @param keyCode the key code of the binding we are searching.
     */
    KeybindingRegistry.prototype.getKeybindingForKeyCode = function (keyCode, options) {
        if (options === void 0) { options = ({ active: true }); }
        var bindings = this.keybindings[keyCode.keystroke];
        if (!bindings) {
            return undefined;
        }
        if (!options.active) {
            return bindings[0];
        }
        return bindings.find(this.isActive.bind(this));
    };
    KeybindingRegistry.prototype.isActive = function (binding) {
        var command = this.commandRegistry.getCommand(binding.commandId);
        return !!command && !!this.commandRegistry.getActiveHandler(command.id);
    };
    /**
     * Run the command matching to the given keyboard event.
     */
    KeybindingRegistry.prototype.run = function (event) {
        if (event.defaultPrevented) {
            return;
        }
        var keyCode = keys_1.KeyCode.createKeyCode(event);
        var binding = this.getKeybindingForKeyCode(keyCode);
        if (!binding) {
            return;
        }
        var context = binding.context || KeybindingContexts.NOOP_CONTEXT;
        if (context && context.isEnabled(binding)) {
            var handler = this.commandRegistry.getActiveHandler(binding.commandId);
            if (handler) {
                event.preventDefault();
                event.stopPropagation();
                handler.execute();
            }
        }
    };
    KeybindingRegistry = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(command_1.CommandRegistry)),
        __param(1, inversify_1.inject(KeybindingContextRegistry)),
        __param(2, inversify_1.inject(contribution_provider_1.ContributionProvider)), __param(2, inversify_1.named(exports.KeybindingContribution)),
        __param(3, inversify_1.inject(logger_1.ILogger)),
        __metadata("design:paramtypes", [command_1.CommandRegistry,
            KeybindingContextRegistry, Object, Object])
    ], KeybindingRegistry);
    return KeybindingRegistry;
}());
exports.KeybindingRegistry = KeybindingRegistry;
//# sourceMappingURL=keybinding.js.map