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
var browser_1 = require("@theia/core/lib/browser");
var editor_manager_1 = require("./editor-manager");
var editor_contribution_1 = require("./editor-contribution");
var editor_menu_1 = require("./editor-menu");
var editor_command_1 = require("./editor-command");
var editor_keybinding_1 = require("./editor-keybinding");
var editor_preferences_1 = require("./editor-preferences");
exports.default = new inversify_1.ContainerModule(function (bind) {
    editor_preferences_1.bindEditorPreferences(bind);
    bind(editor_manager_1.EditorManagerImpl).toSelf().inSingletonScope();
    bind(editor_manager_1.EditorManager).toDynamicValue(function (c) { return c.container.get(editor_manager_1.EditorManagerImpl); }).inSingletonScope();
    bind(browser_1.WidgetFactory).toDynamicValue(function (c) { return c.container.get(editor_manager_1.EditorManagerImpl); }).inSingletonScope();
    bind(browser_1.OpenHandler).toDynamicValue(function (context) { return context.container.get(editor_manager_1.EditorManager); }).inSingletonScope();
    bind(common_1.CommandContribution).to(editor_command_1.EditorCommandContribution).inSingletonScope();
    bind(common_1.MenuContribution).to(editor_menu_1.EditorMenuContribution).inSingletonScope();
    bind(editor_keybinding_1.EditorKeybindingContext).toSelf().inSingletonScope();
    bind(common_1.KeybindingContext).toDynamicValue(function (context) { return context.container.get(editor_keybinding_1.EditorKeybindingContext); }).inSingletonScope();
    bind(common_1.KeybindingContribution).to(editor_keybinding_1.EditorKeybindingContribution).inSingletonScope();
    bind(editor_contribution_1.EditorContribution).toSelf().inSingletonScope();
    bind(browser_1.FrontendApplicationContribution).toDynamicValue(function (c) { return c.container.get(editor_contribution_1.EditorContribution); });
});
//# sourceMappingURL=editor-frontend-module.js.map