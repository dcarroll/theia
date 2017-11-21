"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var console_logger_server_1 = require("@theia/core/lib/common/console-logger-server");
var logger_protocol_1 = require("@theia/core/lib/common/logger-protocol");
var node_1 = require("@theia/core/lib/node");
var backend_application_module_1 = require("@theia/core/lib/node/backend-application-module");
var logger_backend_module_1 = require("@theia/core/lib/node/logger-backend-module");
var filesystem_backend_module_1 = require("@theia/filesystem/lib/node/filesystem-backend-module");
var extension_backend_module_1 = require("../extension-backend-module");
exports.extensionNodeTestContainer = function (args) {
    var container = new inversify_1.Container();
    var bind = container.bind.bind(container);
    logger_backend_module_1.bindLogger(bind);
    backend_application_module_1.bindServerProcess(bind, node_1.stubRemoteMasterProcessFactory);
    container.rebind(logger_protocol_1.ILoggerServer).to(console_logger_server_1.ConsoleLoggerServer).inSingletonScope();
    filesystem_backend_module_1.bindFileSystem(bind);
    filesystem_backend_module_1.bindFileSystemWatcherServer(bind);
    extension_backend_module_1.bindNodeExtensionServer(bind, args);
    return container;
};
exports.default = exports.extensionNodeTestContainer;
//# sourceMappingURL=extension-node-test-container.js.map