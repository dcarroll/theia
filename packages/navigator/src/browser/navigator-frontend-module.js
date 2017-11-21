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
var navigator_widget_1 = require("./navigator-widget");
var navigator_menu_1 = require("./navigator-menu");
var navigator_contribution_1 = require("./navigator-contribution");
var navigator_container_1 = require("./navigator-container");
var widget_manager_1 = require("@theia/core/lib/browser/widget-manager");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(navigator_contribution_1.FileNavigatorContribution).toSelf().inSingletonScope();
    bind(browser_1.FrontendApplicationContribution).toDynamicValue(function (c) { return c.container.get(navigator_contribution_1.FileNavigatorContribution); });
    bind(widget_manager_1.WidgetFactory).toDynamicValue(function (c) { return c.container.get(navigator_contribution_1.FileNavigatorContribution); });
    bind(common_1.MenuContribution).to(navigator_menu_1.NavigatorMenuContribution).inSingletonScope();
    bind(navigator_widget_1.FileNavigatorWidget).toDynamicValue(function (ctx) {
        return navigator_container_1.createFileNavigatorWidget(ctx.container);
    }).inSingletonScope().whenTargetNamed(navigator_widget_1.FILE_NAVIGATOR_ID);
});
//# sourceMappingURL=navigator-frontend-module.js.map