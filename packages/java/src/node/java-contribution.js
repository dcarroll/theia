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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
Object.defineProperty(exports, "__esModule", { value: true });
var os = require("os");
var path = require("path");
var glob = require("glob");
var inversify_1 = require("inversify");
var node_1 = require("@theia/core/lib/node");
var node_2 = require("@theia/languages/lib/node");
var common_1 = require("../common");
exports.configurations = new Map();
exports.configurations.set('darwin', 'config_mac');
exports.configurations.set('win32', 'config_win');
exports.configurations.set('linux', 'config_linux');
var JavaContribution = /** @class */ (function (_super) {
    __extends(JavaContribution, _super);
    function JavaContribution() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = common_1.JAVA_LANGUAGE_ID;
        _this.name = common_1.JAVA_LANGUAGE_NAME;
        return _this;
    }
    JavaContribution.prototype.start = function (clientConnection) {
        var _this = this;
        var serverPath = path.resolve(__dirname, 'server');
        var jarPaths = glob.sync('**/plugins/org.eclipse.equinox.launcher_*.jar', { cwd: serverPath });
        if (jarPaths.length === 0) {
            throw new Error('The java server launcher is not found.');
        }
        var jarPath = path.resolve(serverPath, jarPaths[0]);
        var workspacePath = path.resolve(os.tmpdir(), '_ws_' + new Date().getTime());
        var configuration = exports.configurations.get(process.platform);
        var configurationPath = path.resolve(serverPath, configuration);
        var command = 'java';
        var args = [
            '-Declipse.application=org.eclipse.jdt.ls.core.id1',
            '-Dosgi.bundles.defaultStartLevel=4',
            '-Declipse.product=org.eclipse.jdt.ls.core.product'
        ];
        if (node_1.DEBUG_MODE) {
            args.push('-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=1044', '-Dlog.protocol=true', '-Dlog.level=ALL');
        }
        args.push('-jar', jarPath, '-configuration', configurationPath, '-data', workspacePath);
        Promise.all([
            this.startSocketServer(), this.startSocketServer()
        ]).then(function (servers) {
            var _a = __read(servers, 2), inServer = _a[0], outServer = _a[1];
            var inSocket = _this.accept(inServer);
            var outSocket = _this.accept(outServer);
            _this.logInfo('logs at ' + path.resolve(workspacePath, '.metadata', '.log'));
            var env = Object.create(process.env);
            env.STDIN_HOST = inServer.address().address;
            env.STDIN_PORT = inServer.address().port;
            env.STDOUT_HOST = outServer.address().address;
            env.STDOUT_PORT = outServer.address().port;
            _this.createProcessSocketConnection(inSocket, outSocket, command, args, {
                env: env
            }).then(function (serverConnection) { return _this.forward(clientConnection, serverConnection); });
        });
    };
    JavaContribution = __decorate([
        inversify_1.injectable()
    ], JavaContribution);
    return JavaContribution;
}(node_2.BaseLanguageServerContribution));
exports.JavaContribution = JavaContribution;
//# sourceMappingURL=java-contribution.js.map