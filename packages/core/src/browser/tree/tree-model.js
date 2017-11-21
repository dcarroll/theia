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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var common_1 = require("../../common");
var tree_1 = require("./tree");
var tree_selection_1 = require("./tree-selection");
var tree_expansion_1 = require("./tree-expansion");
var tree_navigation_1 = require("./tree-navigation");
var tree_iterator_1 = require("./tree-iterator");
exports.ITreeModel = Symbol("ITreeModel");
var TreeServices = /** @class */ (function () {
    function TreeServices() {
    }
    __decorate([
        inversify_1.inject(tree_selection_1.ITreeSelectionService),
        __metadata("design:type", Object)
    ], TreeServices.prototype, "selection", void 0);
    __decorate([
        inversify_1.inject(tree_expansion_1.ITreeExpansionService),
        __metadata("design:type", Object)
    ], TreeServices.prototype, "expansion", void 0);
    __decorate([
        inversify_1.inject(tree_navigation_1.TreeNavigationService),
        __metadata("design:type", tree_navigation_1.TreeNavigationService)
    ], TreeServices.prototype, "navigation", void 0);
    TreeServices = __decorate([
        inversify_1.injectable()
    ], TreeServices);
    return TreeServices;
}());
exports.TreeServices = TreeServices;
var TreeModel = /** @class */ (function () {
    function TreeModel(tree, services) {
        var _this = this;
        this.tree = tree;
        this.onChangedEmitter = new common_1.Emitter();
        this.onOpenNodeEmitter = new common_1.Emitter();
        this.toDispose = new common_1.DisposableCollection();
        Object.assign(this, services);
        this.toDispose.push(tree);
        this.toDispose.push(tree.onChanged(function () { return _this.fireChanged(); }));
        this.toDispose.push(this.selection);
        this.toDispose.push(this.selection.onSelectionChanged(function () { return _this.fireChanged(); }));
        this.toDispose.push(this.expansion);
        this.toDispose.push(this.expansion.onExpansionChanged(function (node) {
            _this.fireChanged();
            if (!node.expanded && tree_1.ICompositeTreeNode.isAncestor(node, _this.selectedNode)) {
                _this.selectNode(tree_selection_1.ISelectableTreeNode.isVisible(node) ? node : undefined);
            }
        }));
        this.toDispose.push(this.onChangedEmitter);
    }
    TreeModel.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    Object.defineProperty(TreeModel.prototype, "root", {
        get: function () {
            return this.tree.root;
        },
        set: function (root) {
            this.tree.root = root;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeModel.prototype, "onChanged", {
        get: function () {
            return this.onChangedEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeModel.prototype, "onOpenNode", {
        get: function () {
            return this.onOpenNodeEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    TreeModel.prototype.fireChanged = function () {
        this.onChangedEmitter.fire(undefined);
    };
    Object.defineProperty(TreeModel.prototype, "onNodeRefreshed", {
        get: function () {
            return this.tree.onNodeRefreshed;
        },
        enumerable: true,
        configurable: true
    });
    TreeModel.prototype.getNode = function (id) {
        return this.tree.getNode(id);
    };
    TreeModel.prototype.validateNode = function (node) {
        return this.tree.validateNode(node);
    };
    TreeModel.prototype.refresh = function (parent) {
        if (parent) {
            this.tree.refresh(parent);
        }
        else {
            this.tree.refresh();
        }
    };
    Object.defineProperty(TreeModel.prototype, "selectedNode", {
        get: function () {
            return this.selection.selectedNode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeModel.prototype, "onSelectionChanged", {
        get: function () {
            return this.selection.onSelectionChanged;
        },
        enumerable: true,
        configurable: true
    });
    TreeModel.prototype.selectNode = function (node) {
        this.selection.selectNode(node);
    };
    Object.defineProperty(TreeModel.prototype, "onExpansionChanged", {
        get: function () {
            return this.expansion.onExpansionChanged;
        },
        enumerable: true,
        configurable: true
    });
    TreeModel.prototype.expandNode = function (raw) {
        var node = raw || this.selectedNode;
        if (tree_expansion_1.IExpandableTreeNode.is(node)) {
            return this.expansion.expandNode(node);
        }
        return false;
    };
    TreeModel.prototype.collapseNode = function (raw) {
        var node = raw || this.selectedNode;
        if (tree_expansion_1.IExpandableTreeNode.is(node)) {
            return this.expansion.collapseNode(node);
        }
        return false;
    };
    TreeModel.prototype.toggleNodeExpansion = function (raw) {
        var node = raw || this.selectedNode;
        if (tree_expansion_1.IExpandableTreeNode.is(node)) {
            this.expansion.toggleNodeExpansion(node);
        }
    };
    TreeModel.prototype.selectPrevNode = function () {
        var node = this.selectedNode;
        var iterator = this.createBackwardIterator(node);
        this.selectNextVisibleNode(iterator);
    };
    TreeModel.prototype.selectNextNode = function () {
        var node = this.selectedNode;
        var iterator = this.createIterator(node);
        this.selectNextVisibleNode(iterator);
    };
    TreeModel.prototype.selectNextVisibleNode = function (iterator) {
        var result = iterator.next();
        while (!result.done && !tree_selection_1.ISelectableTreeNode.isVisible(result.value)) {
            result = iterator.next();
        }
        var node = result.value;
        if (tree_selection_1.ISelectableTreeNode.isVisible(node)) {
            this.selectNode(node);
        }
    };
    TreeModel.prototype.createBackwardIterator = function (node) {
        return new tree_iterator_1.BackwardTreeNodeIterator(node, {
            pruneCollapsed: true
        });
    };
    TreeModel.prototype.createIterator = function (node) {
        return new tree_iterator_1.TreeNodeIterator(node, {
            pruneCollapsed: true
        });
    };
    TreeModel.prototype.openNode = function (raw) {
        var node = raw || this.selectedNode;
        if (node) {
            this.doOpenNode(node);
            this.onOpenNodeEmitter.fire(node);
        }
    };
    TreeModel.prototype.doOpenNode = function (node) {
        if (tree_expansion_1.IExpandableTreeNode.is(node)) {
            this.toggleNodeExpansion(node);
        }
    };
    TreeModel.prototype.selectParent = function () {
        var node = this.selectedNode;
        var parent = tree_selection_1.ISelectableTreeNode.getVisibleParent(node);
        if (parent) {
            this.selectNode(parent);
        }
    };
    TreeModel.prototype.navigateTo = function (node) {
        if (node) {
            this.navigation.push(node);
            this.doNavigate(node);
        }
    };
    TreeModel.prototype.canNavigateForward = function () {
        return !!this.navigation.next;
    };
    TreeModel.prototype.canNavigateBackward = function () {
        return !!this.navigation.prev;
    };
    TreeModel.prototype.navigateForward = function () {
        var node = this.navigation.advance();
        if (node) {
            this.doNavigate(node);
        }
    };
    TreeModel.prototype.navigateBackward = function () {
        var node = this.navigation.retreat();
        if (node) {
            this.doNavigate(node);
        }
    };
    TreeModel.prototype.doNavigate = function (node) {
        this.tree.root = node;
        if (tree_expansion_1.IExpandableTreeNode.is(node)) {
            this.expandNode(node);
        }
        if (tree_selection_1.ISelectableTreeNode.is(node)) {
            this.selectNode(node);
        }
    };
    TreeModel = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(tree_1.ITree)),
        __param(1, inversify_1.inject(TreeServices)),
        __metadata("design:paramtypes", [Object, TreeServices])
    ], TreeModel);
    return TreeModel;
}());
exports.TreeModel = TreeModel;
//# sourceMappingURL=tree-model.js.map