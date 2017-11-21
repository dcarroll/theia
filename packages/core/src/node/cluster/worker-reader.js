"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("vscode-ws-jsonrpc/lib");
var WorkerMessageReader = /** @class */ (function (_super) {
    __extends(WorkerMessageReader, _super);
    function WorkerMessageReader(worker) {
        var _this = _super.call(this) || this;
        _this.worker = worker;
        return _this;
    }
    WorkerMessageReader.prototype.listen = function (callback) {
        var _this = this;
        this.worker.on('exit', function (code, signal) {
            if (code !== 0) {
                var error = {
                    name: '' + code,
                    message: "Worker exited with '" + code + "' error code and '" + signal + "' signal"
                };
                _this.fireError(error);
            }
            _this.fireClose();
        });
        this.worker.on('error', function (e) {
            return _this.fireError(e);
        });
        this.worker.on('message', function (message) {
            return _this.readMessage(message, callback);
        });
    };
    return WorkerMessageReader;
}(lib_1.AbstractStreamMessageReader));
exports.WorkerMessageReader = WorkerMessageReader;
//# sourceMappingURL=worker-reader.js.map