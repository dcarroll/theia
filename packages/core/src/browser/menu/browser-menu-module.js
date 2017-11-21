"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var frontend_application_1 = require("../frontend-application");
var context_menu_renderer_1 = require("../context-menu-renderer");
var browser_menu_plugin_1 = require("./browser-menu-plugin");
var browser_context_menu_renderer_1 = require("./browser-context-menu-renderer");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(browser_menu_plugin_1.BrowserMainMenuFactory).toSelf().inSingletonScope();
    bind(context_menu_renderer_1.ContextMenuRenderer).to(browser_context_menu_renderer_1.BrowserContextMenuRenderer).inSingletonScope();
    bind(frontend_application_1.FrontendApplicationContribution).to(browser_menu_plugin_1.BrowserMenuBarContribution).inSingletonScope();
});
//# sourceMappingURL=browser-menu-module.js.map