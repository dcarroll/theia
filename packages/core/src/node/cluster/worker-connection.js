"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var worker_writer_1 = require("./worker-writer");
var worker_reader_1 = require("./worker-reader");
var vscode_jsonrpc_1 = require("vscode-jsonrpc");
function createWorkerConnection(worker, logger) {
    var messageReader = new worker_reader_1.WorkerMessageReader(worker);
    var messageWriter = new worker_writer_1.WorkerMessageWriter(worker);
    var connection = vscode_jsonrpc_1.createMessageConnection(messageReader, messageWriter, logger);
    connection.onClose(function () { return connection.dispose(); });
    return connection;
}
exports.createWorkerConnection = createWorkerConnection;
//# sourceMappingURL=worker-connection.js.map