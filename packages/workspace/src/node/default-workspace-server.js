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
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs-extra");
var os = require("os");
var inversify_1 = require("inversify");
var node_1 = require("@theia/core/lib/node");
var promise_util_1 = require("@theia/core/lib/common/promise-util");
var WorkspaceCliContribution = /** @class */ (function () {
    function WorkspaceCliContribution() {
        this.workspaceRoot = new promise_util_1.Deferred();
    }
    WorkspaceCliContribution.prototype.configure = function (conf) {
        conf.usage("$0 [workspace-directory] [options]");
        conf.option('root-dir', {
            description: 'DEPRECATED: Sets the workspace directory.',
        });
    };
    WorkspaceCliContribution.prototype.setArguments = function (args) {
        var wsPath = args._[2];
        if (!wsPath) {
            wsPath = args['root-dir'];
            if (!wsPath) {
                this.workspaceRoot.resolve();
                return;
            }
        }
        if (!path.isAbsolute(wsPath)) {
            var cwd = process.cwd();
            wsPath = path.join(cwd, wsPath);
        }
        this.workspaceRoot.resolve(wsPath);
    };
    WorkspaceCliContribution = __decorate([
        inversify_1.injectable()
    ], WorkspaceCliContribution);
    return WorkspaceCliContribution;
}());
exports.WorkspaceCliContribution = WorkspaceCliContribution;
var DefaultWorkspaceServer = /** @class */ (function () {
    function DefaultWorkspaceServer(cliParams) {
        var _this = this;
        this.cliParams = cliParams;
        this.root = this.getRootURIFromCli();
        this.root.then(function (root) { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!root) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.readFromUserHome()];
                    case 1:
                        data = _a.sent();
                        if (data && data.recentRoots) {
                            this.root = Promise.resolve(data.recentRoots[0]);
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    }
    DefaultWorkspaceServer.prototype.getRoot = function () {
        return this.root;
    };
    DefaultWorkspaceServer.prototype.setRoot = function (uri) {
        this.root = Promise.resolve(uri);
        this.writeToUserHome({
            recentRoots: [uri]
        });
        return Promise.resolve();
    };
    DefaultWorkspaceServer.prototype.getRootURIFromCli = function () {
        return __awaiter(this, void 0, void 0, function () {
            var arg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cliParams.workspaceRoot.promise];
                    case 1:
                        arg = _a.sent();
                        return [2 /*return*/, arg !== undefined ? node_1.FileUri.create(arg).toString() : undefined];
                }
            });
        });
    };
    /**
     * Writes the given uri as the most recently used workspace root to the user's home directory.
     * @param uri most recently used uri
     */
    DefaultWorkspaceServer.prototype.writeToUserHome = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var file;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        file = this.getUserStoragePath();
                        return [4 /*yield*/, fs.pathExists(file)];
                    case 1:
                        if (!!(_a.sent())) return [3 /*break*/, 3];
                        return [4 /*yield*/, fs.mkdirs(path.resolve(file, '..'))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, fs.writeJson(file, data)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Reads the most recently used workspace root from the user's home directory.
     */
    DefaultWorkspaceServer.prototype.readFromUserHome = function () {
        return __awaiter(this, void 0, void 0, function () {
            var file, config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        file = this.getUserStoragePath();
                        return [4 /*yield*/, fs.pathExists(file)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        return [4 /*yield*/, fs.readJson(file)];
                    case 2:
                        config = _a.sent();
                        if (WorkspaceData.is(config)) {
                            return [2 /*return*/, config];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, undefined];
                }
            });
        });
    };
    DefaultWorkspaceServer.prototype.getUserStoragePath = function () {
        return path.resolve(os.homedir(), '.theia', 'recentworkspace.json');
    };
    DefaultWorkspaceServer = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(WorkspaceCliContribution)),
        __metadata("design:paramtypes", [WorkspaceCliContribution])
    ], DefaultWorkspaceServer);
    return DefaultWorkspaceServer;
}());
exports.DefaultWorkspaceServer = DefaultWorkspaceServer;
var WorkspaceData;
(function (WorkspaceData) {
    // tslint:disable-next-line:no-any
    function is(data) {
        return data.recentRoots !== undefined;
    }
    WorkspaceData.is = is;
})(WorkspaceData || (WorkspaceData = {}));
//# sourceMappingURL=default-workspace-server.js.map