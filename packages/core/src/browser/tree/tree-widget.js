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
var domutils_1 = require("@phosphor/domutils");
var virtualdom_1 = require("@phosphor/virtualdom");
var common_1 = require("../../common");
var context_menu_renderer_1 = require("../context-menu-renderer");
var widgets_1 = require("../widgets");
var tree_1 = require("./tree");
var tree_model_1 = require("./tree-model");
var tree_expansion_1 = require("./tree-expansion");
var tree_selection_1 = require("./tree-selection");
exports.TREE_CLASS = 'theia-Tree';
exports.TREE_NODE_CLASS = 'theia-TreeNode';
exports.EXPANDABLE_TREE_NODE_CLASS = 'theia-ExpandableTreeNode';
exports.COMPOSITE_TREE_NODE_CLASS = 'theia-CompositeTreeNode';
exports.TREE_NODE_CAPTION_CLASS = 'theia-TreeNodeCaption';
exports.EXPANSION_TOGGLE_CLASS = 'theia-ExpansionToggle';
exports.TreeProps = Symbol('TreeProps');
exports.defaultTreeProps = {
    expansionToggleSize: {
        width: 16,
        height: 16
    }
};
var TreeWidget = /** @class */ (function (_super) {
    __extends(TreeWidget, _super);
    function TreeWidget(props, model, contextMenuRenderer) {
        var _this = _super.call(this) || this;
        _this.props = props;
        _this.model = model;
        _this.contextMenuRenderer = contextMenuRenderer;
        _this.addClass(exports.TREE_CLASS);
        _this.node.tabIndex = 0;
        model.onChanged(function () { return _this.update(); });
        _this.toDispose.push(model);
        return _this;
    }
    TreeWidget.prototype.onActivateRequest = function (msg) {
        _super.prototype.onActivateRequest.call(this, msg);
        if (!this.model.selectedNode && tree_selection_1.ISelectableTreeNode.is(this.model.root)) {
            this.model.selectNode(this.model.root);
        }
        this.node.focus();
    };
    TreeWidget.prototype.onUpdateRequest = function (msg) {
        _super.prototype.onUpdateRequest.call(this, msg);
        var selected = this.node.getElementsByClassName(widgets_1.SELECTED_CLASS)[0];
        if (selected) {
            domutils_1.ElementExt.scrollIntoViewIfNeeded(this.node, selected);
        }
    };
    TreeWidget.prototype.render = function () {
        return this.renderTree(this.model);
    };
    TreeWidget.prototype.renderTree = function (model) {
        if (model.root) {
            var props = this.createRootProps(model.root);
            return this.renderNodes(model.root, props);
        }
        return null;
    };
    TreeWidget.prototype.createRootProps = function (node) {
        return {
            indentSize: 0,
            visible: true
        };
    };
    TreeWidget.prototype.renderNodes = function (node, props) {
        var children = this.renderNodeChildren(node, props);
        if (!tree_1.ITreeNode.isVisible(node)) {
            return children;
        }
        var parent = this.renderNode(node, props);
        return widgets_1.VirtualRenderer.merge(parent, children);
    };
    TreeWidget.prototype.renderNode = function (node, props) {
        var attributes = this.createNodeAttributes(node, props);
        var caption = this.renderNodeCaption(node, props);
        return virtualdom_1.h.div(attributes, caption);
    };
    TreeWidget.prototype.createNodeAttributes = function (node, props) {
        var _this = this;
        var className = this.createNodeClassNames(node, props).join(' ');
        var style = this.createNodeStyle(node, props);
        return {
            className: className, style: style,
            onclick: function (event) { return _this.handleClickEvent(node, event); },
            ondblclick: function (event) { return _this.handleDblClickEvent(node, event); },
            oncontextmenu: function (event) { return _this.handleContextMenuEvent(node, event); },
        };
    };
    TreeWidget.prototype.createNodeClassNames = function (node, props) {
        var classNames = [exports.TREE_NODE_CLASS];
        if (tree_1.ICompositeTreeNode.is(node)) {
            classNames.push(exports.COMPOSITE_TREE_NODE_CLASS);
        }
        if (this.isExandable(node)) {
            classNames.push(exports.EXPANDABLE_TREE_NODE_CLASS);
        }
        if (tree_selection_1.ISelectableTreeNode.isSelected(node)) {
            classNames.push(widgets_1.SELECTED_CLASS);
        }
        return classNames;
    };
    TreeWidget.prototype.createNodeStyle = function (node, props) {
        return {
            paddingLeft: props.indentSize + "px",
            display: props.visible ? 'block' : 'none',
        };
    };
    TreeWidget.prototype.renderNodeCaption = function (node, props) {
        return virtualdom_1.h.div({
            className: exports.TREE_NODE_CAPTION_CLASS
        }, this.decorateCaption(node, node.name, props));
    };
    TreeWidget.prototype.decorateCaption = function (node, caption, props) {
        if (this.isExandable(node)) {
            return this.decorateExpandableCaption(node, caption, props);
        }
        return caption;
    };
    TreeWidget.prototype.isExandable = function (node) {
        return tree_expansion_1.IExpandableTreeNode.is(node);
    };
    TreeWidget.prototype.decorateExpandableCaption = function (node, caption, props) {
        var _this = this;
        var classNames = [exports.EXPANSION_TOGGLE_CLASS];
        if (!node.expanded) {
            classNames.push(widgets_1.COLLAPSED_CLASS);
        }
        var className = classNames.join(' ');
        var _a = this.props.expansionToggleSize, width = _a.width, height = _a.height;
        var expansionToggle = virtualdom_1.h.span({
            className: className,
            style: {
                width: width + "px",
                height: height + "px"
            },
            onclick: function (event) {
                _this.handleClickEvent(node, event);
                event.stopPropagation();
            }
        });
        return widgets_1.VirtualRenderer.merge(expansionToggle, caption);
    };
    TreeWidget.prototype.renderNodeChildren = function (node, props) {
        if (tree_1.ICompositeTreeNode.is(node)) {
            return this.renderCompositeChildren(node, props);
        }
        return null;
    };
    TreeWidget.prototype.renderCompositeChildren = function (parent, props) {
        var _this = this;
        return widgets_1.VirtualRenderer.flatten(parent.children.map(function (child) { return _this.renderChild(child, parent, props); }));
    };
    TreeWidget.prototype.renderChild = function (child, parent, props) {
        var childProps = this.createChildProps(child, parent, props);
        return this.renderNodes(child, childProps);
    };
    TreeWidget.prototype.createChildProps = function (child, parent, props) {
        if (this.isExandable(parent)) {
            return this.createExpandableChildProps(child, parent, props);
        }
        return props;
    };
    TreeWidget.prototype.createExpandableChildProps = function (child, parent, props) {
        if (!props.visible) {
            return props;
        }
        var visible = parent.expanded;
        var width = this.props.expansionToggleSize.width;
        var parentVisibility = tree_1.ITreeNode.isVisible(parent) ? 1 : 0;
        var childExpansion = this.isExandable(child) ? 0 : 1;
        var indentMultiplier = parentVisibility + childExpansion;
        var relativeIndentSize = width * indentMultiplier;
        var indentSize = props.indentSize + relativeIndentSize;
        return Object.assign({}, props, { visible: visible, indentSize: indentSize });
    };
    TreeWidget.prototype.onAfterAttach = function (msg) {
        var _this = this;
        _super.prototype.onAfterAttach.call(this, msg);
        this.addKeyListener(this.node, common_1.Key.ARROW_LEFT, function () { return _this.handleLeft(); });
        this.addKeyListener(this.node, common_1.Key.ARROW_RIGHT, function () { return _this.handleRight(); });
        this.addKeyListener(this.node, common_1.Key.ARROW_UP, function () { return _this.handleUp(); });
        this.addKeyListener(this.node, common_1.Key.ARROW_DOWN, function () { return _this.handleDown(); });
        this.addKeyListener(this.node, common_1.Key.ENTER, function () { return _this.handleEnter(); });
        this.addEventListener(this.node, 'contextmenu', function (e) { return _this.handleContextMenuEvent(_this.model.root, e); });
        this.addEventListener(this.node, 'click', function (e) { return _this.handleClickEvent(_this.model.root, e); });
    };
    TreeWidget.prototype.handleLeft = function () {
        if (!this.model.collapseNode()) {
            this.model.selectParent();
        }
    };
    TreeWidget.prototype.handleRight = function () {
        if (!this.model.expandNode()) {
            this.model.selectNextNode();
        }
    };
    TreeWidget.prototype.handleUp = function () {
        this.model.selectPrevNode();
    };
    TreeWidget.prototype.handleDown = function () {
        this.model.selectNextNode();
    };
    TreeWidget.prototype.handleEnter = function () {
        this.model.openNode();
    };
    TreeWidget.prototype.handleClickEvent = function (node, event) {
        if (node) {
            if (tree_selection_1.ISelectableTreeNode.is(node)) {
                this.model.selectNode(node);
            }
            if (this.isExandable(node)) {
                this.model.toggleNodeExpansion(node);
            }
            event.stopPropagation();
        }
    };
    TreeWidget.prototype.handleDblClickEvent = function (node, event) {
        this.model.openNode(node);
        event.stopPropagation();
    };
    TreeWidget.prototype.handleContextMenuEvent = function (node, event) {
        var _this = this;
        if (tree_selection_1.ISelectableTreeNode.is(node)) {
            this.model.selectNode(node);
            var contextMenuPath_1 = this.props.contextMenuPath;
            if (contextMenuPath_1) {
                this.onRender.push(common_1.Disposable.create(function () {
                    return setTimeout(function () {
                        return _this.contextMenuRenderer.render(contextMenuPath_1, event);
                    });
                }));
            }
            this.update();
        }
        event.stopPropagation();
        event.preventDefault();
    };
    TreeWidget.prototype.deflateForStorage = function (node) {
        var copy = Object.assign({}, node);
        if (copy.parent) {
            delete copy.parent;
        }
        if (tree_1.ICompositeTreeNode.is(node)) {
            copy.children = [];
            try {
                for (var _a = __values(node.children), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var child = _b.value;
                    copy.children.push(this.deflateForStorage(child));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return copy;
        var e_1, _c;
    };
    // tslint:disable-next-line:no-any
    TreeWidget.prototype.inflateFromStorage = function (node, parent) {
        if (node.selected) {
            node.selected = false;
        }
        if (parent) {
            node.parent = parent;
        }
        if (Array.isArray(node.children)) {
            try {
                for (var _a = __values(node.children), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var child = _b.value;
                    this.inflateFromStorage(child, node);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        return node;
        var e_2, _c;
    };
    TreeWidget.prototype.storeState = function () {
        if (this.model.root) {
            return {
                root: this.deflateForStorage(this.model.root)
            };
        }
        else {
            return {};
        }
    };
    TreeWidget.prototype.restoreState = function (oldState) {
        // tslint:disable-next-line:no-any
        if (oldState.root) {
            this.model.root = this.inflateFromStorage(oldState.root);
        }
    };
    TreeWidget = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(exports.TreeProps)),
        __param(1, inversify_1.inject(tree_model_1.ITreeModel)),
        __param(2, inversify_1.inject(context_menu_renderer_1.ContextMenuRenderer)),
        __metadata("design:paramtypes", [Object, Object, Object])
    ], TreeWidget);
    return TreeWidget;
}(widgets_1.VirtualWidget));
exports.TreeWidget = TreeWidget;
//# sourceMappingURL=tree-widget.js.map