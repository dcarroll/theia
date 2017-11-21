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
var os = require("os");
var logger_1 = require("@theia/core/lib/common/logger");
var node_1 = require("@theia/process/lib/node");
var common_1 = require("@theia/core/lib/common");
var uri_1 = require("@theia/core/lib/common/uri");
var file_uri_1 = require("@theia/core/lib/node/file-uri");
exports.ShellProcessFactory = Symbol("ShellProcessFactory");
exports.ShellProcessOptions = Symbol("ShellProcessOptions");
function getRootPath(rootURI) {
    if (rootURI) {
        var uri = new uri_1.default(rootURI);
        return file_uri_1.FileUri.fsPath(uri);
    }
    else {
        return os.homedir();
    }
}
var ShellProcess = /** @class */ (function (_super) {
    __extends(ShellProcess, _super);
    function ShellProcess(options, processManager, logger) {
        return _super.call(this, {
            command: options.shell || ShellProcess_1.getShellExecutablePath(),
            args: [],
            options: {
                name: 'xterm-color',
                cols: options.cols || ShellProcess_1.defaultCols,
                rows: options.rows || ShellProcess_1.defaultRows,
                cwd: getRootPath(options.rootURI),
                env: process.env
            }
        }, processManager, logger) || this;
    }
    ShellProcess_1 = ShellProcess;
    ShellProcess.getShellExecutablePath = function () {
        if (common_1.isWindows) {
            return 'cmd.exe';
        }
        else {
            return process.env.SHELL;
        }
    };
    ShellProcess.defaultCols = 80;
    ShellProcess.defaultRows = 24;
    ShellProcess = ShellProcess_1 = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(exports.ShellProcessOptions)),
        __param(1, inversify_1.inject(node_1.ProcessManager)),
        __param(2, inversify_1.inject(logger_1.ILogger)), __param(2, inversify_1.named("terminal")),
        __metadata("design:paramtypes", [Object, node_1.ProcessManager, Object])
    ], ShellProcess);
    return ShellProcess;
    var ShellProcess_1;
}(node_1.TerminalProcess));
exports.ShellProcess = ShellProcess;
//# sourceMappingURL=shell-process.js.map