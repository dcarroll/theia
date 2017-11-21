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
var language_client_factory_1 = require("./language-client-factory");
var languages_frontend_contribution_1 = require("./languages-frontend-contribution");
var language_client_contribution_1 = require("./language-client-contribution");
var workspace_symbols_1 = require("./workspace-symbols");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(common_2.Window).to(common_2.ConsoleWindow).inSingletonScope();
    bind(common_2.Commands).to(common_2.DefaultCommands).inSingletonScope();
    bind(language_client_factory_1.LanguageClientFactory).toSelf().inSingletonScope();
    common_1.bindContributionProvider(bind, language_client_contribution_1.LanguageClientContribution);
    bind(browser_1.FrontendApplicationContribution).to(languages_frontend_contribution_1.LanguagesFrontendContribution);
    bind(workspace_symbols_1.WorkspaceSymbolCommand).toSelf().inSingletonScope();
    bind(common_1.CommandContribution).toDynamicValue(function (ctx) { return ctx.container.get(workspace_symbols_1.WorkspaceSymbolCommand); });
    bind(common_1.KeybindingContribution).toDynamicValue(function (ctx) { return ctx.container.get(workspace_symbols_1.WorkspaceSymbolCommand); });
});
//# sourceMappingURL=languages-frontend-module.js.map