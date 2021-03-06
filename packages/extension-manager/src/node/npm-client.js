"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var cp = require("child_process");
var inversify_1 = require("inversify");
var core_1 = require("@theia/core");
var NpmClientOptions = /** @class */ (function () {
    function NpmClientOptions() {
    }
    NpmClientOptions = __decorate([
        inversify_1.injectable()
    ], NpmClientOptions);
    return NpmClientOptions;
}());
exports.NpmClientOptions = NpmClientOptions;
var NpmClient = /** @class */ (function () {
    function NpmClient(options, logger) {
        this.options = options;
        this.logger = logger;
    }
    NpmClient.prototype.execute = function (projectPath, command, args, token) {
        var _this = this;
        core_1.checkCancelled(token);
        return new Promise(function (resolve, reject) {
            var npmProcess = _this.spawn(projectPath, command, args);
            var disposable = token ? token.onCancellationRequested(function () {
                npmProcess.kill('SIGKILL');
                reject(core_1.cancelled());
            }) : core_1.Disposable.NULL;
            npmProcess.stdout.on('data', function (data) {
                return _this.logger.info(data.toString());
            });
            npmProcess.stderr.on('data', function (data) {
                return _this.logger.error(data.toString());
            });
            npmProcess.on('close', function (code, signal) {
                disposable.dispose();
                if (code !== 0) {
                    reject(new Error("Failed " + command + " " + args + ", code: " + code + ", signal: " + signal));
                }
                else {
                    resolve();
                }
            });
            npmProcess.once('error', function (err) {
                disposable.dispose();
                reject(new Error("Failed " + command + " " + args + ", the error: " + err));
            });
        });
    };
    NpmClient.prototype.spawn = function (projectPath, command, args) {
        var npmCommand = this.npmCommand(command);
        return this.doSpawn(projectPath, core_1.cmd.apply(void 0, __spread([this.options.npmClient, npmCommand], args)));
    };
    NpmClient.prototype.npmCommand = function (command) {
        if (this.options.npmClient === 'yarn') {
            return command;
        }
        if (command === 'add') {
            return 'install';
        }
        if (command === 'remove') {
            return 'uninstall';
        }
        return command;
    };
    NpmClient.prototype.doSpawn = function (projectPath, _a) {
        var _b = __read(_a, 2), command = _b[0], args = _b[1];
        (_c = this.logger).info.apply(_c, __spread([projectPath, command], args));
        return cp.spawn(command, args, {
            cwd: projectPath
        });
        var _c;
    };
    NpmClient = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(NpmClientOptions)),
        __param(1, inversify_1.inject(core_1.ILogger)),
        __metadata("design:paramtypes", [NpmClientOptions, Object])
    ], NpmClient);
    return NpmClient;
}());
exports.NpmClient = NpmClient;
//# sourceMappingURL=npm-client.js.map