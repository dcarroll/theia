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
var common_1 = require("@theia/core/lib/common");
var browser_1 = require("@theia/filesystem/lib/browser");
var browser_2 = require("@theia/workspace/lib/browser");
var navigator_widget_1 = require("./navigator-widget");
var storage_service_1 = require("@theia/core/lib/browser/storage-service");
var widget_manager_1 = require("@theia/core/lib/browser/widget-manager");
var FileNavigatorContribution = /** @class */ (function () {
    function FileNavigatorContribution(workspaceService, selectionService, fileNavigator, widgetManager, storageService) {
        var _this = this;
        this.workspaceService = workspaceService;
        this.selectionService = selectionService;
        this.fileNavigator = fileNavigator;
        this.widgetManager = widgetManager;
        this.storageService = storageService;
        this.id = 'navigator';
        this.fileNavigator.model.onSelectionChanged(function (selection) {
            return _this.selectionService.selection = selection;
        });
        this.workspaceService.root.then(function (resolvedRoot) {
            if (resolvedRoot) {
                _this.fileNavigator.model.root = browser_1.DirNode.createRoot(resolvedRoot);
            }
            else {
                _this.fileNavigator.update();
            }
        });
    }
    FileNavigatorContribution.prototype.initializeLayout = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.widgetManager.getOrCreateWidget('navigator').then(function (navigator) {
                    return app.shell.addToLeftArea(navigator);
                });
                return [2 /*return*/];
            });
        });
    };
    FileNavigatorContribution.prototype.createWidget = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fileNavigator];
            });
        });
    };
    FileNavigatorContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(browser_2.WorkspaceService)),
        __param(1, inversify_1.inject(common_1.SelectionService)),
        __param(2, inversify_1.inject(navigator_widget_1.FileNavigatorWidget)), __param(2, inversify_1.named(navigator_widget_1.FILE_NAVIGATOR_ID)),
        __param(3, inversify_1.inject(widget_manager_1.WidgetManager)),
        __param(4, inversify_1.inject(storage_service_1.StorageService)),
        __metadata("design:paramtypes", [browser_2.WorkspaceService,
            common_1.SelectionService,
            navigator_widget_1.FileNavigatorWidget,
            widget_manager_1.WidgetManager, Object])
    ], FileNavigatorContribution);
    return FileNavigatorContribution;
}());
exports.FileNavigatorContribution = FileNavigatorContribution;
//# sourceMappingURL=navigator-contribution.js.map