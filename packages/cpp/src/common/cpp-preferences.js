"use strict";
/*
 * Copyright (C) 2017 Ericsson and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@theia/preferences/lib/common");
exports.CppConfigSchema = {
    "type": "object",
    "properties": {
        "cpp.clangdCompileCommandsPath": {
            "type": "string",
            "description": "clangd path for compile_commands.json"
        },
        "cpp.clangdPath": {
            "type": "string",
            "description": "Literal command to start Clangd with. Can contain any relative or absolute path to clangd executable."
        },
        "cpp.clangdCommandArgs": {
            "type": "string",
            "description": "Literal command to start Clangd with. Can contain any relative or absolute path to clangd executable."
        }
    }
};
exports.defaultCppConfiguration = {
    'cpp.clangdCompileCommandsPath': "-compile-commands-dir=/home/ewilenr/theiaEclipse/eclipse/git/llvm/build",
    'cpp.clangdPath': "/home/ewilenr/theiaEclipse/eclipse/git/llvm/build/bin/compile_commands.json"
};
exports.CppPreferences = Symbol('CppPreferences');
function createCppPreferences(preferences) {
    return common_1.createPreferenceProxy(preferences, exports.defaultCppConfiguration, exports.CppConfigSchema);
}
exports.createCppPreferences = createCppPreferences;
function bindCppPreferences(bind) {
    bind(exports.CppPreferences).toDynamicValue(function (ctx) {
        var preferences = ctx.container.get(common_1.PreferenceService);
        return createCppPreferences(preferences);
    });
    bind(common_1.PreferenceContribution).toConstantValue({ schema: exports.CppConfigSchema });
}
exports.bindCppPreferences = bindCppPreferences;
//# sourceMappingURL=cpp-preferences.js.map