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
Object.defineProperty(exports, "__esModule", { value: true });
var tree_1 = require("./tree");
var tree_expansion_1 = require("./tree-expansion");
var ITreeNodeIterator;
(function (ITreeNodeIterator) {
    ITreeNodeIterator.DEFAULT_OPTIONS = {
        pruneCollapsed: false
    };
})(ITreeNodeIterator = exports.ITreeNodeIterator || (exports.ITreeNodeIterator = {}));
var AbstractTreeNodeIterator = /** @class */ (function () {
    function AbstractTreeNodeIterator(node, options) {
        if (options === void 0) { options = ITreeNodeIterator.DEFAULT_OPTIONS; }
        this.node = node;
        this.options = options;
    }
    AbstractTreeNodeIterator.prototype.next = function () {
        if (!this.node) {
            return {
                value: undefined,
                done: true,
            };
        }
        this.node = this.doNext(this.node);
        return {
            value: this.node,
            done: false
        };
    };
    AbstractTreeNodeIterator.prototype.hasChildren = function (node) {
        if (!tree_1.ICompositeTreeNode.is(node)) {
            return false;
        }
        if (node.children.length === 0) {
            return false;
        }
        if (this.options.pruneCollapsed) {
            return tree_expansion_1.IExpandableTreeNode.isExpanded(node);
        }
        return true;
    };
    return AbstractTreeNodeIterator;
}());
exports.AbstractTreeNodeIterator = AbstractTreeNodeIterator;
var TreeNodeIterator = /** @class */ (function (_super) {
    __extends(TreeNodeIterator, _super);
    function TreeNodeIterator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TreeNodeIterator.prototype.doNext = function (node) {
        return this.findFirstChild(node) || this.findNextSibling(node);
    };
    TreeNodeIterator.prototype.findFirstChild = function (node) {
        return this.hasChildren(node) ? tree_1.ICompositeTreeNode.getFirstChild(node) : undefined;
    };
    TreeNodeIterator.prototype.findNextSibling = function (node) {
        if (!node) {
            return undefined;
        }
        var nextSibling = tree_1.ITreeNode.getNextSibling(node);
        if (nextSibling) {
            return nextSibling;
        }
        return this.findNextSibling(node.parent);
    };
    return TreeNodeIterator;
}(AbstractTreeNodeIterator));
exports.TreeNodeIterator = TreeNodeIterator;
var BackwardTreeNodeIterator = /** @class */ (function (_super) {
    __extends(BackwardTreeNodeIterator, _super);
    function BackwardTreeNodeIterator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BackwardTreeNodeIterator.prototype.doNext = function (node) {
        var prevSibling = tree_1.ITreeNode.getPrevSibling(node);
        var lastChild = this.findLastChild(prevSibling);
        return lastChild || node.parent;
    };
    BackwardTreeNodeIterator.prototype.findLastChild = function (node) {
        if (!this.hasChildren(node)) {
            return node;
        }
        var lastChild = tree_1.ICompositeTreeNode.getLastChild(node);
        return this.findLastChild(lastChild);
    };
    return BackwardTreeNodeIterator;
}(AbstractTreeNodeIterator));
exports.BackwardTreeNodeIterator = BackwardTreeNodeIterator;
//# sourceMappingURL=tree-iterator.js.map