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
var WorkerMessageWriter = /** @class */ (function (_super) {
    __extends(WorkerMessageWriter, _super);
    function WorkerMessageWriter(worker) {
        var _this = _super.call(this) || this;
        _this.worker = worker;
        return _this;
    }
    WorkerMessageWriter.prototype.send = function (content) {
        try {
            this.worker.send(content);
        }
        catch (e) {
            this.fireError(e);
        }
    };
    return WorkerMessageWriter;
}(lib_1.AbstractStreamMessageWriter));
exports.WorkerMessageWriter = WorkerMessageWriter;
//# sourceMappingURL=worker-writer.js.map