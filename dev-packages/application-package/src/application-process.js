"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs-extra");
var cp = require("child_process");
var ApplicationProcess = /** @class */ (function () {
    function ApplicationProcess(pck, binProjectPath) {
        this.pck = pck;
        this.binProjectPath = binProjectPath;
        this.defaultOptions = {
            cwd: this.pck.projectPath,
            env: process.env
        };
    }
    ApplicationProcess.prototype.spawn = function (command, args, options) {
        return cp.spawn(command, args, Object.assign({}, this.defaultOptions, options));
    };
    ApplicationProcess.prototype.fork = function (modulePath, args, options) {
        return cp.fork(modulePath, args, Object.assign({}, this.defaultOptions, options));
    };
    ApplicationProcess.prototype.canRun = function (command) {
        return fs.existsSync(this.resolveBin(command));
    };
    ApplicationProcess.prototype.run = function (command, args, options) {
        var commandProcess = this.spawnBin(command, args, options);
        return this.promisify(command, commandProcess);
    };
    ApplicationProcess.prototype.spawnBin = function (command, args, options) {
        var binPath = this.resolveBin(command);
        return this.spawn(binPath, args, options);
    };
    ApplicationProcess.prototype.resolveBin = function (command) {
        var commandPath = path.resolve(this.binProjectPath, 'node_modules', '.bin', command);
        return process.platform === 'win32' ? commandPath + '.cmd' : commandPath;
    };
    ApplicationProcess.prototype.bunyan = function (childProcess) {
        var bunyanProcess = this.spawnBin('bunyan', []);
        childProcess.stdout.pipe(bunyanProcess.stdin);
        childProcess.stderr.pipe(bunyanProcess.stdin);
        return this.promisify('bunyan', bunyanProcess);
    };
    ApplicationProcess.prototype.promisify = function (command, p) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            p.stdout.on('data', function (data) { return _this.pck.log(data.toString()); });
            p.stderr.on('data', function (data) { return _this.pck.error(data.toString()); });
            p.on('error', reject);
            p.on('close', function (code) {
                if (code === 0) {
                    resolve();
                }
                else {
                    reject(new Error(command + ' failed with the exit code ' + code));
                }
            });
        });
    };
    return ApplicationProcess;
}());
exports.ApplicationProcess = ApplicationProcess;
//# sourceMappingURL=application-process.js.map