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
var quick_open_model_1 = require("@theia/core/lib/browser/quick-open/quick-open-model");
var quick_open_service_1 = require("@theia/core/lib/browser/quick-open/quick-open-service");
var common_1 = require("../common");
var model_1 = require("../common/model");
var git_repository_provider_1 = require("./git-repository-provider");
/**
 * Service delegating into the `Quick Open Service`, so that the Git commands can be further refined.
 * For instance, the `remote` can be specified for `pull`, `push`, and `fetch`. And the branch can be
 * specified for `git merge`.
 */
var GitQuickOpenService = /** @class */ (function () {
    function GitQuickOpenService(git, repositoryProvider, quickOpenService) {
        this.git = git;
        this.repositoryProvider = repositoryProvider;
        this.quickOpenService = quickOpenService;
    }
    GitQuickOpenService.prototype.fetch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var repository, remotes, execute_1, items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repository = this.getRepository();
                        if (!repository) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getRemotes()];
                    case 1:
                        remotes = _a.sent();
                        execute_1 = function (item) { return _this.git.fetch(repository, { remote: item.getLabel() }); };
                        items = remotes.map(function (remote) { return new GitQuickOpenItem(remote, execute_1); });
                        this.quickOpenService.open(this.getModel(items), this.getOptions('Pick a remote to fetch from:'));
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    GitQuickOpenService.prototype.push = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var repository, _a, remotes, currentBranch, execute_2, items, branchName;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        repository = this.getRepository();
                        if (!repository) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.all([this.getRemotes(), this.getCurrentBranch()])];
                    case 1:
                        _a = __read.apply(void 0, [_b.sent(), 2]), remotes = _a[0], currentBranch = _a[1];
                        execute_2 = function (item) { return _this.git.push(repository, { remote: item.getLabel() }); };
                        items = remotes.map(function (remote) { return new GitQuickOpenItem(remote, execute_2); });
                        branchName = currentBranch ? "'" + currentBranch.name + "' " : '';
                        this.quickOpenService.open(this.getModel(items), this.getOptions("Pick a remote to push the currently active branch " + branchName + "to:"));
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    GitQuickOpenService.prototype.pull = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var repository, remotes, defaultRemote_1, executeRemote_1, remoteItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repository = this.getRepository();
                        if (!repository) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getRemotes()];
                    case 1:
                        remotes = _a.sent();
                        defaultRemote_1 = remotes[0];
                        executeRemote_1 = function (remoteItem) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            var branches, executeBranch_1, toLabel_1, branchItems;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(remoteItem.ref === defaultRemote_1)) return [3 /*break*/, 1];
                                        this.git.pull(repository, { remote: remoteItem.getLabel() });
                                        return [3 /*break*/, 3];
                                    case 1: return [4 /*yield*/, this.getBranches()];
                                    case 2:
                                        branches = _a.sent();
                                        executeBranch_1 = function (branchItem) { return _this.git.pull(repository, { remote: remoteItem.ref, branch: branchItem.ref.nameWithoutRemote }); };
                                        toLabel_1 = function (branchItem) { return branchItem.ref.name; };
                                        branchItems = branches
                                            .filter(function (branch) { return branch.type === model_1.BranchType.Remote; })
                                            .filter(function (branch) { return (branch.name || '').startsWith(remoteItem.ref + "/"); })
                                            .map(function (branch) { return new GitQuickOpenItem(branch, executeBranch_1, toLabel_1); });
                                        this.quickOpenService.open(this.getModel(branchItems), this.getOptions('Select the branch to pull the changes from:'));
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); };
                        remoteItems = remotes.map(function (remote) { return new GitQuickOpenItem(remote, executeRemote_1); });
                        this.quickOpenService.open(this.getModel(remoteItems), this.getOptions('Pick a remote to pull the branch from:'));
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    GitQuickOpenService.prototype.merge = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var repository, _a, branches, currentBranch, execute_3, toLabel_2, items, branchName;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        repository = this.getRepository();
                        if (!repository) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.all([this.getBranches(), this.getCurrentBranch()])];
                    case 1:
                        _a = __read.apply(void 0, [_b.sent(), 2]), branches = _a[0], currentBranch = _a[1];
                        execute_3 = function (item) { return _this.git.merge(repository, { branch: item.getLabel() }); };
                        toLabel_2 = function (item) { return item.ref.name; };
                        items = branches.map(function (branch) { return new GitQuickOpenItem(branch, execute_3, toLabel_2); });
                        branchName = currentBranch ? "'" + currentBranch.name + "' " : '';
                        this.quickOpenService.open(this.getModel(items), this.getOptions("Pick a branch to merge into the currently active " + branchName + "branch:"));
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    GitQuickOpenService.prototype.getOptions = function (placeholder) {
        return quick_open_service_1.QuickOpenOptions.resolve({
            placeholder: placeholder,
            fuzzyMatchLabel: true,
            fuzzySort: false
        });
    };
    GitQuickOpenService.prototype.getModel = function (items) {
        return {
            onType: function (lookFor, acceptor) {
                return acceptor(items);
            }
        };
    };
    GitQuickOpenService.prototype.getRepository = function () {
        var selectedRepository = this.repositoryProvider.selectedRepository;
        if (selectedRepository) {
            return selectedRepository;
        }
    };
    GitQuickOpenService.prototype.getRemotes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var repository;
            return __generator(this, function (_a) {
                repository = this.getRepository();
                return [2 /*return*/, repository ? this.git.remote(repository) : []];
            });
        });
    };
    GitQuickOpenService.prototype.getBranches = function () {
        return __awaiter(this, void 0, void 0, function () {
            var repository, _a, local, remote;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        repository = this.getRepository();
                        if (!repository) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, Promise.all([
                                this.git.branch(repository, { type: 'local' }),
                                this.git.branch(repository, { type: 'remote' })
                            ])];
                    case 1:
                        _a = __read.apply(void 0, [_b.sent(), 2]), local = _a[0], remote = _a[1];
                        return [2 /*return*/, __spread(local, remote)];
                }
            });
        });
    };
    GitQuickOpenService.prototype.getCurrentBranch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var repository, branch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repository = this.getRepository();
                        if (!repository) {
                            return [2 /*return*/, undefined];
                        }
                        return [4 /*yield*/, this.git.branch(repository, { type: 'current' })];
                    case 1:
                        branch = _a.sent();
                        if (branch && !Array.isArray(branch)) {
                            return [2 /*return*/, branch];
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    GitQuickOpenService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_1.Git)),
        __param(1, inversify_1.inject(git_repository_provider_1.GitRepositoryProvider)),
        __param(2, inversify_1.inject(quick_open_service_1.QuickOpenService)),
        __metadata("design:paramtypes", [Object, git_repository_provider_1.GitRepositoryProvider,
            quick_open_service_1.QuickOpenService])
    ], GitQuickOpenService);
    return GitQuickOpenService;
}());
exports.GitQuickOpenService = GitQuickOpenService;
/**
 * Git specific quick open item that wraps a branch a remote name or something else.
 */
var GitQuickOpenItem = /** @class */ (function (_super) {
    __extends(GitQuickOpenItem, _super);
    function GitQuickOpenItem(ref, execute, toLabel) {
        if (toLabel === void 0) { toLabel = function (item) { return "" + ref; }; }
        var _this = _super.call(this) || this;
        _this.ref = ref;
        _this.execute = execute;
        _this.toLabel = toLabel;
        return _this;
    }
    GitQuickOpenItem.prototype.run = function (mode) {
        if (mode !== quick_open_model_1.QuickOpenMode.OPEN) {
            return false;
        }
        this.execute(this);
        return true;
    };
    GitQuickOpenItem.prototype.getLabel = function () {
        return this.toLabel(this);
    };
    return GitQuickOpenItem;
}(quick_open_model_1.QuickOpenItem));
//# sourceMappingURL=git-quick-open-service.js.map