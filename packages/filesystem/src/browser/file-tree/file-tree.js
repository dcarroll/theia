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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var uri_1 = require("@theia/core/lib/common/uri");
var browser_1 = require("@theia/core/lib/browser");
var common_1 = require("../../common");
var FileTree = /** @class */ (function (_super) {
    __extends(FileTree, _super);
    function FileTree(fileSystem) {
        var _this = _super.call(this) || this;
        _this.fileSystem = fileSystem;
        return _this;
    }
    FileTree.prototype.resolveChildren = function (parent) {
        var _this = this;
        if (FileStatNode.is(parent)) {
            return this.resolveFileStat(parent).then(function (fileStat) {
                return _this.toNodes(fileStat, parent);
            });
        }
        return _super.prototype.resolveChildren.call(this, parent);
    };
    FileTree.prototype.resolveFileStat = function (node) {
        return this.fileSystem.getFileStat(node.fileStat.uri).then(function (fileStat) {
            node.fileStat = fileStat;
            return fileStat;
        });
    };
    FileTree.prototype.toNodes = function (fileStat, parent) {
        var _this = this;
        if (!fileStat.children) {
            return [];
        }
        return fileStat.children.map(function (child) {
            return _this.toNode(child, parent);
        }).sort(DirNode.compare);
    };
    FileTree.prototype.toNode = function (fileStat, parent) {
        var uri = new uri_1.default(fileStat.uri);
        var id = fileStat.uri;
        var node = this.getNode(id);
        if (fileStat.isDirectory) {
            if (DirNode.is(node)) {
                node.fileStat = fileStat;
                return node;
            }
            var name_1 = uri.displayName;
            return {
                id: id, uri: uri, fileStat: fileStat, name: name_1, parent: parent,
                expanded: false,
                selected: false,
                children: []
            };
        }
        if (FileNode.is(node)) {
            node.fileStat = fileStat;
            return node;
        }
        var name = uri.displayName;
        return {
            id: id, uri: uri, fileStat: fileStat, name: name, parent: parent,
            selected: false
        };
    };
    FileTree = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_1.FileSystem)),
        __metadata("design:paramtypes", [Object])
    ], FileTree);
    return FileTree;
}(browser_1.Tree));
exports.FileTree = FileTree;
var FileStatNode;
(function (FileStatNode) {
    function is(node) {
        return !!node && 'fileStat' in node;
    }
    FileStatNode.is = is;
})(FileStatNode = exports.FileStatNode || (exports.FileStatNode = {}));
var FileNode;
(function (FileNode) {
    function is(node) {
        return FileStatNode.is(node) && !node.fileStat.isDirectory;
    }
    FileNode.is = is;
})(FileNode = exports.FileNode || (exports.FileNode = {}));
var DirNode;
(function (DirNode) {
    function is(node) {
        return FileStatNode.is(node) && node.fileStat.isDirectory;
    }
    DirNode.is = is;
    function compare(node, node2) {
        return DirNode.dirCompare(node, node2) || node.name.localeCompare(node2.name);
    }
    DirNode.compare = compare;
    function dirCompare(node, node2) {
        var a = DirNode.is(node) ? 1 : 0;
        var b = DirNode.is(node2) ? 1 : 0;
        return b - a;
    }
    DirNode.dirCompare = dirCompare;
    function createRoot(fileStat) {
        var uri = new uri_1.default(fileStat.uri);
        var id = fileStat.uri;
        return {
            id: id, uri: uri, fileStat: fileStat,
            name: uri.displayName,
            visible: true,
            parent: undefined,
            children: [],
            expanded: true,
            selected: false
        };
    }
    DirNode.createRoot = createRoot;
})(DirNode = exports.DirNode || (exports.DirNode = {}));
//# sourceMappingURL=file-tree.js.map