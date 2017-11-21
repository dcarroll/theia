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
var common_2 = require("@theia/languages/lib/common");
var browser_2 = require("@theia/editor/lib/browser");
var monaco_languageclient_1 = require("monaco-languageclient");
var monaco_editor_provider_1 = require("./monaco-editor-provider");
var monaco_menu_1 = require("./monaco-menu");
var monaco_command_1 = require("./monaco-command");
var monaco_keybinding_1 = require("./monaco-keybinding");
var monaco_languages_1 = require("./monaco-languages");
var monaco_workspace_1 = require("./monaco-workspace");
var monaco_editor_service_1 = require("./monaco-editor-service");
var monaco_text_model_service_1 = require("./monaco-text-model-service");
var monaco_context_menu_1 = require("./monaco-context-menu");
var monaco_outline_contribution_1 = require("./monaco-outline-contribution");
var monaco_command_service_1 = require("./monaco-command-service");
var monaco_command_registry_1 = require("./monaco-command-registry");
var monaco_quick_open_service_1 = require("./monaco-quick-open-service");
inversify_1.decorate(inversify_1.injectable(), monaco_languageclient_1.MonacoToProtocolConverter);
inversify_1.decorate(inversify_1.injectable(), monaco_languageclient_1.ProtocolToMonacoConverter);
require("../../src/browser/style/index.css");
require("../../src/browser/style/symbol-sprite.svg");
require("../../src/browser/style/symbol-icons.css");
exports.default = new inversify_1.ContainerModule(function (bind, unbind, isBound, rebind) {
    bind(monaco_languageclient_1.MonacoToProtocolConverter).toSelf().inSingletonScope();
    bind(monaco_languageclient_1.ProtocolToMonacoConverter).toSelf().inSingletonScope();
    bind(monaco_languages_1.MonacoLanguages).toSelf().inSingletonScope();
    bind(common_2.Languages).toDynamicValue(function (ctx) { return ctx.container.get(monaco_languages_1.MonacoLanguages); });
    bind(monaco_workspace_1.MonacoWorkspace).toSelf().inSingletonScope();
    bind(common_2.Workspace).toDynamicValue(function (ctx) { return ctx.container.get(monaco_workspace_1.MonacoWorkspace); });
    bind(monaco_editor_service_1.MonacoEditorService).toSelf().inSingletonScope();
    bind(monaco_text_model_service_1.MonacoTextModelService).toSelf().inSingletonScope();
    bind(monaco_context_menu_1.MonacoContextMenuService).toSelf().inSingletonScope();
    bind(monaco_editor_provider_1.MonacoEditorProvider).toSelf().inSingletonScope();
    bind(monaco_command_service_1.MonacoCommandService).toSelf().inTransientScope();
    bind(monaco_command_service_1.MonacoCommandServiceFactory).toAutoFactory(monaco_command_service_1.MonacoCommandService);
    bind(browser_2.TextEditorProvider).toProvider(function (context) {
        return function (uri) { return context.container.get(monaco_editor_provider_1.MonacoEditorProvider).get(uri); };
    });
    bind(monaco_outline_contribution_1.MonacoOutlineContribution).toSelf().inSingletonScope();
    bind(browser_1.FrontendApplicationContribution).toDynamicValue(function (ctx) { return ctx.container.get(monaco_outline_contribution_1.MonacoOutlineContribution); });
    bind(monaco_command_registry_1.MonacoCommandRegistry).toSelf().inSingletonScope();
    bind(common_1.CommandContribution).to(monaco_command_1.MonacoEditorCommandHandlers).inSingletonScope();
    bind(common_1.MenuContribution).to(monaco_menu_1.MonacoEditorMenuContribution).inSingletonScope();
    bind(common_1.KeybindingContribution).to(monaco_keybinding_1.MonacoKeybindingContribution).inSingletonScope();
    bind(monaco_quick_open_service_1.MonacoQuickOpenService).toSelf().inSingletonScope();
    rebind(browser_1.QuickOpenService).toDynamicValue(function (ctx) {
        return ctx.container.get(monaco_quick_open_service_1.MonacoQuickOpenService);
    }).inSingletonScope();
});
//# sourceMappingURL=monaco-frontend-module.js.map