"use strict";
/*
* Copyright (C) 2017 TypeFox and others.
*
* Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
* You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var outline_view_service_1 = require("./outline-view-service");
var outline_view_contribution_1 = require("./outline-view-contribution");
var widget_manager_1 = require("@theia/core/lib/browser/widget-manager");
var browser_1 = require("@theia/core/lib/browser");
var outline_view_widget_1 = require("./outline-view-widget");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(outline_view_widget_1.OutlineViewWidgetFactory).toFactory(function (ctx) {
        return function () { return createOutlineViewWidget(ctx.container); };
    });
    bind(outline_view_service_1.OutlineViewService).toSelf().inSingletonScope();
    bind(widget_manager_1.WidgetFactory).toDynamicValue(function (context) { return context.container.get(outline_view_service_1.OutlineViewService); });
    bind(outline_view_contribution_1.OutlineViewContribution).toSelf().inSingletonScope();
    bind(browser_1.FrontendApplicationContribution).toDynamicValue(function (c) { return c.container.get(outline_view_contribution_1.OutlineViewContribution); });
});
function createOutlineViewWidget(parent) {
    var child = browser_1.createTreeContainer(parent);
    child.unbind(browser_1.TreeWidget);
    child.bind(outline_view_widget_1.OutlineViewWidget).toSelf();
    return child.get(outline_view_widget_1.OutlineViewWidget);
}
//# sourceMappingURL=outline-view-frontend-module.js.map