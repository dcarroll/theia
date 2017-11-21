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
var virtualdom_1 = require("@phosphor/virtualdom");
var browser_1 = require("@theia/core/lib/browser");
var file_tree_1 = require("./file-tree");
var file_tree_model_1 = require("./file-tree-model");
var file_icons_1 = require("../icons/file-icons");
exports.FILE_TREE_CLASS = 'theia-FileTree';
exports.FILE_STAT_NODE_CLASS = 'theia-FileStatNode';
exports.DIR_NODE_CLASS = 'theia-DirNode';
exports.FILE_STAT_ICON_CLASS = 'theia-FileStatIcon';
var FileTreeWidget = /** @class */ (function (_super) {
    __extends(FileTreeWidget, _super);
    function FileTreeWidget(props, model, contextMenuRenderer, iconProvider) {
        var _this = _super.call(this, props, model, contextMenuRenderer) || this;
        _this.props = props;
        _this.model = model;
        _this.iconProvider = iconProvider;
        _this.addClass(exports.FILE_TREE_CLASS);
        return _this;
    }
    FileTreeWidget.prototype.createNodeClassNames = function (node, props) {
        var classNames = _super.prototype.createNodeClassNames.call(this, node, props);
        if (file_tree_1.FileStatNode.is(node)) {
            classNames.push(exports.FILE_STAT_NODE_CLASS);
        }
        if (file_tree_1.DirNode.is(node)) {
            classNames.push(exports.DIR_NODE_CLASS);
        }
        return classNames;
    };
    FileTreeWidget.prototype.decorateCaption = function (node, caption, props) {
        if (file_tree_1.FileStatNode.is(node)) {
            return this.decorateFileStatCaption(node, caption, props);
        }
        return _super.prototype.decorateCaption.call(this, node, caption, props);
    };
    FileTreeWidget.prototype.decorateFileStatCaption = function (node, caption, props) {
        var icon_class = this.iconProvider.getFileIconForStat(node.fileStat);
        var icon = virtualdom_1.h.span({
            className: icon_class
        });
        return _super.prototype.decorateCaption.call(this, node, browser_1.VirtualRenderer.merge(icon, caption), props);
    };
    FileTreeWidget = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(browser_1.TreeProps)),
        __param(1, inversify_1.inject(file_tree_model_1.FileTreeModel)),
        __param(2, inversify_1.inject(browser_1.ContextMenuRenderer)),
        __param(3, inversify_1.inject(file_icons_1.FileIconProvider)),
        __metadata("design:paramtypes", [Object, file_tree_model_1.FileTreeModel, Object, file_icons_1.FileIconProvider])
    ], FileTreeWidget);
    return FileTreeWidget;
}(browser_1.TreeWidget));
exports.FileTreeWidget = FileTreeWidget;
//# sourceMappingURL=file-tree-widget.js.map