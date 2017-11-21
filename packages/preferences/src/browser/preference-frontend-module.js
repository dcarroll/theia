"use strict";
/*
 * Copyright (C) 2017 Ericsson and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
var common_1 = require("../common");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(common_1.PreferenceService).toSelf().inSingletonScope();
    bind(common_1.PreferenceServer).toDynamicValue(function (ctx) {
        return ctx.container.get(browser_1.WebSocketConnectionProvider).createProxy(common_1.preferencesPath);
    }).inSingletonScope();
});
//# sourceMappingURL=preference-frontend-module.js.map