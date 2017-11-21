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
var browser_1 = require("@theia/core/lib/browser");
var browser_2 = require("@theia/filesystem/lib/browser");
var common_1 = require("@theia/filesystem/lib/common");
var workspace_service_1 = require("./workspace-service");
var WorkspaceCommands;
(function (WorkspaceCommands) {
    WorkspaceCommands.OPEN = {
        id: 'workspace:open',
        label: 'Open...'
    };
})(WorkspaceCommands = exports.WorkspaceCommands || (exports.WorkspaceCommands = {}));
var WorkspaceFrontendContribution = /** @class */ (function () {
    function WorkspaceFrontendContribution(fileSystem, fileDialogFactory, openerService, workspaceService, workspaceStorage) {
        this.fileSystem = fileSystem;
        this.fileDialogFactory = fileDialogFactory;
        this.openerService = openerService;
        this.workspaceService = workspaceService;
        this.workspaceStorage = workspaceStorage;
    }
    WorkspaceFrontendContribution.prototype.registerCommands = function (commands) {
        var _this = this;
        commands.registerCommand(WorkspaceCommands.OPEN, {
            isEnabled: function () { return true; },
            execute: function () { return _this.showFileDialog(); }
        });
    };
    WorkspaceFrontendContribution.prototype.registerMenus = function (menus) {
        menus.registerMenuAction(browser_1.CommonMenus.FILE_OPEN, {
            commandId: WorkspaceCommands.OPEN.id
        });
    };
    WorkspaceFrontendContribution.prototype.showFileDialog = function () {
        var _this = this;
        this.workspaceService.root.then(function (resolvedRoot) { return __awaiter(_this, void 0, void 0, function () {
            var root, _a, rootUri, rootStat, rootNode, dialog, node;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = resolvedRoot;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fileSystem.getCurrentUserHome()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        root = _a;
                        if (!root) return [3 /*break*/, 5];
                        rootUri = new uri_1.default(root.uri).parent;
                        return [4 /*yield*/, this.fileSystem.getFileStat(rootUri.toString())];
                    case 3:
                        rootStat = _b.sent();
                        rootNode = browser_2.DirNode.createRoot(rootStat);
                        dialog = this.fileDialogFactory({ title: WorkspaceCommands.OPEN.label });
                        dialog.model.navigateTo(rootNode);
                        return [4 /*yield*/, dialog.open()];
                    case 4:
                        node = _b.sent();
                        this.openFile(node);
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    };
    WorkspaceFrontendContribution.prototype.openFile = function (node) {
        if (!node) {
            return;
        }
        if (node.fileStat.isDirectory) {
            this.workspaceService.open(node.uri);
        }
        else {
            browser_1.open(this.openerService, node.uri);
        }
    };
    WorkspaceFrontendContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_1.FileSystem)),
        __param(1, inversify_1.inject(browser_2.FileDialogFactory)),
        __param(2, inversify_1.inject(browser_1.OpenerService)),
        __param(3, inversify_1.inject(workspace_service_1.WorkspaceService)),
        __param(4, inversify_1.inject(browser_1.StorageService)),
        __metadata("design:paramtypes", [Object, Function, Object, workspace_service_1.WorkspaceService, Object])
    ], WorkspaceFrontendContribution);
    return WorkspaceFrontendContribution;
}());
exports.WorkspaceFrontendContribution = WorkspaceFrontendContribution;
//# sourceMappingURL=workspace-frontend-contribution.js.map