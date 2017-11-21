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
var disposable_1 = require("./disposable");
var contribution_provider_1 = require("./contribution-provider");
exports.CommandContribution = Symbol("CommandContribution");
exports.CommandService = Symbol("CommandService");
/**
 * The command registry manages commands and handlers.
 */
var CommandRegistry = /** @class */ (function () {
    function CommandRegistry(contributionProvider) {
        this.contributionProvider = contributionProvider;
        this._commands = {};
        this._handlers = {};
    }
    CommandRegistry.prototype.onStart = function () {
        var contributions = this.contributionProvider.getContributions();
        try {
            for (var contributions_1 = __values(contributions), contributions_1_1 = contributions_1.next(); !contributions_1_1.done; contributions_1_1 = contributions_1.next()) {
                var contrib = contributions_1_1.value;
                contrib.registerCommands(this);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (contributions_1_1 && !contributions_1_1.done && (_a = contributions_1.return)) _a.call(contributions_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _a;
    };
    /**
     * Register the given command and handler if present.
     *
     * Throw if a command is already registered for the given command identifier.
     */
    CommandRegistry.prototype.registerCommand = function (command, handler) {
        if (handler) {
            var toDispose = new disposable_1.DisposableCollection();
            toDispose.push(this.doRegisterCommand(command));
            toDispose.push(this.registerHandler(command.id, handler));
            return toDispose;
        }
        return this.doRegisterCommand(command);
    };
    CommandRegistry.prototype.doRegisterCommand = function (command) {
        var _this = this;
        if (this._commands[command.id]) {
            throw Error("A command " + command.id + " is already registered.");
        }
        this._commands[command.id] = command;
        return {
            dispose: function () {
                delete _this._commands[command.id];
            }
        };
    };
    /**
     * Register the given handler for the given command identifier.
     */
    CommandRegistry.prototype.registerHandler = function (commandId, handler) {
        var handlers = this._handlers[commandId];
        if (!handlers) {
            this._handlers[commandId] = handlers = [];
        }
        handlers.push(handler);
        return {
            dispose: function () {
                var idx = handlers.indexOf(handler);
                if (idx >= 0) {
                    handlers.splice(idx, 1);
                }
            }
        };
    };
    /**
     * Test whether there is an active handler for the given command.
     */
    CommandRegistry.prototype.isEnabled = function (command) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.getActiveHandler.apply(this, __spread([command], args)) !== undefined;
    };
    /**
     * Test whether there is a visible handler for the given command.
     */
    CommandRegistry.prototype.isVisible = function (command) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.getVisibleHandler.apply(this, __spread([command], args)) !== undefined;
    };
    /**
     * Execute the active handler for the given command and arguments.
     *
     * Reject if a command cannot be executed.
     */
    CommandRegistry.prototype.executeCommand = function (command) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var handler = this.getActiveHandler.apply(this, __spread([command], args));
        if (handler) {
            return Promise.resolve(handler.execute.apply(handler, __spread(args)));
        }
        var argsMessage = args && args.length > 0 ? " (args: " + JSON.stringify(args) + ")" : '';
        return Promise.reject("The command '" + command + "' cannot be executed. There are no active handlers available for the command." + argsMessage);
    };
    /**
     * Get a visible handler for the given command or `undefined`.
     */
    CommandRegistry.prototype.getVisibleHandler = function (commandId) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var handlers = this._handlers[commandId];
        if (handlers) {
            try {
                for (var handlers_1 = __values(handlers), handlers_1_1 = handlers_1.next(); !handlers_1_1.done; handlers_1_1 = handlers_1.next()) {
                    var handler = handlers_1_1.value;
                    if (!handler.isVisible || handler.isVisible.apply(handler, __spread(args))) {
                        return handler;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (handlers_1_1 && !handlers_1_1.done && (_a = handlers_1.return)) _a.call(handlers_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        return undefined;
        var e_2, _a;
    };
    /**
     * Get an active handler for the given command or `undefined`.
     */
    CommandRegistry.prototype.getActiveHandler = function (commandId) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var handlers = this._handlers[commandId];
        if (handlers) {
            try {
                for (var handlers_2 = __values(handlers), handlers_2_1 = handlers_2.next(); !handlers_2_1.done; handlers_2_1 = handlers_2.next()) {
                    var handler = handlers_2_1.value;
                    if (!handler.isEnabled || handler.isEnabled.apply(handler, __spread(args))) {
                        return handler;
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (handlers_2_1 && !handlers_2_1.done && (_a = handlers_2.return)) _a.call(handlers_2);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        return undefined;
        var e_3, _a;
    };
    Object.defineProperty(CommandRegistry.prototype, "commands", {
        /**
         * Get all registered commands.
         */
        get: function () {
            var commands = [];
            try {
                for (var _a = __values(this.commandIds), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var id = _b.value;
                    var cmd = this.getCommand(id);
                    if (cmd) {
                        commands.push(cmd);
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return commands;
            var e_4, _c;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get a command for the given command identifier.
     */
    CommandRegistry.prototype.getCommand = function (id) {
        return this._commands[id];
    };
    Object.defineProperty(CommandRegistry.prototype, "commandIds", {
        /**
         * Get all registered commands identifiers.
         */
        get: function () {
            return Object.keys(this._commands);
        },
        enumerable: true,
        configurable: true
    });
    CommandRegistry = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(contribution_provider_1.ContributionProvider)), __param(0, inversify_1.named(exports.CommandContribution)),
        __metadata("design:paramtypes", [Object])
    ], CommandRegistry);
    return CommandRegistry;
}());
exports.CommandRegistry = CommandRegistry;
//# sourceMappingURL=command.js.map