"use strict";
/*
 * Copyright (C) 2017 Ericsson and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var raw_process_1 = require("./raw-process");
var terminal_process_1 = require("./terminal-process");
var process_manager_1 = require("./process-manager");
var common_1 = require("@theia/core/lib/common");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(raw_process_1.RawProcess).toSelf().inTransientScope();
    bind(process_manager_1.ProcessManager).toSelf().inSingletonScope();
    bind(raw_process_1.RawProcessFactory).toFactory(function (ctx) {
        return function (options) {
            var child = new inversify_1.Container({ defaultScope: 'Singleton' });
            child.parent = ctx.container;
            var logger = ctx.container.get(common_1.ILogger);
            var loggerChild = logger.child({ 'module': 'process' });
            child.bind(raw_process_1.RawProcessOptions).toConstantValue(options);
            child.bind(common_1.ILogger).toConstantValue(loggerChild);
            return child.get(raw_process_1.RawProcess);
        };
    });
    bind(terminal_process_1.TerminalProcess).toSelf().inTransientScope();
    bind(terminal_process_1.TerminalProcessFactory).toFactory(function (ctx) {
        return function (options) {
            var child = new inversify_1.Container({ defaultScope: 'Singleton' });
            child.parent = ctx.container;
            var logger = ctx.container.get(common_1.ILogger);
            var loggerChild = logger.child({ 'module': 'process' });
            child.bind(terminal_process_1.TerminalProcessOptions).toConstantValue(options);
            child.bind(common_1.ILogger).toConstantValue(loggerChild);
            return child.get(terminal_process_1.TerminalProcess);
        };
    });
});
//# sourceMappingURL=process-backend-module.js.map