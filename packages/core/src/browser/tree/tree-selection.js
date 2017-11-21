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
exports.ITreeSelectionService = Symbol("ITreeSelectionService");
var ISelectableTreeNode;
(function (ISelectableTreeNode) {
    function is(node) {
        return !!node && 'selected' in node;
    }
    ISelectableTreeNode.is = is;
    function isSelected(node) {
        return is(node) && node.selected;
    }
    ISelectableTreeNode.isSelected = isSelected;
    function isVisible(node) {
        return is(node) && tree_1.ITreeNode.isVisible(node);
    }
    ISelectableTreeNode.isVisible = isVisible;
    function getVisibleParent(node) {
        if (node) {
            if (isVisible(node.parent)) {
                return node.parent;
            }
            return getVisibleParent(node.parent);
        }
    }
    ISelectableTreeNode.getVisibleParent = getVisibleParent;
})(ISelectableTreeNode = exports.ISelectableTreeNode || (exports.ISelectableTreeNode = {}));
var TreeSelectionService = /** @class */ (function () {
    function TreeSelectionService(tree) {
        this.tree = tree;
        this.onSelectionChangedEmitter = new common_1.Emitter();
    }
    TreeSelectionService.prototype.dispose = function () {
        this.onSelectionChangedEmitter.dispose();
    };
    Object.defineProperty(TreeSelectionService.prototype, "selectedNode", {
        get: function () {
            return this._selectedNode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeSelectionService.prototype, "onSelectionChanged", {
        get: function () {
            return this.onSelectionChangedEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    TreeSelectionService.prototype.fireSelectionChanged = function () {
        this.onSelectionChangedEmitter.fire(this._selectedNode);
    };
    TreeSelectionService.prototype.selectNode = function (raw) {
        var node = this.tree.validateNode(raw);
        if (ISelectableTreeNode.is(node)) {
            this.doSelectNode(node);
        }
        else {
            this.doSelectNode(undefined);
        }
    };
    TreeSelectionService.prototype.doSelectNode = function (node) {
        if (this._selectedNode) {
            this._selectedNode.selected = false;
        }
        this._selectedNode = node;
        if (node) {
            node.selected = true;
        }
        this.fireSelectionChanged();
    };
    TreeSelectionService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(tree_1.ITree)),
        __metadata("design:paramtypes", [Object])
    ], TreeSelectionService);
    return TreeSelectionService;
}());
exports.TreeSelectionService = TreeSelectionService;
//# sourceMappingURL=tree-selection.js.map