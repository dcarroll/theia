"use strict";
/*
 * Copyright (C) 2017 Ericsson and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var os = require("os");
var inversify_1 = require("inversify");
var uri_1 = require("@theia/core/lib/common/uri");
var node_1 = require("@theia/core/lib/node");
var common_1 = require("@theia/core/lib/common");
var common_2 = require("@theia/workspace/lib/common");
var common_3 = require("../common");
var json_preference_server_1 = require("./json-preference-server");
/*
 * Workspace preference server that watches the current workspace
 */
exports.WorkspacePreferenceServer = Symbol('WorkspacePreferenceServer');
/*
 * User preference server that watches the home directory of the user
 */
exports.UserPreferenceServer = Symbol('UserPreferenceServer');
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(json_preference_server_1.JsonPreferenceServer).toSelf();
    bind(exports.UserPreferenceServer).toDynamicValue(function (ctx) {
        var homeUri = node_1.FileUri.create(os.homedir());
        var uri = homeUri.withPath(homeUri.path.join('.theia', 'settings.json'));
        var child = ctx.container.createChild();
        child.bind(json_preference_server_1.PreferenceUri).toConstantValue(uri);
        return child.get(json_preference_server_1.JsonPreferenceServer);
    });
    bind(exports.WorkspacePreferenceServer).toDynamicValue(function (ctx) {
        var workspaceServer = ctx.container.get(common_2.WorkspaceServer);
        var uri = workspaceServer.getRoot().then(function (root) {
            var rootUri = new uri_1.default(root);
            return rootUri.withPath(rootUri.path.join('.theia', 'settings.json'));
        });
        var child = ctx.container.createChild();
        child.bind(json_preference_server_1.PreferenceUri).toConstantValue(uri);
        return child.get(json_preference_server_1.JsonPreferenceServer);
    });
    bind(common_3.PreferenceServer).toDynamicValue(function (ctx) {
        var userServer = ctx.container.get(exports.UserPreferenceServer);
        var workspaceServer = ctx.container.get(exports.WorkspacePreferenceServer);
        return new common_3.CompoundPreferenceServer(workspaceServer, userServer);
    });
    bind(common_1.ConnectionHandler).toDynamicValue(function (ctx) {
        return new common_1.JsonRpcConnectionHandler(common_3.preferencesPath, function (client) {
            var server = ctx.container.get(common_3.PreferenceServer);
            server.setClient(client);
            client.onDidCloseConnection(function () { return server.dispose(); });
            return server;
        });
    }).inSingletonScope();
    bind(common_3.PreferenceService).toSelf();
});
//# sourceMappingURL=preference-backend-module.js.map