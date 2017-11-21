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
var node_1 = require("@theia/core/lib/node");
var languages_backend_contribution_1 = require("./languages-backend-contribution");
var language_server_contribution_1 = require("./language-server-contribution");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(node_1.BackendApplicationContribution).to(languages_backend_contribution_1.LanguagesBackendContribution).inSingletonScope();
    common_1.bindContributionProvider(bind, language_server_contribution_1.LanguageServerContribution);
});
//# sourceMappingURL=languages-backend-module.js.map