"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var common_1 = require("../common");
var message_service_protocol_1 = require("../common/message-service-protocol");
var backend_application_1 = require("./backend-application");
var cli_1 = require("./cli");
var cluster_1 = require("./cluster");
function bindServerProcess(bind, masterFactory) {
    bind(cluster_1.RemoteMasterProcessFactory).toConstantValue(masterFactory);
    bind(cluster_1.ServerProcess).toSelf().inSingletonScope();
    bind(backend_application_1.BackendApplicationContribution).toDynamicValue(function (ctx) { return ctx.container.get(cluster_1.ServerProcess); }).inSingletonScope();
}
exports.bindServerProcess = bindServerProcess;
exports.backendApplicationModule = new inversify_1.ContainerModule(function (bind) {
    bind(cli_1.CliManager).toSelf().inSingletonScope();
    common_1.bindContributionProvider(bind, cli_1.CliContribution);
    bind(backend_application_1.BackendApplicationCliContribution).toSelf().inSingletonScope();
    bind(cli_1.CliContribution).toDynamicValue(function (ctx) { return ctx.container.get(backend_application_1.BackendApplicationCliContribution); });
    bind(backend_application_1.BackendApplication).toSelf().inSingletonScope();
    common_1.bindContributionProvider(bind, backend_application_1.BackendApplicationContribution);
    bindServerProcess(bind, cluster_1.clusterRemoteMasterProcessFactory);
    bind(message_service_protocol_1.DispatchingMessageClient).toSelf().inSingletonScope();
    bind(message_service_protocol_1.MessageClient).toDynamicValue(function (ctx) { return ctx.container.get(message_service_protocol_1.DispatchingMessageClient); }).inSingletonScope();
    bind(common_1.ConnectionHandler).toDynamicValue(function (ctx) {
        return new common_1.JsonRpcConnectionHandler(message_service_protocol_1.messageServicePath, function (client) {
            var dispatching = ctx.container.get(message_service_protocol_1.DispatchingMessageClient);
            dispatching.clients.add(client);
            client.onDidCloseConnection(function () { return dispatching.clients.delete(client); });
            return dispatching;
        });
    }).inSingletonScope();
    bind(common_1.MessageService).toSelf().inSingletonScope();
});
//# sourceMappingURL=backend-application-module.js.map