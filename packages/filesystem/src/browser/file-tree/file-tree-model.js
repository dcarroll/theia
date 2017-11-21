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
var browser_1 = require("@theia/core/lib/browser");
var common_1 = require("../../common");
var file_tree_1 = require("./file-tree");
var FileTreeServices = /** @class */ (function (_super) {
    __extends(FileTreeServices, _super);
    function FileTreeServices() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        inversify_1.inject(common_1.FileSystem),
        __metadata("design:type", Object)
    ], FileTreeServices.prototype, "fileSystem", void 0);
    __decorate([
        inversify_1.inject(common_1.FileSystemWatcher),
        __metadata("design:type", common_1.FileSystemWatcher)
    ], FileTreeServices.prototype, "watcher", void 0);
    FileTreeServices = __decorate([
        inversify_1.injectable()
    ], FileTreeServices);
    return FileTreeServices;
}(browser_1.TreeServices));
exports.FileTreeServices = FileTreeServices;
var FileTreeModel = /** @class */ (function (_super) {
    __extends(FileTreeModel, _super);
    function FileTreeModel(tree, services) {
        var _this = _super.call(this, tree, services) || this;
        _this.tree = tree;
        _this.toDispose.push(_this.watcher.onFilesChanged(function (changes) { return _this.onFilesChanged(changes); }));
        return _this;
    }
    Object.defineProperty(FileTreeModel.prototype, "location", {
        get: function () {
            var root = this.root;
            if (file_tree_1.FileStatNode.is(root)) {
                return root.uri;
            }
            return undefined;
        },
        set: function (uri) {
            var _this = this;
            if (uri) {
                this.fileSystem.getFileStat(uri.toString()).then(function (fileStat) {
                    var node = file_tree_1.DirNode.createRoot(fileStat);
                    _this.navigateTo(node);
                });
            }
            else {
                this.navigateTo(undefined);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileTreeModel.prototype, "selectedFileStatNode", {
        get: function () {
            var selectedNode = this.selectedNode;
            if (file_tree_1.FileStatNode.is(selectedNode)) {
                return selectedNode;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    FileTreeModel.prototype.onFilesChanged = function (changes) {
        var _this = this;
        var affectedNodes = this.getAffectedNodes(changes);
        if (affectedNodes.length !== 0) {
            affectedNodes.forEach(function (node) { return _this.refresh(node); });
        }
        else if (this.isRootAffected(changes)) {
            this.refresh();
        }
    };
    FileTreeModel.prototype.isRootAffected = function (changes) {
        var root = this.root;
        if (file_tree_1.FileStatNode.is(root)) {
            return changes.some(function (change) {
                return change.type < common_1.FileChangeType.DELETED && change.uri.toString() === root.uri.toString();
            });
        }
        return false;
    };
    FileTreeModel.prototype.getAffectedNodes = function (changes) {
        var nodes = [];
        try {
            for (var changes_1 = __values(changes), changes_1_1 = changes_1.next(); !changes_1_1.done; changes_1_1 = changes_1.next()) {
                var change = changes_1_1.value;
                var uri = change.uri;
                var id = change.type > common_1.FileChangeType.UPDATED ? uri.parent.toString() : uri.toString();
                var node = this.getNode(id);
                if (file_tree_1.DirNode.is(node) && node.expanded) {
                    nodes.push(node);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (changes_1_1 && !changes_1_1.done && (_a = changes_1.return)) _a.call(changes_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return nodes;
        var e_1, _a;
    };
    FileTreeModel.prototype.copy = function (uri) {
        if (uri.scheme !== 'file') {
            return false;
        }
        var node = this.selectedFileStatNode;
        if (!node) {
            return false;
        }
        var targetUri = node.uri.resolve(uri.path.base);
        this.fileSystem.copy(uri.toString(), targetUri.toString());
        return true;
    };
    FileTreeModel = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(file_tree_1.FileTree)),
        __param(1, inversify_1.inject(FileTreeServices)),
        __metadata("design:paramtypes", [file_tree_1.FileTree,
            FileTreeServices])
    ], FileTreeModel);
    return FileTreeModel;
}(browser_1.TreeModel));
exports.FileTreeModel = FileTreeModel;
//# sourceMappingURL=file-tree-model.js.map