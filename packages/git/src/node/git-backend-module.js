"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var git_1 = require("../common/git");
var git_watcher_1 = require("../common/git-watcher");
var dugite_git_1 = require("./dugite-git");
var dugite_git_watcher_1 = require("./dugite-git-watcher");
var inversify_1 = require("inversify");
var git_preferences_1 = require("../common/git-preferences");
var common_1 = require("@theia/core/lib/common");
exports.default = new inversify_1.ContainerModule(function (bind) {
    git_preferences_1.bindGitPreferences(bind);
    bind(dugite_git_1.DugiteGit).toSelf().inSingletonScope();
    bind(git_1.Git).toDynamicValue(function (ctx) { return ctx.container.get(dugite_git_1.DugiteGit); }).inSingletonScope();
    bind(common_1.ConnectionHandler).toDynamicValue(function (context) { return new common_1.JsonRpcConnectionHandler(git_1.GitPath, function () { return context.container.get(git_1.Git); }); }).inSingletonScope();
    bind(dugite_git_watcher_1.DugiteGitWatcherServer).toSelf();
    bind(git_watcher_1.GitWatcherServer).toDynamicValue(function (context) { return context.container.get(dugite_git_watcher_1.DugiteGitWatcherServer); });
    bind(git_watcher_1.GitWatcher).toSelf();
    bind(common_1.ConnectionHandler).toDynamicValue(function (context) {
        return new common_1.JsonRpcConnectionHandler(git_watcher_1.GitWatcherPath, function (client) {
            var server = context.container.get(git_watcher_1.GitWatcherServer);
            server.setClient(client);
            client.onDidCloseConnection(function () { return server.dispose(); });
            return server;
        });
    }).inSingletonScope();
});
//# sourceMappingURL=git-backend-module.js.map