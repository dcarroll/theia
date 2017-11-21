"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (C) 2017 Ericsson and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
var inversify_1 = require("inversify");
var logger_backend_module_1 = require("@theia/core/lib/node/logger-backend-module");
var backend_application_module_1 = require("@theia/core/lib/node/backend-application-module");
var process_backend_module_1 = require("@theia/process/lib/node/process-backend-module");
var terminal_backend_module_1 = require("../terminal-backend-module");
var testContainer = new inversify_1.Container();
exports.testContainer = testContainer;
testContainer.load(backend_application_module_1.backendApplicationModule);
testContainer.load(logger_backend_module_1.loggerBackendModule);
testContainer.load(process_backend_module_1.default);
testContainer.load(terminal_backend_module_1.default);
//# sourceMappingURL=inversify.spec-config.js.map