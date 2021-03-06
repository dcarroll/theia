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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var cluster = require("cluster");
var inversify_1 = require("inversify");
var cluster_protocol_1 = require("./cluster-protocol");
exports.RemoteMasterProcessFactory = Symbol('RemoteMasterProcessFactory');
exports.stubRemoteMasterProcessFactory = function (serverProcess) {
    var ready = false;
    return {
        onDidInitialize: function () {
            ready = true;
        },
        restart: function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!ready) {
                    throw new Error('onDidInitialize has not been called yet');
                }
                return [2 /*return*/];
            });
        }); }
    };
};
exports.clusterRemoteMasterProcessFactory = function (serverProcess) {
    return cluster.isWorker ? cluster_protocol_1.createRemoteMaster(cluster.worker, serverProcess) : exports.stubRemoteMasterProcessFactory(serverProcess);
};
var ServerProcess = /** @class */ (function () {
    function ServerProcess(masterFactory) {
        this.masterFactory = masterFactory;
        this.sockets = new Set();
        this.master = this.masterFactory({});
        this.master.onDidInitialize();
    }
    ServerProcess.prototype.onStart = function (server) {
        var _this = this;
        this.server = server;
        server.on('connection', function (socket) {
            _this.sockets.add(socket);
            socket.on('close', function () { return _this.sockets.delete(socket); });
        });
    };
    ServerProcess.prototype.restart = function () {
        return this.master.restart();
    };
    ServerProcess.prototype.kill = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!cluster.isWorker) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.close()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.disconnect()];
                    case 2:
                        _a.sent();
                        cluster.worker.kill();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServerProcess.prototype.close = function () {
        var _this = this;
        var server = this.server;
        if (server) {
            return new Promise(function (resolve) {
                server.close(function () {
                    try {
                        for (var _a = __values(_this.sockets), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var socket = _b.value;
                            socket.destroy();
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    resolve();
                    var e_1, _c;
                });
            });
        }
        return Promise.resolve();
    };
    ServerProcess.prototype.disconnect = function () {
        var worker = cluster.worker;
        if (worker.isConnected) {
            var disconnect = new Promise(function (resolve) { return worker.once('disconnect', resolve); });
            worker.disconnect();
            return disconnect;
        }
        return Promise.resolve();
    };
    ServerProcess = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(exports.RemoteMasterProcessFactory)),
        __metadata("design:paramtypes", [Function])
    ], ServerProcess);
    return ServerProcess;
}());
exports.ServerProcess = ServerProcess;
//# sourceMappingURL=server-process.js.map