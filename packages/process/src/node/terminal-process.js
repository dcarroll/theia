"use strict";
/*
 * Copyright (C) 2017 Ericsson and others.
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var stream = require("stream");
var common_1 = require("@theia/core/lib/common");
var process_1 = require("./process");
var process_manager_1 = require("./process-manager");
var pty = require("node-pty");
exports.TerminalProcessOptions = Symbol("TerminalProcessOptions");
exports.TerminalProcessFactory = Symbol("TerminalProcessFactory");
/* Use this instead of the node-pty stream, since the node-pty stream is already resumed.  */
var TerminalReadableStream = /** @class */ (function (_super) {
    __extends(TerminalReadableStream, _super);
    function TerminalReadableStream(terminal, opts) {
        var _this = _super.call(this, opts) || this;
        _this.terminal = terminal;
        _this.terminal.on('data', function (data) {
            _this.push(data);
        });
        return _this;
    }
    /* This needs to be implemented as per node's API doc, even if it's empty.  */
    TerminalReadableStream.prototype._read = function (size) {
    };
    return TerminalReadableStream;
}(stream.Readable));
exports.TerminalReadableStream = TerminalReadableStream;
var TerminalProcess = /** @class */ (function (_super) {
    __extends(TerminalProcess, _super);
    function TerminalProcess(options, processManager, logger) {
        var _this = _super.call(this, processManager, logger) || this;
        _this.type = 'Terminal';
        _this.process = undefined;
        _this.logger.debug("Starting terminal process: " + options.command + ","
            + (" with args : " + options.args + ", ")
            + (" options " + JSON.stringify(options.options) + " "));
        _this.terminal = pty.spawn(options.command, options.args, options.options);
        _this.terminal.on('exit', _this.emitOnExit.bind(_this));
        _this.output = new TerminalReadableStream(_this.terminal);
        return _this;
    }
    Object.defineProperty(TerminalProcess.prototype, "pid", {
        get: function () {
            return this.terminal.pid;
        },
        enumerable: true,
        configurable: true
    });
    TerminalProcess.prototype.kill = function (signal) {
        if (this.killed === false) {
            this.terminal.kill(signal);
        }
    };
    TerminalProcess.prototype.resize = function (cols, rows) {
        this.terminal.resize(cols, rows);
    };
    TerminalProcess.prototype.write = function (data) {
        this.terminal.write(data);
    };
    TerminalProcess = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(exports.TerminalProcessOptions)),
        __param(1, inversify_1.inject(process_manager_1.ProcessManager)),
        __param(2, inversify_1.inject(common_1.ILogger)),
        __metadata("design:paramtypes", [Object, process_manager_1.ProcessManager, Object])
    ], TerminalProcess);
    return TerminalProcess;
}(process_1.Process));
exports.TerminalProcess = TerminalProcess;
//# sourceMappingURL=terminal-process.js.map