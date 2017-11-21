"use strict";
/*
 * Copyright (C) 2017 Ericsson and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var browser_1 = require("@theia/languages/lib/browser");
var go_client_contribution_1 = require("./go-client-contribution");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(go_client_contribution_1.GoClientContribution).toSelf().inSingletonScope();
    bind(browser_1.LanguageClientContribution).toDynamicValue(function (ctx) { return ctx.container.get(go_client_contribution_1.GoClientContribution); });
});
//# sourceMappingURL=go-frontend-module.js.map