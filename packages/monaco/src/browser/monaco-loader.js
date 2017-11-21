"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
function loadVsRequire(context) {
    // Monaco uses a custom amd loader that over-rides node's require.
    // Keep a reference to an original require so we can restore it after executing the amd loader file.
    var originalRequire = context.require;
    return new Promise(function (resolve) {
        window.onload = function () {
            var vsLoader = document.createElement('script');
            vsLoader.type = 'text/javascript';
            vsLoader.src = './vs/loader.js';
            vsLoader.charset = 'utf-8';
            vsLoader.addEventListener('load', function () {
                // Save Monaco's amd require and restore the original require
                var amdRequire = context.require;
                context.require = originalRequire;
                resolve(amdRequire);
            });
            document.body.appendChild(vsLoader);
        };
    });
}
exports.loadVsRequire = loadVsRequire;
function loadMonaco(vsRequire) {
    return new Promise(function (resolve) {
        vsRequire(["vs/editor/editor.main"], function () {
            vsRequire([
                'vs/basic-languages/src/monaco.contribution',
                'vs/language/css/monaco.contribution',
                'vs/language/html/monaco.contribution',
                'vs/language/json/monaco.contribution',
                'vs/platform/commands/common/commands',
                'vs/platform/actions/common/actions',
                'vs/platform/keybinding/common/keybindingsRegistry',
                'vs/platform/keybinding/common/keybindingResolver',
                'vs/platform/keybinding/common/usLayoutResolvedKeybinding',
                'vs/base/common/keyCodes',
                'vs/editor/common/editorCommonExtensions',
                'vs/editor/standalone/browser/simpleServices',
                'vs/editor/standalone/browser/standaloneServices',
                'vs/base/parts/quickopen/common/quickOpen',
                'vs/base/parts/quickopen/browser/quickOpenWidget',
                'vs/base/parts/quickopen/browser/quickOpenModel',
                'vs/base/common/filters',
                'vs/platform/theme/common/styler',
                'vs/base/common/platform',
                'vs/editor/common/modes',
                'vs/base/common/cancellation'
            ], function (basic, css, html, json, commands, actions, registry, resolver, resolvedKeybinding, keyCodes, editorCommonExtensions, simpleServices, standaloneServices, quickOpen, quickOpenWidget, quickOpenModel, filters, styler, platform, modes, cancellation) {
                var global = self;
                global.monaco.commands = commands;
                global.monaco.actions = actions;
                global.monaco.keybindings = Object.assign({}, registry, resolver, resolvedKeybinding, keyCodes);
                global.monaco.services = Object.assign({}, simpleServices, standaloneServices);
                global.monaco.quickOpen = Object.assign({}, quickOpen, quickOpenWidget, quickOpenModel);
                global.monaco.filters = filters;
                global.monaco.theme = styler;
                global.monaco.platform = platform;
                global.monaco.editorCommonExtensions = editorCommonExtensions;
                global.monaco.modes = modes;
                global.monaco.cancellation = cancellation;
                resolve();
            });
        });
    });
}
exports.loadMonaco = loadMonaco;
//# sourceMappingURL=monaco-loader.js.map