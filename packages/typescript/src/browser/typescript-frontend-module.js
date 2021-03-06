"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var browser_1 = require("@theia/languages/lib/browser");
var typescript_client_contribution_1 = require("./typescript-client-contribution");
var typescript_language_config_1 = require("./typescript-language-config");
exports.default = new inversify_1.ContainerModule(function (bind) {
    typescript_language_config_1.registerTypeScript();
    typescript_language_config_1.registerJavaScript();
    bind(typescript_client_contribution_1.TypeScriptClientContribution).toSelf().inSingletonScope();
    bind(browser_1.LanguageClientContribution).toDynamicValue(function (ctx) { return ctx.container.get(typescript_client_contribution_1.TypeScriptClientContribution); });
    bind(typescript_client_contribution_1.JavaScriptClientContribution).toSelf().inSingletonScope();
    bind(browser_1.LanguageClientContribution).toDynamicValue(function (ctx) { return ctx.container.get(typescript_client_contribution_1.JavaScriptClientContribution); });
});
//# sourceMappingURL=typescript-frontend-module.js.map