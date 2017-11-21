"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
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
// tslint:disable:no-console
var path = require("path");
var cluster = require("cluster");
var master_process_1 = require("./cluster/master-process");
process.on('unhandledRejection', function (reason, promise) {
    throw reason;
});
describe('master-process', function () {
    function prepareTestWorker(job) {
        var testSettings = {
            exec: path.resolve(__dirname, '../../lib/node/test/cluster-test-worker.js'),
            execArgv: [],
            args: [job],
            stdio: ['ipc', 1, 2]
        };
        cluster.setupMaster(testSettings);
    }
    var originalSettings;
    beforeEach(function () { return originalSettings = cluster.settings; });
    afterEach(function () { return cluster.setupMaster(originalSettings); });
    /**
     * Tests restarting of workers by the master process:
     * 1. the master process starts the server worker with `restart` job
     * 2. Testing failed restart
     *   2.1 the first worker sends `restart` request to the master
     *   2.2 the master tries to start the second worker with `timeout next worker` job
     *   2.3 the second worker fails because such job does not exist
     *   2.4 the master throws the error to the first worker
     *   2.5 the first worker checks that the error is received
     * 3. Testing successful restart
     *   3.1 the first worker sends `restart` request again to the master
     *   3.2 the master tries to start the third worker with `restarted` job
     *   3.3 the third worker is successfully initialized and then exits
     *   3.4 the master worker returns to the first worker
     *   3.5 the first worker exits
     */
    it('start', function () {
        return __awaiter(this, void 0, void 0, function () {
            var master, restartWorker, restartedWorker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(10000);
                        master = new master_process_1.MasterProcess();
                        prepareTestWorker('restart');
                        restartWorker = master.start();
                        prepareTestWorker('timeout next worker');
                        return [4 /*yield*/, master.restarting];
                    case 1:
                        _a.sent();
                        prepareTestWorker('restarted');
                        return [4 /*yield*/, master.restarted];
                    case 2:
                        restartedWorker = _a.sent();
                        return [4 /*yield*/, restartWorker.exit];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, restartedWorker.exit];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
});
//# sourceMappingURL=cluster.spec.js.map