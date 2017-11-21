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
var common_1 = require("../../common");
var tree_1 = require("./tree");
exports.ITreeExpansionService = Symbol("ITreeExpansionService");
var IExpandableTreeNode;
(function (IExpandableTreeNode) {
    function is(node) {
        return !!node && tree_1.ICompositeTreeNode.is(node) && 'expanded' in node;
    }
    IExpandableTreeNode.is = is;
    function isExpanded(node) {
        return IExpandableTreeNode.is(node) && node.expanded;
    }
    IExpandableTreeNode.isExpanded = isExpanded;
    function isCollapsed(node) {
        return IExpandableTreeNode.is(node) && !node.expanded;
    }
    IExpandableTreeNode.isCollapsed = isCollapsed;
})(IExpandableTreeNode = exports.IExpandableTreeNode || (exports.IExpandableTreeNode = {}));
var TreeExpansionService = /** @class */ (function () {
    function TreeExpansionService(tree) {
        var _this = this;
        this.tree = tree;
        this.onExpansionChangedEmitter = new common_1.Emitter();
        tree.onNodeRefreshed(function (node) {
            try {
                for (var _a = __values(node.children), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var child = _b.value;
                    if (IExpandableTreeNode.isExpanded(child)) {
                        _this.tree.refresh(child);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var e_1, _c;
        });
    }
    TreeExpansionService.prototype.dispose = function () {
        this.onExpansionChangedEmitter.dispose();
    };
    Object.defineProperty(TreeExpansionService.prototype, "onExpansionChanged", {
        get: function () {
            return this.onExpansionChangedEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    TreeExpansionService.prototype.fireExpansionChanged = function (node) {
        this.onExpansionChangedEmitter.fire(node);
    };
    TreeExpansionService.prototype.expandNode = function (raw) {
        var node = this.tree.validateNode(raw);
        if (IExpandableTreeNode.isCollapsed(node)) {
            return this.doExpandNode(node);
        }
        return false;
    };
    TreeExpansionService.prototype.doExpandNode = function (node) {
        node.expanded = true;
        this.fireExpansionChanged(node);
        this.tree.refresh(node);
        return true;
    };
    TreeExpansionService.prototype.collapseNode = function (raw) {
        var node = this.tree.validateNode(raw);
        if (IExpandableTreeNode.isExpanded(node)) {
            return this.doCollapseNode(node);
        }
        return false;
    };
    TreeExpansionService.prototype.doCollapseNode = function (node) {
        node.expanded = false;
        this.fireExpansionChanged(node);
        return true;
    };
    TreeExpansionService.prototype.toggleNodeExpansion = function (node) {
        if (node.expanded) {
            this.collapseNode(node);
        }
        else {
            this.expandNode(node);
        }
    };
    TreeExpansionService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(tree_1.ITree)),
        __metadata("design:paramtypes", [Object])
    ], TreeExpansionService);
    return TreeExpansionService;
}());
exports.TreeExpansionService = TreeExpansionService;
//# sourceMappingURL=tree-expansion.js.map