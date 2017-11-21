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
var inversify_1 = require("inversify");
var uri_1 = require("@theia/core/lib/common/uri");
var common_1 = require("@theia/filesystem/lib/common");
var common_2 = require("../common");
/**
 * The workspace service.
 */
var WorkspaceService = /** @class */ (function () {
    function WorkspaceService(fileSystem, watcher, server) {
        var _this = this;
        this.fileSystem = fileSystem;
        this.watcher = watcher;
        this.server = server;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var root, uri;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.root];
                    case 1:
                        root = _a.sent();
                        if (root) {
                            uri = new uri_1.default(root.uri);
                            this.updateTitle(uri);
                            watcher.watchFileChanges(uri);
                        }
                        return [2 /*return*/];
                }
            });
        }); })();
    }
    WorkspaceService.prototype.updateTitle = function (uri) {
        document.title = uri.displayName;
    };
    /**
     * on unload, we set our workspace root as the last recently used on the backend.
     * @param app
     */
    WorkspaceService.prototype.onStop = function (app) {
        if (this._root) {
            this.server.setRoot(this._root.uri);
        }
    };
    Object.defineProperty(WorkspaceService.prototype, "root", {
        /**
         * returns the most recently used workspace root or undefined if no root is known.
         */
        get: function () {
            var _this = this;
            if (this._root) {
                return Promise.resolve(this._root);
            }
            return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                var root, validRoot, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.server.getRoot()];
                        case 1:
                            root = _b.sent();
                            return [4 /*yield*/, this.isValidRoot(root)];
                        case 2:
                            validRoot = _b.sent();
                            if (!validRoot) return [3 /*break*/, 4];
                            _a = this;
                            return [4 /*yield*/, this.toFileStat(root)];
                        case 3:
                            _a._root = _b.sent();
                            _b.label = 4;
                        case 4:
                            resolve(this._root);
                            return [2 /*return*/];
                    }
                });
            }); });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Opens the given URI as the current workspace root.
     */
    WorkspaceService.prototype.open = function (uri, options) {
        this.doOpen(uri, options);
    };
    WorkspaceService.prototype.doOpen = function (uri, options) {
        return __awaiter(this, void 0, void 0, function () {
            var rootUri, valid, preserveWindow;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rootUri = uri.toString();
                        return [4 /*yield*/, this.isValidRoot(rootUri)];
                    case 1:
                        valid = _a.sent();
                        if (!valid) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.root];
                    case 2:
                        preserveWindow = !(_a.sent());
                        return [4 /*yield*/, this.server.setRoot(rootUri)];
                    case 3:
                        _a.sent();
                        this.openWindow(uri, Object.assign(options || {}, { preserveWindow: preserveWindow }));
                        return [2 /*return*/];
                    case 4: throw new Error("Invalid workspace root URI. Expected an existing directory location. URI: " + rootUri + ".");
                }
            });
        });
    };
    /**
     * `true` if the argument URI points to an existing directory. Otherwise, `false`.
     */
    WorkspaceService.prototype.isValidRoot = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var fileStat, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!uri) {
                            return [2 /*return*/, false];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.fileSystem.getFileStat(uri)];
                    case 2:
                        fileStat = _a.sent();
                        return [2 /*return*/, fileStat.isDirectory];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Transforms the `uri` argument into a [FileStat](FileStat). If the given URI argument is invalid, then the promise will be rejected.
     */
    WorkspaceService.prototype.toFileStat = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isValidRoot(uri)];
                    case 1:
                        valid = _a.sent();
                        if (valid) {
                            return [2 /*return*/, this.fileSystem.getFileStat(uri)];
                        }
                        throw new Error("Invalid workspace root URI. Expected an existing directory location. URI: " + uri + ".");
                }
            });
        });
    };
    WorkspaceService.prototype.openWindow = function (uri, options) {
        if (this.shouldPreserveWindow(options)) {
            this.reloadWindow();
        }
        else {
            this.openNewWindow();
        }
    };
    WorkspaceService.prototype.reloadWindow = function () {
        window.location.reload();
    };
    WorkspaceService.prototype.openNewWindow = function () {
        window.open(window.location.href);
    };
    WorkspaceService.prototype.shouldPreserveWindow = function (options) {
        return options !== undefined && !!options.preserveWindow;
    };
    WorkspaceService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_1.FileSystem)),
        __param(1, inversify_1.inject(common_1.FileSystemWatcher)),
        __param(2, inversify_1.inject(common_2.WorkspaceServer)),
        __metadata("design:paramtypes", [Object, common_1.FileSystemWatcher, Object])
    ], WorkspaceService);
    return WorkspaceService;
}());
exports.WorkspaceService = WorkspaceService;
//# sourceMappingURL=workspace-service.js.map