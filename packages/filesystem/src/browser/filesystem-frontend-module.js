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
var browser_1 = require("@theia/core/lib/browser");
var common_2 = require("../common");
var file_icons_1 = require("./icons/file-icons");
var filesystem_watcher_protocol_1 = require("../common/filesystem-watcher-protocol");
var filesystem_listener_1 = require("./filesystem-listener");
require("../../src/browser/style/index.css");
exports.default = new inversify_1.ContainerModule(function (bind) {
    common_2.bindFileSystemPreferences(bind);
    bind(filesystem_watcher_protocol_1.FileSystemWatcherServerProxy).toDynamicValue(function (ctx) {
        return browser_1.WebSocketConnectionProvider.createProxy(ctx.container, filesystem_watcher_protocol_1.fileSystemWatcherPath);
    }).inSingletonScope();
    bind(filesystem_watcher_protocol_1.FileSystemWatcherServer).to(filesystem_watcher_protocol_1.ReconnectingFileSystemWatcherServer).inSingletonScope();
    bind(common_2.FileSystemWatcher).toSelf().inSingletonScope();
    bind(filesystem_listener_1.FileSystemListener).toSelf().inSingletonScope();
    bind(common_2.FileSystem).toDynamicValue(function (ctx) {
        var filesystem = browser_1.WebSocketConnectionProvider.createProxy(ctx.container, common_2.fileSystemPath);
        ctx.container.get(filesystem_listener_1.FileSystemListener).listen(filesystem);
        return filesystem;
    }).inSingletonScope();
    bind(common_2.FileResourceResolver).toSelf().inSingletonScope();
    bind(common_1.ResourceResolver).toDynamicValue(function (ctx) { return ctx.container.get(common_2.FileResourceResolver); });
    bind(file_icons_1.FileIconProvider).toSelf().inSingletonScope();
});
//# sourceMappingURL=filesystem-frontend-module.js.map