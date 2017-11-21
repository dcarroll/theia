"use strict";
/*
* Copyright (C) 2017 TypeFox and others.
*
* Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
* You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var problem_widget_1 = require("./problem-widget");
var problem_contribution_1 = require("./problem-contribution");
var problem_container_1 = require("./problem-container");
var common_1 = require("@theia/core/lib/common");
var browser_1 = require("@theia/core/lib/browser");
var problem_manager_1 = require("./problem-manager");
var problem_marker_1 = require("../../common/problem-marker");
var widget_manager_1 = require("@theia/core/lib/browser/widget-manager");
require("../../../src/browser/style/index.css");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(problem_manager_1.ProblemManager).toSelf().inSingletonScope();
    bind(problem_widget_1.ProblemWidget).toDynamicValue(function (ctx) {
        return problem_container_1.createProblemWidget(ctx.container);
    });
    bind(widget_manager_1.WidgetFactory).toDynamicValue(function (context) { return ({
        id: problem_marker_1.PROBLEM_KIND,
        createWidget: function () { return context.container.get(problem_widget_1.ProblemWidget); }
    }); });
    bind(problem_contribution_1.ProblemContribution).toSelf().inSingletonScope();
    try {
        for (var _a = __values([common_1.CommandContribution, common_1.MenuContribution, common_1.KeybindingContribution, browser_1.FrontendApplicationContribution]), _b = _a.next(); !_b.done; _b = _a.next()) {
            var identifier = _b.value;
            bind(identifier).toDynamicValue(function (ctx) {
                return ctx.container.get(problem_contribution_1.ProblemContribution);
            }).inSingletonScope();
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var e_1, _c;
});
//# sourceMappingURL=problem-frontend-module.js.map