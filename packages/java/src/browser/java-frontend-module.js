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
var java_client_contribution_1 = require("./java-client-contribution");
var browser_1 = require("@theia/languages/lib/browser");
var java_commands_1 = require("./java-commands");
var java_resource_1 = require("./java-resource");
require("./monaco-contribution");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(common_1.CommandContribution).to(java_commands_1.JavaCommandContribution).inSingletonScope();
    bind(java_client_contribution_1.JavaClientContribution).toSelf().inSingletonScope();
    bind(browser_1.LanguageClientContribution).toDynamicValue(function (ctx) { return ctx.container.get(java_client_contribution_1.JavaClientContribution); });
    bind(java_resource_1.JavaResourceResolver).toSelf().inSingletonScope();
    bind(common_1.ResourceResolver).toDynamicValue(function (ctx) { return ctx.container.get(java_resource_1.JavaResourceResolver); });
});
//# sourceMappingURL=java-frontend-module.js.map