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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var common_1 = require("../common");
var uri_1 = require("@theia/core/lib/common/uri");
var git_repository_provider_1 = require("./git-repository-provider");
exports.GIT_RESOURCE_SCHEME = 'gitrev';
var GitResource = /** @class */ (function () {
    function GitResource(uri, repository, git) {
        this.uri = uri;
        this.repository = repository;
        this.git = git;
    }
    GitResource.prototype.readContents = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var commitish;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.repository) return [3 /*break*/, 2];
                        commitish = this.uri.query;
                        return [4 /*yield*/, this.git.show(this.repository, this.uri.toString(), Object.assign({ commitish: commitish }, options))];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, ''];
                }
            });
        });
    };
    GitResource.prototype.dispose = function () { };
    return GitResource;
}());
exports.GitResource = GitResource;
var GitResourceResolver = /** @class */ (function () {
    function GitResourceResolver(git, repositoryProvider) {
        this.git = git;
        this.repositoryProvider = repositoryProvider;
    }
    GitResourceResolver.prototype.resolve = function (uri) {
        if (uri.scheme !== exports.GIT_RESOURCE_SCHEME) {
            throw new Error("Expected a URI with " + exports.GIT_RESOURCE_SCHEME + " scheme. Was: " + uri + ".");
        }
        return this.getResource(uri);
    };
    GitResourceResolver.prototype.getResource = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var repository;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRepository(uri)];
                    case 1:
                        repository = _a.sent();
                        return [2 /*return*/, new GitResource(uri, repository, this.git)];
                }
            });
        });
    };
    GitResourceResolver.prototype.getRepository = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var uriWithoutScheme, repositories, sortedRepositories, sortedRepositories_1, sortedRepositories_1_1, repository, localUri, localUriStr, e_1, _a;
            return __generator(this, function (_b) {
                uriWithoutScheme = uri.withoutScheme();
                repositories = this.repositoryProvider.allRepositories;
                sortedRepositories = repositories.sort(function (a, b) { return b.localUri.length - a.localUri.length; });
                try {
                    for (sortedRepositories_1 = __values(sortedRepositories), sortedRepositories_1_1 = sortedRepositories_1.next(); !sortedRepositories_1_1.done; sortedRepositories_1_1 = sortedRepositories_1.next()) {
                        repository = sortedRepositories_1_1.value;
                        localUri = new uri_1.default(repository.localUri);
                        localUriStr = localUri.withoutScheme().toString();
                        if (uriWithoutScheme.toString().startsWith(localUriStr)) {
                            return [2 /*return*/, { localUri: localUriStr }];
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (sortedRepositories_1_1 && !sortedRepositories_1_1.done && (_a = sortedRepositories_1.return)) _a.call(sortedRepositories_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return [2 /*return*/, undefined];
            });
        });
    };
    GitResourceResolver = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_1.Git)),
        __param(1, inversify_1.inject(git_repository_provider_1.GitRepositoryProvider)),
        __metadata("design:paramtypes", [Object, git_repository_provider_1.GitRepositoryProvider])
    ], GitResourceResolver);
    return GitResourceResolver;
}());
exports.GitResourceResolver = GitResourceResolver;
//# sourceMappingURL=git-resource.js.map