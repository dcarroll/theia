"use strict";
/*
* Copyright (C) 2017 TypeFox and others.
*
* Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
* You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var fs = require("fs");
var Path = require("path");
var git_1 = require("../common/git");
var git_2 = require("dugite-extra/lib/core/git");
var inversify_1 = require("inversify");
var push_1 = require("dugite-extra/lib/command/push");
var pull_1 = require("dugite-extra/lib/command/pull");
var clone_1 = require("dugite-extra/lib/command/clone");
var fetch_1 = require("dugite-extra/lib/command/fetch");
var merge_1 = require("dugite-extra/lib/command/merge");
var file_uri_1 = require("@theia/core/lib/node/file-uri");
var status_1 = require("dugite-extra/lib/command/status");
var git_repository_locator_1 = require("./git-repository-locator");
var commit_1 = require("dugite-extra/lib/command/commit");
var stage_1 = require("dugite-extra/lib/command/stage");
var reset_1 = require("dugite-extra/lib/command/reset");
var show_1 = require("dugite-extra/lib/command/show");
var checkout_1 = require("dugite-extra/lib/command/checkout");
var model_1 = require("../common/model");
var branch_1 = require("dugite-extra/lib/command/branch");
var status_2 = require("dugite-extra/lib/model/status");
/**
 * `dugite-extra` based Git implementation.
 */
