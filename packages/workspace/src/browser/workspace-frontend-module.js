"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
var browser_1 = require("@theia/core/lib/browser");
var browser_2 = require("@theia/filesystem/lib/browser");
var common_2 = require("../common");
var workspace_frontend_contribution_1 = require("./workspace-frontend-contribution");
var workspace_service_1 = require("./workspace-service");
var workspace_commands_1 = require("./workspace-commands");
var workspace_storage_service_1 = require("./workspace-storage-service");
var storage_service_1 = require("@theia/core/lib/browser/storage-service");
require("../../src/browser/style/index.css");
exports.default = new inversify_1.ContainerModule(function (bind, unbind, isBound, rebind) {
    bind(workspace_service_1.WorkspaceService).toSelf().inSingletonScope();
    bind(browser_1.FrontendApplicationContribution).toDynamicValue(function (ctx) { return ctx.container.get(workspace_service_1.WorkspaceService); });
    bind(common_2.WorkspaceServer).toDynamicValue(function (ctx) {
        var provider = ctx.container.get(browser_1.WebSocketConnectionProvider);
        return provider.createProxy(common_2.workspacePath);
    }).inSingletonScope();
    bind(workspace_frontend_contribution_1.WorkspaceFrontendContribution).toSelf().inSingletonScope();
    try {
        for (var _a = __values([common_1.CommandContribution, common_1.MenuContribution]), _b = _a.next(); !_b.done; _b = _a.next()) {
            var identifier = _b.value;
            bind(identifier).toDynamicValue(function (ctx) {
                return ctx.container.get(workspace_frontend_contribution_1.WorkspaceFrontendContribution);
            }).inSingletonScope();
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
        }
        finally { if (e_1) throw e_1.error; }
    }
    bind(browser_2.FileDialogFactory).toFactory(function (ctx) {
        return function (props) {
            return browser_2.createFileDialog(ctx.container, props);
        };
    });
    bind(common_1.CommandContribution).to(workspace_commands_1.WorkspaceCommandContribution).inSingletonScope();
    bind(common_1.MenuContribution).to(workspace_commands_1.FileMenuContribution).inSingletonScope();
    rebind(storage_service_1.StorageService).to(workspace_storage_service_1.WorkspaceStorageService).inSingletonScope();
    var e_1, _c;
});
//# sourceMappingURL=workspace-frontend-module.js.map