"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var tree_widget_1 = require("./tree-widget");
var tree_model_1 = require("./tree-model");
var tree_1 = require("./tree");
var tree_selection_1 = require("./tree-selection");
var tree_expansion_1 = require("./tree-expansion");
var tree_navigation_1 = require("./tree-navigation");
function createTreeContainer(parent) {
    var child = new inversify_1.Container({ defaultScope: 'Singleton' });
    child.parent = parent;
    child.bind(tree_1.Tree).toSelf();
    child.bind(tree_1.ITree).toDynamicValue(function (ctx) { return ctx.container.get(tree_1.Tree); });
    child.bind(tree_selection_1.TreeSelectionService).toSelf();
    child.bind(tree_selection_1.ITreeSelectionService).toDynamicValue(function (ctx) { return ctx.container.get(tree_selection_1.TreeSelectionService); });
    child.bind(tree_expansion_1.TreeExpansionService).toSelf();
    child.bind(tree_expansion_1.ITreeExpansionService).toDynamicValue(function (ctx) { return ctx.container.get(tree_expansion_1.TreeExpansionService); });
    child.bind(tree_navigation_1.TreeNavigationService).toSelf();
    child.bind(tree_model_1.TreeServices).toSelf();
    child.bind(tree_model_1.TreeModel).toSelf();
    child.bind(tree_model_1.ITreeModel).toDynamicValue(function (ctx) { return ctx.container.get(tree_model_1.TreeModel); });
    child.bind(tree_widget_1.TreeWidget).toSelf();
    child.bind(tree_widget_1.TreeProps).toConstantValue(tree_widget_1.defaultTreeProps);
    return child;
}
exports.createTreeContainer = createTreeContainer;
//# sourceMappingURL=tree-container.js.map