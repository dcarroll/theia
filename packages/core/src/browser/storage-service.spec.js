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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var storage_service_1 = require("./storage-service");
var chai_1 = require("chai");
var logger_1 = require("../common/logger");
var mock_logger_1 = require("../common/test/mock-logger");
var sinon = require("sinon");
var storageService;
before(function () {
    var testContainer = new inversify_1.Container();
    testContainer.bind(logger_1.ILogger).toDynamicValue(function (ctx) {
        var logger = new mock_logger_1.MockLogger();
        /* Note this is not really needed but here we could just use the
        MockLogger since it does what we need but this is there as a demo of
        sinon for other uses-cases. We can remove this once this technique is
        more generally used. */
        sinon.stub(logger, 'warn').callsFake(function () { });
        return logger;
    });
    testContainer.bind(storage_service_1.StorageService).to(storage_service_1.LocalStorageService).inSingletonScope();
    testContainer.bind(storage_service_1.LocalStorageService).toSelf().inSingletonScope();
    storageService = testContainer.get(storage_service_1.StorageService);
});
describe("storage-service", function () {
    it("stores data", function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    storageService.setData('foo', {
                        test: 'foo'
                    });
                    _a = chai_1.expect;
                    return [4 /*yield*/, storageService.getData('bar', 'bar')];
                case 1:
                    _a.apply(void 0, [_c.sent()]).equals('bar');
                    _b = chai_1.expect;
                    return [4 /*yield*/, storageService.getData('foo', {
                            test: 'bar'
                        })];
                case 2:
                    _b.apply(void 0, [(_c.sent()).test]).equals('foo');
                    return [2 /*return*/];
            }
        });
    }); });
    it("removes data", function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    storageService.setData('foo', {
                        test: 'foo'
                    });
                    _a = chai_1.expect;
                    return [4 /*yield*/, storageService.getData('foo', {
                            test: 'bar'
                        })];
                case 1:
                    _a.apply(void 0, [(_c.sent()).test]).equals('foo');
                    storageService.setData('foo', undefined);
                    _b = chai_1.expect;
                    return [4 /*yield*/, storageService.getData('foo', {
                            test: 'bar'
                        })];
                case 2:
                    _b.apply(void 0, [(_c.sent()).test]).equals('bar');
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=storage-service.spec.js.map