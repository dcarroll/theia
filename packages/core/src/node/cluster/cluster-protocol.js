"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var messaging_1 = require("../../common/messaging");
var logger_1 = require("../messaging/logger");
var worker_connection_1 = require("./worker-connection");
function createWorkerProxy(worker, target) {
    var logger = new logger_1.ConsoleLogger();
    var connection = worker_connection_1.createWorkerConnection(worker, logger);
    var factory = new messaging_1.JsonRpcProxyFactory(target);
    factory.listen(connection);
    return factory.createProxy();
}
exports.createWorkerProxy = createWorkerProxy;
function createRemoteServer(worker, target) {
    return createWorkerProxy(worker, target);
}
exports.createRemoteServer = createRemoteServer;
function createRemoteMaster(worker, target) {
    return createWorkerProxy(worker, target);
}
exports.createRemoteMaster = createRemoteMaster;
//# sourceMappingURL=cluster-protocol.js.map