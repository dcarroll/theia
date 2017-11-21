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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var common_1 = require("../../common");
exports.ITree = Symbol("ITree");
var ITreeNode;
(function (ITreeNode) {
    function equals(left, right) {
        return left === right || (!!left && !!right && left.id === right.id);
    }
    ITreeNode.equals = equals;
    function isVisible(node) {
        return !!node && (node.visible === undefined || node.visible);
    }
    ITreeNode.isVisible = isVisible;
    function getPrevSibling(node) {
        if (!node || !node.parent) {
            return undefined;
        }
        var parent = node.parent;
        var index = ICompositeTreeNode.indexOf(parent, node);
        return parent.children[index - 1];
    }
    ITreeNode.getPrevSibling = getPrevSibling;
    function getNextSibling(node) {
        if (!node || !node.parent) {
            return undefined;
        }
        var parent = node.parent;
        var index = ICompositeTreeNode.indexOf(parent, node);
        return parent.children[index + 1];
    }
    ITreeNode.getNextSibling = getNextSibling;
})(ITreeNode = exports.ITreeNode || (exports.ITreeNode = {}));
var ICompositeTreeNode;
(function (ICompositeTreeNode) {
    function is(node) {
        return !!node && 'children' in node;
    }
    ICompositeTreeNode.is = is;
    function getFirstChild(parent) {
        return parent.children[0];
    }
    ICompositeTreeNode.getFirstChild = getFirstChild;
    function getLastChild(parent) {
        return parent.children[parent.children.length - 1];
    }
    ICompositeTreeNode.getLastChild = getLastChild;
    function isAncestor(parent, child) {
        if (!child) {
            return false;
        }
        if (ITreeNode.equals(parent, child.parent)) {
            return true;
        }
        return isAncestor(parent, child.parent);
    }
    ICompositeTreeNode.isAncestor = isAncestor;
    function indexOf(parent, node) {
        if (!node) {
            return -1;
        }
        return parent.children.findIndex(function (child) { return ITreeNode.equals(node, child); });
    }
    ICompositeTreeNode.indexOf = indexOf;
})(ICompositeTreeNode = exports.ICompositeTreeNode || (exports.ICompositeTreeNode = {}));
/**
 * A default implementation of the tree.
 */
var Tree = /** @class */ (function () {
    function Tree() {
        this.onChangedEmitter = new common_1.Emitter();
        this.onNodeRefreshedEmitter = new common_1.Emitter();
        this.toDispose = new common_1.DisposableCollection();
        this.nodes = {};
        this.toDispose.push(this.onChangedEmitter);
        this.toDispose.push(this.onNodeRefreshedEmitter);
    }
    Tree.prototype.dispose = function () {
        this.nodes = {};
        this.toDispose.dispose();
    };
    Object.defineProperty(Tree.prototype, "root", {
        get: function () {
            return this._root;
        },
        set: function (root) {
            this.nodes = {};
            this._root = root;
            this.addNode(root);
            this.refresh();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tree.prototype, "onChanged", {
        get: function () {
            return this.onChangedEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    Tree.prototype.fireChanged = function () {
        this.onChangedEmitter.fire(undefined);
    };
    Object.defineProperty(Tree.prototype, "onNodeRefreshed", {
        get: function () {
            return this.onNodeRefreshedEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    Tree.prototype.fireNodeRefreshed = function (parent) {
        this.onNodeRefreshedEmitter.fire(parent);
        this.fireChanged();
    };
    Tree.prototype.getNode = function (id) {
        return id !== undefined ? this.nodes[id] : undefined;
    };
    Tree.prototype.validateNode = function (node) {
        var id = !!node ? node.id : undefined;
        return this.getNode(id);
    };
    Tree.prototype.refresh = function (raw) {
        var _this = this;
        var parent = !raw ? this._root : this.validateNode(raw);
        if (ICompositeTreeNode.is(parent)) {
            this.resolveChildren(parent).then(function (children) { return _this.setChildren(parent, children); });
        }
        this.fireChanged();
    };
    Tree.prototype.resolveChildren = function (parent) {
        return Promise.resolve(Array.from(parent.children));
    };
    Tree.prototype.setChildren = function (parent, children) {
        this.removeNode(parent);
        parent.children = children;
        this.addNode(parent);
        this.fireNodeRefreshed(parent);
    };
    Tree.prototype.removeNode = function (node) {
        var _this = this;
        if (ICompositeTreeNode.is(node)) {
            node.children.forEach(function (child) { return _this.removeNode(child); });
        }
        if (node) {
            delete this.nodes[node.id];
        }
    };
    Tree.prototype.addNode = function (node) {
        var _this = this;
        if (node) {
            this.nodes[node.id] = node;
        }
        if (ICompositeTreeNode.is(node)) {
            node.children.forEach(function (child) { return _this.addNode(child); });
        }
    };
    Tree = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], Tree);
    return Tree;
}());
exports.Tree = Tree;
//# sourceMappingURL=tree.js.map