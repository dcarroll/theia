"use strict";
/*
 * Copyright (C) 2017 Ericsson and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var logger_protocol_1 = require("../common/logger-protocol");
var logger_1 = require("../common/logger");
var logger_watcher_1 = require("../common/logger-watcher");
var messaging_1 = require("./messaging");
var frontend_application_1 = require("./frontend-application");
exports.loggerFrontendModule = new inversify_1.ContainerModule(function (bind) {
    bind(frontend_application_1.FrontendApplicationContribution).toDynamicValue(function (ctx) {
        return ({
            initialize: function () {
                logger_1.setRootLogger(ctx.container.get(logger_1.ILogger));
            }
        });
    });
    bind(logger_1.ILogger).to(logger_1.Logger).inSingletonScope();
    bind(logger_watcher_1.LoggerWatcher).toSelf().inSingletonScope();
    bind(logger_protocol_1.ILoggerServer).toDynamicValue(function (ctx) {
        var loggerWatcher = ctx.container.get(logger_watcher_1.LoggerWatcher);
        var connection = ctx.container.get(messaging_1.WebSocketConnectionProvider);
        return connection.createProxy(logger_protocol_1.loggerPath, loggerWatcher.getLoggerClient());
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
});
//# sourceMappingURL=logger-frontend-module.js.map