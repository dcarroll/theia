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
var problem_manager_1 = require("./problem-manager");
var problem_marker_1 = require("../../common/problem-marker");
var problem_tree_model_1 = require("./problem-tree-model");
var marker_tree_1 = require("../marker-tree");
var browser_1 = require("@theia/core/lib/browser");
var lib_1 = require("@phosphor/virtualdom/lib");
var file_icons_1 = require("@theia/filesystem/lib/browser/icons/file-icons");
var uri_1 = require("@theia/core/lib/common/uri");
var common_1 = require("@theia/filesystem/lib/common");
var browser_2 = require("@theia/workspace/lib/browser");
var ProblemWidget = /** @class */ (function (_super) {
    __extends(ProblemWidget, _super);
    function ProblemWidget(problemManager, treeProps, model, contextMenuRenderer, iconProvider, workspaceService) {
        var _this = _super.call(this, treeProps, model, contextMenuRenderer) || this;
        _this.problemManager = problemManager;
        _this.treeProps = treeProps;
        _this.model = model;
        _this.contextMenuRenderer = contextMenuRenderer;
        _this.iconProvider = iconProvider;
        _this.workspaceService = workspaceService;
        _this.id = 'problems';
        _this.title.label = 'Problems';
        _this.title.iconClass = 'fa fa-exclamation-circle';
        _this.title.closable = true;
        _this.addClass('theia-marker-container');
        _this.workspaceService.root.then(function (workspaceFileStat) {
            _this.workspacePath = workspaceFileStat ? workspaceFileStat.uri : undefined;
            _this.update();
        });
        _this.addClipboardListener(_this.node, 'copy', function (e) { return _this.handleCopy(e); });
        return _this;
    }
    ProblemWidget.prototype.deflateForStorage = function (node) {
        var result = _super.prototype.deflateForStorage.call(this, node);
        if (common_1.UriSelection.is(node) && node.uri) {
            result.uri = node.uri.toString();
        }
        return result;
    };
    ProblemWidget.prototype.inflateFromStorage = function (node, parent) {
        if (node.uri) {
            node.uri = new uri_1.default(node.uri);
        }
        if (node.selected) {
            node.selected = false;
        }
        return _super.prototype.inflateFromStorage.call(this, node);
    };
    ProblemWidget.prototype.handleCopy = function (event) {
        var node = this.model.selectedNode;
        if (!node) {
            return;
        }
        if (marker_tree_1.MarkerNode.is(node)) {
            var uri = node.uri;
            event.clipboardData.setData('text/plain', uri.toString());
            event.preventDefault();
        }
    };
    ProblemWidget.prototype.onUpdateRequest = function (msg) {
        if (!this.model.selectedNode && browser_1.ISelectableTreeNode.is(this.model.root)) {
            this.model.selectNode(this.model.root);
        }
        _super.prototype.onUpdateRequest.call(this, msg);
    };
    ProblemWidget.prototype.renderTree = function (model) {
        return _super.prototype.renderTree.call(this, model) || lib_1.h.div({ className: 'noMarkers' }, 'No problems have been detected in the workspace so far.');
    };
    ProblemWidget.prototype.decorateCaption = function (node, caption, props) {
        if (marker_tree_1.MarkerInfoNode.is(node)) {
            return _super.prototype.decorateExpandableCaption.call(this, node, this.decorateMarkerFileNode(node, caption), props);
        }
        else if (marker_tree_1.MarkerNode.is(node)) {
            return _super.prototype.decorateCaption.call(this, node, this.decorateMarkerNode(node, caption), props);
        }
        return lib_1.h.div({}, 'caption');
    };
    ProblemWidget.prototype.decorateMarkerNode = function (node, caption) {
        if (problem_marker_1.ProblemMarker.is(node.marker)) {
            var severityClass = '';
            var problemMarker = node.marker;
            if (problemMarker.data.severity) {
                severityClass = this.getSeverityClass(problemMarker.data.severity);
            }
            var severityDiv = lib_1.h.div({}, lib_1.h.i({ className: severityClass }));
            var ownerDiv = lib_1.h.div({ className: 'owner' }, '[' + problemMarker.owner + ']');
            var startingPointDiv = lib_1.h.span({ className: 'position' }, '(' + (problemMarker.data.range.start.line + 1) + ', ' + (problemMarker.data.range.start.character + 1) + ')');
            var messageDiv = lib_1.h.div({ className: 'message' }, problemMarker.data.message, startingPointDiv);
            return lib_1.h.div({ className: 'markerNode' }, severityDiv, ownerDiv, messageDiv);
        }
        return '';
    };
    ProblemWidget.prototype.getSeverityClass = function (severity) {
        switch (severity) {
            case 1: return 'fa fa-times-circle error';
            case 2: return 'fa fa-exclamation-circle warning';
            case 3: return 'fa fa-info-circle information';
            default: return 'fa fa-hand-o-up hint';
        }
    };
    ProblemWidget.prototype.decorateMarkerFileNode = function (node, caption) {
        var fileIcon = this.iconProvider.getFileIconForURI(node.uri);
        var filenameDiv = lib_1.h.div({ className: fileIcon }, node.uri.displayName);
        var pathDiv = lib_1.h.div({ className: 'path' }, this.getRelativePath(node));
        var counterDiv = lib_1.h.div({ className: 'counter' }, node.numberOfMarkers.toString());
        return lib_1.h.div({ className: 'markerFileNode' }, filenameDiv, pathDiv, counterDiv);
    };
    ProblemWidget.prototype.getRelativePath = function (node) {
        var absPath = node.uri.parent.toString();
        if (this.workspacePath) {
            return absPath.substr(this.workspacePath.length);
        }
        return absPath;
    };
    ProblemWidget = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(problem_manager_1.ProblemManager)),
        __param(1, inversify_1.inject(browser_1.TreeProps)),
        __param(2, inversify_1.inject(problem_tree_model_1.ProblemTreeModel)),
        __param(3, inversify_1.inject(browser_1.ContextMenuRenderer)),
        __param(4, inversify_1.inject(file_icons_1.FileIconProvider)),
        __param(5, inversify_1.inject(browser_2.WorkspaceService)),
        __metadata("design:paramtypes", [problem_manager_1.ProblemManager, Object, problem_tree_model_1.ProblemTreeModel, Object, file_icons_1.FileIconProvider,
            browser_2.WorkspaceService])
    ], ProblemWidget);
    return ProblemWidget;
}(browser_1.TreeWidget));
exports.ProblemWidget = ProblemWidget;
//# sourceMappingURL=problem-widget.js.map