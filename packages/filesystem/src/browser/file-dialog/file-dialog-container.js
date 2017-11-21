"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var browser_1 = require("@theia/core/lib/browser");
var file_tree_1 = require("../file-tree");
var file_dialog_1 = require("./file-dialog");
var file_dialog_model_1 = require("./file-dialog-model");
var file_dialog_widget_1 = require("./file-dialog-widget");
function createFileDialogContainer(parent) {
    var child = file_tree_1.createFileTreeContainer(parent);
    child.unbind(file_tree_1.FileTreeModel);
    child.bind(file_dialog_model_1.FileDialogModel).toSelf();
    child.rebind(browser_1.ITreeModel).toDynamicValue(function (ctx) { return ctx.container.get(file_dialog_model_1.FileDialogModel); });
    child.unbind(file_tree_1.FileTreeWidget);
    child.bind(file_dialog_widget_1.FileDialogWidget).toSelf();
    child.bind(file_dialog_1.FileDialog).toSelf();
    return child;
}
exports.createFileDialogContainer = createFileDialogContainer;
function createFileDialog(parent, props) {
    var container = createFileDialogContainer(parent);
    container.bind(file_dialog_1.FileDialogProps).toConstantValue(props);
    return container.get(file_dialog_1.FileDialog);
}
exports.createFileDialog = createFileDialog;
//# sourceMappingURL=file-dialog-container.js.map