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
var common_1 = require("@theia/core/lib/common");
var browser_1 = require("@theia/core/lib/browser");
var location_1 = require("../location");
var file_dialog_widget_1 = require("./file-dialog-widget");
exports.FileDialogFactory = Symbol('FileDialogFactory');
exports.NAVIGATION_PANEL_CLASS = 'theia-NavigationPanel';
exports.CONTROL_PANEL_CLASS = 'theia-ControlPanel';
var FileDialogProps = /** @class */ (function (_super) {
    __extends(FileDialogProps, _super);
    function FileDialogProps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileDialogProps = __decorate([
        inversify_1.injectable()
    ], FileDialogProps);
    return FileDialogProps;
}(browser_1.DialogProps));
exports.FileDialogProps = FileDialogProps;
var FileDialog = /** @class */ (function (_super) {
    __extends(FileDialog, _super);
    function FileDialog(props, widget) {
        var _this = _super.call(this, props) || this;
        _this.widget = widget;
        _this.toDispose.push(widget);
        _this.toDispose.push(_this.model.onChanged(function () {
            return _this.update();
        }));
        _this.toDispose.push(_this.model.onDidOpenFile(function () {
            return _this.accept();
        }));
        var navigationPanel = document.createElement('div');
        navigationPanel.classList.add(exports.NAVIGATION_PANEL_CLASS);
        _this.contentNode.appendChild(navigationPanel);
        navigationPanel.appendChild(_this.back = browser_1.createIconButton('fa', 'fa-chevron-left'));
        navigationPanel.appendChild(_this.forward = browser_1.createIconButton('fa', 'fa-chevron-right'));
        _this.locationListRenderer = _this.createLocationListRenderer();
        navigationPanel.appendChild(_this.locationListRenderer.host);
        return _this;
    }
    Object.defineProperty(FileDialog.prototype, "model", {
        get: function () {
            return this.widget.model;
        },
        enumerable: true,
        configurable: true
    });
    FileDialog.prototype.createLocationListRenderer = function () {
        return new location_1.LocationListRenderer(this.model);
    };
    FileDialog.prototype.onUpdateRequest = function (msg) {
        _super.prototype.onUpdateRequest.call(this, msg);
        browser_1.setEnabled(this.back, this.model.canNavigateBackward());
        browser_1.setEnabled(this.forward, this.model.canNavigateForward());
        this.locationListRenderer.render();
    };
    FileDialog.prototype.onAfterAttach = function (msg) {
        var _this = this;
        browser_1.Widget.attach(this.widget, this.contentNode);
        this.toDisposeOnDetach.push(common_1.Disposable.create(function () {
            return browser_1.Widget.detach(_this.widget);
        }));
        var controlPanel = document.createElement('div');
        controlPanel.classList.add(exports.CONTROL_PANEL_CLASS);
        this.contentNode.appendChild(controlPanel);
        controlPanel.appendChild(this.createCloseButton('Cancel'));
        controlPanel.appendChild(this.createAcceptButton('Open'));
        this.addKeyListener(this.back, common_1.Key.ENTER, function () { return _this.model.navigateBackward(); }, 'click');
        this.addKeyListener(this.forward, common_1.Key.ENTER, function () { return _this.model.navigateForward(); }, 'click');
        _super.prototype.onAfterAttach.call(this, msg);
    };
    FileDialog.prototype.onActivateRequest = function (msg) {
        this.widget.activate();
    };
    Object.defineProperty(FileDialog.prototype, "value", {
        get: function () {
            return this.widget.model.selectedFileStatNode;
        },
        enumerable: true,
        configurable: true
    });
    FileDialog = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(FileDialogProps)),
        __param(1, inversify_1.inject(file_dialog_widget_1.FileDialogWidget)),
        __metadata("design:paramtypes", [FileDialogProps,
            file_dialog_widget_1.FileDialogWidget])
    ], FileDialog);
    return FileDialog;
}(browser_1.AbstractDialog));
exports.FileDialog = FileDialog;
//# sourceMappingURL=file-dialog.js.map