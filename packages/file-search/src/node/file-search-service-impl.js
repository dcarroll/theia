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
var fs = require("fs-extra");
var path = require("path");
var fuzzy = require("fuzzy");
var uri_1 = require("@theia/core/lib/common/uri");
var node_1 = require("@theia/core/lib/node");
var core_1 = require("@theia/core");
var inversify_1 = require("inversify");
var git_ignore_1 = require("./git-ignore");
var FileSearchServiceImpl = /** @class */ (function () {
    function FileSearchServiceImpl(logger) {
        this.logger = logger;
    }
    FileSearchServiceImpl.prototype.find = function (uri, searchPattern, options) {
        return __awaiter(this, void 0, void 0, function () {
            var basePath, opts, result, limitReached, globalFiltered, gitignore, _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        basePath = node_1.FileUri.fsPath(new uri_1.default(uri));
                        opts = __assign({ fuzzyMatch: true, limit: Number.MAX_SAFE_INTEGER, useGitignore: true, defaultIgnorePatterns: [
                                '^.git$'
                            ] }, options);
                        result = [];
                        limitReached = new Error("limit reached");
                        globalFiltered = this.getFiltered(basePath, opts);
                        if (!opts.useGitignore) return [3 /*break*/, 2];
                        return [4 /*yield*/, git_ignore_1.findContainingGitIgnore(basePath)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = git_ignore_1.NO_IGNORE;
                        _b.label = 3;
                    case 3:
                        gitignore = _a;
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.findRecursive(basePath, globalFiltered, gitignore, opts, function (filePath) {
                                if (result.length >= opts.limit) {
                                    throw limitReached;
                                }
                                if (opts.fuzzyMatch && fuzzy.test(searchPattern, filePath)) {
                                    result.push(node_1.FileUri.create(filePath).toString());
                                }
                                else {
                                    if (filePath.toLocaleLowerCase().indexOf(searchPattern.toLocaleLowerCase()) !== -1) {
                                        result.push(node_1.FileUri.create(filePath).toString());
                                    }
                                }
                            })];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        e_1 = _b.sent();
                        if (e_1 !== limitReached) {
                            throw e_1;
                        }
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/, result];
                }
            });
        });
    };
    FileSearchServiceImpl.prototype.findRecursive = function (filePath, globalFilter, gitignore, options, acceptor) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_1, localGitIgnore, _a, result_1, result_1_1, child, childPath, stat, err_2, e_2_1, e_2, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs.readdir(filePath)];
                    case 1:
                        result = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _c.sent();
                        this.logger.debug("Skipping search in '" + filePath + "'.", err_1);
                        return [2 /*return*/];
                    case 3:
                        localGitIgnore = gitignore;
                        _a = localGitIgnore !== git_ignore_1.NO_IGNORE;
                        if (!_a) return [3 /*break*/, 5];
                        return [4 /*yield*/, fs.pathExists(path.join(filePath, '.git'))];
                    case 4:
                        _a = (_c.sent());
                        _c.label = 5;
                    case 5:
                        if (_a) {
                            localGitIgnore = git_ignore_1.NO_IGNORE;
                        }
                        return [4 /*yield*/, git_ignore_1.findGitIgnore(filePath, localGitIgnore)];
                    case 6:
                        localGitIgnore = _c.sent();
                        _c.label = 7;
                    case 7:
                        _c.trys.push([7, 17, 18, 19]);
                        result_1 = __values(result), result_1_1 = result_1.next();
                        _c.label = 8;
                    case 8:
                        if (!!result_1_1.done) return [3 /*break*/, 16];
                        child = result_1_1.value;
                        childPath = path.join(filePath, child);
                        if (!(!globalFilter(child, childPath) && !localGitIgnore.isFiltered(child))) return [3 /*break*/, 15];
                        stat = void 0;
                        _c.label = 9;
                    case 9:
                        _c.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, fs.stat(childPath)];
                    case 10:
                        stat = _c.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        err_2 = _c.sent();
                        this.logger.debug("Skipping search in '" + filePath + "'.", err_2);
                        return [2 /*return*/];
                    case 12:
                        if (!stat.isDirectory()) return [3 /*break*/, 14];
                        return [4 /*yield*/, this.findRecursive(childPath, globalFilter, localGitIgnore, options, acceptor)];
                    case 13:
                        _c.sent();
                        return [3 /*break*/, 15];
                    case 14:
                        acceptor(childPath);
                        _c.label = 15;
                    case 15:
                        result_1_1 = result_1.next();
                        return [3 /*break*/, 8];
                    case 16: return [3 /*break*/, 19];
                    case 17:
                        e_2_1 = _c.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 19];
                    case 18:
                        try {
                            if (result_1_1 && !result_1_1.done && (_b = result_1.return)) _b.call(result_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 19: return [2 /*return*/];
                }
            });
        });
    };
    FileSearchServiceImpl.prototype.getFiltered = function (basePath, options) {
        var patterns = options.defaultIgnorePatterns.map(function (s) { return new RegExp(s); });
        var defaultFilter = function (simpleName) { return patterns.some(function (pattern) { return pattern.test(simpleName); }); };
        return defaultFilter;
    };
    FileSearchServiceImpl = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(core_1.ILogger)),
        __metadata("design:paramtypes", [Object])
    ], FileSearchServiceImpl);
    return FileSearchServiceImpl;
}());
exports.FileSearchServiceImpl = FileSearchServiceImpl;
//# sourceMappingURL=file-search-service-impl.js.map