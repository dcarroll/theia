"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
var node_filesystem_1 = require("./node-filesystem");
var common_2 = require("../common");
var filesystem_watcher_protocol_1 = require("../common/filesystem-watcher-protocol");
var chokidar_filesystem_watcher_1 = require("./chokidar-filesystem-watcher");
function bindFileSystem(bind) {
    bind(node_filesystem_1.FileSystemNode).toSelf().inSingletonScope();
    bind(common_2.FileSystem).toDynamicValue(function (ctx) { return ctx.container.get(node_filesystem_1.FileSystemNode); }).inSingletonScope();
}
exports.bindFileSystem = bindFileSystem;
function bindFileSystemWatcherServer(bind) {
    bind(chokidar_filesystem_watcher_1.ChokidarFileSystemWatcherServer).toSelf();
    bind(filesystem_watcher_protocol_1.FileSystemWatcherServer).toDynamicValue(function (ctx) {
        return ctx.container.get(chokidar_filesystem_watcher_1.ChokidarFileSystemWatcherServer);
    });
}
exports.bindFileSystemWatcherServer = bindFileSystemWatcherServer;
exports.default = new inversify_1.ContainerModule(function (bind) {
    common_2.bindFileSystemPreferences(bind);
    bindFileSystem(bind);
    bind(common_1.ConnectionHandler).toDynamicValue(function (ctx) {
        return new common_1.JsonRpcConnectionHandler(common_2.fileSystemPath, function (client) {
            var server = ctx.container.get(common_2.FileSystem);
            server.setClient(client);
            client.onDidCloseConnection(function () { return server.dispose(); });
            return server;
        });
    }).inSingletonScope();
    bindFileSystemWatcherServer(bind);
    bind(common_2.FileSystemWatcher).toSelf();
    bind(common_1.ConnectionHandler).toDynamicValue(function (ctx) {
        return new common_1.JsonRpcConnectionHandler(filesystem_watcher_protocol_1.fileSystemWatcherPath, function (client) {
            var server = ctx.container.get(filesystem_watcher_protocol_1.FileSystemWatcherServer);
            server.setClient(client);
            client.onDidCloseConnection(function () { return server.dispose(); });
            return server;
        });
    }).inSingletonScope();
});
//# sourceMappingURL=filesystem-backend-module.js.map