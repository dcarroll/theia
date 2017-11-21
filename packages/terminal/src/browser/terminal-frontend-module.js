"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
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
var common_1 = require("@theia/core/lib/common");
var terminal_frontend_contribution_1 = require("./terminal-frontend-contribution");
var terminal_widget_1 = require("./terminal-widget");
var widget_manager_1 = require("@theia/core/lib/browser/widget-manager");
var messaging_1 = require("@theia/core/lib/browser/messaging");
var terminal_protocol_1 = require("../common/terminal-protocol");
var terminal_watcher_1 = require("../common/terminal-watcher");
var shell_terminal_protocol_1 = require("../common/shell-terminal-protocol");
var browser_1 = require("@theia/core/lib/browser");
require("../../src/browser/terminal.css");
require("xterm/lib/xterm.css");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(terminal_widget_1.TerminalWidget).toSelf().inTransientScope();
    bind(terminal_watcher_1.TerminalWatcher).toSelf().inSingletonScope();
    var terminalNum = 0;
    bind(widget_manager_1.WidgetFactory).toDynamicValue(function (ctx) { return ({
        id: terminal_widget_1.TERMINAL_WIDGET_FACTORY_ID,
        createWidget: function (options) {
            var child = new inversify_1.Container({ defaultScope: 'Singleton' });
            child.parent = ctx.container;
            var counter = terminalNum++;
            child.bind(terminal_widget_1.TerminalWidgetOptions).toConstantValue(__assign({ endpoint: { path: '/services/terminals' }, id: 'terminal-' + counter, caption: 'Terminal ' + counter, label: 'Terminal ' + counter, destroyTermOnClose: true }, options));
            var result = child.get(terminal_widget_1.TerminalWidget);
            var app = ctx.container.get(browser_1.FrontendApplication);
            app.shell.addToMainArea(result);
            app.shell.activateMain(result.id);
            result.start(options.attachId);
            return result;
        }
    }); });
    bind(terminal_frontend_contribution_1.TerminalFrontendContribution).toSelf().inSingletonScope();
    try {
        for (var _a = __values([common_1.CommandContribution, common_1.MenuContribution, common_1.KeybindingContribution]), _b = _a.next(); !_b.done; _b = _a.next()) {
            var identifier = _b.value;
            bind(identifier).toDynamicValue(function (ctx) {
                return ctx.container.get(terminal_frontend_contribution_1.TerminalFrontendContribution);
            }).inSingletonScope();
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
        }
        finally { if (e_1) throw e_1.error; }
    }
    bind(terminal_protocol_1.ITerminalServer).toDynamicValue(function (ctx) {
        var connection = ctx.container.get(messaging_1.WebSocketConnectionProvider);
        var terminalWatcher = ctx.container.get(terminal_watcher_1.TerminalWatcher);
        return connection.createProxy(terminal_protocol_1.terminalPath, terminalWatcher.getTerminalClient());
    }).inSingletonScope();
    bind(shell_terminal_protocol_1.IShellTerminalServer).toDynamicValue(function (ctx) {
        var connection = ctx.container.get(messaging_1.WebSocketConnectionProvider);
        var terminalWatcher = ctx.container.get(terminal_watcher_1.TerminalWatcher);
        return connection.createProxy(shell_terminal_protocol_1.shellTerminalPath, terminalWatcher.getTerminalClient());
    }).inSingletonScope();
    var e_1, _c;
});
//# sourceMappingURL=terminal-frontend-module.js.map