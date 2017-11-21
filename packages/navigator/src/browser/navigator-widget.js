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
var command_1 = require("@theia/core/lib/common/command");
var browser_1 = require("@theia/core/lib/browser");
var browser_2 = require("@theia/filesystem/lib/browser");
var navigator_model_1 = require("./navigator-model");
var file_icons_1 = require("@theia/filesystem/lib/browser/icons/file-icons");
var lib_1 = require("@phosphor/virtualdom/lib");
var workspace_frontend_contribution_1 = require("@theia/workspace/lib/browser/workspace-frontend-contribution");
exports.FILE_STAT_NODE_CLASS = 'theia-FileStatNode';
exports.DIR_NODE_CLASS = 'theia-DirNode';
exports.FILE_STAT_ICON_CLASS = 'theia-FileStatIcon';
exports.FILE_NAVIGATOR_ID = 'files';
exports.LABEL = 'Files';
exports.CLASS = 'theia-Files';
var FileNavigatorWidget = /** @class */ (function (_super) {
    __extends(FileNavigatorWidget, _super);
    function FileNavigatorWidget(props, model, contextMenuRenderer, iconProvider, commandService) {
        var _this = _super.call(this, props, model, contextMenuRenderer, iconProvider) || this;
        _this.props = props;
        _this.model = model;
        _this.commandService = commandService;
        _this.id = exports.FILE_NAVIGATOR_ID;
        _this.title.label = exports.LABEL;
        _this.addClass(exports.CLASS);
        return _this;
    }
    FileNavigatorWidget.prototype.deflateForStorage = function (node) {
        var copy = Object.assign({}, node);
        if (copy.uri) {
            copy.uri = copy.uri.toString();
        }
        return _super.prototype.deflateForStorage.call(this, copy);
    };
    FileNavigatorWidget.prototype.inflateFromStorage = function (node, parent) {
        if (node.uri) {
            node.uri = new uri_1.default(node.uri);
        }
        return _super.prototype.inflateFromStorage.call(this, node, parent);
    };
    FileNavigatorWidget.prototype.renderTree = function (model) {
        return _super.prototype.renderTree.call(this, model) || this.renderOpenWorkspaceDiv();
    };
    FileNavigatorWidget.prototype.onAfterAttach = function (msg) {
        var _this = this;
        _super.prototype.onAfterAttach.call(this, msg);
        this.addClipboardListener(this.node, 'copy', function (e) { return _this.handleCopy(e); });
        this.addClipboardListener(this.node, 'paste', function (e) { return _this.handlePaste(e); });
    };
    FileNavigatorWidget.prototype.handleCopy = function (event) {
        var node = this.model.selectedFileStatNode;
        if (!node) {
            return;
        }
        var uri = node.uri.toString();
        event.clipboardData.setData('text/plain', uri);
        event.preventDefault();
    };
    FileNavigatorWidget.prototype.handlePaste = function (event) {
        var raw = event.clipboardData.getData('text/plain');
        if (!raw) {
            return;
        }
        var uri = new uri_1.default(raw);
        if (this.model.copy(uri)) {
            event.preventDefault();
        }
    };
    /**
     * Instead of rendering the file resources form the workspace, we render a placeholder
     * button when the workspace root is not yet set.
     */
    FileNavigatorWidget.prototype.renderOpenWorkspaceDiv = function () {
        var _this = this;
        var button = lib_1.h.button({
            className: 'open-workspace-button',
            title: 'Select a directory as your workspace root',
            onclick: function (e) { return _this.commandService.executeCommand(workspace_frontend_contribution_1.WorkspaceCommands.OPEN.id); }
        }, 'Open Workspace');
        var buttonContainer = lib_1.h.div({ className: 'open-workspace-button-container' }, button);
        return lib_1.h.div({ className: 'theia-workspace-container' }, 'You have not yet opened a workspace.', buttonContainer);
    };
    FileNavigatorWidget = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(browser_1.TreeProps)),
        __param(1, inversify_1.inject(navigator_model_1.FileNavigatorModel)),
        __param(2, inversify_1.inject(browser_1.ContextMenuRenderer)),
        __param(3, inversify_1.inject(file_icons_1.FileIconProvider)),
        __param(4, inversify_1.inject(command_1.CommandService)),
        __metadata("design:paramtypes", [Object, navigator_model_1.FileNavigatorModel, Object, file_icons_1.FileIconProvider, Object])
    ], FileNavigatorWidget);
    return FileNavigatorWidget;
}(browser_2.FileTreeWidget));
exports.FileNavigatorWidget = FileNavigatorWidget;
//# sourceMappingURL=navigator-widget.js.map