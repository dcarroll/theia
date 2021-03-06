"use strict";
/*
 * Copyright (C) 2017 Ericsson and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var node_1 = require("@theia/core/lib/node");
var metrics_backend_contribution_1 = require("./metrics-backend-contribution");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(node_1.BackendApplicationContribution).to(metrics_backend_contribution_1.MetricsBackendContribution);
});
//# sourceMappingURL=metrics-backend-module.js.map