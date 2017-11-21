"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var node_1 = require("@theia/core/lib/node");
var terminal_backend_contribution_1 = require("./terminal-backend-contribution");
var messaging_1 = require("@theia/core/lib/common/messaging");
var shell_process_1 = require("./shell-process");
var terminal_protocol_1 = require("../common/terminal-protocol");
var terminal_server_1 = require("./terminal-server");
var logger_1 = require("@theia/core/lib/common/logger");
var shell_terminal_protocol_1 = require("../common/shell-terminal-protocol");
var shell_terminal_server_1 = require("../node/shell-terminal-server");
var terminal_watcher_1 = require("../common/terminal-watcher");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(node_1.BackendApplicationContribution).to(terminal_backend_contribution_1.TerminalBackendContribution);
    bind(terminal_protocol_1.ITerminalServer).to(terminal_server_1.TerminalServer).inSingletonScope();
    bind(shell_terminal_protocol_1.IShellTerminalServer).to(shell_terminal_server_1.ShellTerminalServer).inSingletonScope();
    bind(shell_process_1.ShellProcess).toSelf().inTransientScope();
    bind(terminal_watcher_1.TerminalWatcher).toSelf().inSingletonScope();
    bind(logger_1.ILogger).toDynamicValue(function (ctx) {
        var logger = ctx.container.get(logger_1.ILogger);
        return logger.child({ 'module': 'terminal' });
    }).inSingletonScope().whenTargetNamed("terminal");
    bind(shell_process_1.ShellProcessFactory).toFactory(function (ctx) {
        return function (options) {
            var child = new inversify_1.Container({ defaultScope: 'Singleton' });
            child.parent = ctx.container;
            child.bind(shell_process_1.ShellProcessOptions).toConstantValue(options);
            return child.get(shell_process_1.ShellProcess);
        };
    });
    bind(messaging_1.ConnectionHandler).toDynamicValue(function (ctx) {
        return new messaging_1.JsonRpcConnectionHandler(terminal_protocol_1.terminalPath, function (client) {
            var terminalServer = ctx.container.get(terminal_protocol_1.ITerminalServer);
            terminalServer.setClient(client);
            return terminalServer;
        });
    }).inSingletonScope();
    bind(messaging_1.ConnectionHandler).toDynamicValue(function (ctx) {
        return new messaging_1.JsonRpcConnectionHandler(shell_terminal_protocol_1.shellTerminalPath, function (client) {
            var shellTerminalServer = ctx.container.get(shell_terminal_protocol_1.IShellTerminalServer);
            shellTerminalServer.setClient(client);
            return shellTerminalServer;
        });
    }).inSingletonScope();
});
//# sourceMappingURL=terminal-backend-module.js.map