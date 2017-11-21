"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var core_1 = require("@theia/core");
var node_1 = require("@theia/core/lib/node");
var extension_protocol_1 = require("../common/extension-protocol");
var node_extension_server_1 = require("./node-extension-server");
var application_project_1 = require("./application-project");
var npm_client_1 = require("./npm-client");
var application_project_cli_1 = require("./application-project-cli");
exports.extensionKeyword = "theia-extension";
function bindNodeExtensionServer(bind, args) {
    if (args) {
        bind(npm_client_1.NpmClientOptions).toConstantValue(args);
        bind(application_project_1.ApplicationProjectOptions).toConstantValue(args);
    }
    else {
        bind(application_project_cli_1.ApplicationProjectCliContribution).toSelf().inSingletonScope();
        bind(node_1.CliContribution).toDynamicValue(function (ctx) { return ctx.container.get(application_project_cli_1.ApplicationProjectCliContribution); }).inSingletonScope();
        bind(npm_client_1.NpmClientOptions).toDynamicValue(function (ctx) {
            return ctx.container.get(application_project_cli_1.ApplicationProjectCliContribution).args;
        }).inSingletonScope();
        bind(application_project_1.ApplicationProjectOptions).toDynamicValue(function (ctx) {
            return ctx.container.get(application_project_cli_1.ApplicationProjectCliContribution).args;
        }).inSingletonScope();
    }
    bind(npm_client_1.NpmClient).toSelf().inSingletonScope();
    bind(application_project_1.ApplicationProject).toSelf().inSingletonScope();
    bind(node_extension_server_1.ExtensionKeywords).toConstantValue([exports.extensionKeyword]);
    bind(node_extension_server_1.NodeExtensionServer).toSelf().inSingletonScope();
    bind(extension_protocol_1.ExtensionServer).toDynamicValue(function (ctx) {
        return ctx.container.get(node_extension_server_1.NodeExtensionServer);
    }).inSingletonScope();
}
exports.bindNodeExtensionServer = bindNodeExtensionServer;
exports.default = new inversify_1.ContainerModule(function (bind) {
    bindNodeExtensionServer(bind);
    var clients = new Set();
    var dispatchingClient = {
        onDidChange: function (change) { return clients.forEach(function (client) { return client.onDidChange(change); }); },
        onDidStopInstallation: function (result) { return clients.forEach(function (client) { return client.onDidStopInstallation(result); }); },
        onWillStartInstallation: function (param) { return clients.forEach(function (client) { return client.onWillStartInstallation(param); }); }
    };
    bind(core_1.ConnectionHandler).toDynamicValue(function (ctx) {
        var server = ctx.container.get(extension_protocol_1.ExtensionServer);
        server.setClient(dispatchingClient);
        return new core_1.JsonRpcConnectionHandler(extension_protocol_1.extensionPath, function (client) {
            clients.add(client);
            client.onDidCloseConnection(function () {
                clients.delete(client);
            });
            return server;
        });
    }).inSingletonScope();
});
//# sourceMappingURL=extension-backend-module.js.map