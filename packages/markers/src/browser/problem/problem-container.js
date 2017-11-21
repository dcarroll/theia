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
var marker_tree_1 = require("../marker-tree");
var problem_widget_1 = require("./problem-widget");
var problem_tree_model_1 = require("./problem-tree-model");
var browser_1 = require("@theia/core/lib/browser");
var marker_tree_model_1 = require("../marker-tree-model");
var problem_marker_1 = require("../../common/problem-marker");
exports.PROBLEM_TREE_PROPS = __assign({}, browser_1.defaultTreeProps, { contextMenuPath: [problem_marker_1.PROBLEM_KIND] });
exports.PROBLEM_OPTIONS = {
    kind: 'problem'
};
function createProblemTreeContainer(parent) {
    var child = browser_1.createTreeContainer(parent);
    child.unbind(browser_1.Tree);
    child.bind(problem_tree_model_1.ProblemTree).toSelf();
    child.rebind(browser_1.ITree).toDynamicValue(function (ctx) { return ctx.container.get(problem_tree_model_1.ProblemTree); });
    child.unbind(browser_1.TreeWidget);
    child.bind(problem_widget_1.ProblemWidget).toSelf();
    child.unbind(browser_1.TreeModel);
    child.bind(problem_tree_model_1.ProblemTreeModel).toSelf();
    child.rebind(browser_1.ITreeModel).toDynamicValue(function (ctx) { return ctx.container.get(problem_tree_model_1.ProblemTreeModel); });
    child.bind(marker_tree_model_1.MarkerTreeServices).toSelf();
    child.rebind(browser_1.TreeProps).toConstantValue(exports.PROBLEM_TREE_PROPS);
    child.bind(marker_tree_1.MarkerOptions).toConstantValue(exports.PROBLEM_OPTIONS);
    return child;
}
exports.createProblemTreeContainer = createProblemTreeContainer;
function createProblemWidget(parent) {
    return createProblemTreeContainer(parent).get(problem_widget_1.ProblemWidget);
}
exports.createProblemWidget = createProblemWidget;
//# sourceMappingURL=problem-container.js.map