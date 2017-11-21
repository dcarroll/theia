"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var common_1 = require("../common");
var message_service_protocol_1 = require("../common/message-service-protocol");
var frontend_application_1 = require("./frontend-application");
var opener_service_1 = require("./opener-service");
var humane_message_client_1 = require("./humane-message-client");
var messaging_1 = require("./messaging");
var common_frontend_contribution_1 = require("./common-frontend-contribution");
var quick_open_1 = require("./quick-open");
var storage_service_1 = require("./storage-service");
var widget_manager_1 = require("./widget-manager");
var shell_layout_restorer_1 = require("./shell-layout-restorer");
var shell_1 = require("./shell");
var status_bar_1 = require("./status-bar/status-bar");
var label_parser_1 = require("./label-parser");
require("../../src/browser/style/index.css");
require("font-awesome/css/font-awesome.min.css");
exports.frontendApplicationModule = new inversify_1.ContainerModule(function (bind, unbind, isBound, rebind) {
    bind(frontend_application_1.FrontendApplication).toSelf().inSingletonScope();
    common_1.bindContributionProvider(bind, frontend_application_1.FrontendApplicationContribution);
    bind(shell_1.ApplicationShellOptions).toConstantValue({});
    bind(shell_1.ApplicationShell).toSelf().inSingletonScope();
    bind(shell_1.DockPanelRenderer).toSelf();
    bind(shell_1.DockPanelTabBarRendererFactory).toAutoFactory(shell_1.DockPanelTabBarRenderer);
    bind(shell_1.DockPanelTabBarRenderer).toSelf();
    common_1.bindContributionProvider(bind, opener_service_1.OpenHandler);
    bind(opener_service_1.DefaultOpenerService).toSelf().inSingletonScope();
    bind(opener_service_1.OpenerService).toDynamicValue(function (context) { return context.container.get(opener_service_1.DefaultOpenerService); });
    common_1.bindContributionProvider(bind, widget_manager_1.WidgetFactory);
    bind(widget_manager_1.WidgetManager).toSelf().inSingletonScope();
    bind(shell_layout_restorer_1.ShellLayoutRestorer).toSelf().inSingletonScope();
    bind(common_1.CommandContribution).toDynamicValue(function (ctx) { return ctx.container.get(shell_layout_restorer_1.ShellLayoutRestorer); });
    bind(common_1.DefaultResourceProvider).toSelf().inSingletonScope();
    bind(common_1.ResourceProvider).toProvider(function (context) {
        return function (uri) { return context.container.get(common_1.DefaultResourceProvider).get(uri); };
    });
    common_1.bindContributionProvider(bind, common_1.ResourceResolver);
    bind(common_1.SelectionService).toSelf().inSingletonScope();
    bind(common_1.CommandRegistry).toSelf().inSingletonScope();
    bind(common_1.CommandService).toDynamicValue(function (context) { return context.container.get(common_1.CommandRegistry); });
    common_1.bindContributionProvider(bind, common_1.CommandContribution);
    bind(common_1.MenuModelRegistry).toSelf().inSingletonScope();
    common_1.bindContributionProvider(bind, common_1.MenuContribution);
    bind(common_1.KeybindingRegistry).toSelf().inSingletonScope();
    common_1.bindContributionProvider(bind, common_1.KeybindingContribution);
    bind(common_1.KeybindingContextRegistry).toSelf().inSingletonScope();
    common_1.bindContributionProvider(bind, common_1.KeybindingContext);
    bind(humane_message_client_1.HumaneMessageClient).toSelf().inSingletonScope();
    bind(message_service_protocol_1.MessageClient).toDynamicValue(function (ctx) {
        var messageService = ctx.container.get(humane_message_client_1.HumaneMessageClient);
        messaging_1.WebSocketConnectionProvider.createProxy(ctx.container, message_service_protocol_1.messageServicePath, messageService);
        return messageService;
    }).inSingletonScope();
    bind(common_1.MessageService).toSelf().inSingletonScope();
    bind(common_frontend_contribution_1.CommonFrontendContribution).toSelf().inSingletonScope();
    [common_1.CommandContribution, common_1.KeybindingContribution, common_1.MenuContribution].forEach(function (serviceIdentifier) {
        return bind(serviceIdentifier).toDynamicValue(function (ctx) { return ctx.container.get(common_frontend_contribution_1.CommonFrontendContribution); }).inSingletonScope();
    });
    bind(quick_open_1.QuickOpenService).toSelf().inSingletonScope();
    bind(quick_open_1.QuickCommandService).toSelf().inSingletonScope();
    bind(quick_open_1.QuickCommandFrontendContribution).toSelf().inSingletonScope();
    [common_1.CommandContribution, common_1.KeybindingContribution].forEach(function (serviceIdentifier) {
        return bind(serviceIdentifier).toDynamicValue(function (ctx) { return ctx.container.get(quick_open_1.QuickCommandFrontendContribution); }).inSingletonScope();
    });
    bind(storage_service_1.StorageService).to(storage_service_1.LocalStorageService).inSingletonScope();
    bind(status_bar_1.StatusBarImpl).toSelf().inSingletonScope();
    bind(status_bar_1.StatusBar).toDynamicValue(function (ctx) { return ctx.container.get(status_bar_1.StatusBarImpl); }).inSingletonScope();
    bind(label_parser_1.LabelParser).toSelf().inSingletonScope();
});
//# sourceMappingURL=frontend-application-module.js.map