"use strict";
/*
* Copyright (C) 2017 TypeFox and others.
*
* Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
* You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/
Object.defineProperty(exports, "__esModule", { value: true });
var git_1 = require("../common/git");
var inversify_1 = require("inversify");
var git_preferences_1 = require("../common/git-preferences");
var browser_1 = require("@theia/core/lib/browser");
var git_command_1 = require("./git-command");
var common_1 = require("@theia/core/lib/common");
var git_watcher_1 = require("../common/git-watcher");
var git_frontend_contribution_1 = require("./git-frontend-contribution");
var git_widget_1 = require("./git-widget");
var git_resource_1 = require("./git-resource");
var git_context_menu_1 = require("./git-context-menu");
var git_repository_provider_1 = require("./git-repository-provider");
var git_quick_open_service_1 = require("./git-quick-open-service");
require("../../src/browser/style/index.css");
exports.default = new inversify_1.ContainerModule(function (bind) {
    git_preferences_1.bindGitPreferences(bind);
    bind(git_watcher_1.GitWatcherServerProxy).toDynamicValue(function (context) { return browser_1.WebSocketConnectionProvider.createProxy(context.container, git_watcher_1.GitWatcherPath); }).inSingletonScope();
    bind(git_watcher_1.GitWatcherServer).to(git_watcher_1.ReconnectingGitWatcherServer).inSingletonScope();
    bind(git_watcher_1.GitWatcher).toSelf().inSingletonScope();
    bind(git_1.Git).toDynamicValue(function (context) { return browser_1.WebSocketConnectionProvider.createProxy(context.container, git_1.GitPath); }).inSingletonScope();
    bind(common_1.CommandContribution).to(git_command_1.GitCommandHandlers);
    bind(common_1.MenuContribution).to(git_context_menu_1.GitContextMenu);
    bind(browser_1.FrontendApplicationContribution).to(git_frontend_contribution_1.GitFrontendContribution);
    bind(git_widget_1.GitWidget).toSelf();
    bind(browser_1.WidgetFactory).toDynamicValue(function (context) { return ({
        id: git_frontend_contribution_1.GIT_WIDGET_FACTORY_ID,
        createWidget: function () { return context.container.get(git_widget_1.GitWidget); }
    }); });
    bind(git_resource_1.GitResourceResolver).toSelf().inSingletonScope();
    bind(common_1.ResourceResolver).toDynamicValue(function (ctx) { return ctx.container.get(git_resource_1.GitResourceResolver); });
    bind(git_repository_provider_1.GitRepositoryProvider).toSelf().inSingletonScope();
    bind(git_quick_open_service_1.GitQuickOpenService).toSelf().inSingletonScope();
});
//# sourceMappingURL=git-frontend-module.js.map