var DugiteGit = /** @class */ (function () {
    function DugiteGit() {
    }
    DugiteGit.prototype.clone = function (remoteUrl, options) {
        return __awaiter(this, void 0, void 0, function () {
            var localUri;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        localUri = options.localUri;
                        return [4 /*yield*/, clone_1.clone(remoteUrl, this.getFsPath(localUri))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { localUri: localUri }];
                }
            });
        });
    };
    DugiteGit.prototype.repositories = function (workspaceRootUri) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var workspaceRootPath, _a, containerRepository, repositories, toCompareString_1, subRepositoryPaths, containerRepositoryPath_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        workspaceRootPath = this.getFsPath(workspaceRootUri);
                        return [4 /*yield*/, Promise.all([this.getContainerRepository(workspaceRootPath), git_repository_locator_1.locateRepositories(workspaceRootPath)])];
                    case 1:
                        _a = __read.apply(void 0, [_b.sent(), 2]), containerRepository = _a[0], repositories = _a[1];
                        // Make sure not to add the container to the repositories twice. Can happen when WS root is a git repository.
                        if (containerRepository) {
                            toCompareString_1 = function (path) { return JSON.stringify(fs.statSync(path)); };
                            subRepositoryPaths = repositories.map(function (r) { return Path.resolve(_this.getFsPath(r.localUri)); });
                            containerRepositoryPath_1 = Path.resolve(this.getFsPath(containerRepository.localUri));
                            if (!subRepositoryPaths.some(function (p) { return toCompareString_1(p) === toCompareString_1(containerRepositoryPath_1); })) {
                                repositories.unshift(containerRepository);
                            }
                        }
                        return [2 /*return*/, repositories];
                }
            });
        });
    };
    DugiteGit.prototype.status = function (repository) {
        return __awaiter(this, void 0, void 0, function () {
            var repositoryPath, dugiteStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repositoryPath = this.getFsPath(repository);
                        return [4 /*yield*/, status_1.getStatus(repositoryPath)];
                    case 1:
                        dugiteStatus = _a.sent();
                        return [2 /*return*/, this.mapStatus(dugiteStatus, repository)];
                }
            });
        });
    };
    DugiteGit.prototype.add = function (repository, uri) {
        return __awaiter(this, void 0, void 0, function () {
            var paths;
            return __generator(this, function (_a) {
                paths = (Array.isArray(uri) ? uri : [uri]).map(file_uri_1.FileUri.fsPath);
                return [2 /*return*/, stage_1.stage(this.getFsPath(repository), paths)];
            });
        });
    };
    DugiteGit.prototype.unstage = function (repository, uri) {
        return __awaiter(this, void 0, void 0, function () {
            var paths;
            return __generator(this, function (_a) {
                paths = (Array.isArray(uri) ? uri : [uri]).map(file_uri_1.FileUri.fsPath);
                return [2 /*return*/, stage_1.unstage(this.getFsPath(repository), paths)];
            });
        });
    };
    // tslint:disable-next-line:no-any
    DugiteGit.prototype.branch = function (repository, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var repositoryPath, currentBranch, branches;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repositoryPath = this.getFsPath(repository);
                        if (!git_1.GitUtils.isBranchList(options)) return [3 /*break*/, 5];
                        if (!(options.type === 'current')) return [3 /*break*/, 2];
                        return [4 /*yield*/, branch_1.listBranch(repositoryPath, options.type)];
                    case 1:
                        currentBranch = _a.sent();
                        return [2 /*return*/, currentBranch ? this.mapBranch(currentBranch) : undefined];
                    case 2: return [4 /*yield*/, branch_1.listBranch(repositoryPath, options.type)];
                    case 3:
                        branches = _a.sent();
                        return [2 /*return*/, Promise.all(branches.map(function (branch) { return _this.mapBranch(branch); }))];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        if (git_1.GitUtils.isBranchCreate(options)) {
                            return [2 /*return*/, branch_1.createBranch(repositoryPath, options.toCreate, { startPoint: options.startPoint })];
                        }
                        else if (git_1.GitUtils.isBranchRename(options)) {
                            return [2 /*return*/, branch_1.renameBranch(repositoryPath, options.newName, options.newName, { force: !!options.force })];
                        }
                        else if (git_1.GitUtils.isBranchDelete(options)) {
                            return [2 /*return*/, branch_1.deleteBranch(repositoryPath, options.toDelete, { force: !!options.force, remote: !!options.remote })];
                        }
                        else {
                            return [2 /*return*/, this.fail(repository, "Unexpected git branch options: " + options + ".")];
                        }
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DugiteGit.prototype.checkout = function (repository, options) {
        return __awaiter(this, void 0, void 0, function () {
            var repositoryPath, paths;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repositoryPath = this.getFsPath(repository);
                        if (!git_1.GitUtils.isBranchCheckout(options)) return [3 /*break*/, 2];
                        return [4 /*yield*/, checkout_1.checkoutBranch(repositoryPath, options.branch)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 2:
                        if (!git_1.GitUtils.isWorkingTreeFileCheckout(options)) return [3 /*break*/, 4];
                        paths = (Array.isArray(options.paths) ? options.paths : [options.paths]).map(file_uri_1.FileUri.fsPath);
                        return [4 /*yield*/, checkout_1.checkoutPaths(repositoryPath, paths)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        this.fail(repository, "Unexpected git checkout options: " + options + ".");
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DugiteGit.prototype.commit = function (repository, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, commit_1.createCommit(this.getFsPath(repository), message || '')];
            });
        });
    };
    DugiteGit.prototype.fetch = function (repository, options) {
        return __awaiter(this, void 0, void 0, function () {
            var repositoryPath, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repositoryPath = this.getFsPath(repository);
                        return [4 /*yield*/, this.getDefaultRemote(repositoryPath, options ? options.remote : undefined)];
                    case 1:
                        r = _a.sent();
                        if (r === undefined) {
                            this.fail(repository, "No remote repository specified. Please, specify either a URL or a remote name from which new revisions should be fetched.");
                        }
                        return [4 /*yield*/, fetch_1.fetch(repositoryPath, r)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DugiteGit.prototype.push = function (repository, options) {
        return __awaiter(this, void 0, void 0, function () {
            var repositoryPath, r, localBranch, localBranchName, remoteBranch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repositoryPath = this.getFsPath(repository);
                        return [4 /*yield*/, this.getDefaultRemote(repositoryPath, options ? options.remote : undefined)];
                    case 1:
                        r = _a.sent();
                        if (r === undefined) {
                            this.fail(repository, "No configured push destination.");
                        }
                        return [4 /*yield*/, this.getCurrentBranch(repositoryPath, options ? options.localBranch : undefined)];
                    case 2:
                        localBranch = _a.sent();
                        localBranchName = typeof localBranch === 'string' ? localBranch : localBranch.name;
                        remoteBranch = options ? options.remoteBranch : undefined;
                        return [4 /*yield*/, push_1.push(repositoryPath, r, localBranchName, remoteBranch)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DugiteGit.prototype.pull = function (repository, options) {
        return __awaiter(this, void 0, void 0, function () {
            var repositoryPath, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repositoryPath = this.getFsPath(repository);
                        return [4 /*yield*/, this.getDefaultRemote(repositoryPath, options ? options.remote : undefined)];
                    case 1:
                        r = _a.sent();
                        if (r === undefined) {
                            this.fail(repository, "No remote repository specified. Please, specify either a URL or a remote name from which new revisions should be fetched.");
                        }
                        if (!(options && options.branch)) return [3 /*break*/, 3];
                        return [4 /*yield*/, pull_1.pull(repositoryPath, r, options.branch)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, pull_1.pull(repositoryPath, r)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DugiteGit.prototype.reset = function (repository, options) {
        return __awaiter(this, void 0, void 0, function () {
            var repositoryPath, mode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repositoryPath = this.getFsPath(repository);
                        mode = this.getResetMode(options.mode);
                        return [4 /*yield*/, reset_1.reset(repositoryPath, mode, options.mode ? options.mode : 'HEAD')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DugiteGit.prototype.merge = function (repository, options) {
        return __awaiter(this, void 0, void 0, function () {
            var repositoryPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repositoryPath = this.getFsPath(repository);
                        return [4 /*yield*/, merge_1.merge(repositoryPath, options.branch)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DugiteGit.prototype.show = function (repository, uri, options) {
        return __awaiter(this, void 0, void 0, function () {
            var encoding, commitish, repositoryPath, path;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        encoding = options ? options.encoding || 'utf8' : 'utf8';
                        commitish = this.getCommitish(options);
                        repositoryPath = this.getFsPath(repository);
                        path = this.getFsPath(uri);
                        if (!(encoding === 'binary')) return [3 /*break*/, 2];
                        return [4 /*yield*/, show_1.getBlobContents(repositoryPath, commitish, path)];
                    case 1: return [2 /*return*/, (_a.sent()).toString()];
                    case 2: return [4 /*yield*/, show_1.getTextContents(repositoryPath, commitish, path)];
                    case 3: return [2 /*return*/, (_a.sent()).toString()];
                }
            });
        });
    };
    DugiteGit.prototype.remote = function (repository) {
        return __awaiter(this, void 0, void 0, function () {
            var repositoryPath;
            return __generator(this, function (_a) {
                repositoryPath = this.getFsPath(repository);
                return [2 /*return*/, this.getRemotes(repositoryPath)];
            });
        });
    };
    DugiteGit.prototype.getCommitish = function (options) {
        if (options && options.commitish) {
            return 'index' === options.commitish ? '' : options.commitish;
        }
        return '';
    };
    // TODO: akitta what about symlinks? What if the workspace root is a symlink?
    // Maybe, we should use `--show-cdup` here instead of `--show-toplevel` because `show-toplevel` dereferences symlinks.
    DugiteGit.prototype.getContainerRepository = function (repositoryPath) {
        return __awaiter(this, void 0, void 0, function () {
            var options, result, out, localUri;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = { successExitCodes: new Set([0, 128]) };
                        return [4 /*yield*/, git_2.git(['rev-parse', '--show-toplevel'], repositoryPath, 'rev-parse', options)];
                    case 1:
                        result = _a.sent();
                        out = result.stdout;
                        if (out && out.length !== 0) {
                            localUri = file_uri_1.FileUri.create(out.trim()).toString();
                            return [2 /*return*/, { localUri: localUri }];
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    DugiteGit.prototype.getRemotes = function (repositoryPath) {
        return __awaiter(this, void 0, void 0, function () {
            var result, out;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, git_2.git(['remote'], repositoryPath, 'remote')];
                    case 1:
                        result = _a.sent();
                        out = result.stdout || '';
                        return [2 /*return*/, out.trim().match(/\S+/g) || []];
                }
            });
        });
    };
    DugiteGit.prototype.getDefaultRemote = function (repositoryPath, remote) {
        return __awaiter(this, void 0, void 0, function () {
            var remotes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(remote === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getRemotes(repositoryPath)];
                    case 1:
                        remotes = _a.sent();
                        return [2 /*return*/, remotes.shift()];
                    case 2: return [2 /*return*/, remote];
                }
            });
        });
    };
    DugiteGit.prototype.getCurrentBranch = function (repositoryPath, localBranch) {
        return __awaiter(this, void 0, void 0, function () {
            var branch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (localBranch !== undefined) {
                            return [2 /*return*/, localBranch];
                        }
                        return [4 /*yield*/, branch_1.listBranch(repositoryPath, 'current')];
                    case 1:
                        branch = _a.sent();
                        if (branch === undefined) {
                            return [2 /*return*/, this.fail(repositoryPath, "No current branch.")];
                        }
                        if (Array.isArray(branch)) {
                            return [2 /*return*/, this.fail(repositoryPath, "Implementation error. Listing branch with the 'current' flag must return with single value. Was: " + branch)];
                        }
                        return [2 /*return*/, this.mapBranch(branch)];
                }
            });
        });
    };
    DugiteGit.prototype.getResetMode = function (mode) {
        switch (mode) {
            case 'hard': return 0 /* Hard */;
            case 'soft': return 1 /* Soft */;
            case 'mixed': return 2 /* Mixed */;
            default: throw new Error("Unexpected Git reset mode: " + mode + ".");
        }
    };
    DugiteGit.prototype.mapBranch = function (toMap) {
        return __awaiter(this, void 0, void 0, function () {
            var tip;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mapTip(toMap.tip)];
                    case 1:
                        tip = _a.sent();
                        return [2 /*return*/, {
                                name: toMap.name,
                                nameWithoutRemote: toMap.nameWithoutRemote,
                                remote: toMap.remote,
                                type: toMap.type,
                                upstream: toMap.upstream,
                                upstreamWithoutRemote: toMap.upstreamWithoutRemote,
                                tip: tip
                            }];
                }
            });
        });
    };
    DugiteGit.prototype.mapTip = function (toMap) {
        return __awaiter(this, void 0, void 0, function () {
            var author;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mapCommitIdentity(toMap.author)];
                    case 1:
                        author = _a.sent();
                        return [2 /*return*/, {
                                author: author,
                                body: toMap.body,
                                parentSHAs: __spread(toMap.parentSHAs),
                                sha: toMap.sha,
                                summary: toMap.summary
                            }];
                }
            });
        });
    };
    DugiteGit.prototype.mapCommitIdentity = function (toMap) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        date: toMap.date,
                        email: toMap.email,
                        name: toMap.name,
                        tzOffset: toMap.tzOffset
                    }];
            });
        });
    };
    DugiteGit.prototype.mapStatus = function (toMap, repository) {
        return __awaiter(this, void 0, void 0, function () {
            var repositoryPath, aheadBehindPromise, changesPromise, aheadBehind, changes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repositoryPath = this.getFsPath(repository);
                        aheadBehindPromise = this.mapAheadBehind(toMap.branchAheadBehind);
                        changesPromise = this.mapFileChanges(toMap.workingDirectory, repositoryPath);
                        return [4 /*yield*/, aheadBehindPromise];
                    case 1:
                        aheadBehind = _a.sent();
                        return [4 /*yield*/, changesPromise];
                    case 2:
                        changes = _a.sent();
                        return [2 /*return*/, {
                                exists: toMap.exists,
                                branch: toMap.currentBranch,
                                upstreamBranch: toMap.currentUpstreamBranch,
                                aheadBehind: aheadBehind,
                                changes: changes,
                                currentHead: toMap.currentTip
                            }];
                }
            });
        });
    };
    DugiteGit.prototype.mapAheadBehind = function (toMap) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, toMap ? __assign({}, toMap) : undefined];
            });
        });
    };
    DugiteGit.prototype.mapFileChanges = function (toMap, repositoryPath) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.all(toMap.files.map(function (file) { return _this.mapFileChange(file, repositoryPath); }))];
            });
        });
    };
    DugiteGit.prototype.mapFileChange = function (toMap, repositoryPath) {
        return __awaiter(this, void 0, void 0, function () {
            var uriPromise, statusPromise, oldUriPromise, uri, status, oldUri;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uriPromise = this.getUri(Path.join(repositoryPath, toMap.path));
                        statusPromise = this.mapFileStatus(toMap.status);
                        oldUriPromise = toMap.oldPath ? this.getUri(Path.join(repositoryPath, toMap.oldPath)) : undefined;
                        return [4 /*yield*/, uriPromise];
                    case 1:
                        uri = _a.sent();
                        return [4 /*yield*/, statusPromise];
                    case 2:
                        status = _a.sent();
                        return [4 /*yield*/, oldUriPromise];
                    case 3:
                        oldUri = _a.sent();
                        return [2 /*return*/, {
                                uri: uri,
                                status: status,
                                oldUri: oldUri,
                                staged: toMap.staged
                            }];
                }
            });
        });
    };
    DugiteGit.prototype.mapFileStatus = function (toMap) {
        switch (toMap) {
            case status_2.AppFileStatus.Conflicted: return model_1.GitFileStatus.Conflicted;
            case status_2.AppFileStatus.Copied: return model_1.GitFileStatus.Copied;
            case status_2.AppFileStatus.Deleted: return model_1.GitFileStatus.Deleted;
            case status_2.AppFileStatus.Modified: return model_1.GitFileStatus.Modified;
            case status_2.AppFileStatus.New: return model_1.GitFileStatus.New;
            case status_2.AppFileStatus.Renamed: return model_1.GitFileStatus.Renamed;
            default: throw new Error("Unexpected application file status: " + toMap);
        }
    };
    DugiteGit.prototype.getFsPath = function (repository) {
        var uri = typeof repository === 'string' ? repository : repository.localUri;
        return file_uri_1.FileUri.fsPath(uri);
    };
    DugiteGit.prototype.getUri = function (path) {
        return file_uri_1.FileUri.create(path).toString();
    };
    DugiteGit.prototype.fail = function (repository, message) {
        var p = typeof repository === 'string' ? repository : repository.localUri;
        var m = message ? message + " " : '';
        throw new Error(m + "[" + p + "]");
    };
    DugiteGit = __decorate([
        inversify_1.injectable()
    ], DugiteGit);
    return DugiteGit;
}());
exports.DugiteGit = DugiteGit;
//# sourceMappingURL=dugite-git.js.map