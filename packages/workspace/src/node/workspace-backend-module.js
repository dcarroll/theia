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
var common_2 = require("../common");
var default_workspace_server_1 = require("./default-workspace-server");
var cli_1 = require("@theia/core/lib/node/cli");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(default_workspace_server_1.WorkspaceCliContribution).toSelf().inSingletonScope();
    bind(cli_1.CliContribution).toDynamicValue(function (ctx) { return ctx.container.get(default_workspace_server_1.WorkspaceCliContribution); });
    bind(default_workspace_server_1.DefaultWorkspaceServer).toSelf().inSingletonScope();
    bind(common_2.WorkspaceServer).toDynamicValue(function (ctx) {
        return ctx.container.get(default_workspace_server_1.DefaultWorkspaceServer);
    }).inSingletonScope();
    bind(common_1.ConnectionHandler).toDynamicValue(function (ctx) {
        return new common_1.JsonRpcConnectionHandler(common_2.workspacePath, function () {
            return ctx.container.get(common_2.WorkspaceServer);
        });
    }).inSingletonScope();
});
//# sourceMappingURL=workspace-backend-module.js.map