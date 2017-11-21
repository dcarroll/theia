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
var quick_file_open_contribution_1 = require("./quick-file-open-contribution");
var quick_file_open_1 = require("./quick-file-open");
var file_search_service_1 = require("../common/file-search-service");
exports.default = new inversify_1.ContainerModule(function (bind, unbind, isBound, rebind) {
    bind(file_search_service_1.FileSearchService).toDynamicValue(function (ctx) {
        var provider = ctx.container.get(browser_1.WebSocketConnectionProvider);
        return provider.createProxy(file_search_service_1.fileSearchServicePath);
    }).inSingletonScope();
    bind(quick_file_open_contribution_1.QuickFileOpenFrontendContribution).toSelf().inSingletonScope();
    bind(common_1.CommandContribution).toDynamicValue(function (ctx) { return ctx.container.get(quick_file_open_contribution_1.QuickFileOpenFrontendContribution); });
    bind(common_1.KeybindingContribution).toDynamicValue(function (ctx) { return ctx.container.get(quick_file_open_contribution_1.QuickFileOpenFrontendContribution); });
    bind(quick_file_open_1.QuickFileOpenService).toSelf().inSingletonScope();
});
//# sourceMappingURL=file-search-frontend-module.js.map