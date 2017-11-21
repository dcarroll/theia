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
var workspace_service_1 = require("./workspace-service");
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
var storage_service_1 = require("@theia/core/lib/browser/storage-service");
/*
 * Prefixes any stored data with the current workspace path.
 */
var WorkspaceStorageService = /** @class */ (function () {
    function WorkspaceStorageService(workspaceService, logger) {
        var _this = this;
        this.workspaceService = workspaceService;
        this.logger = logger;
        this.initialized = this.workspaceService.root.then(function (stat) {
            if (stat) {
                _this.prefix = stat.uri;
            }
            else {
                _this.prefix = '_global_';
            }
        });
        this.storageService = new storage_service_1.LocalStorageService(this.logger);
    }
    WorkspaceStorageService.prototype.setData = function (key, data) {
        return __awaiter(this, void 0, void 0, function () {
            var fullKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.prefix) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initialized];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        fullKey = this.prefixWorkspaceURI(key);
                        return [2 /*return*/, this.storageService.setData(fullKey, data)];
                }
            });
        });
    };
    WorkspaceStorageService.prototype.getData = function (key, defaultValue) {
        return __awaiter(this, void 0, void 0, function () {
            var fullKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initialized];
                    case 1:
                        _a.sent();
                        fullKey = this.prefixWorkspaceURI(key);
                        return [2 /*return*/, this.storageService.getData(fullKey, defaultValue)];
                }
            });
        });
    };
    WorkspaceStorageService.prototype.prefixWorkspaceURI = function (originalKey) {
        return this.prefix + ":" + originalKey;
    };
    WorkspaceStorageService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(workspace_service_1.WorkspaceService)),
        __param(1, inversify_1.inject(common_1.ILogger)),
        __metadata("design:paramtypes", [workspace_service_1.WorkspaceService, Object])
    ], WorkspaceStorageService);
    return WorkspaceStorageService;
}());
exports.WorkspaceStorageService = WorkspaceStorageService;
//# sourceMappingURL=workspace-storage-service.js.map