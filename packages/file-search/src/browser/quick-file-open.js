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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
var filesystem_1 = require("@theia/filesystem/lib/common/filesystem");
var file_icons_1 = require("@theia/filesystem/lib/browser/icons/file-icons");
var workspace_service_1 = require("@theia/workspace/lib/browser/workspace-service");
var uri_1 = require("@theia/core/lib/common/uri");
var file_search_service_1 = require("../common/file-search-service");
var common_1 = require("@theia/core/lib/common");
var QuickFileOpenService = /** @class */ (function () {
    function QuickFileOpenService(fileSystem, workspaceService, fileIconProvider, openerService, quickOpenService, fileSearchService) {
        var _this = this;
        this.fileSystem = fileSystem;
        this.workspaceService = workspaceService;
        this.fileIconProvider = fileIconProvider;
        this.openerService = openerService;
        this.quickOpenService = quickOpenService;
        this.fileSearchService = fileSearchService;
        this.cancelIndicator = new common_1.CancellationTokenSource();
        workspaceService.root.then(function (root) { return _this.wsRoot = root; });
    }
    QuickFileOpenService.prototype.isEnabled = function () {
        return this.wsRoot !== undefined;
    };
    QuickFileOpenService.prototype.open = function () {
        this.quickOpenService.open(this, {
            placeholder: 'file name to search',
            fuzzyMatchLabel: true,
            fuzzyMatchDescription: true,
            fuzzySort: true
        });
    };
    QuickFileOpenService.prototype.onType = function (lookFor, acceptor) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var token, proposed, handler;
            return __generator(this, function (_a) {
                if (!this.wsRoot) {
                    return [2 /*return*/];
                }
                this.cancelIndicator.cancel();
                this.cancelIndicator = new common_1.CancellationTokenSource();
                token = this.cancelIndicator.token;
                proposed = new Set();
                handler = function (result) {
                    if (!token.isCancellationRequested) {
                        result.forEach(function (p) { return proposed.add(p); });
                        acceptor(Array.from(proposed).map(function (uri) { return _this.toItem(uri); }));
                    }
                };
                if (lookFor.length <= 2) {
                    // first a quick search
                    this.fileSearchService.find(this.wsRoot.uri, lookFor, { fuzzyMatch: false, limit: 100 }).then(handler);
                }
                else {
                    // then a comprehensive one
                    this.fileSearchService.find(this.wsRoot.uri, lookFor, { fuzzyMatch: true, limit: 2000 }).then(handler);
                }
                return [2 /*return*/];
            });
        });
    };
    QuickFileOpenService.prototype.toItem = function (uriString) {
        var uri = new uri_1.default(uriString);
        var icon = this.fileIconProvider.getFileIconForURI(uri);
        var parent = uri.parent.toString();
        var description = parent.substr(this.wsRoot.uri.length);
        return new FileQuickOpenItem(uri, icon, description, this.openerService);
    };
    QuickFileOpenService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(filesystem_1.FileSystem)),
        __param(1, inversify_1.inject(workspace_service_1.WorkspaceService)),
        __param(2, inversify_1.inject(file_icons_1.FileIconProvider)),
        __param(3, inversify_1.inject(browser_1.OpenerService)),
        __param(4, inversify_1.inject(browser_1.QuickOpenService)),
        __param(5, inversify_1.inject(file_search_service_1.FileSearchService)),
        __metadata("design:paramtypes", [Object, workspace_service_1.WorkspaceService,
            file_icons_1.FileIconProvider, Object, browser_1.QuickOpenService, Object])
    ], QuickFileOpenService);
    return QuickFileOpenService;
}());
exports.QuickFileOpenService = QuickFileOpenService;
var FileQuickOpenItem = /** @class */ (function (_super) {
    __extends(FileQuickOpenItem, _super);
    function FileQuickOpenItem(uri, icon, parent, openerService) {
        var _this = _super.call(this) || this;
        _this.uri = uri;
        _this.icon = icon;
        _this.parent = parent;
        _this.openerService = openerService;
        return _this;
    }
    FileQuickOpenItem.prototype.getLabel = function () {
        return this.uri.displayName;
    };
    FileQuickOpenItem.prototype.isHidden = function () {
        return false;
    };
    FileQuickOpenItem.prototype.getTooltip = function () {
        return this.uri.path.toString();
    };
    FileQuickOpenItem.prototype.getDescription = function () {
        return this.parent;
    };
    FileQuickOpenItem.prototype.getUri = function () {
        return this.uri;
    };
    FileQuickOpenItem.prototype.getIconClass = function () {
        return this.icon;
    };
    FileQuickOpenItem.prototype.run = function (mode) {
        var _this = this;
        if (mode !== browser_1.QuickOpenMode.OPEN) {
            return false;
        }
        this.openerService.getOpener(this.uri).then(function (opener) { return opener.open(_this.uri); });
        return true;
    };
    return FileQuickOpenItem;
}(browser_1.QuickOpenItem));
exports.FileQuickOpenItem = FileQuickOpenItem;
//# sourceMappingURL=quick-file-open.js.map