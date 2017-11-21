"use strict";
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
/*
* Copyright (C) 2017 TypeFox and others.
*
* Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
* You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/
var common_1 = require("../common");
var inversify_1 = require("inversify");
var workspace_service_1 = require("@theia/workspace/lib/browser/workspace-service");
var core_1 = require("@theia/core");
var GitRepositoryProvider = /** @class */ (function () {
    function GitRepositoryProvider(git, workspaceService) {
        this.git = git;
        this.workspaceService = workspaceService;
        this.onDidChangeRepositoryEmitter = new core_1.Emitter();
        this._allRepositories = [];
        this.refresh();
    }
    Object.defineProperty(GitRepositoryProvider.prototype, "selectedRepository", {
        /**
         * Returns with the previously selected repository, or if no repository has been selected yet,
         * it picks the first available repository from the backend and sets it as the selected one and returns with that.
         * If no repositories are available, returns `undefined`.
         */
        get: function () {
            return this._selectedRepository;
        },
        /**
         * Sets or un-sets the repository.
         */
        set: function (repository) {
            this._selectedRepository = repository;
            this.onDidChangeRepositoryEmitter.fire(repository);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GitRepositoryProvider.prototype, "onDidChangeRepository", {
        get: function () {
            return this.onDidChangeRepositoryEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    GitRepositoryProvider.prototype.fireOnDidChangeRepository = function (repository) {
        this.onDidChangeRepositoryEmitter.fire(repository);
    };
    Object.defineProperty(GitRepositoryProvider.prototype, "allRepositories", {
        /**
         * Returns with all know repositories.
         */
        get: function () {
            return this._allRepositories;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Refreshes the state of this Git repository provider.
     *  - Retrieves all known repositories from the backend, discards the current state of [all known repositories](GitRepositoryProvider.allRepositories).
     *  - If no repository was [selected](GitRepositoryProvider.selectedRepository), then selects the first items from all known ones.
     *  - If no repositories are available, leaves the selected one as `undefined`.
     *  - If the previously selected one, does not exist among the most recently discovered one, selects the first one.
     *  - This method blocks, if the workspace root is not yet set.
     */
    GitRepositoryProvider.prototype.refresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var root, repositories;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.workspaceService.root];
                    case 1:
                        root = _a.sent();
                        if (!root) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.git.repositories(root.uri)];
                    case 2:
                        repositories = _a.sent();
                        this._allRepositories = repositories;
                        // If no repository is selected or the selected one does not exist on the backend anymore, update the selected one.
                        if (this._selectedRepository === undefined
                            || this._selectedRepository && !repositories.map(function (r) { return r.localUri.toString(); }).some(function (uri) { return uri === _this._selectedRepository.localUri.toString(); })) {
                            this.selectedRepository = this._allRepositories[0];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    GitRepositoryProvider = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_1.Git)),
        __param(1, inversify_1.inject(workspace_service_1.WorkspaceService)),
        __metadata("design:paramtypes", [Object, workspace_service_1.WorkspaceService])
    ], GitRepositoryProvider);
    return GitRepositoryProvider;
}());
exports.GitRepositoryProvider = GitRepositoryProvider;
//# sourceMappingURL=git-repository-provider.js.map