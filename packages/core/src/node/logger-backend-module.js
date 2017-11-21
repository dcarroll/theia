"use strict";
/*
 * Copyright (C) 2017 Ericsson and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var messaging_1 = require("../common/messaging");
var logger_1 = require("../common/logger");
var logger_protocol_1 = require("../common/logger-protocol");
var bunyan_logger_server_1 = require("./bunyan-logger-server");
var logger_watcher_1 = require("../common/logger-watcher");
var backend_application_1 = require("./backend-application");
var cli_1 = require("./cli");
function bindLogger(bind) {
    bind(logger_1.ILogger).to(logger_1.Logger).inSingletonScope().whenTargetIsDefault();
    bind(logger_watcher_1.LoggerWatcher).toSelf().inSingletonScope();
    bind(logger_protocol_1.ILoggerServer).to(bunyan_logger_server_1.BunyanLoggerServer).inSingletonScope();
    bind(bunyan_logger_server_1.LogLevelCliContribution).toSelf().inSingletonScope();
    bind(cli_1.CliContribution).toDynamicValue(function (ctx) { return ctx.container.get(bunyan_logger_server_1.LogLevelCliContribution); });
    bind(logger_protocol_1.LoggerServerOptions).toDynamicValue(function (ctx) {
        var contrib = ctx.container.get(bunyan_logger_server_1.LogLevelCliContribution);
        return {
            name: "Theia",
            level: contrib.logLevel
        };
    }).inSingletonScope();
    bind(logger_1.LoggerFactory).toFactory(function (ctx) {
        return function (options) {
            var child = new inversify_1.Container({ defaultScope: 'Singleton' });
            child.parent = ctx.container;
            child.bind(logger_1.ILogger).to(logger_1.Logger).inTransientScope();
            child.bind(logger_1.LoggerOptions).toConstantValue(options);
            return child.get(logger_1.ILogger);
        };
    });
}
exports.bindLogger = bindLogger;
exports.loggerBackendModule = new inversify_1.ContainerModule(function (bind) {
    bind(backend_application_1.BackendApplicationContribution).toDynamicValue(function (ctx) {
        return ({
            initialize: function () {
                logger_1.setRootLogger(ctx.container.get(logger_1.ILogger));
            }
        });
    });
    bindLogger(bind);
    bind(messaging_1.ConnectionHandler).toDynamicValue(function (ctx) {
        return new messaging_1.JsonRpcConnectionHandler(logger_protocol_1.loggerPath, function (client) {
            var loggerServer = ctx.container.get(logger_protocol_1.ILoggerServer);
            loggerServer.setClient(client);
            return loggerServer;
        });
    }).inSingletonScope();
});
//# sourceMappingURL=logger-backend-module.js.map