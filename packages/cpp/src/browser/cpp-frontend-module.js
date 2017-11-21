"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
var cpp_commands_1 = require("./cpp-commands");
var browser_1 = require("@theia/languages/lib/browser");
var cpp_client_contribution_1 = require("./cpp-client-contribution");
var common_2 = require("../common");
var cpp_keybinding_1 = require("./cpp-keybinding");
exports.default = new inversify_1.ContainerModule(function (bind) {
    common_2.bindCppPreferences(bind);
    bind(common_1.CommandContribution).to(cpp_commands_1.CppCommandContribution).inSingletonScope();
    bind(cpp_keybinding_1.CppKeybindingContext).toSelf().inSingletonScope();
    bind(common_1.KeybindingContext).toDynamicValue(function (context) { return context.container.get(cpp_keybinding_1.CppKeybindingContext); });
    bind(common_1.KeybindingContribution).to(cpp_keybinding_1.CppKeybindingContribution).inSingletonScope();
    bind(cpp_client_contribution_1.CppClientContribution).toSelf().inSingletonScope();
    bind(browser_1.LanguageClientContribution).toDynamicValue(function (ctx) { return ctx.container.get(cpp_client_contribution_1.CppClientContribution); });
});
//# sourceMappingURL=cpp-frontend-module.js.map