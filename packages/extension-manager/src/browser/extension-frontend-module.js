"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
var extension_protocol_1 = require("../common/extension-protocol");
var common_1 = require("../common");
var extension_contribution_1 = require("./extension-contribution");
var extension_widget_1 = require("./extension-widget");
var extension_widget_factory_1 = require("./extension-widget-factory");
var extension_open_handler_1 = require("./extension-open-handler");
require("../../src/browser/style/index.css");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(extension_protocol_1.ExtensionServer).toDynamicValue(function (ctx) {
        var provider = ctx.container.get(browser_1.WebSocketConnectionProvider);
        return provider.createProxy(extension_protocol_1.extensionPath);
    }).inSingletonScope();
    bind(common_1.ExtensionManager).toSelf().inSingletonScope();
    bind(browser_1.FrontendApplicationContribution).to(extension_contribution_1.ExtensionContribution).inSingletonScope();
    bind(extension_widget_1.ExtensionWidget).toSelf().inSingletonScope();
    bind(browser_1.WidgetFactory).toDynamicValue(function (ctx) { return ({
        id: 'extensions',
        createWidget: function () {
            return ctx.container.get(extension_widget_1.ExtensionWidget);
        }
    }); }).inSingletonScope();
    bind(extension_widget_factory_1.ExtensionWidgetFactory).toSelf().inSingletonScope();
    bind(browser_1.WidgetFactory).toDynamicValue(function (ctx) { return ctx.container.get(extension_widget_factory_1.ExtensionWidgetFactory); }).inSingletonScope();
    bind(extension_open_handler_1.ExtensionOpenHandler).toSelf().inSingletonScope();
    bind(browser_1.OpenHandler).toDynamicValue(function (ctx) { return ctx.container.get(extension_open_handler_1.ExtensionOpenHandler); }).inSingletonScope();
});
//# sourceMappingURL=extension-frontend-module.js.map