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
var chai = require("chai");
var problem_manager_1 = require("./problem-manager");
var uri_1 = require("@theia/core/lib/common/uri");
var storage_service_1 = require("@theia/core/lib/browser/storage-service");
var logger_1 = require("@theia/core/lib/common/logger");
var mock_logger_1 = require("@theia/core/lib/common/test/mock-logger");
var common_1 = require("@theia/filesystem/lib/common");
var expect = chai.expect;
var manager;
var testContainer;
before(function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                testContainer = new inversify_1.Container();
                testContainer.bind(logger_1.ILogger).to(mock_logger_1.MockLogger);
                testContainer.bind(storage_service_1.StorageService).to(storage_service_1.LocalStorageService).inSingletonScope();
                testContainer.bind(storage_service_1.LocalStorageService).toSelf().inSingletonScope();
                // tslint:disable-next-line:no-any
                testContainer.bind(common_1.FileSystemWatcher).toConstantValue(undefined);
                testContainer.bind(problem_manager_1.ProblemManager).toSelf();
                manager = testContainer.get(problem_manager_1.ProblemManager);
                return [4 /*yield*/, manager.initialized];
            case 1:
                _a.sent();
                manager.setMarkers(new uri_1.default('file:/foo/bar.txt'), 'me', [
                    {
                        range: {
                            start: {
                                line: 1,
                                character: 1
                            },
                            end: {
                                line: 1,
                                character: 1
                            }
                        },
                        message: "Foo"
                    },
                    {
                        range: {
                            start: {
                                line: 1,
                                character: 1
                            },
                            end: {
                                line: 1,
                                character: 1
                            }
                        },
                        message: "Bar"
                    }
                ]);
                manager.setMarkers(new uri_1.default('file:/foo/foo.txt'), 'me', [
                    {
                        range: {
                            start: {
                                line: 1,
                                character: 1
                            },
                            end: {
                                line: 1,
                                character: 1
                            }
                        },
                        message: "Foo"
                    },
                    {
                        range: {
                            start: {
                                line: 1,
                                character: 1
                            },
                            end: {
                                line: 1,
                                character: 2
                            }
                        },
                        message: "Bar"
                    }
                ]);
                return [2 /*return*/];
        }
    });
}); });
describe('problem-manager', function () {
    it('replaces markers', function () { return __awaiter(_this, void 0, void 0, function () {
        var events, previous;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    events = 0;
                    manager.onDidChangeMarkers(function () {
                        events++;
                    });
                    expect(events).equal(0);
                    return [4 /*yield*/, manager.setMarkers(new uri_1.default('file:/foo/bar.txt'), 'me', [
                            {
                                range: {
                                    start: {
                                        line: 2,
                                        character: 3
                                    },
                                    end: {
                                        line: 2,
                                        character: 1
                                    }
                                },
                                message: "Foo"
                            },
                            {
                                range: {
                                    start: {
                                        line: 1,
                                        character: 1
                                    },
                                    end: {
                                        line: 1,
                                        character: 1
                                    }
                                },
                                message: "Bar"
                            }
                        ])];
                case 1:
                    previous = _a.sent();
                    expect(previous.length).equal(2);
                    expect(events).equal(1);
                    expect(manager.findMarkers().length).equal(4);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should find markers with filter', function () {
        expect(manager.findMarkers({
            owner: 'me'
        }).length).equal(4);
        expect(manager.findMarkers({
            owner: 'you'
        }).length).equal(0);
        expect(manager.findMarkers({
            uri: new uri_1.default('file:/foo/foo.txt'),
            owner: 'me'
        }).length).equal(2);
        expect(manager.findMarkers({
            dataFilter: function (data) { return data.range.end.character > 1; }
        }).length).equal(1);
    });
    it('should persist markers', function () { return __awaiter(_this, void 0, void 0, function () {
        var newManager;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newManager = testContainer.get(problem_manager_1.ProblemManager);
                    return [4 /*yield*/, newManager.initialized];
                case 1:
                    _a.sent();
                    expect(newManager.findMarkers().length).eq(4);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=problem-manager.spec.js.map