"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
// tslint:disable:no-console
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
Object.defineProperty(exports, "__esModule", { value: true });
var cluster = require("cluster");
var cluster_protocol_1 = require("./cluster-protocol");
var ServerWorker = /** @class */ (function () {
    function ServerWorker(restart) {
        var _this = this;
        var onDidInitialize = function () { };
        this.initialized = new Promise(function (resolve) { return (onDidInitialize = resolve); });
        console.log("Starting server worker...");
        this.worker = cluster.fork();
        this.server = cluster_protocol_1.createRemoteServer(this.worker, { onDidInitialize: onDidInitialize, restart: restart });
        this.online = new Promise(function (resolve) { return _this.worker.once("online", resolve); });
        this.failed = new Promise(function (resolve) { return _this.worker.once("error", resolve); });
        this.listening = new Promise(function (resolve) {
            return _this.worker.once("listening", resolve);
        });
        this.disconnect = new Promise(function (resolve) {
            return _this.worker.once("disconnect", resolve);
        });
        this.exit = new Promise(function (resolve) { return _this.worker.once("exit", resolve); });
        var workerIdentifier = "[ID: " + this.worker.id + " | PID: " + this.worker
            .process.pid + "]";
        this.online.then(function () {
            return console.log("Server worker has been started. " + workerIdentifier);
        });
        this.failed.then(function (error) {
            return console.error("Server worker failed. " + workerIdentifier, error);
        });
        this.initialized.then(function () {
            console.log("Server worker is ready to accept messages. " + workerIdentifier);
        });
        this.disconnect.then(function () {
            return console.log("Server worker has been disconnected. " + workerIdentifier);
        });
        this.exit.then(function () {
            return console.log("Server worker has been stopped. " + workerIdentifier);
        });
    }
    ServerWorker.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.worker.isConnected) return [3 /*break*/, 2];
                        this.worker.disconnect();
                        return [4 /*yield*/, this.disconnect];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!!this.worker.isDead) return [3 /*break*/, 4];
                        this.worker.kill();
                        return [4 /*yield*/, this.exit];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ServerWorker;
}());
exports.ServerWorker = ServerWorker;
//# sourceMappingURL=server-worker.js.map