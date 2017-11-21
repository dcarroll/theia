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
var common_1 = require("../../common");
var browser_1 = require("../../browser");
var electron_main_menu_factory_1 = require("./electron-main-menu-factory");
var electron_context_menu_renderer_1 = require("./electron-context-menu-renderer");
var electron_menu_contribution_1 = require("./electron-menu-contribution");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(electron_main_menu_factory_1.ElectronMainMenuFactory).toSelf().inSingletonScope();
    bind(browser_1.ContextMenuRenderer).to(electron_context_menu_renderer_1.ElectronContextMenuRenderer).inSingletonScope();
    bind(common_1.KeybindingContext).toConstantValue({
        id: "theia.context",
        isEnabled: true
    });
    bind(electron_menu_contribution_1.ElectronMenuContribution).toSelf().inSingletonScope();
    try {
        for (var _a = __values([browser_1.FrontendApplicationContribution, common_1.KeybindingContribution, common_1.CommandContribution, common_1.MenuContribution]), _b = _a.next(); !_b.done; _b = _a.next()) {
            var serviceIdentifier = _b.value;
            bind(serviceIdentifier).toDynamicValue(function (ctx) { return ctx.container.get(electron_menu_contribution_1.ElectronMenuContribution); }).inSingletonScope();
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
//# sourceMappingURL=electron-menu-module.js.map