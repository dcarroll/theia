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
var browser_1 = require("@theia/core/lib/browser");
var lib_1 = require("@phosphor/virtualdom/lib");
var core_1 = require("@theia/core");
var browser_2 = require("@theia/core/lib/browser");
var OutlineSymbolInformationNode;
(function (OutlineSymbolInformationNode) {
    function is(node) {
        return !!node && browser_1.ISelectableTreeNode.is(node) && 'iconClass' in node;
    }
    OutlineSymbolInformationNode.is = is;
})(OutlineSymbolInformationNode = exports.OutlineSymbolInformationNode || (exports.OutlineSymbolInformationNode = {}));
exports.OutlineViewWidgetFactory = Symbol('OutlineViewWidgetFactory');
var OutlineViewWidget = /** @class */ (function (_super) {
    __extends(OutlineViewWidget, _super);
    function OutlineViewWidget(treeProps, model, contextMenuRenderer) {
        var _this = _super.call(this, treeProps, model, contextMenuRenderer) || this;
        _this.treeProps = treeProps;
        _this.contextMenuRenderer = contextMenuRenderer;
        _this.onDidChangeOpenStateEmitter = new core_1.Emitter();
        _this.id = 'outline-view';
        _this.title.label = 'Outline';
        _this.addClass('theia-outline-view');
        return _this;
    }
    OutlineViewWidget.prototype.setOutlineTree = function (roots) {
        var nodes = this.reconcileTreeState(roots);
        this.model.root = {
            id: 'outline-view-root',
            name: 'Outline Root',
            visible: false,
            children: nodes,
            parent: undefined
        };
    };
    OutlineViewWidget.prototype.reconcileTreeState = function (nodes) {
        var _this = this;
        nodes.forEach(function (node) {
            if (OutlineSymbolInformationNode.is(node)) {
                var treeNode = _this.model.getNode(node.id);
                if (treeNode && OutlineSymbolInformationNode.is(treeNode)) {
                    node.expanded = treeNode.expanded;
                    node.selected = treeNode.selected;
                }
                _this.reconcileTreeState(Array.from(node.children));
            }
        });
        return nodes;
    };
    OutlineViewWidget.prototype.onAfterHide = function (msg) {
        _super.prototype.onAfterHide.call(this, msg);
        this.onDidChangeOpenStateEmitter.fire(false);
    };
    OutlineViewWidget.prototype.onAfterShow = function (msg) {
        _super.prototype.onAfterShow.call(this, msg);
        this.onDidChangeOpenStateEmitter.fire(true);
    };
    OutlineViewWidget.prototype.onUpdateRequest = function (msg) {
        if (!this.model.selectedNode && browser_1.ISelectableTreeNode.is(this.model.root)) {
            this.model.selectNode(this.model.root);
        }
        _super.prototype.onUpdateRequest.call(this, msg);
    };
    OutlineViewWidget.prototype.decorateCaption = function (node, caption, props) {
        var newCaption = caption;
        if (OutlineSymbolInformationNode.is(node)) {
            var icon = lib_1.h.span({ className: "symbol-icon " + node.iconClass });
            newCaption = browser_2.VirtualRenderer.merge(icon, caption);
        }
        return _super.prototype.decorateCaption.call(this, node, newCaption, props);
    };
    OutlineViewWidget.prototype.isExandable = function (node) {
        return OutlineSymbolInformationNode.is(node) && node.children.length > 0;
    };
    OutlineViewWidget = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(browser_1.TreeProps)),
        __param(1, inversify_1.inject(browser_1.TreeModel)),
        __param(2, inversify_1.inject(browser_1.ContextMenuRenderer)),
        __metadata("design:paramtypes", [Object, browser_1.TreeModel, Object])
    ], OutlineViewWidget);
    return OutlineViewWidget;
}(browser_1.TreeWidget));
exports.OutlineViewWidget = OutlineViewWidget;
//# sourceMappingURL=outline-view-widget.js.map