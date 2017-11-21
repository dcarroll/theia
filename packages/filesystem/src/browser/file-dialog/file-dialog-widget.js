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
var file_tree_1 = require("../file-tree");
var file_dialog_model_1 = require("./file-dialog-model");
var file_icons_1 = require("../icons/file-icons");
exports.FILE_DIALOG_CLASS = 'theia-FileDialog';
var FileDialogWidget = /** @class */ (function (_super) {
    __extends(FileDialogWidget, _super);
    function FileDialogWidget(props, model, contextMenuRenderer, iconProvider) {
        var _this = _super.call(this, props, model, contextMenuRenderer, iconProvider) || this;
        _this.props = props;
        _this.model = model;
        _this.iconProvider = iconProvider;
        _this.addClass(exports.FILE_DIALOG_CLASS);
        return _this;
    }
    FileDialogWidget = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(browser_1.TreeProps)),
        __param(1, inversify_1.inject(file_dialog_model_1.FileDialogModel)),
        __param(2, inversify_1.inject(browser_1.ContextMenuRenderer)),
        __param(3, inversify_1.inject(file_icons_1.FileIconProvider)),
        __metadata("design:paramtypes", [Object, file_dialog_model_1.FileDialogModel, Object, file_icons_1.FileIconProvider])
    ], FileDialogWidget);
    return FileDialogWidget;
}(file_tree_1.FileTreeWidget));
exports.FileDialogWidget = FileDialogWidget;
//# sourceMappingURL=file-dialog-widget.js.map