"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var browser_1 = require("@theia/core/lib/browser");
var file_tree_1 = require("./file-tree");
var file_tree_model_1 = require("./file-tree-model");
var file_tree_widget_1 = require("./file-tree-widget");
function createFileTreeContainer(parent) {
    var child = browser_1.createTreeContainer(parent);
    child.unbind(browser_1.Tree);
    child.bind(file_tree_1.FileTree).toSelf();
    child.rebind(browser_1.ITree).toDynamicValue(function (ctx) { return ctx.container.get(file_tree_1.FileTree); });
    child.unbind(browser_1.TreeServices);
    child.bind(file_tree_model_1.FileTreeServices).toSelf();
    child.unbind(browser_1.TreeModel);
    child.bind(file_tree_model_1.FileTreeModel).toSelf();
    child.rebind(browser_1.ITreeModel).toDynamicValue(function (ctx) { return ctx.container.get(file_tree_model_1.FileTreeModel); });
    child.unbind(browser_1.TreeWidget);
    child.bind(file_tree_widget_1.FileTreeWidget).toSelf();
    return child;
}
exports.createFileTreeContainer = createFileTreeContainer;
//# sourceMappingURL=file-tree-container.js.map