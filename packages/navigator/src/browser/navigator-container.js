"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var browser_1 = require("@theia/core/lib/browser");
var browser_2 = require("@theia/filesystem/lib/browser");
var navigator_tree_1 = require("./navigator-tree");
var navigator_model_1 = require("./navigator-model");
var navigator_widget_1 = require("./navigator-widget");
var navigator_menu_1 = require("./navigator-menu");
exports.FILE_NAVIGATOR_PROPS = __assign({}, browser_1.defaultTreeProps, { contextMenuPath: navigator_menu_1.NAVIGATOR_CONTEXT_MENU });
function createFileNavigatorContainer(parent) {
    var child = browser_2.createFileTreeContainer(parent);
    child.unbind(browser_2.FileTree);
    child.bind(navigator_tree_1.FileNavigatorTree).toSelf();
    child.rebind(browser_1.ITree).toDynamicValue(function (ctx) { return ctx.container.get(navigator_tree_1.FileNavigatorTree); });
    child.unbind(browser_2.FileTreeServices);
    child.bind(navigator_model_1.FileNavigatorServices).toSelf();
    child.unbind(browser_2.FileTreeModel);
    child.bind(navigator_model_1.FileNavigatorModel).toSelf();
    child.rebind(browser_1.ITreeModel).toDynamicValue(function (ctx) { return ctx.container.get(navigator_model_1.FileNavigatorModel); });
    child.unbind(browser_2.FileTreeWidget);
    child.bind(navigator_widget_1.FileNavigatorWidget).toSelf();
    child.rebind(browser_1.TreeProps).toConstantValue(exports.FILE_NAVIGATOR_PROPS);
    return child;
}
exports.createFileNavigatorContainer = createFileNavigatorContainer;
function createFileNavigatorWidget(parent) {
    return createFileNavigatorContainer(parent).get(navigator_widget_1.FileNavigatorWidget);
}
exports.createFileNavigatorWidget = createFileNavigatorWidget;
//# sourceMappingURL=navigator-container.js.map