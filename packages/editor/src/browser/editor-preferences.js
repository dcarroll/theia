"use strict";
/*
 * Copyright (C) 2017 Ericsson and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var preferences_api_1 = require("@theia/preferences-api");
exports.editorPreferenceSchema = {
    "type": "object",
    "properties": {
        "editor.tabSize": {
            "type": "number",
            "minimum": 1,
            "description": "Configure the tab size in the editor"
        },
        "editor.lineNumbers": {
            "enum": [
                "on",
                "off"
            ],
            "description": "Control the rendering of line numbers"
        },
        "editor.renderWhitespace": {
            "enum": [
                "none",
                "boundary",
                "all"
            ],
            "description": "Control the rendering of whitespaces in the editor"
        },
        "editor.autoSave": {
            "enum": [
                "on",
                "off"
            ],
            "default": "on",
            "description": "Configure whether the editor should be auto saved"
        },
        "editor.autoSaveDelay": {
            "type": "number",
            "default": 500,
            "description": "Configure the auto save delay in milliseconds"
        }
    }
};
exports.defaultEditorConfiguration = {
    'editor.tabSize': 4,
    'editor.lineNumbers': 'on',
    'editor.renderWhitespace': 'none',
    'editor.autoSave': 'on',
    'editor.autoSaveDelay': 500
};
exports.EditorPreferences = Symbol('EditorPreferences');
function createEditorPreferences(preferences) {
    return preferences_api_1.createPreferenceProxy(preferences, exports.defaultEditorConfiguration, exports.editorPreferenceSchema);
}
exports.createEditorPreferences = createEditorPreferences;
function bindEditorPreferences(bind) {
    bind(exports.EditorPreferences).toDynamicValue(function (ctx) {
        var preferences = ctx.container.get(preferences_api_1.PreferenceService);
        return createEditorPreferences(preferences);
    });
    bind(preferences_api_1.PreferenceContribution).toConstantValue({ schema: exports.editorPreferenceSchema });
}
exports.bindEditorPreferences = bindEditorPreferences;
//# sourceMappingURL=editor-preferences.js.map