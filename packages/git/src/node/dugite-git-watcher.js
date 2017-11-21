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
var inversify_1 = require("inversify");
var git_1 = require("../common/git");
var model_1 = require("../common/model");
var git_preferences_1 = require("../common/git-preferences");
var filesystem_watcher_protocol_1 = require("@theia/filesystem/lib/common/filesystem-watcher-protocol");
var DugiteGitWatcherServer = /** @class */ (function () {
    function DugiteGitWatcherServer(git, preferences, filesystemWatcher) {
        this.git = git;
        this.preferences = preferences;
        this.filesystemWatcher = filesystemWatcher;
        this.watcherSequence = 1;
        this.watchers = new Map();
        this.status = new Map();
    }
    DugiteGitWatcherServer.prototype.watchGitChanges = function (repository) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var watcher, interval, timer;
            return __generator(this, function (_a) {
                watcher = this.watcherSequence++;
                interval = this.preferences['git.pollInterval'];
                timer = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                    var status_1, oldStatus, event_1, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 5]);
                                return [4 /*yield*/, this.git.status(repository)];
                            case 1:
                                status_1 = _a.sent();
                                oldStatus = this.status.get(repository);
                                if (this.client && !model_1.WorkingDirectoryStatus.equals(status_1, oldStatus)) {
                                    this.status.set(repository, status_1);
                                    event_1 = {
                                        source: repository,
                                        status: status_1,
                                        oldStatus: oldStatus
                                    };
                                    this.client.onGitChanged(event_1);
                                }
                                return [3 /*break*/, 5];
                            case 2:
                                error_1 = _a.sent();
                                if (!(error_1.message === 'Unable to find path to repository on disk.')) return [3 /*break*/, 4];
                                return [4 /*yield*/, this.unwatchGitChanges(watcher)];
                            case 3:
                                _a.sent();
                                _a.label = 4;
                            case 4: return [3 /*break*/, 5];
                            case 5: return [2 /*return*/];
                        }
                    });
                }); }, interval);
                this.watchers.set(watcher, timer);
                return [2 /*return*/, watcher];
            });
        });
    };
    DugiteGitWatcherServer.prototype.unwatchGitChanges = function (watcher) {
        return __awaiter(this, void 0, void 0, function () {
            var timer;
            return __generator(this, function (_a) {
                timer = this.watchers.get(watcher);
                if (!timer) {
                    throw new Error("No Git watchers were registered with ID: " + watcher + ".");
                }
                clearInterval(timer);
                this.watchers.delete(watcher);
                return [2 /*return*/];
            });
        });
    };
    DugiteGitWatcherServer.prototype.dispose = function () {
        __spread(this.watchers.values()).forEach(clearInterval);
    };
    DugiteGitWatcherServer.prototype.setClient = function (client) {
        this.client = client;
    };
    DugiteGitWatcherServer = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(git_1.Git)),
        __param(1, inversify_1.inject(git_preferences_1.GitPreferences)),
        __param(2, inversify_1.inject(filesystem_watcher_protocol_1.FileSystemWatcherServer)),
        __metadata("design:paramtypes", [Object, Object, Object])
    ], DugiteGitWatcherServer);
    return DugiteGitWatcherServer;
}());
exports.DugiteGitWatcherServer = DugiteGitWatcherServer;
//# sourceMappingURL=dugite-git-watcher.js.map